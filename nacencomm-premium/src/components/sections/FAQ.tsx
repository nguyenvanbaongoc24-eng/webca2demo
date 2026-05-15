"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "Nacencomm cung cấp những giải pháp chuyển đổi số nào?",
    answer: "Nacencomm cung cấp hệ sinh thái chuyển đổi số toàn diện bao gồm: Chữ ký số (CA2), Chữ ký số từ xa (Remote Signing), Hóa đơn điện tử, Phần mềm bảo hiểm xã hội và các giải pháp an ninh mạng cao cấp."
  },
  {
    question: "Chữ ký số Remote Signing khác gì so với USB Token?",
    answer: "Remote Signing cho phép bạn ký số trực tiếp trên thiết bị di động mà không cần thiết bị vật lý (USB Token), hỗ trợ ký đa người dùng và tích hợp dễ dàng vào các hệ thống quản trị doanh nghiệp."
  },
  {
    question: "Tôi có được hỗ trợ cài đặt và hướng dẫn sử dụng không?",
    answer: "Có, Nacencomm hỗ trợ cài đặt và hướng dẫn sử dụng tận nơi hoặc qua UltraView/Teamview 24/7. Chúng tôi có đội ngũ kỹ thuật chuyên trách sẵn sàng giải đáp mọi thắc mắc của bạn."
  },
  {
    question: "Quy trình đăng ký mua gói sản phẩm như thế nào?",
    answer: "Bạn chỉ cần chọn gói phù hợp, nhấn 'Mua ngay' và để lại thông tin. Nhân viên kinh doanh sẽ liên hệ xác nhận và hướng dẫn hoàn thiện hồ sơ đăng ký trong vòng 30 phút."
  },
  {
    question: "Nacencomm có hỗ trợ gia hạn chữ ký số từ nhà cung cấp khác không?",
    answer: "Chúng tôi hỗ trợ chuyển đổi và gia hạn chữ ký số từ tất cả các nhà cung cấp khác với chính sách ưu đãi đặc biệt về giá và cộng thêm thời gian sử dụng còn lại."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(2); // Default open third one

  return (
    <section className="py-24 px-4 bg-brand-slate">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-16">Câu hỏi thường gặp</h2>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center group"
              >
                <span className={cn(
                  "font-bold transition-colors",
                  openIndex === index ? "text-brand-blue" : "text-brand-dark group-hover:text-brand-blue"
                )}>
                  {faq.question}
                </span>
                <ChevronDown className={cn(
                  "w-5 h-5 text-gray-400 transition-transform duration-300",
                  openIndex === index ? "rotate-180 text-brand-blue" : ""
                )} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
