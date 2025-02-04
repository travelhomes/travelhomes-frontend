"use client";

import { useState } from "react";
import Image from "next/image";
import register from "@/public/register.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoogleIcon } from "@/public/assets/CustomIcon";

export default function RegisterPage() {
  const [step, setStep] = useState(1); // 1 = Email Step, 2 = Name Step

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 lg:gap-8">
      {/* Images Flex */}
      <div className="hidden md:flex flex-1 gap-4 p-6 bg-muted/5">
        <div className="space-y-4">
          <Image src={register} alt={""} width={800} height={300} />
        </div>
      </div>

      <div className="flex items-center justify-center p-6 flex-1">
        <div className="w-full max-w-md space-y-6">
          {step === 1 ? (
            // Step 1: Email & Password Registration
            <>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Register
                </h1>
                <p className="text-sm text-muted-foreground">
                  Let us get you all set up so you can access your personal
                  account.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email ID"
                  className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <div className="flex space-x-2 ">
                  <Select defaultValue="+1">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="+1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                      <SelectItem value="+91">+91</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                  />
                </div>

                <input
                  type="password"
                  placeholder="Create Password"
                  className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <Button
                  className="w-full rounded-[60px] py-[12px] px-[32px]"
                  size="lg"
                  onClick={() => setStep(2)} // Move to Step 2
                >
                  Register
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Login
                    </Link>
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or sign up with
                    </span>
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
            // Step 2: Name, DOB, State, City
            <>
              <Link
                href="#"
                onClick={() => setStep(1)} // Go back to Step 1
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                ← Back to login
              </Link>

              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Register
                </h1>
                <p className="text-sm text-muted-foreground">
                  Let’s get you all set up so you can access your personal
                  account.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                  />
                </div>

                <input
                  type="date"
                  placeholder="Date of Birth"
                  className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
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
                >
                  Register
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
