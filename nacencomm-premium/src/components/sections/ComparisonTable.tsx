"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  { name: "Tốc độ ký số", token: "100s", remote: "Tức thì", type: "text" },
  { name: "Bảo mật phần cứng (FIPS 140-2)", token: true, remote: true, type: "bool" },
  { name: "Ký số trên Mobile/Tablet", token: false, remote: true, type: "bool" },
  { name: "Không cần thiết bị vật lý", token: false, remote: true, type: "bool" },
  { name: "Khả năng mở rộng (Multi-user)", token: "Hạn chế", remote: "Không giới hạn", type: "text" },
  { name: "Chi phí duy trì hàng năm", token: "Thấp", remote: "Theo lượt ký", type: "text" },
];

export function ComparisonTable() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-4">So sánh Giải pháp</h2>
          <p className="text-gray-500">Lựa chọn công nghệ phù hợp nhất với nhu cầu vận hành của bạn.</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-premium">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-slate text-brand-dark">
                  <th className="p-6 font-bold text-sm uppercase tracking-wider">Tính năng đặc bật</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-center">USB Token (Truyền thống)</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-center text-brand-blue">Remote Signing (Hiện đại)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {FEATURES.map((feature, index) => (
                  <motion.tr 
                    key={feature.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-6 font-semibold text-brand-dark text-sm">{feature.name}</td>
                    <td className="p-6 text-center text-sm">
                      {feature.type === "bool" ? (
                        feature.token ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-600">{feature.token}</span>
                      )}
                    </td>
                    <td className="p-6 text-center text-sm font-medium text-brand-blue">
                      {feature.type === "bool" ? (
                        feature.remote ? (
                          <Check className="w-5 h-5 text-brand-blue mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span>{feature.remote}</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
