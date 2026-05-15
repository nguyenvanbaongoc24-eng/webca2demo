"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, Zap, Crown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PRICING_PLANS = [
  {
    id: "co-ban",
    name: "Gói Cơ Bản",
    price: "199.000đ",
    unit: "/tháng",
    icon: Zap,
    features: [
      "50 hợp đồng/tháng",
      "Ký số từ xa",
      "Hỗ trợ cơ bản"
    ]
  },
  {
    id: "pho-bien",
    name: "Gói Phổ Biến",
    price: "299.000đ",
    unit: "/tháng",
    icon: Shield,
    popular: true,
    badge: "Được đề xuất",
    features: [
      "Không giới hạn hợp đồng",
      "Tích hợp API",
      "Hỗ trợ ưu tiên",
      "Bảo mật nâng cao"
    ]
  },
  {
    id: "nang-cao",
    name: "Gói Nâng Cao",
    price: "499.000đ",
    unit: "/tháng",
    icon: Crown,
    features: [
      "Không giới hạn hợp đồng",
      "Tích hợp API",
      "Quản lý tập trung",
      "Đào tạo chuyên sâu",
      "Bảo mật tối đa"
    ]
  }
];

export function PricingGrid() {
  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Bảng giá dịch vụ</h2>
          <p className="text-gray-500">Lựa chọn gói giải pháp phù hợp nhất với quy mô và nhu cầu của doanh nghiệp bạn.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl transition-all duration-300",
                plan.popular 
                  ? "bg-white shadow-2xl border-2 border-brand-blue scale-105 z-20" 
                  : "bg-white border border-gray-100 hover:shadow-xl z-10"
              )}
            >
              {plan.popular && plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-[10px] uppercase font-bold px-4 py-1.5 rounded-full tracking-widest shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-brand-dark mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-brand-dark">{plan.price}</span>
                  <span className="text-gray-400 font-medium">{plan.unit}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={`/register?pkg=${plan.id}`} className="w-full">
                <Button 
                  variant={plan.popular ? "primary" : "outline"} 
                  className={cn(
                    "w-full py-6 rounded-xl font-bold",
                    plan.popular ? "bg-brand-blue hover:bg-brand-blue/90" : "border-gray-200 text-gray-400"
                  )}
                >
                  Đăng ký ngay
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
