"use client";

import { motion } from "framer-motion";
import { Zap, Shield, FileText, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const COMBOS = [
  {
    title: "Gói Tăng Tốc",
    subtitle: "CKS Token + Hóa đơn điện tử",
    discount: "-35%",
    originalPrice: "1.638.000 đ",
    gradient: "from-indigo-600 to-purple-600",
    icons: [Zap, FileText]
  },
  {
    title: "Gói An Tâm",
    subtitle: "CKS Token + BHXH phần mềm",
    discount: "-30%",
    originalPrice: "1.390.000 đ",
    gradient: "from-blue-600 to-cyan-600",
    icons: [Shield, CreditCard]
  },
  {
    title: "Gói Toàn Diện",
    subtitle: "Remote Signing + Hóa đơn",
    discount: "-60%",
    originalPrice: "1.120.000 đ",
    gradient: "from-blue-900 to-blue-700",
    icons: [Zap, FileText]
  }
];

export function ComboSection() {
  return (
    <section className="py-24 px-4 bg-brand-slate overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">Combo Ưu đãi Đặc biệt</h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Tiết kiệm chi phí tối đa khi đăng ký các gói giải pháp kết hợp. Phù hợp cho doanh nghiệp mới thành lập hoặc cần số hóa toàn diện.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {COMBOS.map((combo, index) => (
            <motion.div
              key={combo.title + index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "min-w-[350px] p-8 rounded-3xl text-white relative shadow-2xl bg-gradient-to-br",
                combo.gradient
              )}
            >
              <span className="absolute top-6 right-6 bg-brand-gold text-brand-dark font-bold px-3 py-1 rounded-full text-sm shadow-md">
                {combo.discount}
              </span>
              
              <div className="flex items-center gap-3 mb-6">
                {combo.icons.map((Icon, i) => (
                  <div key={i} className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-bold mb-1">{combo.title}</h4>
              <p className="text-white/80 font-medium mb-6">{combo.subtitle}</p>
              
              <div className="text-sm text-white/60 mb-2">Giá gốc: <span className="line-through">{combo.originalPrice}</span></div>
              <button className="bg-white text-brand-blue font-bold px-6 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                Xem chi tiết
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
