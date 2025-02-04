import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Appbar from "@/components/landingPage/appbar";
import user from "@/public/user.png";
import { EditIcon } from "@/public/assets/CustomIcon";
import Footer from "@/components/landingPage/footer";

export default function User() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-[1rem] px-[1rem] md:px-[5rem] border-b">
        <Appbar />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-[#131313] rounded-lg p-[2rem] space-y-6">
            {/* Profile Photo Component */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div
                className={`w-full h-full rounded-full overflow-hidden bg-sidebar-accent flex items-center justify-center border-2 border-sidebar-border`}
              >
                <Image
                  src={user}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <button className="p-2 bg-sidebar-primary rounded-full hover:bg-opacity-90 transition-all text-[#FFFFFF] mt-[12px]">
                Upload a photo
              </button>
            </div>

            <div className="space-y-4 text-[#FFFFFF]">
              <div className="p-4 mt-[3rem]">
                <h3 className="text-sm font-medium mb-3">
                  Identity Verification
                </h3>
                <p className="text-xs mb-4">
                  Complete these steps to verify your identity and unlock all
                  features
                </p>

                {/* Verification Status Component */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 ">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Email Confirmed</span>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Profile Confirmed</span>
                        </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-card rounded-lg ">
            <div className="flex justify-between items-center mb-[30px]">
              <h1 className="text-[2rem] font-bold text-[#1C2939] ">
                Profile
              </h1>
              <button className="text-[#1C2939] text-[1rem] font-medium flex items-center gap-2">
                <EditIcon />
                Edit
              </button>
            </div>
            <div className="max-w-3xl">
              {/* Profile Form Component */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 ">
                    <Label htmlFor="name" className="text-[#334054] font-semibold">Name</Label>
                    <p id="name" className="text-[#717171] font-medium">David Singh</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#334054] font-semibold">Phone Number</Label>
                    <p id="phone" className="text-[#717171] font-medium ">+91 92929 *****</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#334054] font-semibold">Email</Label>
                    <p id="email" className="text-[#717171] font-medium">davidsingh555@gmail.com</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-[#334054] font-semibold">Date of Birth</Label>
                    <p id="dob" className="text-[#717171] font-medium">15th Dec 1995</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[#334054] font-semibold">City</Label>
                    <p id="city" className="text-[#717171] font-medium">Hyderabad</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-[#334054] font-semibold">State</Label>
                    <p id="state" className="text-[#717171] font-medium">Telangana</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#334054] font-semibold">Password</Label>
                    <p id="password" className="text-[#717171] font-medium">********</p>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
