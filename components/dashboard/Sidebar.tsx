import Link from "next/link";
import Logo from "@/public/mainlogo.png";
import { usePathname } from "next/navigation";
import { Logout } from "@/public/assets/CustomIcon"
import {
  LayoutDashboard,
  CalendarRange,
  Package,
  LineChart,
  BarChart,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  Caravan,
  PlaneLanding,
  BarChart4,
  Calendar
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DropdownItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  key?: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export function Sidebar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>("bookings");
  
  const toggleDropdown = (key: string) => {
    setOpenDropdown(prev => prev === key ? null : key);
  };

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: "/dashboard",
    },
    {
      name: "Bookings",
      icon: <CalendarRange className="w-5 h-5" />,
      key: "bookings",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Calendar",
          icon: <Calendar className="w-4 h-4" />,
          href: "/dashboard/bookings/calendar",
        },
        {
          name: "Bookings Details",
          icon: <CalendarRange className="w-4 h-4" />,
          href: "/dashboard/bookings/details",
        },
        {
          name: "Add New Bookings",
          icon: <CalendarRange className="w-4 h-4" />,
          href: "/dashboard/bookings/new",
        },
      ],
    },
    {
      name: "Offering",
      icon: <Package className="w-5 h-5" />,
      key: "offering",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Stays",
          icon: <Home className="w-4 h-4" />,
          href: "/dashboard/offering/stays",
        },
        {
          name: "Caravan",
          icon: <Caravan className="w-4 h-4" />,
          href: "/dashboard/offering/caravan",
        },
        {
          name: "Activities",
          icon: <PlaneLanding className="w-4 h-4" />,
          href: "/dashboard/offering/activities",
        },
      ],
    },
    {
      name: "Revenue",
      icon: <LineChart className="w-5 h-5" />,
      href: "/dashboard/revenue",
    },
    {
      name: "Marketing",
      icon: <BarChart className="w-5 h-5" />,
      key: "marketing",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Campaigns",
          href: "/dashboard/marketing/campaigns",
          icon: <BarChart4 className="w-4 h-4" />,
        },
        {
          name: "Promotions",
          href: "/dashboard/marketing/promotions",
          icon: <BarChart4 className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Analytics",
      icon: <LineChart className="w-5 h-5" />,
      href: "/dashboard/analytics",
    },
    {
      name: "Chat",
      icon: <MessageSquare className="w-5 h-5" />,
      href: "/dashboard/chat",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      href: "/dashboard/settings",
    },
  ];

  const isLinkActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="h-full bg-[#F9FAFB] border-r flex flex-col">
      <div className="p-6 pl-[30px]">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src={Logo} 
              alt="TravelHomes Logo" 
            />
          </div>
        </Link>
      </div>
      
      <div className="flex-1 px-[1rem] py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.hasDropdown 
              ? (item.dropdownItems?.some(subItem => isLinkActive(subItem.href)) || false)
              : isLinkActive(item.href || '');
            
            if (item.hasDropdown) {
              const isOpen = openDropdown === item.key;
              
              return (
                <div key={item.key} className="mb-1">
                  <button
                    onClick={() => toggleDropdown(item.key || '')}
                    className={`flex items-center justify-between w-full px-3 py-3 my-[8px] font-medium rounded-[12px] transition-colors
                      ${isActive 
                        ? "bg-[#131313] text-[#FFFFFF]" 
                        : "text-[#7A757D] hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center">
                      <span className={`mr-3 ${isActive ? "text-white" : "text-[#7A757D]"}`}>
                        {item.icon}
                      </span>
                      {item.name}
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${isActive ? "text-white" : "text-[#7A757D]"}`} 
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="relative">
                      {/* Vertical line that connects all items */}
                      <div className="absolute left-[22px] top-1 bottom-1 w-[1px] bg-gray-200"></div>
                      
                      <div className="space-y-1 relative">
                        {item.dropdownItems?.map((subItem, index) => {
                          const isSubActive = isLinkActive(subItem.href);
                          const isFirst = index === 0;
                          const isLast = index === (item.dropdownItems?.length || 0) - 1;
                          
                          return (
                            <div key={subItem.href} className="flex relative pl-10">
                              {/* Curved line for each item */}
                              <div className="absolute left-[22px] top-1/2 w-[10px] h-[1px] bg-gray-200"></div>
                              
                              {/* Highlight for active item - black background */}
                              {isSubActive && (
                                <div className="absolute left-0 right-4 top-0 bottom-0 bg-black rounded-lg -z-10"></div>
                              )}
                              
                              <Link
                                href={subItem.href}
                                className={`flex items-center py-2 px-3 w-full text-sm font-medium rounded-md transition-colors
                                  ${isSubActive 
                                    ? "text-white font-semibold" 
                                    : "text-[#7A757D] hover:text-gray-900"
                                  }`}
                              >
                                {subItem.icon && (
                                  <span className={`mr-2 ${isSubActive ? "text-white" : "text-[#7A757D]"}`}>
                                    {subItem.icon}
                                  </span>
                                )}
                                {subItem.name}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <Link
                key={item.href}
                href={item.href || '#'}
                className={`flex items-center px-3 py-3 my-[8px] font-medium rounded-[12px] transition-colors
                  ${isActive 
                    ? "bg-[#131313] text-[#FFFFFF]" 
                    : "text-[#7A757D] hover:bg-gray-100"
                  }`}
              >
                <span className={`mr-3 ${isActive ? "text-white" : "text-[#7A757D]"}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 mt-auto">
        <Link
          href="/logout"
          className="flex items-center px-3 py-3 font-medium text-[#C13515] rounded-md hover:bg-gray-100"
        >
            <Logout />
            <span className="ml-[12px]">
            Logout
            </span>
        </Link>
      </div>
    </div>
  );
} 