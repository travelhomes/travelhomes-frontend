"use client";

import Image from "next/image";
import register from "@/public/register.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/public/assets/CustomIcon";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error when user starts typing in that field
    setErrors(prev => ({ ...prev, [name]: undefined, general: undefined }));
  };

  const handleLogin = async () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        router.push("/"); // Redirect to home page after successful login
      } else {
        setErrors({ general: "Invalid credentials. Please try again." });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          setErrors({ general: "Invalid email or password" });
        } else if (error.response?.status === 404) {
          setErrors({ general: "User not found" });
        } else {
          setErrors({ general: "An error occurred. Please try again later." });
        }
      } else {
        setErrors({ general: "An unexpected error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 items-center justify-center p-6 bg-muted/5">
        <div className="h-full w-full relative">
          <Image
            src={register}
            alt="Login illustration"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="flex mt-[2rem] p-6 flex-1">
        <div className=" w-[570px] space-y-6">
          {errors.general && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {errors.general}
            </div>
          )}

          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Login to access your Golobe account
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="px-4 py-2  w-full border border-[#B0B0B0] rounded-[8px]"
              />
              {errors.email && (
                <div className="text-xs text-red-500 mt-1">{errors.email}</div>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="px-4 py-2  w-full border border-[#B0B0B0] rounded-[8px]"
              />
              {errors.password && (
                <div className="text-xs text-red-500 mt-1">{errors.password}</div>
              )}
            </div>

            <div className="flex justify-between">
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground"
                >
                  Remember me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-[#DA190B]">
                Forgot Password?
              </Link>
            </div>

            <Button
              className="w-full rounded-[60px] py-[12px] px-[32px]"
              size="lg"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
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
        </div>
      </div>
    </div>
  );
}