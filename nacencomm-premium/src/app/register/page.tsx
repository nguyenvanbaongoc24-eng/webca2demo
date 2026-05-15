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
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  FileDown,
  Building2,
  Lock,
  SmartphoneNfc
} from "lucide-react";

// Mock Data
const PACKAGES = {
  "1y": { name: "1 năm", price: "1.638.000", rawPrice: 1638000, type: "remote" },
  "2y": { name: "2 năm", price: "2.189.000", rawPrice: 2189000, type: "remote" },
  "3y": { name: "3 năm", price: "3.100.000", rawPrice: 3100000, type: "remote" },
  "4y": { name: "4 năm", price: "5.200.000", rawPrice: 5200000, type: "usb" },
  "5y": { name: "5 năm", price: "5.900.000", rawPrice: 5900000, type: "usb" },
};

const UPSELL_ITEMS = [
  { id: "einvoice", name: "Bộ giải pháp tài chính kế toán", price: "2.950.000", icon: "📊" },
  { id: "meinvoice", name: "meInvoice Doanh nghiệp", price: "250.000", icon: "📑" },
  { id: "bhxh", name: "Bảo hiểm xã hội", price: "240.000", icon: "🏥" },
  { id: "thuetncn", name: "Thuế TNCN", price: "240.000", icon: "⚖️" },
];

type FlowState = "form" | "signing" | "reviewing" | "approved" | "activated" | "rejected" | "sales_success";

function RegisterForm() {
  const searchParams = useSearchParams();
  const pkgId = searchParams.get("pkg") || "2y";
  const type = searchParams.get("type") || "dn"; // dn, hkd, cn
  const selectedPkg = PACKAGES[pkgId as keyof typeof PACKAGES] || PACKAGES["2y"];

  const [quantity, setQuantity] = useState(1);
  const [flowState, setFlowState] = useState<FlowState>("form");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [reviewProgress, setReviewProgress] = useState(0);
  const [openSections, setOpenSections] = useState({ 1: true, 2: true, 3: true });
  const [activationStep, setActivationStep] = useState(1);

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

  const toggleSection = (id: number) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  };

  const handleFileUpload = (doc: string) => {
    if (!uploadedFiles.includes(doc)) {
      setUploadedFiles(prev => [...prev, doc]);
    } else {
      setUploadedFiles(prev => prev.filter(f => f !== doc));
    }
  };

  const handleSubmit = () => {
    // Flow logic: Remote Signing + (HKD or Cá nhân) => Flow A (VNeID)
    // Everything else => Flow B (Sales Success)
    const isRS = selectedPkg.type === "remote";
    const isHKDorCN = type === "hkd" || type === "cn";

    if (isRS && isHKDorCN) {
      setFlowState("signing");
    } else {
      setFlowState("sales_success");
    }
  };

  if (flowState === "form") {
    return (
      <div className="pt-32 pb-20 px-4 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl font-black text-[#1E293B]">
              Thông tin mua hàng Bộ giải pháp Chữ ký số
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className={cn("px-2 py-1 rounded-md", type === "dn" ? "bg-brand-blue text-white" : "bg-white")}>Doanh nghiệp</span>
              <span className={cn("px-2 py-1 rounded-md", type === "hkd" ? "bg-brand-blue text-white" : "bg-white")}>HKD</span>
              <span className={cn("px-2 py-1 rounded-md", type === "cn" ? "bg-brand-blue text-white" : "bg-white")}>Cá nhân</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              {/* Section 1: Giỏ hàng */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection(1)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <h2 className="text-lg font-bold text-[#1E293B]">Giỏ hàng</h2>
                  </div>
                  {openSections[1] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
                
                <AnimatePresence>
                  {openSections[1] && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden border-t border-gray-50"
                    >
                      <div className="p-6">
                        <table className="w-full text-left text-sm mb-8">
                          <thead className="bg-[#F8FAFC] text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                            <tr>
                              <th className="p-4 rounded-l-xl">Sản phẩm/Dịch vụ</th>
                              <th className="p-4 text-center">ĐVT</th>
                              <th className="p-4 text-center">Số lượng</th>
                              <th className="p-4 text-right rounded-r-xl">Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                                    {selectedPkg.type === "usb" ? <CreditCard className="w-6 h-6" /> : <SmartphoneNfc className="w-6 h-6" />}
                                  </div>
                                  <div>
                                    <div className="font-bold text-[#1E293B]">Chữ ký số {selectedPkg.type === "usb" ? "USB Token" : "Remote Signing"}</div>
                                    <div className="text-xs text-brand-blue font-medium mt-1">{selectedPkg.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-center text-gray-500">Gói</td>
                              <td className="p-4 text-center">
                                <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-gray-50 text-gray-400"><Minus className="w-3 h-3" /></button>
                                  <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                                  <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-gray-50 text-gray-400"><Plus className="w-3 h-3" /></button>
                                </div>
                              </td>
                              <td className="p-4 text-right font-black text-brand-dark">{selectedPkg.price}đ</td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Upsell Grid */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sản phẩm thường mua cùng</h3>
                          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {UPSELL_ITEMS.map((item) => (
                              <div key={item.id} className="min-w-[200px] p-4 bg-[#F8FAFC] border-2 border-transparent hover:border-brand-blue/20 rounded-2xl transition-all cursor-pointer group">
                                <div className="text-2xl mb-3">{item.icon}</div>
                                <div className="font-bold text-sm text-[#1E293B] group-hover:text-brand-blue transition-colors mb-1 truncate">{item.name}</div>
                                <div className="text-xs text-brand-blue font-bold">Từ {item.price}đ</div>
                                <Button variant="outline" size="sm" className="w-full mt-3 rounded-lg border-gray-200 text-[10px] font-bold">Thêm vào giỏ</Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Section 2: Thông tin người mua */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection(2)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <h2 className="text-lg font-bold text-[#1E293B]">Thông tin người mua hàng</h2>
                  </div>
                  {openSections[2] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
                <AnimatePresence>
                  {openSections[2] && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden border-t border-gray-50"
                    >
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
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email nhận mã kích hoạt và giấy phép <span className="text-red-500">*</span></label>
                          <input type="email" placeholder="Nhập địa chỉ email" className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Section 3: Thông tin xuất hóa đơn */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection(3)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <h2 className="text-lg font-bold text-[#1E293B]">Thông tin xuất hóa đơn</h2>
                  </div>
                  {openSections[3] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
                <AnimatePresence>
                  {openSections[3] && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden border-t border-gray-50"
                    >
                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mã số thuế <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="Nhập mã số thuế" className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl outline-none text-sm" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tên đơn vị <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="Nhập tên đơn vị/công ty" className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl outline-none text-sm" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <select className="p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none">
                            <option>Tỉnh / Thành phố</option>
                            <option>Hà Nội</option>
                            <option>TP. Hồ Chí Minh</option>
                          </select>
                          <select className="p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none">
                            <option>Quận / Huyện</option>
                          </select>
                          <select className="p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none">
                            <option>Phường / Xã</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Địa chỉ chi tiết <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="Số nhà, tên đường..." className="w-full p-3.5 bg-[#F8FAFC] border border-gray-200 rounded-xl outline-none text-sm" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <aside className="lg:col-span-1 sticky top-28 space-y-4">
              {/* Payment Sidebar */}
              <div className="bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden">
                <div className="p-5 bg-[#F8FAFC] border-b border-gray-50">
                  <h3 className="text-sm font-bold text-brand-dark">Tóm tắt thanh toán</h3>
                </div>
                <div className="p-5 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gói {selectedPkg.name}</span>
                      <span className="font-bold">{selectedPkg.price}đ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Phí dịch vụ</span>
                      <span className="font-bold">0đ</span>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="font-bold text-gray-900">Tổng cộng</span>
                      <span className="text-2xl font-black text-brand-blue">{selectedPkg.price}đ</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phương thức thanh toán</h4>
                    <div className="space-y-2">
                      {["Chuyển khoản ngân hàng", "Thẻ ATM / Quốc tế", "Ví điện tử MoMo/ZaloPay"].map((pt, i) => (
                        <label key={i} className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-brand-blue/20 cursor-pointer transition-all">
                          <input type="radio" name="payment" defaultChecked={i===0} className="w-4 h-4 accent-brand-blue" />
                          <span className="text-sm font-medium text-gray-700">{pt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <label className="flex gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 mt-0.5 rounded accent-brand-blue" />
                      <span className="text-[11px] text-gray-500 leading-relaxed">
                        Tôi đồng ý với <a href="#" className="text-brand-blue underline">Điều khoản dịch vụ</a> và <a href="#" className="text-brand-blue underline">Chính sách bảo mật</a> của Nacencomm.
                      </span>
                    </label>
                    <Button 
                      onClick={handleSubmit} 
                      size="lg" 
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-black py-7 rounded-2xl shadow-xl shadow-brand-blue/20"
                    >
                      THANH TOÁN
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl border-gray-200 text-gray-500 font-bold gap-2">
                      <FileDown className="w-4 h-4" /> Tải xuống báo giá
                    </Button>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-brand-blue opacity-50" />
                <div className="text-[10px] text-brand-blue/80 font-medium leading-tight">
                  Giao dịch an toàn được bảo mật bởi Nacencomm Security & JetPay Gateway.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // Flow B: Sales Success (QR Payment Screen)
  if (flowState === "sales_success") {
    return (
      <div className="pt-40 pb-20 px-4 flex items-center justify-center bg-[#F4F7FA]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-premium overflow-hidden border border-gray-100"
        >
          <div className="bg-brand-blue p-8 text-center text-white relative">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-black mb-1">Thanh toán đơn hàng</h2>
            <div className="inline-block px-4 py-1.5 bg-black/10 rounded-full text-[10px] font-bold backdrop-blur-sm">
              Mã hồ sơ: NCM-2026-81285
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/* QR Code Section */}
              <div className="w-full md:w-1/2 space-y-6 text-center">
                <div className="p-4 bg-white border-2 border-brand-blue/10 rounded-3xl shadow-lg inline-block">
                  <img 
                    src="/vietqr_payment_mockup_1778841271490.png" 
                    className="w-48 h-auto rounded-xl" 
                    alt="VietQR Payment" 
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Nội dung chuyển khoản</p>
                  <div className="p-3 bg-[#F8FAFC] border-2 border-dashed border-brand-blue/30 rounded-xl text-lg font-black text-brand-blue tracking-wider">
                    NCM-2026-81285
                  </div>
                  <p className="text-[10px] text-gray-500 italic">* Vui lòng nhập chính xác mã hồ sơ để tự động kích hoạt</p>
                </div>
              </div>

              {/* Instructions Section */}
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-brand-dark flex items-center gap-2">
                    <Info className="w-5 h-5 text-brand-blue" /> Hướng dẫn thanh toán
                  </h3>
                  <div className="space-y-4">
                    {[
                      { t: "Mở ứng dụng Ngân hàng", d: "Chọn chức năng QR Pay hoặc Quét mã QR" },
                      { t: "Quét mã QR bên cạnh", d: "Hệ thống sẽ tự động điền số tiền và nội dung" },
                      { t: "Xác nhận giao dịch", d: "Hồ sơ sẽ được ưu tiên thẩm định ngay lập tức" }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-6 h-6 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center font-bold text-xs shrink-0">{i+1}</div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{step.t}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{step.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-yellow-50 rounded-2xl border border-yellow-100 space-y-2">
                  <div className="flex items-center gap-2 text-yellow-700 font-bold text-xs">
                    <ShieldAlert className="w-4 h-4" /> Lưu ý quan trọng
                  </div>
                  <p className="text-[10px] text-yellow-600 leading-relaxed">
                    Sau khi thanh toán thành công, vui lòng giữ lại biên lai để đối chiếu nếu cần thiết. Hệ thống sẽ gửi xác nhận qua email trong vòng 5-10 phút.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-4">
              <Button onClick={() => window.location.href="/"} variant="outline" className="rounded-xl px-8 font-bold border-gray-200">Về trang chủ</Button>
              <Button className="rounded-xl px-8 font-bold bg-brand-blue text-white shadow-lg shadow-brand-blue/20">Tôi đã chuyển khoản</Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Flow A: Multi-step lifecycle screens (Signing, Reviewing, Approved, Activated)
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-[#F4F7FA] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {flowState === "signing" && (
          <motion.div
            key="signing"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full bg-white rounded-3xl shadow-premium p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-8">
              <Smartphone className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-brand-dark mb-4">Hồ sơ đã được tiếp nhận!</h2>
            <p className="text-gray-500 mb-8 text-sm">Vui lòng ký số 2 tệp PDF qua app VNeID để hoàn tất thủ tục pháp lý.</p>

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
                    {uploadedFiles.includes(doc.id) && <CheckCircle2 className="w-5 h-5 text-green-500" />}
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
                className="w-full rounded-2xl py-7 font-black bg-brand-blue text-white shadow-xl shadow-brand-blue/20"
              >
                Gửi hồ sơ thẩm định
              </Button>
              <div className="flex items-center justify-center gap-6 pt-4 grayscale opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="h-5" alt="App Store" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Play_Store_logo_2022.svg" className="h-5" alt="Google Play" />
              </div>
            </div>
          </motion.div>
        )}

        {flowState === "reviewing" && (
          <motion.div
            key="reviewing"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-premium p-12 text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle className="text-gray-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                <motion.circle 
                  className="text-brand-blue" strokeWidth="8" strokeDasharray="264"
                  strokeDashoffset={264 - (264 * reviewProgress) / 100}
                  strokeLinecap="round" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-brand-blue">
                {reviewProgress}%
              </div>
            </div>
            <h2 className="text-2xl font-black text-brand-dark mb-4">Đang thẩm định hồ sơ</h2>
            <p className="text-xs text-gray-500 leading-relaxed px-4">
              Hệ thống đang tự động kiểm tra chữ ký số VNeID và hồ sơ pháp lý của bạn. Vui lòng giữ cửa sổ này.
            </p>
          </motion.div>
        )}

        {flowState === "approved" && (
          <motion.div
            key="approved"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full bg-white rounded-3xl shadow-premium overflow-hidden"
          >
            <div className="bg-brand-blue p-8 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-black mb-1">Hồ sơ đã được duyệt!</h2>
              <p className="text-xs opacity-70">Sẵn sàng kích hoạt dịch vụ.</p>
            </div>
            <div className="p-10 space-y-8">
              {activationStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Mã kích hoạt Remote Signing</div>
                    <div className="inline-block px-8 py-5 bg-[#F8FAFC] border-2 border-dashed border-brand-blue/30 rounded-2xl text-2xl font-black text-brand-blue tracking-[0.2em]">
                      RS-2026-9908
                    </div>
                  </div>
                  <div className="p-6 bg-blue-50/50 rounded-2xl space-y-4">
                    <h3 className="text-xs font-bold text-brand-blue flex items-center gap-2">
                      <Smartphone className="w-4 h-4" /> Bước tiếp theo trên điện thoại:
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-2 list-decimal list-inside">
                      <li>Tải ứng dụng <strong>SmartCA</strong> từ App Store/Google Play</li>
                      <li>Mở ứng dụng và chọn "Kích hoạt bằng mã"</li>
                      <li>Nhập mã hiển thị ở trên và làm theo hướng dẫn</li>
                    </ul>
                  </div>
                  <Button onClick={() => setFlowState("activated")} className="w-full rounded-2xl py-6 bg-brand-blue text-white font-black">
                    Kích hoạt ngay trên App →
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {flowState === "activated" && (
          <motion.div
            key="activated"
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full text-center"
          >
            <div className="bg-white rounded-3xl shadow-premium p-12 mb-8">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <QrCode className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-black text-brand-dark mb-4">Dịch vụ đã được kích hoạt!</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-10 leading-relaxed">
                Chúc mừng! Chữ ký số của bạn đã sẵn sàng sử dụng. Bạn có thể bắt đầu ký số các văn bản, hợp đồng ngay bây giờ.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={() => window.location.href="/"} variant="red" size="lg" className="rounded-full px-12 font-bold shadow-lg shadow-red-500/20">
                  Về trang chủ
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-12 flex items-center gap-2 font-bold">
                  <Info className="w-5 h-5" /> Hướng dẫn ký
                </Button>
              </div>
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
      <Suspense fallback={<div className="pt-40 text-center animate-pulse">Đang tải dữ liệu đơn hàng...</div>}>
        <RegisterForm />
      </Suspense>
      <Footer />
    </main>
  );
}
