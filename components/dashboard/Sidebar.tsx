import Link from "next/link";
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
  LogOut,
  ChevronDown,
  Home,
  Caravan,
  PlaneLanding,
  BarChart4,
  Calendar
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface DropdownItem {
  name: string;
  section: string;
  icon?: React.ReactNode;
}

interface NavItem {
  name: string;
  icon: React.ReactNode;
  section?: string;
  key?: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

interface SidebarProps {
  currentSection: string;
  onNavigate: (section: string, title: string) => void;
}

export function Sidebar({ currentSection, onNavigate }: SidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Set initial open dropdowns based on current section
  useEffect(() => {
    if (currentSection.startsWith('bookings')) {
      setOpenDropdown('bookings');
    } else if (currentSection.startsWith('offering')) {
      setOpenDropdown('offering');
    } else if (currentSection.startsWith('marketing')) {
      setOpenDropdown('marketing');
    }
  }, [currentSection]);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(prev => prev === key ? null : key);
  };

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      section: "dashboard",
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
          section: "bookings-calendar",
        },
        {
          name: "Bookings Details",
          icon: <CalendarRange className="w-4 h-4" />,
          section: "bookings-details",
        },
        {
          name: "Add New Bookings",
          icon: <CalendarRange className="w-4 h-4" />,
          section: "bookings-new",
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
          section: "offering-stays",
        },
        {
          name: "Caravan",
          icon: <Caravan className="w-4 h-4" />,
          section: "offering-caravan",
        },
        {
          name: "Activities",
          icon: <PlaneLanding className="w-4 h-4" />,
          section: "offering-activities",
        },
      ],
    },
    {
      name: "Revenue",
      icon: <LineChart className="w-5 h-5" />,
      section: "revenue",
    },
    {
      name: "Marketing",
      icon: <BarChart className="w-5 h-5" />,
      key: "marketing",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Campaigns",
          section: "marketing-campaigns",
          icon: <BarChart4 className="w-4 h-4" />,
        },
        {
          name: "Promotions",
          section: "marketing-promotions",
          icon: <BarChart4 className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Analytics",
      icon: <LineChart className="w-5 h-5" />,
      section: "analytics",
    },
    {
      name: "Chat",
      icon: <MessageSquare className="w-5 h-5" />,
      section: "chat",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      section: "settings",
    },
  ];

  // Check if a section is active
  const isSectionActive = (section: string) => {
    return currentSection === section;
  };

  // Check if any child of a dropdown is active
  const hasActiveChild = (item: NavItem) => {
    if (!item.hasDropdown) return false;
    return item.dropdownItems?.some(subItem => isSectionActive(subItem.section)) || false;
  };

  return (
    <div className="h-full bg-[#F9FAFB] flex flex-col">
      <div className="p-6 pl-[30px]">
        <button onClick={() => onNavigate('dashboard', 'Dashboard')}>
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="TravelHomes Logo"
            />
          </div>
        </button>
      </div>

      <div className="flex-1 px-[1rem] py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            // Only highlight non-dropdown items if directly active
            const isActive = !item.hasDropdown && isSectionActive(item.section || '');

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
                          const isSubActive = isSectionActive(subItem.section);

                          return (
                            <div key={subItem.section} className="flex relative pl-10">
                              {/* Curved line for each item */}
                              <div className="absolute left-[22px] top-1/2 w-[10px] h-[1px] bg-gray-200"></div>

                              <button
                                onClick={() => onNavigate(subItem.section, item.name)}
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
                              </button>
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
              <button
                key={item.section}
                onClick={() => onNavigate(item.section || '', item.name)}
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
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <button
          className="flex items-center px-3 py-3 font-medium text-[#C13515] rounded-md hover:bg-gray-100 w-full text-left"
        >
          <Logout />
          <span className="ml-[12px]">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
} 