"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { PlayCircle, ShieldCheck, Key } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-screen py-20 pb-24 overflow-hidden bg-[#020617]">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-blue/10 blur-[180px] rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full translate-y-1/4 -translate-x-1/4" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 px-4 py-1.5 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              TOP 3 CA TẠI VIỆT NAM
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[1] mb-8 tracking-tighter">
              Khai phóng <br />
              <span className="text-gradient">Sức mạnh số</span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-lg">
              Đồng hành cùng 280.000+ khách hàng trên hành trình chuyển đổi số với hệ sinh thái giải pháp bảo mật và tối ưu nhất.
            </p>

            <div className="flex flex-wrap gap-5 mb-16">
              <Link href="/pricing">
                <Button size="lg" className="rounded-full px-10 bg-brand-blue text-white hover:bg-brand-blue-light font-bold text-md shadow-glow-blue border-none">
                  Bắt đầu ngay
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full px-10 border-white/10 text-white hover:bg-white/5 font-bold flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> Video Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-10 border-t border-white/5">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6">Được tin dùng bởi các đối tác hàng đầu</p>
              <div className="flex flex-wrap items-center gap-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Logo_Vietcombank.svg" alt="Vietcombank" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_Bank.svg" alt="MBBank" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_Agribank.svg" alt="Agribank" className="h-6" />
                <div className="flex items-center gap-1 font-black text-white text-xs">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> ISO 27001
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Main Dashboard Panel */}
            <div className="relative w-full max-w-xl aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent opacity-30" />
              
              {/* Fake UI Header */}
              <div className="h-12 border-b border-white/10 flex items-center px-6 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <div className="ml-4 h-4 w-32 bg-white/5 rounded-full" />
              </div>

              {/* Fake UI Content */}
              <div className="p-8 space-y-6">
                <div className="flex gap-4">
                  <div className="h-24 w-1/3 bg-white/5 rounded-2xl border border-white/5" />
                  <div className="h-24 w-2/3 bg-white/5 rounded-2xl border border-white/5" />
                </div>
                <div className="h-40 w-full bg-brand-blue/5 rounded-2xl border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="absolute bottom-4 left-4 h-2 w-32 bg-brand-blue/20 rounded-full" />
                </div>
              </div>
            </div>

            {/* Floating Widget 1: Security Scan */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass-dark p-5 rounded-2xl shadow-2xl border border-blue-500/30 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Security Status</p>
                  <p className="text-sm font-black text-white">SYSTEM SECURED</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Widget 2: Signature Status */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -left-12 glass-dark p-5 rounded-2xl shadow-2xl border border-white/10 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Key className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Remote Signing</p>
                  <p className="text-sm font-black text-white">ACTIVE</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Widget 3: Transaction */}
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-8 right-12 glass-dark p-6 rounded-3xl shadow-2xl border border-white/10 z-20"
            >
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Giao dịch mới nhất</p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                  <p className="text-sm font-black text-white">Ký số HĐ #8829</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative background glow behind dashboard */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-blue/20 blur-[120px] -z-10 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
