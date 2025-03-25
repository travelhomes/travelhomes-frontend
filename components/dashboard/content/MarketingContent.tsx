"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { X, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export function MarketingContent() {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setUploadedImages([...uploadedImages, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    };

    return (
        <div className={`${plusJakartaSans.className} bg-white rounded-xl h-full overflow-y-auto`}>
            <div>
                {/* Upload Content Button */}
                <div className=" border-b pb-2 border-[#EAECF0] py-5 ">
                    <h1 className="text-[20px] text-[#101828] font-semibold px-5">Marketing Content</h1>
                </div>

                {/* Reel/Images Section */}
                <div className="my-6 p-5">
                    <h2 className="text-lg font-medium mb-4">Reel/Images</h2>
                    <div className="flex flex-col gap-4">
                        {/* Uploaded Images Grid */}
                        {uploadedImages.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {uploadedImages.map((image, index) => (
                                    <div key={index} className="relative">
                                        <div className="w-full h-[150px] rounded-lg overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={`Uploaded ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                                        >
                                            <X className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Image Uploader */}
                        <label className="w-full h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-gray-600" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">Drag and drop choose file to upload your files.</p>
                                    <p className="text-xs text-gray-500 mt-1">All pdf, doc, csv, xlsx types are supported</p>
                                </div>
                            </div>
                            <Input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>
                </div>

                {/* Write Content Section */}
                <div className="p-5">
                    <h2 className="text-lg font-medium mb-4">Write an content</h2>
                    <div className="border rounded-lg overflow-hidden">
                        <div className="border-b bg-white">
                            <div className="flex items-center gap-2 p-2">
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <span className="font-bold">B</span>
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <span className="italic">I</span>
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <span className="underline">U</span>
                                </button>
                                <div className="w-px h-6 bg-gray-200 mx-2" />
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 4H14M6 8H14M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                                <div className="w-px h-6 bg-gray-200 mx-2" />
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 8H14M8 2V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <textarea
                            placeholder="Address of CamperVan..."
                            className="w-full h-[200px] p-4 text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 