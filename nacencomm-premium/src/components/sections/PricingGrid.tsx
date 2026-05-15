"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Shield, 
  Zap, 
  Crown, 
  ShoppingCart, 
  ShieldCheck, 
  Star,
  Key,
  Smartphone,
  FileText,
  Layers
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SERVICE_TABS = [
  { id: "usb", name: "CKS USB Token", icon: Key },
  { id: "remote", name: "Remote Signing", icon: Smartphone },
  { id: "invoice", name: "Hóa đơn điện tử", icon: FileText },
  { id: "platform", name: "CA2 Platform", icon: Layers },
];

const DURATION_PLANS = [
  { id: "1y", name: "1 NĂM", price: "2.400.000", rawPrice: 2400000 },
  { id: "2y", name: "2 NĂM", price: "3.500.000", rawPrice: 3500000 },
  { id: "3y", name: "3 NĂM", price: "4.400.000", rawPrice: 4400000, popular: true },
  { id: "4y", name: "4 NĂM", price: "5.200.000", rawPrice: 5200000 },
  { id: "5y", name: "5 NĂM", price: "5.900.000", rawPrice: 5900000 },
];

export function PricingGrid() {
  const [activeService, setActiveService] = useState("usb");
  const [customerType, setCustomerType] = useState("dn"); // dn or cn

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue px-4 py-1.5 rounded-full border border-blue-100 text-[10px] font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
            Bảng giá niêm yết
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6 tracking-tight leading-tight">
            Bảng giá giải pháp chuyển đổi số cho doanh nghiệp hiện đại
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <ShieldCheck className="w-4 h-4" /> ISO 27001
            </div>
            <div className="flex items-center gap-2 text-yellow-600 font-medium">
              <Star className="w-4 h-4 fill-yellow-600" /> Tin dùng bởi 280.000+ khách hàng
            </div>
          </div>
        </div>

        {/* Service Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {SERVICE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveService(tab.id)}
              className={cn(
                "flex items-center gap-3 px-6 py-3.5 rounded-2xl border-2 transition-all duration-300 font-bold text-sm",
                activeService === tab.id
                  ? "bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/20"
                  : "bg-white border-gray-100 text-gray-500 hover:border-brand-blue/30"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeService === tab.id ? "text-white" : "text-gray-400")} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Filters: Type Toggle */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="bg-brand-slate p-1.5 rounded-2xl flex items-center gap-2 border border-gray-100 shadow-inner">
            {[
              { id: "dn", name: "Doanh nghiệp / Tổ chức", badge: "Phổ biến" },
              { id: "cn", name: "HKD / Cá nhân" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setCustomerType(type.id)}
                className={cn(
                  "relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                  customerType === type.id
                    ? "bg-white text-brand-blue shadow-md"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                {customerType === type.id && (
                  <div className="w-4 h-4 rounded-full border-4 border-brand-blue" />
                )}
                {customerType !== type.id && (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                )}
                {type.name}
                {type.badge && (
                  <span className="bg-yellow-400 text-[8px] text-white px-2 py-0.5 rounded-md ml-1 uppercase">
                    {type.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {DURATION_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "group relative flex flex-col p-6 rounded-2xl transition-all duration-300",
                plan.popular 
                  ? "bg-white shadow-2xl border-2 border-brand-blue scale-105 z-20" 
                  : "bg-white border border-gray-100 hover:shadow-xl hover:border-brand-blue/20 z-10"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 -translate-y-full bg-orange-500 text-white text-[10px] uppercase font-bold py-2 text-center rounded-t-xl tracking-widest">
                  Gói khuyên dùng
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-brand-dark mb-6">{plan.name}</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-2 text-xs text-gray-500 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    <span>01 CKS Remote Signing</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-500 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    <span>01 CKS USB Token</span>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="text-2xl font-black text-brand-dark mb-1">{plan.price}</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">VND / Gói</div>
                </div>
              </div>

              <Link href={`/register?pkg=${plan.id}&type=${customerType}`} className="w-full mt-6">
                <Button 
                  variant={plan.popular ? "primary" : "outline"} 
                  className={cn(
                    "w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all",
                    plan.popular 
                      ? "bg-brand-blue hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20" 
                      : "bg-blue-50/50 border-transparent text-brand-blue hover:bg-brand-blue hover:text-white"
                  )}
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Mua ngay
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 text-sm mb-6 italic">Cần tư vấn giải pháp phù hợp cho doanh nghiệp lớn? Gọi ngay 1900 5454 07</p>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-12 bg-brand-slate rounded-2xl flex items-center justify-center grayscale opacity-50">
              <img src="https://misa.com.vn/wp-content/themes/misa-main/assets/images/footer/iso.png" alt="ISO" className="h-6" />
            </div>
            <div className="w-12 h-12 bg-brand-slate rounded-2xl flex items-center justify-center grayscale opacity-50">
              <img src="https://misa.com.vn/wp-content/themes/misa-main/assets/images/footer/tct.png" alt="TCT" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
