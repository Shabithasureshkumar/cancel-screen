import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  Settings, 
  Bell, 
  Menu, 
  X 
} from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  onTabClick?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab = 'Appointment',
  onTabClick 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['Dashboard', 'Appointment', 'Patient', 'Reports', 'Chats', 'Billing'];

  const handleNav = (item: string) => {
    if (onTabClick) onTabClick(item);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full pt-4 pb-2">
      <div className="fluid-container fluid-page-padding flex items-center justify-between gap-3">
        {/* Left Navigation Pill - Desktop / Tablet */}
        <nav 
          className="hidden md:flex items-center bg-white rounded-full p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/80"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = item === activeTab;
            return (
              <button
                key={item}
                type="button"
                onClick={() => handleNav(item)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#6C5CE7] text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item === 'Appointment' && (
                  <Calendar className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                )}
                <span>{item}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Action Buttons */}
          <button
            type="button"
            aria-label="Search"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Search className="w-4 h-4 stroke-[2]" />
          </button>

          <button
            type="button"
            aria-label="Settings"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Settings className="w-4 h-4 stroke-[2]" />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors relative"
          >
            <Bell className="w-4 h-4 stroke-[2]" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
            <img
              src="/assets/david_brock.png"
              alt="David Brock"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-slate-200 shadow-xs"
              onError={(e) => {
                // Fallback avatar if asset is missing
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face';
              }}
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">David Brock</span>
              <span className="text-[10px] text-slate-500 font-medium">General Physician</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pb-2">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-lg flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item === activeTab;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleNav(item)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-[#6C5CE7] text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item === 'Appointment' && (
                    <Calendar className="w-4 h-4 text-white stroke-[2]" />
                  )}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
