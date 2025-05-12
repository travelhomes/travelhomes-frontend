"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import TermsIllustration from "@/public/terms&conditions.png";
import VendorBar from "./vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";

interface Step9Props {
  onNext: () => void;
}

export default function Step9({ onNext }: Step9Props) {
  const handleStartVerification = () => {
    onNext();
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Mobile: Top navigation with back button and progress bar */}
      <div className="flex md:hidden items-center justify-between px-4 sm:px-6 mt-10 mb-6">
        <Link
          href=""
          className="inline-flex items-center text-muted-foreground hover:text-primary"
        >
          <span className="mr-2">
            <ArrowRightIcon />
          </span>
        </Link>
      </div>

      {/* Space for app bar */}
      <div className="hidden md:block">
        <VendorBar />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex flex-col justify-center md:justify-start md:mt-[90px] items-center">
          <div className="w-full mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 ">
              {/* Left side - Terms text */}
              <div className="w-[600px] md:w-1/2 flex flex-col items-center text-center md:text-left md:items-start ml-[100px]">
                <h2 className="text-xl leading-[45px] w-[386px] md:text-[32px] font-semibold text-[#1C2939] mb-[20px]">
                  <span> Terms & Conditions for </span>
                  <span>Verification</span>
                </h2>

                <p className=" text-[#485467] mb-8">
                  By proceeding with the verification process on{" "}
                  <span className="font-medium">Travel Homes</span>, you agree
                  to the following terms and conditions:
                </p>

                <div className="space-y-6 w-full ">
                  <div>
                    <p className=" font-medium">
                      {" "}
                      1. Accurate Information -{" "}
                      <span className="text-[#334054] font-normal">
                        {" "}
                        Provide truthful details false information may lead to
                        account suspension.
                      </span>{" "}
                    </p>
                  </div>

                  <div>
                    <p className=" font-medium">
                      {" "}
                      2. Data Usage & Security -{" "}
                      <span className="text-[#334054] font-normal">
                        {" "}
                        Your data is securely stored and used only for
                        verification; third-party services may assist in the
                        process.
                      </span>{" "}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">
                      {" "}
                      3. Verification Rights -{" "}
                      <span className="text-[#334054] font-normal">
                        {" "}
                        We may deny verification if information is invalid, and
                        terms are subject to updates.
                      </span>{" "}
                    </p>
                  </div>
                </div>

                {/* Desktop-only button */}
                <div className="mt-10 hidden md:block">
                  <Button
                    onClick={handleStartVerification}
                    className="bg-black text-white hover:bg-black/90 rounded-[60px] py-[24px] px-[32px]"
                  >
                    Start Verification
                  </Button>
                </div>
              </div>

              {/* Right side - Illustration */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  <Image
                    src={TermsIllustration}
                    alt="Terms illustration"
                    fill
                    className="object-contain"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGMEYxRjMiLz48cGF0aCBkPSJNMjAwIDIwMEMyMzEuMzcxIDIwMCAyNTcgMTc0LjM3MSAyNTcgMTQzQzI1NyAxMTEuNjI5IDIzMS4zNzEgODYgMjAwIDg2QzE2OC42MjkgODYgMTQzIDExMS42MjkgMTQzIDE0M0MxNDMgMTc0LjM3MSAxNjguNjI5IDIwMCAyMDAgMjAwWiIgZmlsbD0iI0Q5RDlEOSIvPjxwYXRoIGQ9Ik0zMDAgMzE0QzMwMCAyNzEuNDYyIDI2NS43ODUgMjM3IDIyMyAyMzdIMTc3QzEzNC4yMTUgMjM3IDEwMCAyNzEuNDYyIDEwMCAzMTRWMzE0SDMwMFYzMTRaIiBmaWxsPSIjRDlEOUQ5Ii8+PC9zdmc+";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full width Start Verification button - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={handleStartVerification}
          className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px]"
        >
          Start Verification
        </Button>
      </div>
    </div>
  );
}
