"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GoogleIcon } from "@/public/assets/CustomIcon"
import { useAuth } from "@/context/AuthContext"
import { useRouter, useSearchParams } from "next/navigation"
import { BASE_URL } from "@/config/config"
import axios, { type AxiosError } from "axios"

import registerImage from "@/public/register.png"
;

interface FormData {
  email: string
  phone: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  dob: string
  state: string
  city: string
}

interface RegisterResponse {
  userId: number
  token: string
  message: string
}

function RegisterContent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dob: "",
    state: "",
    city: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const { register } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if returning from verification
    const stepParam = searchParams.get('step')
    const userIdParam = searchParams.get('userId')
    const tokenParam = searchParams.get('token')
    
    if (stepParam === '2' && userIdParam && tokenParam) {
      setStep(2)
      setUserId(Number(userIdParam))
      setToken(tokenParam)
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError("")
  }

  const handleStep1Submit = async () => {
    if (!formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await register({
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      }) as RegisterResponse

      // Redirect to verify page with both userId and token
      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}&userId=${response.userId}&token=${encodeURIComponent(response.token)}`)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<{ message: string }>
        if (error.response?.status === 409) {
          setError("Email already exists")
        } else if (error.response?.data?.message) {
          setError(error.response.data.message)
        } else {
          setError("Registration failed. Please try again.")
        }
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleStep2Submit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.dob || !formData.state || !formData.city) {
      setError("Please fill in all fields")
      return
    }

    if (!userId || !token) {
      setError("Missing authentication details. Please try again.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await axios.put(`${BASE_URL}/api/auth/updatePersonalDetails/${userId}`, {
        firstname: formData.firstName,
        lastname: formData.lastName,
        city: formData.city,
        state: formData.state,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        // Now we can redirect to login page
        router.push("/auth/login")
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<{ message: string }>
        if (error.response?.data?.message) {
          setError(error.response.data.message)
        } else {
          setError("Failed to update personal details. Please try again.")
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
            src={registerImage}
            alt="Registration illustration"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="flex mt-[2rem] p-6 flex-1">
        <div className=" w-[570px] space-y-6">
          {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">{error}</div>}

          {step === 1 ? (
            <>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
                <p className="text-sm text-muted-foreground">
                  Let us get you all set up so you can access your personal account.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email ID"
                  className="px-4 py-2  w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <div className="flex space-x-2">
                  <Select defaultValue="+91">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="+91" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">+91</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    className="px-4 py-2  w-full border border-[#B0B0B0] rounded-[8px]"
                  />
                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create Password"
                  className="px-4 py-2  w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="px-4 py-2 w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <Button
                  className="w-full rounded-[60px] py-[12px] px-[32px]"
                  size="lg"
                  onClick={handleStep1Submit}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Continue"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-primary hover:underline">
                      Login
                    </Link>
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border border-[#000000] rounded-[60px] py-[12px] px-[32px]"
                  size="lg"
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                ← Back
              </button>

              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Personal Information</h1>
                <p className="text-sm text-muted-foreground">
                  Let&apos;s get you all set up so you can access your personal account.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="px-4 py-2  w-full border border-[#B0B0B0] rounded-[8px]"
                  />

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="px-4 py-2  w-full border border-[#B0B0B0] rounded-[8px]"
                  />
                </div>

                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  placeholder="Date of Birth"
                  className="px-4 py-2 w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <Select name="state" onValueChange={handleSelectChange("state")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>

                <Select name="city" onValueChange={handleSelectChange("city")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  className="w-full rounded-[60px] py-[12px] px-[32px]"
                  size="lg"
                  onClick={handleStep2Submit}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Register"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  )
}

