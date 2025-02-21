"use client"

import Image from "next/image"
import register from "@/public/register.png"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios, { type AxiosError } from "axios"
import { BASE_URL } from "@/config/config"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
        email
      })

      if (response.status === 200) {
        // Redirect to verification page or show success message
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<{ message: string }>
        if (error.response?.data?.message) {
          setError(error.response.data.message)
        } else {
          setError("Failed to process request. Please try again.")
        }
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 items-center justify-center p-6 bg-muted/5">
        <div className="h-full w-full relative">
          <Image
            src={register}
            alt="Forgot Password illustration"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="flex mt-[2rem] p-6 flex-1">
        <div className=" w-[570px] space-y-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>

          {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{error}</div>}

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Email ID</h1>
            <p className="text-sm text-muted-foreground">
            Enter your register email ID
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError("")
              }}
              placeholder="Enter your email ID"
              className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
            />

            <Button
              className="w-full rounded-[60px] py-[12px] px-[32px]"
              size="lg"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Code"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}