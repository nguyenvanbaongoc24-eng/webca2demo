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
  Info,
  Smartphone,
  CloudUpload,
  Loader2,
  ExternalLink,
  QrCode,
  ShieldAlert
} from "lucide-react";

// Mock Data
const PACKAGES = {
  "1y": { name: "1 năm", price: "2.400.000", rawPrice: 2400000, type: "remote" },
  "2y": { name: "2 năm", price: "3.500.000", rawPrice: 3500000, type: "remote" },
  "3y": { name: "3 năm", price: "4.400.000", rawPrice: 4400000, type: "remote" },
  "4y": { name: "4 năm", price: "5.200.000", rawPrice: 5200000, type: "usb" },
  "5y": { name: "5 năm", price: "5.900.000", rawPrice: 5900000, type: "usb" },
};

const UPSELL_ITEMS = [
  { id: "einvoice", name: "Bộ giải pháp tài chính kế toán", price: "2.950.000", icon: "📊" },
  { id: "meinvoice", name: "meInvoice Doanh nghiệp", price: "250.000", icon: "📑" },
  { id: "bhxh", name: "Bảo hiểm xã hội", price: "240.000", icon: "🏥" },
  { id: "thuetncn", name: "Thuế TNCN", price: "240.000", icon: "⚖️" },
];

type FlowState = "form" | "signing" | "reviewing" | "approved" | "activated" | "rejected";

function RegisterForm() {
  const searchParams = useSearchParams();
  const pkgId = searchParams.get("pkg") || "2y";
  const type = searchParams.get("type") || "dn";
  const selectedPkg = PACKAGES[pkgId as keyof typeof PACKAGES] || PACKAGES["2y"];

  const [quantity, setQuantity] = useState(1);
  const [flowState, setFlowState] = useState<FlowState>("form");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [reviewProgress, setReviewProgress] = useState(0);

  // Simulation: Reviewing process
  useEffect(() => {
    if (flowState === "reviewing") {
      const timer = setInterval(() => {
        setReviewProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setFlowState("approved");
            return 100;
          }
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [flowState]);

  const handleFileUpload = (doc: string) => {
    if (!uploadedFiles.includes(doc)) {
      setUploadedFiles(prev => [...prev, doc]);
    } else {
      setUploadedFiles(prev => prev.filter(f => f !== doc));
    }
  };

  if (flowState === "form") {
    return (
      <div className="pt-32 pb-20 px-4 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#1E293B] mb-8">
            Thông tin mua hàng Bộ giải pháp Ký số cho {type === "dn" ? "Doanh nghiệp" : "Cá nhân"}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
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
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step 2: Thông tin người mua */}
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
            </div>

            <aside className="lg:col-span-1 sticky top-28">
              <div className="bg-white rounded-xl shadow-premium border border-gray-100 overflow-hidden">
                <div className="p-5 bg-[#F8FAFC] border-b border-gray-50">
                  <h3 className="text-sm font-bold text-brand-dark">Tóm tắt đơn hàng</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tạm tính</span>
                    <span className="font-bold">{selectedPkg.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phí dịch vụ</span>
                    <span className="font-bold">0đ</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-xl font-black text-brand-blue">{selectedPkg.price}</span>
                  </div>
                  <Button 
                    onClick={() => setFlowState("signing")} 
                    size="lg" 
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-6 rounded-xl mt-4"
                  >
                    Tiếp tục thanh toán
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // Multi-step lifecycle screens
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-brand-slate flex items-center justify-center">
      <AnimatePresence mode="wait">
        {flowState === "signing" && (
          <motion.div
            key="signing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full bg-white rounded-3xl shadow-premium p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-8">
              <Smartphone className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-brand-dark mb-4">Hồ sơ đã được tiếp nhận!</h2>
            <p className="text-gray-500 mb-8">Hệ thống đã tạo 2 file PDF và gửi về email của bạn. Vui lòng ký số qua app VNeID để tiếp tục.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
              {[
                { id: "dk", name: "Đơn đăng ký sử dụng" },
                { id: "hd", name: "Hợp đồng dịch vụ" },
              ].map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => handleFileUpload(doc.id)}
                  className={cn(
                    "p-6 rounded-2xl border-2 transition-all cursor-pointer",
                    uploadedFiles.includes(doc.id)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-100 bg-[#F8FAFC] hover:border-brand-blue/30"
                  )}
                >
                  <div className="flex justify-between items-center mb-3">
                    <FileText className={cn("w-6 h-6", uploadedFiles.includes(doc.id) ? "text-green-500" : "text-gray-400")} />
                    {uploadedFiles.includes(doc.id) ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <CloudUpload className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-gray-900 mb-1">{doc.name}</div>
                  <div className="text-[10px] text-gray-400">
                    {uploadedFiles.includes(doc.id) ? "Đã ký số VNeID" : "Chờ ký số & upload"}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Button 
                disabled={uploadedFiles.length < 2}
                onClick={() => setFlowState("reviewing")}
                className="w-full rounded-2xl py-6 font-bold bg-brand-blue text-white shadow-xl shadow-brand-blue/20"
              >
                Gửi hồ sơ thẩm định
              </Button>
              <p className="text-[10px] text-gray-400">Bạn cần hỗ trợ? Gọi hotline <span className="font-bold text-brand-blue">1900 5454 07</span></p>
            </div>
          </motion.div>
        )}

        {flowState === "reviewing" && (
          <motion.div
            key="reviewing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-premium p-12 text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-8">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="text-gray-100" strokeWidth="6" stroke="currentColor" fill="transparent" r="44" cx="50" cy="50" />
                <motion.circle 
                  className="text-brand-blue" 
                  strokeWidth="6" 
                  strokeDasharray="276"
                  strokeDashoffset={276 - (276 * reviewProgress) / 100}
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="44" cx="50" cy="50" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-brand-dark mb-4">Đang thẩm định hồ sơ</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Chuyên viên CA2 đang xem xét hồ sơ của bạn. <br /> Kết quả sẽ có sau ít phút.
            </p>
          </motion.div>
        )}

        {flowState === "approved" && (
          <motion.div
            key="approved"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full bg-white rounded-3xl shadow-premium overflow-hidden"
          >
            <div className="bg-brand-blue p-8 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-black mb-2">Hồ sơ đã được duyệt!</h2>
              <p className="text-sm opacity-80">Cảm ơn bạn đã lựa chọn Nacencomm.</p>
            </div>
            <div className="p-10 space-y-8">
              <div className="text-center">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Mã kích hoạt Remote Signing</div>
                <div className="inline-block px-10 py-5 bg-[#F8FAFC] border-2 border-dashed border-brand-blue/30 rounded-2xl text-3xl font-black text-brand-blue tracking-[0.3em]">
                  RS-8829-1029
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">Mã đã được gửi về email của bạn. Dùng để kích hoạt app SmartCA.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Tải giấy phép
                </Button>
                <Button onClick={() => setFlowState("activated")} className="rounded-xl bg-brand-blue text-white font-bold">
                  Kích hoạt ngay
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {flowState === "activated" && (
          <motion.div
            key="activated"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full text-center"
          >
            <div className="bg-white rounded-3xl shadow-premium p-12 mb-8">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10">
                <QrCode className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-black text-brand-dark mb-4">Dịch vụ đã được kích hoạt!</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-12">
                Chúc mừng! Chữ ký số Remote Signing của bạn đã sẵn sàng sử dụng trên thiết bị di động.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="red" size="lg" className="rounded-full px-10">
                  Về trang chủ
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-10 flex items-center gap-2">
                  <Info className="w-5 h-5" /> Hướng dẫn sử dụng
                </Button>
              </div>
            </div>
            <div className="flex justify-center gap-8 opacity-40 grayscale">
              <img src="https://lh3.googleusercontent.com/..." className="h-8" alt="Apple" />
              <img src="https://lh3.googleusercontent.com/..." className="h-8" alt="Google" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
