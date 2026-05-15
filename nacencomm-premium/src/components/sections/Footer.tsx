"use client";

import Link from "next/image";

export function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-400">
            © 2026 Nacencomm. Tất cả quyền được bảo vệ.
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-sm text-gray-400 hover:text-brand-blue transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="text-sm text-gray-400 hover:text-brand-blue transition-colors">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// CTA component removed for now as it's not in the screenshot
export function CTA() {
  return null;
}
