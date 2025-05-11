"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Appbar from "@/components/landingPage/appbar";
import userPlaceholder from "@/public/user.png";
import { EditIcon } from "@/public/assets/CustomIcon";
import Footer from "@/components/landingPage/footer";
import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  date_of_birth?: string;
  marital_status?: string;
  id_proof?: string;
  id_photos?: string[]; // This should be array
}

export default function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  const userEmail = user?.email;

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    date_of_birth: "",
    marital_status: "",
    id_proof: "",
    id_photos: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userEmail) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://3.7.52.212:5000";
        const response = await axios.get(`${BASE_URL}/api/auth/user-details`, {
          params: { email: userEmail }
        });

        const { data } = response.data;
        setUserData({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          email: data.email || "",
          phone: data.phone || "",
          city: data.city || "",
          state: data.state || "",
          date_of_birth: data.date_of_birth || "",
          marital_status: data.marital_status || "",
          id_proof: data.id_proof || "",
          id_photos: Array.isArray(data.id_photos)
            ? data.id_photos
            : data.id_photos
              ? [data.id_photos]
              : []
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => setIsEditing(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://3.7.52.212:5000";
      const response = await axios.put(`${BASE_URL}/api/auth/user-details/${userEmail}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.status !== 200) {
        throw new Error("Failed to update user data");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setSaving(false);
    }
  };

  // if (!userEmail || !isAuthenticated) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-gray-700 text-lg">You must be logged in to view your profile.</p>
  //     </div>
  //   );
  // }

  // if (!userEmail || !isAuthenticated) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="w-[300px] p-4 space-y-4 animate-pulse">
  //         <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto" />
  //         <div className="h-4 bg-gray-200 rounded w-full" />
  //         <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" />
  //       </div>
  //     </div>
  //   );
  // }
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const fieldsToDisplay = [
    { key: "firstname", label: "First Name" },
    { key: "lastname", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "date_of_birth", label: "Date of Birth" },
    { key: "marital_status", label: "Marital Status" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="py-[1rem] px-[1rem] md:px-[5rem] border-b">
        <Appbar />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="bg-[#131313] rounded-lg p-[2rem] space-y-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full overflow-hidden bg-sidebar-accent flex items-center justify-center border-2 border-sidebar-border">
                <Image src={userPlaceholder} alt="Profile" width={100} height={100} />
              </div>
              <button className="p-2 bg-sidebar-primary rounded-full hover:bg-opacity-90 text-white mt-3">
                Upload a photo
              </button>
            </div>

            <div className="text-white space-y-4">
              <div className="p-4 mt-[3rem]">
                <h3 className="text-sm font-medium mb-3">Identity Verification</h3>
                <p className="text-xs mb-4">
                  Complete these steps to verify your identity and unlock all features
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Email Confirmed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Profile Confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-[#1C2939]">Profile</h1>
              {isEditing ? (
                <div className="flex gap-2">
                  <button onClick={handleCancel} className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 text-sm font-medium text-gray-700">
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 text-sm font-medium flex items-center gap-2">
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    Save
                  </button>
                </div>
              ) : (
                <button className="text-[#1C2939] text-[1rem] font-medium flex items-center gap-2" onClick={handleEdit}>
                  <EditIcon />
                  Edit
                </button>
              )}
            </div>

            <div className="max-w-3xl">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fieldsToDisplay.map(({ key, label }) => (
                    <div className="space-y-2" key={key}>
                      <Label htmlFor={key} className="text-[#334054] font-semibold">{label}</Label>
                      {isEditing ? (
                        <Input
                          id={key}
                          name={key}
                          value={userData[key as keyof UserData] || ""}
                          onChange={handleChange}
                          className="text-[#717171] font-medium"
                        />
                      ) : (
                        <p className="text-[#717171] font-medium">{userData[key as keyof UserData] || "Not provided"}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Identity Proof</h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-[#334054] font-semibold">ID Proof Type</Label>
                      {isEditing ? (
                        <Input
                          name="id_proof"
                          value={userData.id_proof || ""}
                          onChange={handleChange}
                          className="text-[#717171] font-medium mt-2"
                        />
                      ) : (
                        <p className="text-[#717171] font-medium mt-2">
                          {userData.id_proof || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-[#334054] font-semibold">ID Photos</Label>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {userData.id_photos?.length ? (
                          userData.id_photos.map((photo, index) => (
                            <div key={index} className="w-32 h-32 relative border rounded-md overflow-hidden">
                              <Image
                                src={photo}
                                alt={`ID Proof ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))
                        ) : (
                          <p className="text-[#717171] font-medium">No ID photos uploaded</p>
                        )}
                      </div>
                    </div>
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
