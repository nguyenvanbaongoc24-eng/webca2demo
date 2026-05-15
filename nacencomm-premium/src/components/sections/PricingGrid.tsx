"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ShoppingCart, 
  ShieldCheck, 
  Star,
  Key,
  Smartphone,
  FileText,
  Layers,
  ChevronDown,
  ChevronUp,
  Mail,
  Headphones,
  ExternalLink,
  Menu
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SERVICE_TABS = [
  { id: "cks-token", name: "CKS USB Token", icon: Key },
  { id: "remote-signing", name: "Remote Signing", icon: Smartphone },
  { id: "hoa-don", name: "Hóa đơn điện tử", icon: FileText },
  { id: "ca2-platform", name: "CA2 Platform", icon: Layers },
];

const OTHER_PRODUCTS = [
  { id: "bhxh", name: "Bảo hiểm xã hội" },
  { id: "thuetncn", name: "Thuế TNCN" },
  { id: "stem", name: "STEM Học tập" },
  { id: "ekyc", name: "eKYC Xác thực" },
  { id: "security", name: "Security Pentest" },
  { id: "infra", name: "Tư vấn hạ tầng" },
];

const PRICING_DATA = {
  'cks-token': {
    dn: [
      { id: "1y", label: "1 Năm", duration: "12 tháng", price: "1.638.000", includes: ["01 CKS USB Token", "USB Token vật lý", "Hỗ trợ kỹ thuật"] },
      { id: "2y", label: "2 Năm", duration: "24 tháng", price: "2.189.000", includes: ["01 CKS USB Token", "USB Token vật lý", "Hỗ trợ kỹ thuật", "Tiết kiệm 15%"], popular: true },
      { id: "3y", label: "3 Năm", duration: "36 tháng", price: "3.100.000", includes: ["01 CKS USB Token", "USB Token vật lý", "Hỗ trợ kỹ thuật", "Tiết kiệm 23%"] },
    ],
    cn: [
      { id: "1y", label: "1 Năm", duration: "12 tháng", price: "979.000", includes: ["01 CKS USB Token", "USB Token vật lý"] },
      { id: "2y", label: "2 Năm", duration: "24 tháng", price: "1.638.000", includes: ["01 CKS USB Token", "USB Token vật lý", "Tiết kiệm 16%"], popular: true },
      { id: "3y", label: "3 Năm", duration: "36 tháng", price: "2.189.000", includes: ["01 CKS USB Token", "USB Token vật lý", "Tiết kiệm 25%"] },
    ]
  },
  'remote-signing': {
    theo_nam: {
      dn: [
        { id: "1y", label: "1 Năm", price: "Liên hệ", includes: ["01 CKS Remote Signing", "Không giới hạn lượt ký"] },
        { id: "2y", label: "2 Năm", price: "Liên hệ", includes: ["01 CKS Remote Signing", "Không giới hạn", "Tiết kiệm 15%"], popular: true },
        { id: "3y", label: "3 Năm", price: "Liên hệ", includes: ["01 CKS Remote Signing", "Không giới hạn", "Tiết kiệm 25%"] },
      ],
      cn: [
        { id: "1y", label: "1 Năm", price: "Liên hệ", includes: ["01 CKS Remote Signing", "Ký VNeID online"] },
        { id: "2y", label: "2 Năm", price: "Liên hệ", includes: ["01 CKS Remote Signing", "Ký VNeID", "Tiết kiệm"], popular: true },
        { id: "3y", label: "3 Năm", price: "Liên hệ", includes: ["01 CKS Remote Signing", "Ký VNeID", "Ưu đãi"] },
      ]
    },
    theo_luot: {
      dn: [
        { id: "50l", label: "50 lượt", price: "Liên hệ", includes: ["50 chữ ký", "Không thời hạn"] },
        { id: "100l", label: "100 lượt", price: "Liên hệ", includes: ["100 chữ ký", "Không thời hạn"], popular: true },
        { id: "500l", label: "500 lượt", price: "Liên hệ", includes: ["500 chữ ký", "Không thời hạn"] },
      ],
      cn: [
        { id: "20l", label: "20 lượt", price: "Liên hệ", includes: ["20 chữ ký", "Không thời hạn"] },
        { id: "50l", label: "50 lượt", price: "Liên hệ", includes: ["50 chữ ký", "Không thời hạn"], popular: true },
      ]
    }
  },
  'hoa-don': {
    dn: [
      { id: "300", label: "300 HĐ/năm", price: "Liên hệ", includes: ["300 hóa đơn", "Khởi nghiệp"] },
      { id: "1000", label: "1.000 HĐ/năm", price: "Liên hệ", includes: ["1.000 hóa đơn", "Phổ biến"], popular: true },
      { id: "3000", label: "3.000 HĐ/năm", price: "Liên hệ", includes: ["3.000 hóa đơn", "Enterprise"] },
    ],
    cn: null // Not applicable
  }
};

export function PricingGrid() {
  const [activeService, setActiveService] = useState("cks-token");
  const [customerType, setCustomerType] = useState("dn"); // dn or cn
  const [rsSubtab, setRsSubtab] = useState("theo_nam"); // theo_nam or theo_luot
  const [showDropdown, setShowDropdown] = useState(false);

  const getPlans = () => {
    if (activeService === "cks-token") return PRICING_DATA["cks-token"][customerType as "dn" | "cn"];
    if (activeService === "remote-signing") return PRICING_DATA["remote-signing"][rsSubtab as "theo_nam" | "theo_luot"][customerType as "dn" | "cn"];
    if (activeService === "hoa-don") return PRICING_DATA["hoa-don"][customerType as "dn" | "cn"];
    return null;
  };

  const plans = getPlans();

  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue px-4 py-1.5 rounded-full border border-blue-100 text-[10px] font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
            Bảng giá niêm yết
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight leading-tight">
            Giải pháp số tối ưu cho mọi quy mô doanh nghiệp
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-green-600 font-bold">
              <ShieldCheck className="w-4 h-4" /> ISO 27001
            </div>
            <div className="flex items-center gap-2 text-yellow-600 font-bold">
              <Star className="w-4 h-4 fill-yellow-600" /> Tin dùng bởi 280.000+ KH
            </div>
          </div>
        </div>

        {/* Service Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
          {SERVICE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveService(tab.id);
                setShowDropdown(false);
                if (tab.id === "hoa-don") setCustomerType("dn");
              }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-bold text-sm shrink-0",
                activeService === tab.id
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                  : "text-gray-500 hover:bg-gray-50"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeService === tab.id ? "text-white" : "text-gray-400")} />
              {tab.name}
            </button>
          ))}
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all",
                showDropdown && "bg-gray-100"
              )}
            >
              <Menu className="w-4 h-4" /> Sản phẩm khác <ChevronDown className={cn("w-3 h-3 transition-transform", showDropdown && "rotate-180")} />
            </button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-premium border border-gray-100 p-2 z-50 overflow-hidden"
                >
                  <div className="grid grid-cols-1 gap-1">
                    {OTHER_PRODUCTS.map((p) => (
                      <button key={p.id} className="w-full text-left p-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-brand-blue hover:text-white transition-all flex items-center justify-between group">
                        {p.name} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Remote Signing Subtabs */}
        {activeService === "remote-signing" && (
          <div className="flex justify-center gap-2 mb-10">
            {[
              { id: "theo_nam", name: "Theo năm" },
              { id: "theo_luot", name: "Theo lượt ký" }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setRsSubtab(st.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold border-2 transition-all",
                  rsSubtab === st.id
                    ? "bg-white border-brand-blue text-brand-blue"
                    : "border-gray-200 text-gray-400 hover:border-brand-blue/30"
                )}
              >
                {st.name}
              </button>
            ))}
          </div>
        )}

        {/* Filters: Type Toggle */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="bg-white p-1.5 rounded-2xl flex items-center gap-2 border border-gray-100 shadow-sm">
            {[
              { id: "dn", name: "Doanh nghiệp / Tổ chức", badge: activeService === "cks-token" ? "Phổ biến" : null },
              { id: "cn", name: "HKD / Cá nhân", badge: activeService === "remote-signing" ? "PHỔ BIẾN" : null },
            ].map((type) => (
              <button
                key={type.id}
                disabled={activeService === "hoa-don" && type.id === "cn"}
                onClick={() => setCustomerType(type.id)}
                className={cn(
                  "relative flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-bold transition-all",
                  customerType === type.id
                    ? "bg-brand-blue text-white shadow-lg"
                    : "text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <div className={cn("w-4 h-4 rounded-full border-2", customerType === type.id ? "border-white bg-white/20" : "border-gray-300")} />
                {type.name}
                {type.badge && (
                  <span className="bg-orange-500 text-[8px] text-white px-2 py-0.5 rounded-md ml-1 uppercase font-black">
                    {type.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans ? plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative flex flex-col p-8 rounded-3xl transition-all duration-500",
                plan.popular 
                  ? "bg-white shadow-premium border-2 border-brand-blue scale-105 z-20" 
                  : "bg-white border border-gray-100 hover:shadow-2xl hover:border-brand-blue/20 z-10"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-[10px] uppercase font-black px-6 py-2 rounded-full tracking-widest shadow-lg shadow-orange-500/20">
                  Gói khuyên dùng
                </div>
              )}

              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black text-brand-dark">{plan.label}</h3>
                  {plan.popular && <Star className="w-5 h-5 text-orange-500 fill-orange-500" />}
                </div>
                <div className="space-y-4 mb-10">
                  {plan.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-gray-500 font-medium leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-50">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-brand-dark tracking-tighter">{plan.price}</span>
                    <span className="text-sm font-bold text-gray-400">đ</span>
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Đã bao gồm VAT 10%</div>
                </div>
              </div>

              <Link href={`/register?pkg=${plan.id}&type=${customerType}`} className="w-full mt-auto">
                <Button 
                  variant={plan.popular ? "primary" : "outline"} 
                  className={cn(
                    "w-full py-5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all",
                    plan.popular 
                      ? "bg-brand-blue hover:bg-brand-blue/90 shadow-xl shadow-brand-blue/30" 
                      : "bg-blue-50/50 border-transparent text-brand-blue hover:bg-brand-blue hover:text-white"
                  )}
                >
                  <ShoppingCart className="w-4 h-4" /> MUA NGAY
                </Button>
              </Link>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <Mail className="w-12 h-12 text-brand-blue mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-bold text-brand-dark mb-2">Liên hệ nhận tư vấn</h3>
              <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">Vui lòng liên hệ hotline 1900 5454 07 để nhận báo giá chi tiết cho quy mô doanh nghiệp của bạn.</p>
              <Button className="bg-brand-blue text-white rounded-xl px-10 font-bold py-6">ĐĂNG KÝ TƯ VẤN</Button>
            </div>
          )}
        </div>

        {/* Trust Section */}
        <div className="mt-24 pt-12 border-t border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale">
            <img src="https://misa.com.vn/wp-content/themes/misa-main/assets/images/footer/iso.png" alt="ISO" className="h-8" />
            <img src="https://misa.com.vn/wp-content/themes/misa-main/assets/images/footer/tct.png" alt="TCT" className="h-8" />
            <div className="flex items-center gap-2 font-bold text-sm text-brand-dark">
              <ShieldCheck className="w-5 h-5" /> Nacencomm Security Certified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
