"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "#products" },
  { name: "Bảng giá", href: "/pricing" },
  { name: "Giải pháp", href: "#solutions" },
  { name: "Hỗ trợ", href: "#support" },
  { name: "Liên hệ", href: "#contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNKVJU9uJIENr9jEFc_GQQ-46GM4rAFCDfXIQXkspy8N61hqZzWk-uuAuS-cIsQY7e-d14T6qcVdScxvrpfr8QTJz4FPZou1lwJmZVxrEMzS4WLnesyeyJAtJoIYU2Aa_z9PqZK4LMSi63m4q76PSU0U6Ez7qkSiqX3sNMN_yZxBUViIh4r8CF4q6OxKfJMrNw1eFtVM7ERAi-1a8V8pvt4wq6y9pDaJuK7tHdMzQ-cgBN7GqUnrIrwo7glXsJlPEsjpM9CybrbFM" 
            alt="Nacencomm Logo" 
            className="h-9 w-auto"
          />
          <span className="text-xl font-extrabold text-brand-dark tracking-tight">Nacencomm</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-brand-blue",
                pathname === item.href ? "text-brand-blue" : "text-gray-600"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/register">
            <Button variant="red" size="md" className="rounded-full px-6">
              Đăng ký ngay
            </Button>
          </Link>
          <Button variant="outline" size="md" className="rounded-full px-6 hidden sm:flex items-center gap-2">
            <User className="w-4 h-4" /> Đăng nhập
          </Button>
        </div>
      </nav>
    </header>
  );
}
