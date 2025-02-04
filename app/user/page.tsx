import { User as UserIcon, Upload, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function User() {

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-sidebar rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-sidebar-foreground text-center mb-6">Profile</h2>
            
            {/* Profile Photo Component */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className={`w-full h-full rounded-full overflow-hidden bg-sidebar-accent flex items-center justify-center border-2 border-sidebar-border`}>
              <Image src={"https://images.unsplash.com/photo-1545161296-d9c2c241f2ad?ixlib=rb-4.0.3"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-sidebar-primary rounded-full hover:bg-opacity-90 transition-all">
                <Upload className="w-4 h-4 text-sidebar-primary-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-sidebar-accent rounded-lg">
                <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Identity Verification</h3>
                <p className="text-xs text-sidebar-foreground opacity-70 mb-4">
                  Complete these steps to verify your identity and unlock all features
                </p>
                
                {/* Verification Status Component */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span>Email Confirmed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span>Profile Confirmed</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 text-sidebar-foreground">
                    <UserIcon className="w-4 h-4" />
                    <span>John Doe - Host</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-card rounded-lg p-6">
            <div className="max-w-3xl">
              {/* Profile Form Component */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="David Singh" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 92929 *****" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="davidsingh555@gmail.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" defaultValue="15th Dec 1995" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Hyderabad" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="Telangana" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value="********" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
