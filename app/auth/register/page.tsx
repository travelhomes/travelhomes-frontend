"use client";

import { useState } from "react";
import Image from "next/image";
import registerImage from "@/public/register.png";
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
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dob: string;
  state: string;
  city: string;
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
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
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStep1Submit = () => {
    if (!formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleStep2Submit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.dob || !formData.state || !formData.city) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await register(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`
      );
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Email already exists");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 lg:gap-8">
      <div className="hidden md:flex flex-1 gap-4 p-6 bg-muted/5">
        <div className="space-y-4">
          <Image src={registerImage} alt="Registration illustration" width={800} height={300} />
        </div>
      </div>

      <div className="flex items-center justify-center p-6 flex-1">
        <div className="w-full max-w-md space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          
          {step === 1 ? (
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email ID"
                  className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <div className="flex space-x-2">
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                  />
                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create Password"
                  className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <Button
                  className="w-full rounded-[60px] py-[12px] px-[32px]"
                  size="lg"
                  onClick={handleStep1Submit}
                >
                  Continue
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
            <>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                ← Back
              </button>

              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Personal Information
                </h1>
                <p className="text-sm text-muted-foreground">
                  Let&apos;s get you all set up so you can access your personal
                  account.
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
                    className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                  />

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                  />
                </div>

                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  placeholder="Date of Birth"
                  className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                />

                <Select name="state" onValueChange={handleSelectChange('state')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>

                <Select name="city" onValueChange={handleSelectChange('city')}>
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
