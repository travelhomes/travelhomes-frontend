"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface HeaderProps {
  onTabChange?: (tab: string) => void;
}

// Define interface for category data based on the actual API response
interface Category {
  id: number;
  name: string;
  icon: string;
}

interface ApiResponse {
  success: boolean;
  data: Category[];
}

export function Header({ onTabChange }: HeaderProps) {
  const [activeButton, setActiveButton] = useState<string>(""); 
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://3.7.52.212:5000";
        const response = await axios.get<ApiResponse>(`${BACKEND_URL}/api/categories`);
        
        // Check if the response has the expected structure
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          // Sort categories by ID in ascending order (1 to 3)
          const sortedCategories = [...response.data.data].sort((a, b) => a.id - b.id);
          setCategories(sortedCategories);
          
          // Set the first category as active by default
          if (sortedCategories.length > 0) {
            setActiveButton(sortedCategories[0].id.toString());
            
            // Trigger initial tab change
            const tabMap: Record<string, string> = {
              'Activity': 'activity',
              'Caravan': 'campervan',
              'Stay': 'uniquestay',
            };
            onTabChange?.(tabMap[sortedCategories[0].name] || 'campervan');
          }
        } else {
          // If response is not in expected format
          setCategories([]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [onTabChange]);
  
  const handleButtonClick = (buttonId: string, categoryName: string) => {
    setActiveButton(buttonId);
    
    // Map category names to tab names expected by SearchFilter
    const tabMap: Record<string, string> = {
      'Activity': 'activity',
      'Caravan': 'campervan',
      'Stay': 'uniquestay',
    };
    onTabChange?.(tabMap[categoryName] || 'campervan');
  };

  // Render buttons from API data
  const renderButtons = () => {
    return categories.map((category) => (
      <button 
        key={category.id}
        className={`flex items-center space-x-2 bg-[#F6F6F6] text-[#131313] ${
          activeButton === category.id.toString() ? 'bg-black text-white' : ''
        } px-4 py-2 rounded-full`} 
        onClick={() => handleButtonClick(category.id.toString(), category.name)}
      >
        <div className="bg-white p-1.5 rounded-full flex items-center justify-center h-6 w-6">
          {/* Display the icon from the API URL */}
          <Image
            src={category.icon} 
            alt={`${category.name} icon`} 
            width={4}
            height={4}
            className="w-4 h-4"
          />
        </div>
        <span className="text-sm font-medium pr-1">{category.name}</span>
      </button>
    ));
  };

  return (
    <div className="hidden md:block">
      <div className="flex items-center justify-start mt-[2.5rem] mb-[1rem]">
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="px-4 py-2 text-sm">Loading categories...</div>
          ) : error ? (
            <div className="px-4 py-2 text-sm text-red-500">{error}</div>
          ) : categories.length > 0 ? (
            renderButtons()
          ) : (
            <div className="px-4 py-2 text-sm">No categories available</div>
          )}
        </div>
      </div>
    </div>
  );
}
