"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import VendorBar from "./vendorbar"

interface Step10Props {
  onNext: () => void;
}

export default function Step10({ onNext }: Step10Props) {
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Initialize camera
  const initializeCamera = useCallback(async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" },
        audio: false 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraReady(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraError("Unable to access camera. Please ensure you've granted camera permissions.")
    }
  }, [])

  // Clean up camera resources when component unmounts
  useEffect(() => {
    initializeCamera()
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [initializeCamera])

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && isCameraReady) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        
        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL('image/png')
        setCapturedImage(imageDataUrl)
        
        // Stop camera stream after capturing
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
          setIsCameraReady(false)
        }
      }
    }
  }

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null)
    initializeCamera()
  }

  // Submit verification
  const handleSubmit = () => {
    // Here you would typically upload the image to your server
    // For now, we'll just proceed to the next step
    onNext()
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* App bar */}

         {/* Space for app bar */}
         <div className="hidden md:block">
        <VendorBar />
      </div>

      <div className="flex-1 flex flex-col ">
        <div className="w-full max-w-3xl mx-auto px-4 pt-8 pb-4 flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-center mb-6">Verification</h1>
          
          {/* Camera view or captured image */}
          <div className="relative w-full max-w-md mx-auto aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden mb-6">
            {!capturedImage ? (
              <>
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover"
                  onCanPlay={() => setIsCameraReady(true)}
                />
                {!isCameraReady && !cameraError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <p className="text-sm text-gray-700">Initializing camera...</p>
                  </div>
                )}
                {cameraError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-4">
                    <p className="text-sm text-red-600 text-center">{cameraError}</p>
                  </div>
                )}
              </>
            ) : (
              <Image 
                src={capturedImage} 
                alt="Captured photo" 
                fill
                className="object-cover"
              />
            )}
          </div>
          
          {/* Hidden canvas for capturing */}
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Capture button - only shown when no image is captured */}
          {!capturedImage && (
            <div className="w-full flex justify-center mb-6">
              <button
                onClick={capturePhoto}
                disabled={!isCameraReady || !!cameraError}
                className="w-14 h-14 rounded-full bg-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Take photo"
              >
                <div className="w-12 h-12 rounded-full border-2 border-white"></div>
              </button>
            </div>
          )}
          
          {/* Retake and Submit buttons - only shown when image is captured */}
          {capturedImage && (
            <div className="w-full absolute bottom-0 right-5 flex justify-end gap-4 mb-6">
              <Button
                onClick={retakePhoto}
                variant="outline"
                className="border-black text-black hover:bg-gray-100 rounded-full py-[25px] px-6"
              >
                Retake
              </Button>
              
              <Button
                onClick={handleSubmit}
                className="bg-black text-white hover:bg-black/90 rounded-full py-[25px] px-6"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
        
      
      </div>
    </div>
  )
}