"use client";

import Image from "next/image";
import register from "@/public/register.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/public/assets/CustomIcon";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleForgotPasswordSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email is not valid");
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  };

  const handleVerifyCode = () => {
    // Add verification logic here
    setIsVerified(true);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 lg:gap-8">
      <div className="hidden md:flex flex-1 gap-4 p-6 bg-muted/5">
        <div className="space-y-4">
          <Image src={register} alt={""} width={800} height={300} />
        </div>
      </div>

      <div className="flex justify-center p-6 flex-1">
        <div className="w-full max-w-md space-y-6">
          {isForgotPassword ? (
            <div className="mt-[56px]">
              <Link href="/" className="inline-flex text-sm text-muted-foreground hover:text-primary mb-[32px]">
                ← Back to login
              </Link>

              {isVerified ? (
                // New Password Form
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold tracking-tight">Create New Password</h1>
                  <p className="text-sm text-muted-foreground">
                    Enter different password from your previous one
                  </p>

                  <div className="space-y-4">
                    <div>
                      <input
                        type="password"
                        placeholder="Create Password"
                        className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                      />
                    </div>

                    <div>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                      />
                    </div>

                    <Button
                      className="w-full rounded-[60px] py-[12px] px-[32px]"
                      size="lg"
                    >
                      Reset Password
                    </Button>
                  </div>
                </div>
              ) : isEmailValid ? (
                // Verification Code Form
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold tracking-tight">Verify code</h1>
                  <p className="text-sm text-muted-foreground">
                    An authentication code has been sent to your email
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Enter code</p>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Input key={i} type="text" maxLength={1} className="w-12 h-12 text-center text-lg rounded-lg" />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Didn&apos;t receive a code?{" "}
                          <Button variant="link" className="p-0 h-auto text-[#131313]">
                            Resend
                          </Button>
                        </p>
                      </div>

                      <Button 
                        className="w-full rounded-[60px] py-[12px] px-[32px] bg-black text-white" 
                        size="lg"
                        onClick={handleVerifyCode}
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // Email Form
                <div>
                  <div className="space-y-2 mb-[20px]">
                    <h1 className="text-2xl font-semibold tracking-tight mb-[10px]">Email</h1>
                    <p className="text-sm text-muted-foreground">Enter your registered email ID</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email ID"
                        className={`px-[12px] py-[14px] w-full border rounded-[8px] ${
                          emailError ? "border-red-500" : "border-[#B0B0B0]"
                        }`}
                      />
                      {emailError && <p className="text-[#131] text-sm mt-2">{emailError}</p>}
                    </div>

                    <Button className="w-full rounded-[60px] py-[12px] px-[32px]" size="lg" onClick={handleForgotPasswordSubmit}>
                      Send code
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="space-y-2 mb-7 mt-[30px]">
                <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
                <p className="text-sm text-muted-foreground">Login to access your Golobe account</p>
              </div>

              <div className="space-y-4">
                <div>
                  <input type="email" placeholder="Email or Phone" className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]" />
                </div>

                <div>
                  <input type="password" placeholder="Password" className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]" />
                </div>

                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <input type="checkbox" id="remember" className="rounded border-gray-300" />
                    <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
                  </div>
                  <button onClick={() => setIsForgotPassword(true)} className="text-sm text-[#DA190B]">
                    Forgot Password?
                  </button>
                </div>

                <Button className="w-full rounded-[60px] py-[12px] px-[32px]" size="lg">Login</Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">Register</Link>
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full border border-[#000000] rounded-[60px] py-[12px] px-[32px]" size="lg">
                  <GoogleIcon />
                  Continue with Google
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}