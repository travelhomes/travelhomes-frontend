"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import registerImage from "@/public/register.png"
import { useRouter, useSearchParams } from "next/navigation"
import axios, { AxiosError } from "axios"
import { BASE_URL } from "@/config/config"

export default function VerifyCode() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')

  useEffect(() => {
    if (!email || !userId || !token) {
      router.push('/auth/register')
    }
  }, [email, userId, token, router])

  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isNaN(Number(value))) return // Only allow numbers

    const newOtp = [...otp]
    // Only take the last character if multiple characters are pasted
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    setIsLoading(true)
    setError("")

    try {
      const verificationCode = otp.join("")
      const response = await axios.post(`${BASE_URL}/api/auth/verifyEmailOTP/registration`, {
        email: email,
        otp: verificationCode
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        // After successful verification, redirect back to registration with verified status and token
        router.push(`/auth/register?step=2&userId=${userId}&token=${encodeURIComponent(token || '')}`)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<{ message: string }>
        if (error.response?.data?.message) {
          setError(error.response.data.message)
        } else {
          setError("Invalid verification code. Please try again.")
        }
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/resend-verification`, {
        email: email,
        userId: userId
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // Show success message or toast
    } catch (err) {
      console.log(err)
      setError("Failed to resend code. Please try again.")
    }
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 justify-center p-6 bg-muted/5">
        <div className="h-full w-full relative">
          <Image
            src={registerImage}
            alt="Verification illustration"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="flex mt-[60px] justify-center p-6 flex-1">
        <div className="w-full max-w-md space-y-6">
          <Link
            href="/auth/register"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Register
          </Link>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Verify code</h1>
            <p className="text-sm text-muted-foreground">An authentication code has been sent to your email</p>
          </div>

          {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{error}</div>}

          <p className="mt-[25px] text-sm"> Enter Code</p>

          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el
                  }
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={handleChange(index)}
                onKeyDown={handleKeyDown(index)}
                className="w-12 h-12 text-center border border-[#B0B0B0] rounded-lg text-lg font-semibold focus:border-primary focus:ring-1 focus:ring-primary"
              />
            ))}
          </div>

          <div className="text-center">
            <button onClick={handleResend} className="text-sm text-primary hover:underline">
              Didn&apos;t receive code? Resend
            </button>
          </div>

          <Button
            className="w-full rounded-[60px] py-[12px] px-[32px]"
            size="lg"
            onClick={handleVerify}
            disabled={isLoading || otp.some((digit) => !digit)}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </div>
    </div>
  )
}

