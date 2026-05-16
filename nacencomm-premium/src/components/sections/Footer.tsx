"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img 
                src="https://www.nacencomm.com.vn/wp-content/uploads/2021/04/logo-nacencomm.png" 
                alt="Nacencomm" 
                className="h-10 brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Đơn vị cung cấp dịch vụ chứng thực chữ ký số công cộng hàng đầu Việt Nam, đồng hành cùng sự nghiệp chuyển đổi số quốc gia.
            </p>
            <div className="flex gap-4">
              {/* Fake Social Icons */}
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <div className="w-4 h-4 bg-white/20 rounded-sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-blue-400">Giải pháp số</h4>
            <ul className="space-y-4">
              {["Chữ ký số USB Token", "Chữ ký số từ xa", "Hợp đồng điện tử", "Hóa đơn điện tử", "Bảo hiểm xã hội"].map(item => (
                <li key={item}>
                  <Link href="/pricing" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-blue-400">Liên kết nhanh</h4>
            <ul className="space-y-4">
              {["Về chúng tôi", "Tin tức & Sự kiện", "Trung tâm hỗ trợ", "Chính sách bảo mật", "Điều khoản dịch vụ"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-blue-400">Liên hệ</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  Tầng 12, Tòa nhà 123 Đào Duy Anh, <br />Phường 9, Quận Phú Nhuận, TP.HCM
                </p>
              </div>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="font-bold">1900 545 407</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="font-bold">support@ca2.com.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area: Certs & Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap items-center gap-8 opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/ISO_Logo_%28Redened%29.svg/1200px-ISO_Logo_%28Redened%29.svg.png" alt="ISO" className="h-10 grayscale invert" />
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-[10px] font-black uppercase">Licensed by</p>
                <p className="text-xs font-black">MIC VIETNAM</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-gray-500 text-xs font-bold mb-2">
              © 2026 Nacencomm JSC. All rights reserved.
            </p>
            <p className="text-[10px] text-gray-600 max-w-sm">
              Giấy phép số 325/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 15/07/2020.
            </p>
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
