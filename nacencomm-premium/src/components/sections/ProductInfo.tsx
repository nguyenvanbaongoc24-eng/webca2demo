"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ShieldCheck, Headphones, FileCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductInfo() {
  return (
    <div id="products" className="overflow-hidden bg-white">
      
      {/* Section 1: Remote Signing */}
      <section className="py-24 border-b border-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 text-brand-blue font-black text-[10px] uppercase tracking-widest mb-4">
                <span className="w-6 h-[1px] bg-brand-blue" /> Remote Signing
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight mb-6 tracking-tighter">
                Ký số không giới hạn <br />
                <span className="text-brand-blue">Trên mọi thiết bị</span>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Giải pháp Remote Signing của CA2 cho phép bạn thực hiện các giao dịch ký số mọi lúc, mọi nơi mà không cần USB Token vật lý. Tích hợp hoàn hảo với ứng dụng VNeID.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Tích hợp xác thực sinh trắc học VNeID",
                  "Không cần cài đặt Driver hay thiết bị Token",
                  "Tuân thủ chuẩn bảo mật eIDAS quốc tế",
                  "Ký số hàng loạt tài liệu chỉ với 1 chạm"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold text-brand-dark">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                      <FileCheck className="w-3 h-3 text-brand-blue" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="rounded-full px-10 py-6 border-2 font-bold flex items-center gap-2 hover:bg-brand-blue hover:text-white transition-all group">
                Tìm hiểu thêm <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-premium border border-gray-100 p-2 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bbda483387f5?w=800" 
                  alt="Remote Signing"
                  className="w-full h-auto rounded-[2rem]"
                />
              </div>
              {/* Floating element */}
              <div className="absolute -bottom-10 -left-10 glass-effect p-6 rounded-3xl shadow-premium hidden md:block border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-brand-dark">eIDAS Level 3</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Certified Security</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Sign Platform */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-premium border border-gray-100 p-2 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" 
                  alt="Sign Platform"
                  className="w-full h-auto rounded-[2rem]"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-brand-blue font-black text-[10px] uppercase tracking-widest mb-4">
                <span className="w-6 h-[1px] bg-brand-blue" /> Sign Platform
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight mb-6 tracking-tighter">
                Nền tảng quản lý <br />
                <span className="text-brand-blue">Hợp đồng điện tử</span>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">
                CA2 Sign Platform là hệ sinh thái quản lý toàn bộ vòng đời của tài liệu điện tử, từ khâu khởi tạo, trình ký đến lưu trữ an toàn.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                {[
                  { name: "CA2 SSD", sub: "Documentation" },
                  { name: "CA2 eInvoice", sub: "E-invoice" },
                  { name: "CA2 Sign", sub: "Sign Platform" },
                ].map((item) => (
                  <div key={item.name} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center mb-4">
                      <div className="w-2.5 h-2.5 bg-brand-blue rounded-full animate-pulse" />
                    </div>
                    <div className="text-xs font-black text-brand-dark mb-1">{item.name}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.sub}</div>
                  </div>
                ))}
              </div>

              <Button variant="primary" className="rounded-full px-10 py-6 font-bold shadow-glow-blue flex items-center gap-2 group">
                Khám phá Sign Platform <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Value Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 tracking-tighter">
              Tại sao chọn <span className="text-brand-blue">CA2 Nacencomm?</span>
            </h2>
            <p className="text-gray-500 font-medium">Chúng tôi không chỉ cung cấp dịch vụ, chúng tôi xây dựng sự tin cậy bền vững cho doanh nghiệp của bạn.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Bảo mật tuyệt đối", 
                desc: "Hệ thống đáp ứng các tiêu chuẩn bảo mật quốc tế khắt khe nhất, bảo vệ dữ liệu 24/7.",
                icon: ShieldCheck,
                color: "blue"
              },
              { 
                title: "Hỗ trợ tận tâm", 
                desc: "Đội ngũ chuyên gia kỹ thuật giàu kinh nghiệm luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào.",
                icon: Headphones,
                color: "red"
              },
              { 
                title: "Pháp lý vững chắc", 
                desc: "CA2 được cấp phép bởi Bộ Thông tin & Truyền thông, đảm bảo giá trị pháp lý cho mọi giao dịch.",
                icon: FileCheck,
                color: "emerald"
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-premium-hover transition-all duration-500 group"
              >
                <div className={cn(
                  "w-16 h-16 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-lg shadow-blue-500/5",
                  feature.color === "blue" ? "bg-blue-50 text-brand-blue" : 
                  feature.color === "red" ? "bg-red-50 text-brand-red" : "bg-emerald-50 text-emerald-500"
                )}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-brand-dark mb-4">{feature.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
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
