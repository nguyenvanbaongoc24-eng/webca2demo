"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, User, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PRICING_PLANS = [
  {
    name: "1 Năm",
    price: "1.638.000 đ",
    icon: Calendar,
    popular: false,
    features: [
      "Chứng thư số công cộng CA2 (1 Năm)",
      "Tặng kèm 01 thiết bị USB Token",
      "Hỗ trợ kê khai thuế, BHXH, Hải quan 24/7",
      "Bảo hành thiết bị trọn đời",
    ]
  },
  {
    name: "2 Năm",
    price: "2.189.000 đ",
    icon: User,
    popular: true,
    features: [
      "Chứng thư số công cộng CA2 (2 Năm)",
      "Tặng kèm 01 thiết bị USB Token",
      "Ưu tiên hỗ trợ kỹ thuật tận nơi",
      "Tặng gói hóa đơn điện tử ưu đãi",
      "Hỗ trợ kê khai thuế, BHXH, Hải quan 24/7",
    ]
  },
  {
    name: "3 Năm",
    price: "3.100.000 đ",
    icon: Users,
    popular: false,
    features: [
      "Chứng thư số công cộng CA2 (3 Năm)",
      "Tặng kèm 01 thiết bị USB Token",
      "Hỗ trợ kê khai thuế, BHXH, Hải quan 24/7",
      "Tặng gói BHXH phần mềm 1 năm",
      "Chiết khấu cao cho dịch vụ đi kèm",
    ]
  }
];

export function PricingGrid() {
  return (
    <section className="pb-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_PLANS.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={cn(
              "relative flex flex-col items-center p-8 rounded-2xl border transition-all duration-300",
              plan.popular 
                ? "border-brand-red shadow-2xl scale-105 z-10 bg-white" 
                : "border-gray-100 shadow-sm hover:shadow-xl bg-white"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 rotate-12">
                <span className="bg-brand-gold text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                  Phổ biến nhất
                </span>
              </div>
            )}

            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
              plan.popular ? "bg-brand-red/10 text-brand-red" : "bg-brand-blue/10 text-brand-blue"
            )}>
              <plan.icon className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-brand-dark mb-2">{plan.name}</h3>
            <div className="text-3xl font-extrabold text-brand-blue mb-1">{plan.price}</div>
            <p className="text-xs text-gray-400 mb-8 font-medium italic">Đã bao gồm VAT 10%</p>

            <Button 
              variant={plan.popular ? "red" : "primary"} 
              className="w-full mb-8 py-6 rounded-xl"
            >
              Mua ngay
            </Button>

            <ul className="w-full space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle2 className={cn("w-5 h-5 shrink-0", plan.popular ? "text-brand-red" : "text-green-500")} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
