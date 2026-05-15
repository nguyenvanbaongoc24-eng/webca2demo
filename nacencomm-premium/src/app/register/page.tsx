"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ShoppingCart, 
  User, 
  FileText, 
  CreditCard, 
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Download,
  Info
} from "lucide-react";

// Mock Data
const PACKAGES = {
  "1y": { name: "1 năm", price: "2.400.000", rawPrice: 2400000 },
  "2y": { name: "2 năm", price: "3.500.000", rawPrice: 3500000 },
  "3y": { name: "3 năm", price: "4.400.000", rawPrice: 4400000 },
  "4y": { name: "4 năm", price: "5.200.000", rawPrice: 5200000 },
  "5y": { name: "5 năm", price: "5.900.000", rawPrice: 5900000 },
};

const UPSELL_ITEMS = [
  { id: "einvoice", name: "Bộ giải pháp tài chính kế toán", price: "2.950.000", icon: "📊" },
  { id: "meinvoice", name: "meInvoice Doanh nghiệp", price: "250.000", icon: "📑" },
  { id: "bhxh", name: "Bảo hiểm xã hội", price: "240.000", icon: "🏥" },
  { id: "thuetncn", name: "Thuế TNCN", price: "240.000", icon: "⚖️" },
];

function RegisterForm() {
  const searchParams = useSearchParams();
  const pkgId = searchParams.get("pkg") || "2y";
  const type = searchParams.get("type") || "dn";
  const selectedPkg = PACKAGES[pkgId as keyof typeof PACKAGES] || PACKAGES["2y"];

  const [quantity, setQuantity] = useState(1);
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="pt-32 pb-20 px-4 bg-[#F4F7FA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-[#1E293B] mb-8">
          Thông tin mua hàng Bộ giải pháp Ký số cho {type === "dn" ? "Doanh nghiệp" : "Cá nhân"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content: Steps */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Giỏ hàng */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-6 flex items-center gap-4 border-b border-gray-50 bg-white">
                <div className="w-8 h-8 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="text-lg font-bold text-[#1E293B]">Giỏ hàng</h2>
              </div>
              <div className="p-6">
                <table className="w-full text-left text-sm mb-6">
                  <thead className="text-gray-400 font-medium">
                    <tr className="border-b border-gray-100">
                      <th className="pb-4">Gói sản phẩm/Dịch vụ</th>
                      <th className="pb-4 text-center">Đơn vị tính</th>
                      <th className="pb-4 text-center">Số lượng</th>
                      <th className="pb-4 text-right">Đơn giá (VND)</th>
                      <th className="pb-4 text-right">Thành tiền (VND)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50 last:border-0 group">
                      <td className="py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-[#1E293B]">Bộ giải pháp Ký số cho {type === "dn" ? "Doanh nghiệp" : "Cá nhân"}</div>
                            <div className="text-xs text-brand-blue flex items-center gap-2 mt-1">
                              {selectedPkg.name} <button className="hover:underline flex items-center gap-1"><ArrowLeft className="w-2 h-2 rotate-180" /> Chỉnh sửa</button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 text-center text-gray-500">Gói</td>
                      <td className="py-6 text-center">
                        <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-gray-50 text-gray-400"><Minus className="w-3 h-3" /></button>
                          <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                          <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-gray-50 text-gray-400"><Plus className="w-3 h-3" /></button>
                        </div>
                      </td>
                      <td className="py-6 text-right font-medium">{selectedPkg.price}</td>
                      <td className="py-6 text-right">
                        <div className="font-bold text-[#1E293B]">{selectedPkg.price}</div>
                        <button className="text-red-400 hover:text-red-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3.5 h-3.5 ml-auto" /></button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Upsell Items */}
                <div className="mt-12 pt-8 border-t border-gray-50">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-bold text-gray-500">Sản phẩm thường được mua cùng</h3>
                    <button className="text-xs text-brand-blue font-bold">Xem tất cả</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {UPSELL_ITEMS.map((item) => (
                      <div key={item.id} className="p-4 rounded-xl border border-gray-100 bg-[#F8FAFC] hover:border-brand-blue/30 transition-all cursor-pointer group">
                        <div className="text-2xl mb-3">{item.icon}</div>
                        <div className="text-[10px] font-bold text-gray-700 leading-snug mb-2 line-clamp-2 h-7">{item.name}</div>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="text-[10px] text-gray-400">Từ: <span className="font-bold text-gray-600">{item.price} VND</span></div>
                          <div className="w-6 h-6 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all shadow-sm">
                            <Plus className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Thông tin người mua hàng */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 flex items-center gap-4 border-b border-gray-50">
                <div className="w-8 h-8 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <h2 className="text-lg font-bold text-[#1E293B]">Thông tin người mua hàng</h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Nhập họ và tên" className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="Nhập số điện thoại" className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email nhận mã kích hoạt và giấy phép sử dụng <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="Nhập địa chỉ email" className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" />
                </div>
              </div>
            </div>

            {/* Step 3: Thông tin xuất hóa đơn */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 flex items-center gap-4 border-b border-gray-50">
                <div className="w-8 h-8 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <h2 className="text-lg font-bold text-[#1E293B]">Thông tin xuất hóa đơn</h2>
              </div>
              <div className="p-8 space-y-8">
                <div className="flex gap-8">
                  {["Doanh nghiệp", "Hộ kinh doanh", "Cá nhân"].map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-brand-blue transition-all">
                        {t === "Doanh nghiệp" && <div className="w-2 h-2 bg-brand-blue rounded-full" />}
                      </div>
                      <span className="text-sm font-medium text-gray-600">{t}</span>
                    </label>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mã số thuế <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Nhập mã số thuế" className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tên đơn vị <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Nhập tên đơn vị" className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Địa chỉ đầy đủ <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Số nhà, tên đường..." className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar: Order Summary & Payment */}
          <aside className="lg:col-span-1 space-y-6 sticky top-28">
            <div className="bg-white rounded-xl shadow-premium border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-[#F8FAFC]">
                <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2">
                  Thông tin tài nguyên (2 Sản phẩm)
                </h3>
                <ChevronRight className="w-4 h-4 text-gray-300 rotate-90" />
              </div>
              <div className="p-5 space-y-6">
                <div className="space-y-3">
                  <div className="text-[10px] font-black text-gray-900 uppercase">MISA eSign – Chữ ký số từ xa</div>
                  <div className="flex justify-between text-xs text-gray-500"><span>CTS</span><span className="font-bold">1</span></div>
                  <div className="flex justify-between text-xs text-gray-500"><span>Thời hạn sử dụng</span><span className="font-bold">{selectedPkg.name}</span></div>
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-50">
                  <div className="text-[10px] font-black text-gray-900 uppercase">MISA eSign – Chữ ký số USB Token</div>
                  <div className="flex justify-between text-xs text-gray-500"><span>CTS</span><span className="font-bold">1</span></div>
                  <div className="flex justify-between text-xs text-gray-500"><span>Thời hạn sử dụng</span><span className="font-bold">{selectedPkg.name}</span></div>
                </div>
              </div>

              <div className="p-5 bg-blue-50/30 space-y-4 border-t border-gray-100">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mã phiếu quà tặng/Mã giới thiệu</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Nhập mã" className="flex-1 p-2 bg-white border border-gray-200 rounded-lg text-sm outline-none" />
                    <button className="px-4 py-2 bg-white border border-blue-200 text-brand-blue rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">Áp dụng</button>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phương thức thanh toán</div>
                <div className="space-y-3">
                  {[
                    { id: "ck", name: "Chuyển khoản", icon: "🏦" },
                    { id: "atm", name: "Thẻ ATM nội địa", icon: "💳" },
                    { id: "qt", name: "Thẻ quốc tế", icon: "🌐" },
                    { id: "vdt", name: "Ví điện tử", icon: "📱" },
                  ].map((p) => (
                    <label key={p.id} className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:bg-gray-50 cursor-pointer transition-all group">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-brand-blue transition-all">
                        {p.id === "ck" && <div className="w-2 h-2 bg-brand-blue rounded-full" />}
                      </div>
                      <span className="text-xs font-medium text-gray-600">{p.name}</span>
                    </label>
                  ))}
                </div>
                <div className="p-3 bg-green-50 rounded-lg flex items-center gap-3">
                  <div className="text-[10px] font-bold text-green-700">Hỗ trợ bởi cổng thanh toán <span className="text-blue-600">JetPay</span></div>
                </div>
              </div>

              <div className="p-5 bg-white border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-end">
                  <div className="text-xs text-gray-500 font-medium leading-relaxed">
                    Bộ giải pháp Ký số cho Doanh nghiệp
                  </div>
                  <div className="text-sm font-bold text-gray-900">{selectedPkg.price}</div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="text-sm font-bold text-[#1E293B]">Tổng thanh toán</div>
                  <div className="text-xl font-black text-[#1E293B]">{selectedPkg.price}</div>
                </div>

                <label className="flex gap-3 cursor-pointer mt-4">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-[10px] text-gray-500 leading-relaxed">
                    Tôi đồng ý với <span className="text-brand-blue font-bold">Thỏa thuận mua hàng</span> và <span className="text-brand-blue font-bold">Chính sách bảo vệ dữ liệu cá nhân</span>
                  </span>
                </label>

                <Button size="lg" className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-6 rounded-xl shadow-xl shadow-brand-blue/20">
                  Mua hàng
                </Button>
                
                <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-brand-blue hover:underline">
                  <Download className="w-3.5 h-3.5" /> Tải xuống báo giá
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
              <Info className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-800 leading-relaxed">
                Sau khi thanh toán thành công, hệ thống sẽ tự động gửi thông tin kích hoạt dịch vụ qua Email và SĐT của bạn trong vòng 5-10 phút.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<div className="pt-40 text-center">Đang tải hồ sơ...</div>}>
        <RegisterForm />
      </Suspense>
      <Footer />
    </main>
  );
}
