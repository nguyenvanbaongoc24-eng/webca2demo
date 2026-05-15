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
  CloudUpload, 
  CreditCard, 
  ShieldCheck,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

// Mock Data (Should match PricingGrid)
const PACKAGES = {
  "1-nam": { name: "1 Năm", price: "1.638.000 đ", rawPrice: 1638000 },
  "2-nam": { name: "2 Năm", price: "2.189.000 đ", rawPrice: 2189000 },
  "3-nam": { name: "3 Năm", price: "3.100.000 đ", rawPrice: 3100000 },
};

function RegisterForm() {
  const searchParams = useSearchParams();
  const pkgId = searchParams.get("pkg") || "2-nam";
  const selectedPkg = PACKAGES[pkgId as keyof typeof PACKAGES] || PACKAGES["2-nam"];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    position: "",
    taxId: "",
    companyName: "",
    address: "",
    city: "",
    district: "",
    paymentMethod: "chuyen_khoan",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step Progress */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                  step >= s ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-400"
                )}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                <span className={cn(
                  "hidden sm:inline text-xs font-bold uppercase tracking-wider",
                  step === s ? "text-brand-blue" : "text-gray-400"
                )}>
                  {s === 1 && "Giỏ hàng"}
                  {s === 2 && "Người mua"}
                  {s === 3 && "Hóa đơn"}
                  {s === 4 && "Hoàn tất"}
                </span>
                {s < 4 && <ChevronRight className="w-4 h-4 text-gray-200" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-3xl shadow-premium border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-dark">Xem lại giỏ hàng</h2>
                </div>

                <div className="border border-gray-100 rounded-2xl overflow-hidden mb-8">
                  <table className="w-full text-left">
                    <thead className="bg-brand-slate">
                      <tr>
                        <th className="p-4 text-xs font-bold uppercase text-gray-500">Dịch vụ</th>
                        <th className="p-4 text-xs font-bold uppercase text-gray-500 text-center">Số lượng</th>
                        <th className="p-4 text-xs font-bold uppercase text-gray-500 text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="p-4">
                          <div className="font-bold text-brand-dark">Chữ ký số USB Token</div>
                          <div className="text-sm text-gray-500">Gói {selectedPkg.name}</div>
                        </td>
                        <td className="p-4 text-center font-medium">1</td>
                        <td className="p-4 text-right font-bold text-brand-blue">{selectedPkg.price}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-8">
                  <ShieldCheck className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>Ưu đãi đi kèm:</strong> Tặng 01 thiết bị USB Token thế hệ mới và 500 hóa đơn điện tử khởi tạo.
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <button onClick={() => window.history.back()} className="text-sm font-bold text-gray-400 flex items-center gap-2 hover:text-brand-dark transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Quay lại
                  </button>
                  <Button size="lg" onClick={nextStep} className="px-12">Tiếp tục <ChevronRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-3xl shadow-premium border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
                    <User className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-dark">Thông tin người mua hàng</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Họ và tên *</label>
                    <input 
                      type="text" 
                      placeholder="Nhập họ và tên"
                      className="w-full p-4 bg-brand-slate border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Số điện thoại *</label>
                    <input 
                      type="tel" 
                      placeholder="09xx xxx xxx"
                      className="w-full p-4 bg-brand-slate border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700">Email nhận mã kích hoạt *</label>
                    <input 
                      type="email" 
                      placeholder="email@vidu.com"
                      className="w-full p-4 bg-brand-slate border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <button onClick={prevStep} className="text-sm font-bold text-gray-400 flex items-center gap-2 hover:text-brand-dark transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Quay lại
                  </button>
                  <Button size="lg" onClick={nextStep} className="px-12">Tiếp tục <ChevronRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-3xl shadow-premium border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-dark">Thông tin xuất hóa đơn</h2>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    {["Doanh nghiệp", "Cá nhân"].map((type) => (
                      <button 
                        key={type}
                        className={cn(
                          "flex-1 p-4 rounded-xl border font-bold text-sm transition-all",
                          type === "Doanh nghiệp" ? "border-brand-blue bg-brand-blue/5 text-brand-blue" : "border-gray-100 text-gray-400"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Mã số thuế *</label>
                      <input 
                        type="text" 
                        placeholder="Nhập MST"
                        className="w-full p-4 bg-brand-slate border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Tên đơn vị *</label>
                      <input 
                        type="text" 
                        placeholder="Tên công ty"
                        className="w-full p-4 bg-brand-slate border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-gray-700">Địa chỉ đầy đủ *</label>
                      <input 
                        type="text" 
                        placeholder="Số nhà, tên đường..."
                        className="w-full p-4 bg-brand-slate border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <button onClick={prevStep} className="text-sm font-bold text-gray-400 flex items-center gap-2 hover:text-brand-dark transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Quay lại
                  </button>
                  <Button size="lg" onClick={nextStep} className="px-12 bg-brand-red hover:bg-brand-red-dark">Hoàn tất đăng ký <CheckCircle2 className="ml-2 w-4 h-4" /></Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-10 rounded-3xl shadow-premium border border-gray-100 text-center"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Gửi đăng ký thành công!</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Mã hồ sơ của bạn là <strong className="text-brand-blue">NCM-2026-88592</strong>. Nhân viên hỗ trợ sẽ liên hệ bạn trong vòng 30 phút.
                </p>

                <div className="bg-brand-slate p-6 rounded-2xl mb-8 text-left max-w-md mx-auto space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Sản phẩm</span>
                    <span className="font-bold text-brand-dark">USB Token - {selectedPkg.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tổng phí</span>
                    <span className="font-bold text-brand-blue">{selectedPkg.price}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => window.location.href = "/"} variant="primary" size="lg">Quay về trang chủ</Button>
                  <Button variant="outline" size="lg">Tải xuống báo giá</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Sidebar Area */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-premium border border-gray-100 sticky top-28">
            <h3 className="text-lg font-bold text-brand-dark mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-blue" /> Phương thức thanh toán
            </h3>
            
            <div className="space-y-4 mb-8">
              {[
                { id: "ck", name: "Chuyển khoản", icon: "🏦" },
                { id: "atm", name: "Thẻ ATM / QR", icon: "💳" },
              ].map((pt) => (
                <label 
                  key={pt.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                    formData.paymentMethod === pt.id ? "border-brand-blue bg-brand-blue/5" : "border-gray-100 hover:bg-gray-50"
                  )}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={formData.paymentMethod === pt.id}
                    onChange={() => setFormData({...formData, paymentMethod: pt.id})}
                    className="hidden" 
                  />
                  <span className="text-xl">{pt.icon}</span>
                  <span className="text-sm font-bold text-brand-dark">{pt.name}</span>
                </label>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tạm tính</span>
                <span className="font-bold text-brand-dark">{selectedPkg.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">VAT (10%)</span>
                <span className="font-bold text-brand-dark">Đã bao gồm</span>
              </div>
              <div className="flex justify-between text-lg pt-4">
                <span className="font-bold text-brand-dark">Tổng cộng</span>
                <span className="font-extrabold text-brand-blue">{selectedPkg.price}</span>
              </div>
            </div>

            <div className="mt-8 text-[10px] text-gray-400 leading-relaxed text-center">
              Bằng cách nhấn tiếp tục, bạn đồng ý với các điều khoản sử dụng và chính sách bảo mật của Nacencomm.
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-brand-slate">
      <Header />
      <Suspense fallback={<div className="pt-40 text-center">Đang tải hồ sơ...</div>}>
        <RegisterForm />
      </Suspense>
      <Footer />
    </main>
  );
}
