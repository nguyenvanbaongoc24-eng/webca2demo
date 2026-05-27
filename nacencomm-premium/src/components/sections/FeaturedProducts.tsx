"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
  { 
    title: "USB Token", 
    desc: "Chữ ký số công cộng truyền thống, an toàn tuyệt đối với thiết bị phần cứng.", 
    img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800", 
    badge: "Phổ biến",
    href: "/pricing"
  },
  { 
    title: "Remote Signing", 
    desc: "Ký số từ xa không cần Token, tích hợp VNeID, ký mọi lúc mọi nơi trên di động.", 
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800", 
    badge: "Hot",
    href: "/pricing"
  },
  { 
    title: "Hóa đơn điện tử", 
    desc: "Giải pháp hóa đơn tuân thủ NĐ 123/2020, tự động hóa quy trình kế toán.", 
    img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800", 
    badge: "Smart",
    href: "/pricing"
  },
  { 
    title: "BHXH Điện tử", 
    desc: "Kê khai bảo hiểm xã hội trực tuyến nhanh chóng, hỗ trợ 24/7.", 
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800", 
    badge: "Fast",
    href: "/pricing"
  },
  { 
    title: "eKYC", 
    desc: "Định danh điện tử khách hàng bằng AI, xác thực sinh trắc học an toàn.", 
    img: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800", 
    badge: "Secure",
    href: "/pricing"
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4 tracking-tight">
              Hệ sinh thái <span className="text-brand-blue">Giải pháp số</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Nacencomm cung cấp đầy đủ các công cụ để doanh nghiệp chuyển đổi số toàn diện và an toàn.
            </p>
          </div>
          <Link href="/pricing" className="group flex items-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all">
            Xem tất cả sản phẩm <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 transition-all duration-500 hover:shadow-premium-hover hover:border-brand-blue/20",
                i === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"
              )}
            >
              <div className={cn(
                "relative aspect-[16/9] overflow-hidden",
                i === 0 ? "md:aspect-[21/9]" : "aspect-[16/10]"
              )}>
                <img 
                  src={product.img} 
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-widest">
                    {product.badge}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-blue transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {product.desc}
                </p>
                <Link href={product.href}>
                  <button className="text-xs font-bold text-brand-blue flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Tìm hiểu thêm <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
