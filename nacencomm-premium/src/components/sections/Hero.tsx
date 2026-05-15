"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight, PlayCircle } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden bg-[#0A1128]">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full translate-y-1/4 -translate-x-1/4" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Nền tảng chuyển đổi số toàn diện cho doanh nghiệp Việt
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-xl">
              Tăng tốc số hóa, bảo mật hàng đầu và tối ưu hiệu quả kinh doanh cùng giải pháp chữ ký số và an ninh mạng từ Nacencomm.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 bg-white text-[#0A1128] hover:bg-gray-100">
                Khám phá nền tảng
              </Button>
              <Button variant="red" size="lg" className="rounded-full px-8 flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> Xem demo sản phẩm
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 glass-card">
              <Image 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                alt="Digital Security Platform"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/30 blur-2xl rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/30 blur-2xl rounded-full" />
          </motion.div>

        </div>
      </div>

      {/* Logo Row Mockup */}
      <div className="container mx-auto px-4 mt-24 border-t border-white/5 pt-12">
        <div className="flex flex-wrap justify-between items-center opacity-30 grayscale gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-24 h-12 bg-white/20 rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
}
