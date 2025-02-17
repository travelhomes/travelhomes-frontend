"use client";

import Image from "next/image";
import register from "@/public/register.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/public/assets/CustomIcon";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(formData.email, formData.password);
      router.push("/"); // Redirect to home page after successful login
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
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
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <div className="space-y-2 mb-7 mt-[30px]">
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
                        className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                      />
                    </div>

                    <div>
                      <input
                        type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                        className="px-[12px] py-[14px] w-full border border-[#B0B0B0] rounded-[8px]"
                      />
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
              >
                Login
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
    </div>
  );
}