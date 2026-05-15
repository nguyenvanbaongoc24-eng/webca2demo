"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-24 px-4 bg-gradient-to-r from-brand-blue to-brand-dark text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 L100 0 L100 100 Z" fill="white" />
        </svg>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 leading-tight">
          Sẵn sàng chuyển đổi số<br className="md:hidden" /> ngay hôm nay?
        </h2>
        <Button variant="red" size="lg" className="rounded-full px-12 shadow-2xl hover:scale-110">
          Bắt đầu ngay
        </Button>
        <p className="mt-8 text-white/60 text-sm font-medium">
          Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn.
        </p>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400 py-16 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6 text-white">
            <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center font-bold">N</div>
            <span className="text-xl font-extrabold uppercase tracking-tighter">Nacencomm</span>
          </div>
          <p className="text-sm leading-relaxed">
            Tiên phong cung cấp các giải pháp chữ ký số và chuyển đổi số hàng đầu tại Việt Nam. Đơn vị TOP 3 CA thị trường nội địa.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Sản phẩm</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Chữ ký số Token</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Remote Signing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hóa đơn điện tử</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Bảo hiểm xã hội</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Tài nguyên</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog chuyển đổi số</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tài liệu API</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Quy chế chứng thực</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Liên hệ</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li>Hotline: 1900 5454 07</li>
            <li>Email: ca2@nacencomm.vn</li>
            <li>Địa chỉ: Tầng 5, Số 2 Chùa Bộc, Đống Đa, Hà Nội</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Nacencomm. Tất cả quyền được bảo lưu. Thiết kế bởi Nacencomm Premium Design System.
      </div>
    </footer>
  );
}
