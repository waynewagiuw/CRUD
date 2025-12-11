**Project ini adalah aplikasi CRUD full-stack dengan:**<br>

-Backend Node.js + Express<br>
-Frontend React + Tailwind + DaisyUI<br>
-Routing react-router-dom<br>
-Icon lucide-react<br>
-Database Supabase Realtime<br>

**A. Backend (Node.js + Express + Supabase/PostgreSQL)**<br>

REST API untuk:<br>

-Menambah Data<br>
-Mengambil Data<br>
-Mengupdate Data<br>
-Menghapus Data<br>
<br>
Routing modular<br>
Middleware Express<br>
Koneksi ke Supabase PostgreSQL<br>
Struktur clean & mudah dikembangkan<br>

*Dependency yang digunakan*<br>
-express	: Web server backend<br>
-cors     :	Agar API bisa diakses dari domain frontend<br>
-dotenv   :	Menyimpan environment key secara aman (.env)<br>
-pg / @supabase/supabase-js	: Koneksi ke database Supabase<br>
-nodemon  :	Auto restart ketika file berubah<br>

**B. Frontend (React + Vite + Tailwind + DaisyUI + Supabase)**<br>

-Halaman Clients (/clients)<br>
-Halaman Products (/products)<br>
-CRUD Data<br>
-Modal Form<br>
-Search<br>
-Responsive Navbar<br>
-Integrasi penuh dengan Supabase<br>

*Dependency yang digunakan*<br>
-react-router-dom     	: Route /clients & /products<br>
-@supabase/supabase-js	: Koneksi realtime Supabase<br>
-tailwindcss	          : Styling utility<br>
-daisyui	              : UI components (input, modal, table)<br>
-lucide-react	          : Icon <br>
