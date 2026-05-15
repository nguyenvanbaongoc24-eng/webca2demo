"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users } from "lucide-react";
import { Toggle } from "@/components/ui/Toggle";
import { useState } from "react";

export function Hero() {
  const [isIndividual, setIsIndividual] = useState(false);

  return (
    <section className="pt-32 pb-16 px-4 bg-white text-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-8">
          Bảng giá giải pháp chuyển đổi số<br />
          <span className="text-brand-blue">cho doanh nghiệp hiện đại</span>
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-slate rounded-full border border-gray-100">
            <ShieldCheck className="w-5 h-5 text-brand-blue" />
            <span className="font-bold text-brand-dark">Chứng chỉ ISO 27001</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-slate rounded-full border border-gray-100">
            <Users className="w-5 h-5 text-brand-gold" />
            <span>Tin dùng bởi <strong className="text-brand-dark">280.000+</strong> khách hàng</span>
          </div>
        </div>

        <Toggle 
          labelLeft="Doanh nghiệp" 
          labelRight="Cá nhân" 
          checked={isIndividual} 
          onChange={setIsIndividual}
        />
      </motion.div>
    </section>
  );
}
