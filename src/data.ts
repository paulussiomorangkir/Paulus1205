import { Program, Tutorial, Testimonial, FAQ } from './types';

export const programs: Program[] = [
  {
    id: '1',
    title: 'Landing Page Template Responsive',
    description: 'Template Landing Page modern yang dibangun murni menggunakan HTML5 dan CSS3. Sangat ringan dan mudah dikustomisasi.',
    price: 150000,
    category: 'Web',
    image: 'https://picsum.photos/seed/web1/800/600',
    tags: ['HTML5', 'CSS3', 'Responsive']
  },
  {
    id: '2',
    title: 'E-Commerce Frontend Starter Kit',
    description: 'Kumpulan komponen UI untuk toko online, mulai dari header, product grid, hingga footer menggunakan HTML semantik.',
    price: 250000,
    category: 'Web',
    image: 'https://picsum.photos/seed/web2/800/600',
    tags: ['HTML', 'UI Kit', 'Frontend']
  }
];

export const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Panduan Lengkap HTML5: Dari Nol Hingga Mahir',
    excerpt: 'Pelajari dasar-dasar HTML5, elemen semantik, dan cara membangun struktur web yang modern dan SEO-friendly.',
    content: `
      <div class="space-y-8">
        <p class="text-lg leading-relaxed">HTML (HyperText Markup Language) adalah tulang punggung dari setiap halaman web yang Anda kunjungi. Tanpa HTML, web hanyalah sekumpulan teks tanpa struktur. Dalam panduan ini, kita akan menyelami dunia HTML5.</p>
        
        <div class="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
          <img src="https://picsum.photos/seed/html-pro-1/1200/600" alt="Professional HTML Coding" class="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
            <p class="text-white font-bold text-xl">Struktur Kode HTML5 yang Bersih dan Modern</p>
          </div>
        </div>

        <div class="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800">
          <h3 class="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-300">Apa itu HTML5?</h3>
          <p>HTML5 adalah standar terbaru untuk HTML. Ini bukan hanya tentang tag baru, tetapi juga tentang API baru yang memungkinkan pembuatan aplikasi web yang kaya tanpa plugin tambahan seperti Flash.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img src="https://picsum.photos/seed/html5-shield/600/600" alt="HTML5 Logo" class="rounded-3xl shadow-xl w-full object-cover" />
          <div class="flex flex-col justify-center">
            <h3 class="text-3xl font-black mb-4">Kekuatan HTML5</h3>
            <p class="text-slate-600 dark:text-slate-400">HTML5 membawa revolusi dalam cara kita membangun web, memberikan dukungan native untuk video, audio, dan grafik vektor (SVG).</p>
          </div>
        </div>

        <h3 class="text-3xl font-black">1. Elemen Dasar</h3>
        <p>Setiap elemen HTML dimulai dengan tag pembuka dan diakhiri dengan tag penutup. Di dalamnya terdapat konten yang ingin ditampilkan.</p>
        
        <div class="bg-slate-900 rounded-2xl p-6 overflow-hidden">
          <div class="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="text-xs text-slate-500 font-mono ml-2">index.html</span>
          </div>
          <pre class="text-emerald-400 font-mono text-sm"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Halaman Saya&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Halo Dunia!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>

        <img src="https://picsum.photos/seed/web-tech-sphere/1200/600" alt="Web Technologies Ecosystem" class="rounded-[2.5rem] shadow-2xl w-full object-cover" />

        <h3 class="text-3xl font-black">2. Elemen Semantik</h3>
        <p>HTML5 memperkenalkan elemen semantik seperti <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;article&gt;</code>, dan <code>&lt;section&gt;</code>. Elemen ini membantu mesin pencari (SEO) memahami struktur konten Anda.</p>

        <div class="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-3xl border border-amber-100 dark:border-amber-800">
          <h4 class="font-bold mb-2">💡 Tips Pro:</h4>
          <p>Selalu gunakan elemen semantik daripada sekadar <code>&lt;div&gt;</code> untuk meningkatkan aksesibilitas web Anda.</p>
        </div>

        <h3 class="text-3xl font-black">3. Mencoba Kode (Interactive)</h3>
        <p>Gunakan editor di bawah ini untuk mencoba kode HTML Anda sendiri!</p>
      </div>
    `,
    author: 'Admin Horas Coding',
    date: '23 Maret 2026',
    category: 'Coding',
    readTime: '15 Menit',
    image: 'https://picsum.photos/seed/html-master/800/600'
  },
  {
    id: '2',
    title: 'Menguasai Formulir HTML: Validasi dan Input Modern',
    excerpt: 'Pelajari cara membuat formulir yang interaktif, aman, dan memiliki pengalaman pengguna yang luar biasa.',
    content: `
      <div class="space-y-8">
        <p class="text-lg leading-relaxed">Formulir adalah cara utama pengguna berinteraksi dengan aplikasi web Anda. Dari login hingga pendaftaran, penguasaan formulir sangatlah krusial.</p>

        <img src="https://picsum.photos/seed/html-form/1200/600" alt="HTML Forms" class="rounded-[2.5rem] shadow-2xl w-full object-cover" />

        <h3 class="text-3xl font-black">Tipe Input Modern</h3>
        <p>HTML5 menyediakan berbagai tipe input yang secara otomatis divalidasi oleh browser, seperti <code>email</code>, <code>date</code>, <code>number</code>, dan <code>color</code>.</p>

        <div class="bg-slate-900 rounded-2xl p-6 overflow-hidden">
          <pre class="text-emerald-400 font-mono text-sm"><code>&lt;form action="/submit" method="POST"&gt;
  &lt;label for="email"&gt;Email:&lt;/label&gt;
  &lt;input type="email" id="email" name="email" required&gt;
  
  &lt;label for="birthday"&gt;Tanggal Lahir:&lt;/label&gt;
  &lt;input type="date" id="birthday" name="birthday"&gt;
  
  &lt;button type="submit"&gt;Kirim&lt;/button&gt;
&lt;/form&gt;</code></pre>
        </div>

        <h3 class="text-3xl font-black">Validasi Sisi Klien</h3>
        <p>Anda dapat menggunakan atribut seperti <code>required</code>, <code>minlength</code>, dan <code>pattern</code> untuk memastikan data yang dikirimkan pengguna sesuai dengan format yang diharapkan.</p>

        <img src="https://picsum.photos/seed/coding-validation/1200/600" alt="Form Validation" class="rounded-[2.5rem] shadow-2xl w-full object-cover" />
      </div>
    `,
    author: 'Admin Horas Coding',
    date: '23 Maret 2026',
    category: 'Coding',
    readTime: '12 Menit',
    image: 'https://picsum.photos/seed/html-form-thumb/800/600'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    role: 'Fullstack Developer',
    content: 'Program E-Commerce Pro benar-benar membantu saya menyelesaikan proyek klien dalam waktu singkat. Kodenya sangat rapi!',
    avatar: 'https://picsum.photos/seed/budi/100/100'
  },
  {
    id: '2',
    name: 'Siti Aminah',
    role: 'Mahasiswa IT',
    content: 'Tutorial di sini sangat mudah dipahami. Penjelasannya mendalam tapi tetap ramah untuk pemula seperti saya.',
    avatar: 'https://picsum.photos/seed/siti/100/100'
  },
  {
    id: '3',
    name: 'Andi Wijaya',
    role: 'Freelancer',
    content: 'Sistem manajemen inventarisnya sangat stabil. Sangat direkomendasikan untuk pengembang yang butuh base code solid.',
    avatar: 'https://picsum.photos/seed/andi/100/100'
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Bagaimana cara membeli program?',
    answer: 'Anda dapat memilih program yang diinginkan, klik tombol download, dan ikuti instruksi pembayaran yang tersedia.'
  },
  {
    id: '2',
    question: 'Apakah saya mendapatkan update gratis?',
    answer: 'Ya, setiap pembelian program mencakup akses ke update versi terbaru selama 1 tahun.'
  },
  {
    id: '3',
    question: 'Apakah tutorial di sini gratis?',
    answer: 'Sebagian besar tutorial kami gratis untuk umum, namun ada beberapa tutorial eksklusif untuk pembeli program.'
  }
];
