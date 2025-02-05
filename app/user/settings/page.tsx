import Appbar from "@/components/landingPage/appbar";
import Footer from "@/components/landingPage/footer";

export default function Settings() {
  return (
    <>
      <div className="py-4 px-4 md:px-20 border-b border-[#F6F6F6] hidden md:block">
        <Appbar />
      </div>

      <div className=" p-6 py-[32px] px-4 md:px-20 h-screen">
        <h2 className="text-[32px] font-semibold mb-8 text-[#1C2939] ">Account Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#F6F6F6] pb-4">
            <div>
              <h3 className="font-medium text-[20px] text-[#1C2939] mb-[9px]">Change Phone Number</h3>
              <p className="text-sm text-[#667085]">Lorem ipsum text here about how text goes here</p>
            </div>
            <button className="px-4 py-2 text-sm border border-[#000000] rounded-full hover:bg-gray-50">
              Update Now
            </button>
          </div>

          <div className="flex items-center justify-between border-b border-[#F6F6F6] pb-4">
            <div>
              <h3 className="font-medium text-[20px] text-[#1C2939] mb-[9px]">Change Email ID</h3>
              <p className="text-sm text-[#667085]">Lorem ipsum text here about how text goes here</p>
            </div>
            <button className="px-4 py-2 text-sm border border-[#000000] rounded-full hover:bg-gray-50">
              Update Now
            </button>
          </div>

          <div className="flex items-center justify-between pb-4">
            <div>
              <h3 className="font-medium text-[20px] text-[#1C2939] mb-[9px]">Change Password</h3>
              <p className="text-sm text-[#667085]">Lorem ipsum text here about how text goes here</p>
            </div>
            <button className="px-4 py-2 text-sm border border-[#000000] rounded-full hover:bg-gray-50">
              Update Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

