'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/Badge';
import {
  Home,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BarChart3,
  Clock,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Students', href: '/dashboard/students', icon: Users },
  { name: 'Teachers', href: '/dashboard/teachers', icon: UserCheck },
  { name: 'Attendance', href: '/dashboard/attendance', icon: Calendar },
  { name: 'Timetable', href: '/dashboard/timetable', icon: Clock },
  { name: 'Exams & Grades', href: '/dashboard/exams', icon: GraduationCap },
  { name: 'Fees & Billing', href: '/dashboard/fees', icon: DollarSign },
  { name: 'Homework', href: '/dashboard/homework', icon: BookOpen },
  { name: 'Noticeboard', href: '/dashboard/notices', icon: Bell },
  { name: 'Reports & Analytics', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-white dark:bg-slate-900 h-screen border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 flex flex-col relative z-20 shrink-0 shadow-xs`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-600/20 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          {isOpen && (
            <div className="truncate">
              <h1 className="font-bold text-base text-slate-900 dark:text-white leading-tight truncate">
                Greenwood ERP
              </h1>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Admin Web Portal
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Summary Card */}
      {user && (
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-200 dark:border-indigo-800">
              {user.email.charAt(0).toUpperCase()}
            </div>
            {isOpen && (
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <Badge variant={user.role === 'ADMIN' ? 'danger' : 'info'} size="sm">
                    {user.role}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title={!isOpen ? item.name : undefined}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
              {isOpen && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle & Logout */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            {isOpen ? <ChevronLeft className="w-5 h-5 shrink-0" /> : <ChevronRight className="w-5 h-5 shrink-0" />}
            {isOpen && <span>Collapse Sidebar</span>}
          </div>
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors"
          title={!isOpen ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {isOpen && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}