/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  ShoppingBag, 
  BookOpen, 
  Atom, 
  Monitor, 
  Cpu, 
  Search, 
  ChevronRight, 
  Github, 
  Twitter, 
  Linkedin,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  Star,
  Download,
  Clock,
  Moon,
  Sun,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  Mail,
  Send,
  CheckCircle2,
  MessageCircle,
  Play,
  Terminal
} from 'lucide-react';
import { programs, tutorials, testimonials, faqs } from './data';
import { Program, Tutorial, Testimonial, FAQ } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'store' | 'tutorials' | 'contact'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cart, setCart] = useState<Program[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addToCart = (program: Program) => {
    if (!cart.some(item => item.id === program.id)) {
      setCart([...cart, program]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection onNavigate={setActiveTab} addToCart={addToCart} onSelectTutorial={setSelectedTutorial} />;
      case 'store':
        return <StoreSection addToCart={addToCart} />;
      case 'tutorials':
        return <TutorialsSection onSelectTutorial={setSelectedTutorial} selectedTutorial={selectedTutorial} onBack={() => setSelectedTutorial(null)} />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection onNavigate={setActiveTab} addToCart={addToCart} onSelectTutorial={setSelectedTutorial} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#030712] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-400 z-[60] origin-left" style={{ scaleX }} />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-[#030712]/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('home'); setSelectedTutorial(null); }}>
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="bg-indigo-600 p-1.5 rounded-xl shadow-lg shadow-indigo-500/40"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M2 14c0 0 4-10 10-10s10 10 10 10" />
                  <path d="M4 14v6h16v-6" />
                  <path d="M12 4v16" />
                </svg>
              </motion.div>
              <span className="text-xl font-black tracking-tighter uppercase italic">HORAS <span className="text-indigo-600 dark:text-indigo-400">CODING</span></span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['home', 'store', 'tutorials', 'contact'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-sm font-semibold capitalize transition-all relative py-1 ${activeTab === tab ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'}`}
                >
                  {tab === 'home' ? 'Beranda' : tab === 'store' ? 'Program' : tab === 'tutorials' ? 'Tutorial' : 'Kontak'}
                  {activeTab === tab && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                  )}
                </button>
              ))}
              
              <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-8">
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#030712]">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsCartOpen(true)} className="relative p-2">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-4">
                <button onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }} className="block w-full text-left text-lg font-medium">Beranda</button>
                <button onClick={() => { setActiveTab('store'); setIsMenuOpen(false); }} className="block w-full text-left text-lg font-medium">Program</button>
                <button onClick={() => { setActiveTab('tutorials'); setIsMenuOpen(false); }} className="block w-full text-left text-lg font-medium">Tutorial</button>
                <button onClick={() => { setActiveTab('contact'); setIsMenuOpen(false); }} className="block w-full text-left text-lg font-medium">Kontak</button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="flex items-center gap-2 text-lg font-medium">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-neutral-950 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" /> Keranjang Belanja
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
                    <ShoppingBag className="w-16 h-16 opacity-20" />
                    <p>Keranjang Anda masih kosong.</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); setActiveTab('store'); }}
                      className="text-neutral-900 dark:text-white font-bold underline"
                    >
                      Mulai Belanja
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-neutral-500 text-xs mb-2">{item.category}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm">Rp {item.price.toLocaleString('id-ID')}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-neutral-500">Total Pembayaran</span>
                    <span className="text-2xl font-bold">Rp {cartTotal.toLocaleString('id-ID')}</span>
                  </div>
                  <button className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Checkout Sekarang
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Atom className="w-8 h-8 text-indigo-400" />
                <span className="text-2xl font-black uppercase italic">BETA <span className="text-indigo-400">CODING</span></span>
              </div>
              <p className="text-neutral-400 max-w-sm text-lg leading-relaxed">
                Platform terpercaya untuk solusi software berkualitas tinggi dan pusat pembelajaran teknologi modern.
              </p>
              <div className="flex gap-4 mt-8">
                <SocialIcon icon={<Github />} />
                <SocialIcon icon={<MessageCircle />} />
                <SocialIcon icon={<Linkedin />} />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Layanan</h4>
              <ul className="space-y-4 text-neutral-400">
                <li><button onClick={() => setActiveTab('store')} className="hover:text-white transition-colors">Katalog Program</button></li>
                <li><button onClick={() => setActiveTab('tutorials')} className="hover:text-white transition-colors">Tutorial Coding</button></li>
                <li><button className="hover:text-white transition-colors">Jasa Pembuatan Web</button></li>
                <li><button className="hover:text-white transition-colors">Konsultasi IT</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Bantuan</h4>
              <ul className="space-y-4 text-neutral-400">
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">Hubungi Kami</button></li>
                <li><button className="hover:text-white transition-colors">FAQ</button></li>
                <li><button className="hover:text-white transition-colors">Syarat & Ketentuan</button></li>
                <li><button className="hover:text-white transition-colors">Kebijakan Privasi</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© 2026 Horas Coding. Dibuat dengan ❤️ untuk komunitas developer.</p>
            <div className="flex gap-8">
              <span>Indonesia</span>
              <span>English</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -3, scale: 1.1 }}
      className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-neutral-700 transition-colors"
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
    </motion.div>
  );
}

function HomeSection({ onNavigate, addToCart, onSelectTutorial }: { onNavigate: (tab: any) => void, addToCart: (p: Program) => void, onSelectTutorial: (t: Tutorial) => void }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8"
              >
                Code. <br />
                Build. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 italic">Succeed.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-lg leading-relaxed"
              >
                Dapatkan kode sumber profesional dan tutorial mendalam untuk mempercepat karir teknologi Anda.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <button 
                  onClick={() => onNavigate('store')}
                  className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-500/25"
                >
                  Eksplor Program <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onNavigate('tutorials')}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                >
                  Lihat Tutorial
                </button>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-500/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 px-4 py-1 rounded-full text-[10px] font-mono text-slate-500">localhost:3000</div>
                </div>
                <div className="space-y-4 font-mono text-sm overflow-hidden">
                  <p className="text-indigo-500">const <span className="text-violet-500">project</span> = {'{'}</p>
                  <p className="pl-4 text-slate-400">name: <span className="text-emerald-500">"Horas Coding"</span>,</p>
                  <p className="pl-4 text-slate-400">status: <span className="text-emerald-500">"Experimental"</span>,</p>
                  <p className="pl-4 text-slate-400">version: <span className="text-emerald-500">"1.0.0-beta"</span>,</p>
                  <p className="text-indigo-500">{'}'};</p>
                  <div className="h-40 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <Atom className="w-12 h-12 text-indigo-500/20 animate-spin-slow" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatItem number="50+" label="Program Website" />
            <StatItem number="100+" label="Tutorial Gratis" />
            <StatItem number="5K+" label="Siswa Terdaftar" />
            <StatItem number="4.9" label="Rating Kepuasan" />
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-6">Program Unggulan</h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Koleksi program terbaik yang dirancang untuk performa tinggi dan skalabilitas maksimal.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('store')}
              className="group flex items-center gap-2 font-bold text-lg"
            >
              Lihat Katalog Lengkap 
              <motion.span whileHover={{ x: 5 }}><ArrowRight className="w-5 h-5" /></motion.span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {programs.length > 0 ? (
              programs.slice(0, 3).map(program => (
                <ProgramCard key={program.id} program={program} onAddToCart={() => addToCart(program)} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-slate-100 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">Belum ada program unggulan yang tersedia saat ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Tutorials Preview */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-6">Tutorial Terbaru</h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Pelajari teknologi terbaru dengan panduan praktis yang mudah diikuti.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('tutorials')}
              className="group flex items-center gap-2 font-bold text-lg"
            >
              Lihat Semua Tutorial 
              <motion.span whileHover={{ x: 5 }}><ArrowRight className="w-5 h-5" /></motion.span>
            </button>
          </div>
          <div className="space-y-12">
            {tutorials.slice(0, 2).map(tutorial => (
              <TutorialCard 
                key={tutorial.id} 
                tutorial={tutorial} 
                onClick={() => {
                  onSelectTutorial(tutorial);
                  onNavigate('tutorials');
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-neutral-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Apa Kata Mereka?</h2>
            <p className="text-neutral-400 text-xl">Bergabunglah dengan ribuan developer yang telah sukses bersama kami.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <motion.div 
                key={t.id}
                whileHover={{ y: -10 }}
                className="bg-neutral-800 p-10 rounded-[2rem] relative"
              >
                <div className="absolute top-8 right-8 text-neutral-700">
                  <Star className="w-12 h-12 fill-current" />
                </div>
                <p className="text-lg mb-8 relative z-10 italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center">Pertanyaan Umum</h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-neutral-100 dark:bg-neutral-900 rounded-[3rem] mx-4 sm:mx-8 mb-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Dapatkan Update Terbaru</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12">
            Berlangganan newsletter kami untuk mendapatkan tutorial eksklusif dan promo menarik setiap minggu.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Email Anda" 
              className="flex-grow px-6 py-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <button className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity">
              Berlangganan
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2">{number}</div>
      <div className="text-neutral-500 font-medium">{label}</div>
    </div>
  );
}

function FAQItem({ faq }: { faq: FAQ, key?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center text-left hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
      >
        <span className="font-bold text-lg">{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StoreSection({ addToCart }: { addToCart: (p: Program) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-20 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Katalog Program</h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400">
          Pilih dari berbagai solusi software siap pakai untuk mempercepat pengembangan bisnis Anda.
        </p>
      </div>

      <div className="mb-16 flex flex-col md:flex-row gap-6 items-center justify-between sticky top-20 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari program impian Anda..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-100 dark:bg-neutral-900 border-none rounded-xl focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          {['Semua', 'Web', 'Mobile', 'Desktop', 'AI'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900' : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPrograms.map(program => (
            <ProgramCard key={program.id} program={program} onAddToCart={() => addToCart(program)} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center">
          <Search className="w-16 h-16 mx-auto text-neutral-300 mb-6" />
          <h3 className="text-2xl font-bold mb-2">Tidak ada hasil ditemukan</h3>
          <p className="text-neutral-500">Coba gunakan kata kunci lain atau reset filter.</p>
        </div>
      )}
    </div>
  );
}

function TutorialsSection({ onSelectTutorial, selectedTutorial, onBack }: { onSelectTutorial: (t: Tutorial) => void, selectedTutorial: Tutorial | null, onBack: () => void }) {
  if (selectedTutorial) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali ke Daftar Tutorial
        </button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 text-xs font-bold mb-6">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-widest">{selectedTutorial.category}</span>
            <div className="flex items-center gap-1.5 text-slate-500"><Clock className="w-4 h-4" /> {selectedTutorial.readTime}</div>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-500 uppercase tracking-widest">{selectedTutorial.date}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{selectedTutorial.title}</h1>
          
          <div className="flex items-center gap-4 mb-12 p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {selectedTutorial.author[0]}
            </div>
            <div>
              <p className="font-bold">{selectedTutorial.author}</p>
              <p className="text-sm text-slate-500">Penulis Konten</p>
            </div>
          </div>

          <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
            <img 
              src={selectedTutorial.image} 
              alt={selectedTutorial.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:tracking-tight
              prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed
              prose-img:rounded-[2rem] prose-img:shadow-xl
              prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:p-6
              prose-strong:text-slate-900 dark:prose-strong:text-white mb-20"
            dangerouslySetInnerHTML={{ __html: selectedTutorial.content }}
          />

          <div className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-20">
            <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
              <Terminal className="w-8 h-8 text-indigo-600" /> Tes Kode Anda
            </h3>
            <CodePlayground initialCode={`<h1>Halo Horas Coding!</h1>\n<p>Coba ubah teks ini dan lihat hasilnya.</p>\n<button style="background: #4f46e5; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Klik Saya</button>`} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-20">
        <h1 className="text-5xl font-bold mb-6">Pusat Tutorial</h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Tingkatkan skill coding Anda dengan panduan langkah-demi-langkah dari para praktisi industri.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          {tutorials.length > 0 ? (
            tutorials.map(tutorial => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} onClick={() => onSelectTutorial(tutorial)} />
            ))
          ) : (
            <div className="py-20 text-center bg-slate-100 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Belum ada tutorial yang tersedia saat ini.</p>
            </div>
          )}
        </div>
        <div className="space-y-12">
          <div className="bg-neutral-100 dark:bg-neutral-900 p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold mb-6">Kategori Populer</h3>
            <div className="flex flex-wrap gap-3">
              {['React', 'Node.js', 'Python', 'DevOps', 'UI/UX', 'Mobile'].map(tag => (
                <button key={tag} className="px-4 py-2 bg-white dark:bg-neutral-800 rounded-xl text-sm font-medium hover:shadow-md transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-neutral-900 text-white p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold mb-4">Ingin Menjadi Penulis?</h3>
            <p className="text-neutral-400 mb-6 text-sm">Bagikan pengetahuan Anda dan dapatkan penghasilan tambahan.</p>
            <button className="w-full bg-white text-neutral-900 py-3 rounded-xl font-bold">Daftar Sekarang</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-bold mb-8">Hubungi Kami</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed">
            Punya pertanyaan tentang program kami atau butuh bantuan teknis? Tim kami siap membantu Anda 24/7.
          </p>
          
          <div className="space-y-8">
            <ContactInfoItem icon={<Mail />} title="Email" detail="paulusssimorangkir@gmail.com" />
            <ContactInfoItem icon={<MessageCircle />} title="WhatsApp" detail="+62 838-2147-4643" />
            <ContactInfoItem icon={<Linkedin />} title="LinkedIn" detail="Paulus Simorangkir" />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-10 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 shadow-xl">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Pesan Terkirim!</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">Terima kasih telah menghubungi kami. Kami akan membalas pesan Anda dalam waktu 24 jam.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-3 rounded-xl font-bold"
              >
                Kirim Pesan Lain
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Nama Lengkap</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Email</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Subjek</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Pesan</label>
                <textarea required rows={5} className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white" />
              </div>
              <button type="submit" className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Kirim Pesan <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center text-neutral-900 dark:text-white">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      <div>
        <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{title}</h4>
        <p className="text-xl font-bold">{detail}</p>
      </div>
    </div>
  );
}

function ProgramCard({ program, onAddToCart }: { program: Program, onAddToCart: () => void, key?: any }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all group"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={program.image} 
          alt={program.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          {program.category}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{program.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">{program.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {program.tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block mb-1">Harga</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">Rp {program.price.toLocaleString('id-ID')}</span>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onAddToCart}
            className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function TutorialCard({ tutorial, onClick }: { tutorial: Tutorial, onClick: () => void, key?: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="flex flex-col md:flex-row gap-10 group cursor-pointer"
    >
      <div className="w-full md:w-64 h-64 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg">
        <img 
          src={tutorial.image} 
          alt={tutorial.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col justify-center py-4">
        <div className="flex items-center gap-4 text-xs font-bold mb-4">
          <span className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3 py-1 rounded-full uppercase tracking-widest">{tutorial.category}</span>
          <div className="flex items-center gap-1.5 text-neutral-500"><Clock className="w-4 h-4" /> {tutorial.readTime}</div>
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <span className="text-neutral-500 uppercase tracking-widest">{tutorial.date}</span>
        </div>
        <h3 className="text-3xl font-bold mb-4 group-hover:text-neutral-500 transition-colors leading-tight">{tutorial.title}</h3>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-2 leading-relaxed">{tutorial.excerpt}</p>
        <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
          Lanjut Membaca <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

function CodePlayground({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const [preview, setPreview] = useState(initialCode);

  const handleRun = () => {
    setPreview(code);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" /> Editor HTML
            </h4>
            <button 
              onClick={handleRun}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all"
            >
              <Play className="w-4 h-4" /> Jalankan
            </button>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl font-mono text-sm border-none focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            spellCheck={false}
          />
        </div>
        <div className="p-8 bg-slate-50 dark:bg-slate-950/50">
          <h4 className="font-bold mb-6 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-slate-400" /> Hasil Preview
          </h4>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-64 overflow-auto border border-slate-200 dark:border-slate-800">
            <div dangerouslySetInnerHTML={{ __html: preview }} />
          </div>
        </div>
      </div>
    </div>
  );
}
