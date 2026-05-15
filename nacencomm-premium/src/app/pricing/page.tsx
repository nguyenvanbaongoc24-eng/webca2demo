import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PricingGrid } from "@/components/sections/PricingGrid";
import { 
  ShieldCheck, 
  Star, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section for Pricing */}
      <div className="pt-32 pb-12 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="container mx-auto px-4 text-center">
          <PricingGrid />
        </div>
      </div>

      {/* Comparison or Detail Section */}
      <section className="py-24 border-t border-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-12 text-center">Tại sao nên chọn giải pháp từ Nacencomm?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-brand-blue flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" /> Bảo mật & Pháp lý
                </h3>
                <ul className="space-y-4">
                  {[
                    "Đáp án đầy đủ các tiêu chuẩn an toàn thông tin quốc tế.",
                    "Chứng chỉ CA2 được Bộ Thông tin và Truyền thông cấp phép.",
                    "Hợp đồng điện tử có giá trị pháp lý tương đương bản giấy.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-brand-blue flex items-center gap-2">
                  <Star className="w-6 h-6" /> Trải nghiệm khách hàng
                </h3>
                <ul className="space-y-4">
                  {[
                    "Hỗ trợ kỹ thuật 24/7 qua Hotline, Email, Zalo.",
                    "Kích hoạt dịch vụ nhanh chóng trong vòng 10 phút.",
                    "Giao diện thân thiện, dễ dàng tích hợp mọi hệ thống.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-20 p-8 bg-brand-dark rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">Bạn đang tìm kiếm giải pháp tùy chỉnh?</h3>
                <p className="text-gray-400">Liên hệ với đội ngũ chuyên gia của chúng tôi để được tư vấn gói phù hợp nhất.</p>
              </div>
              <Button variant="red" size="lg" className="rounded-full px-8">
                Nhận tư vấn ngay <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-brand-dark mb-12 text-center">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {[
              { q: "Làm thế nào để gia hạn dịch vụ?", a: "Bạn có thể thực hiện gia hạn trực tiếp trên ứng dụng hoặc liên hệ tổng đài 1900 5454 07 để được hỗ trợ." },
              { q: "Thời gian kích hoạt chữ ký số là bao lâu?", a: "Thông thường quy trình thẩm định và kích hoạt sẽ hoàn tất trong vòng 1-2 ngày làm việc." },
              { q: "Tôi có thể sử dụng chữ ký số trên nhiều máy tính không?", a: "Với USB Token, bạn có thể cắm và sử dụng trên bất kỳ máy tính nào có cài đặt Driver. Với Remote Signing, bạn có thể ký trên mọi thiết bị di động." },
            ].map((faq) => (
              <div key={faq.q} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-brand-dark mb-3 flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-blue" /> {faq.q}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
