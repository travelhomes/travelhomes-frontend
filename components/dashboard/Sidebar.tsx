import Logo from "@/public/mainlogo.png";
import { Logout } from "@/public/assets/CustomIcon"
import {
  LayoutDashboard,
  CalendarRange,
  Package,
  LineChart,
  BarChart,
  MessageSquare,
  Settings,
  ChevronDown,
  BarChart4,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface DropdownItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path?: string;
  key?: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export function Sidebar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Set initial open dropdowns based on current path
  useEffect(() => {
    if (pathname.includes('/dashboard/bookings')) {
      setOpenDropdown('bookings');
    } else if (pathname.includes('/dashboard/offering')) {
      setOpenDropdown('offering');
    } else if (pathname.includes('/dashboard/marketing')) {
      setOpenDropdown('marketing');
    }
  }, [pathname]);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(prev => prev === key ? null : key);
  };

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      name: "Bookings",
      icon: <CalendarRange className="w-5 h-5" />,
      key: "bookings",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Calendar",
          path: "/dashboard/bookings/calendar",
        },
        {
          name: "Bookings Details",
          path: "/dashboard/bookings/details",
        },
        {
          name: "Add New Bookings",
          path: "/dashboard/bookings/new",
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
          name: "Listing",
          path: "/dashboard/offering/listing",
        },
        {
          name: "Add Offerings",
          path: "/dashboard/offering/add",
        },
      ],
    },
    {
      name: "Revenue",
      icon: <LineChart className="w-5 h-5" />,
      path: "/dashboard/revenue",
    },
    {
      name: "Marketing",
      icon: <BarChart className="w-5 h-5" />,
      key: "marketing",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Upload Content",
          path: "/dashboard/marketing/campaigns",
          icon: <BarChart4 className="w-4 h-4" />,
        },
        {
          name: "Offers",
          path: "/dashboard/marketing/promotions",
          icon: <BarChart4 className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Analytics",
      icon: <LineChart className="w-5 h-5" />,
      path: "/dashboard/analytics",
    },
    {
      name: "Chat",
      icon: <MessageSquare className="w-5 h-5" />,
      path: "/dashboard/chat",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/dashboard/settings",
    },
  ];

  // Check if a path is active
  const isPathActive = (path: string) => {
    return pathname === path;
  };

  // Check if any child of a dropdown is active
  const hasActiveChild = (item: NavItem) => {
    if (!item.hasDropdown) return false;
    return item.dropdownItems?.some(subItem => isPathActive(subItem.path)) || false;
  };

  return (
    <div className="h-full bg-[#F9FAFB] flex flex-col">
      <div className="p-6 pl-[30px]">
        <Link href="/dashboard">
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
            // Only highlight non-dropdown items if directly active
            const isActive = !item.hasDropdown && isPathActive(item.path || '');

            if (item.hasDropdown) {
              const isOpen = openDropdown === item.key;

              return (
                <div key={item.key} className="mb-1">
                  <button
                    onClick={() => toggleDropdown(item.key || '')}
                    className="flex items-center justify-between w-full px-3 py-3 my-[8px] font-medium rounded-[12px] transition-colors text-[#7A757D] hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-[#7A757D]">
                        {item.icon}
                      </span>
                      {item.name}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="relative">
                      {/* Vertical line that connects all items */}
                      <div className="absolute left-[22px] top-1 bottom-1 w-[1px] bg-gray-200"></div>

                      <div className="space-y-1 relative">
                        {item.dropdownItems?.map((subItem, index) => {
                          const isSubActive = isPathActive(subItem.path);

                          return (
                            <div key={subItem.path} className="flex relative pl-10">
                              {/* Curved line for each item */}
                              <div className="absolute left-[22px] top-1/2 w-[10px] h-[1px] bg-gray-200"></div>

                              <Link
                                href={subItem.path}
                                className={`flex items-center py-[10px] px-[12px] w-full text-sm font-medium rounded-[12px] transition-colors text-left
                                  ${isSubActive 
                                    ? "bg-[#131313] text-white" 
                                    : "text-[#7A757D] hover:bg-gray-100"
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
                key={item.path}
                href={item.path || ''}
                className={`flex items-center px-3 py-3 my-[8px] font-medium rounded-[12px] transition-colors w-full text-left
                  ${isActive
                    ? "bg-[#131313] text-white" 
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
        <button className="flex items-center w-full px-3 py-3 text-[#7A757D] font-medium rounded-md transition-colors hover:bg-gray-100">
          <span className="mr-3">
            <Logout />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
} 