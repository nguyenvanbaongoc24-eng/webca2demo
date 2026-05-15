"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ShieldCheck, Headphones, FileCheck } from "lucide-react";
import Image from "next/image";

export function ProductInfo() {
  return (
    <div id="products" className="space-y-32 py-24 bg-white overflow-hidden">
      
      {/* Section 1: Remote Signing */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl font-extrabold text-brand-dark leading-tight mb-6">
              CA2 Remote Signing toàn Sign platform
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Tăng tốc số hóa, bảo mật hàng đầu và tối ưu hiệu quả kinh doanh cùng giải pháp chữ ký số và an ninh mạng từ Nacencomm.
            </p>
            <Button variant="primary" className="rounded-full px-8 flex items-center gap-2">
              Tìm hiểu thêm <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1551288049-bbda483387f5?q=80&w=2070&auto=format&fit=crop" 
                alt="Remote Signing"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Sign Platform */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                alt="Sign Platform"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold text-brand-dark leading-tight mb-6">
              CA2 Sign Platform
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-10">
              CA2 Sign platform là nền tảng tối ưu hóa hình ảnh kinh doanh cùng các chữ ký số của cá nhân, doanh nghiệp nhỏ và cả tập đoàn điện.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { name: "CA2 SSD", sub: "Documentation" },
                { name: "CA2 eInvoice", sub: "E-invoice" },
                { name: "CA2 Sign", sub: "Sign Platform" },
              ].map((item) => (
                <div key={item.name} className="p-4 bg-brand-slate rounded-xl border border-gray-100 text-center">
                  <div className="w-8 h-8 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-2 h-2 bg-brand-blue rounded-full" />
                  </div>
                  <div className="text-[10px] font-bold text-brand-dark truncate">{item.name}</div>
                  <div className="text-[8px] text-gray-400">{item.sub}</div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="rounded-full px-8 flex items-center gap-2">
              Tìm hiểu thêm <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Features Grid */}
      <section className="bg-brand-slate py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-dark mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { 
                title: "Bảo mật tối đa", 
                desc: "Bảo mật tối đa độ tin cậy, hòa mình vào với một cách bài bản nhất trên nền tảng.",
                icon: ShieldCheck
              },
              { 
                title: "Hỗ trợ 24/7 chuyên nghiệp", 
                desc: "Hỗ trợ 24/7 chuyên nghiệp luôn luôn luôn sẵn sàng giúp đỡ.",
                icon: Headphones
              },
              { 
                title: "Tuân thủ pháp lý cao nhất", 
                desc: "Tuân thủ pháp lý cao nhất mọi mặt pháp lý và quy định một cách minh bạch, rõ ràng.",
                icon: FileCheck
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
