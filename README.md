# uts-pplos-a-2410511018

# Identitas
- Nama: Khairul Insan
- NIM: 2410511018
- Kelas: A

# Deskripsi Sistem
Sistem manajemen kos/sewa properti berbasis arsitektur microservices yang terdiri dari:
- Listing properti/kamar
- Booking kamar
- Pembayaran sewa
- Manajemen user (pemilik & penyewa)
- Riwayat pembayaran

# Arsitektur Sistem
Sistem terdiri dari beberapa service:
- API Gateway (Node.js)
- Auth Service (Node.js - JWT + OAuth)
- Property Service (Laravel 11 - PHP MVC)
- Booking Service (Node.js)
- Payment Service (Node.js)

# Peta Routing Gateway
Endpoint:
- /api/auth
- /api/properties
- /api/bookings
- /api/payments
Service:
- Auth Service
- Property Service
- Booking Service
- Payment Service

# Authentication
- JWT (Access Token 15 menit)
- Refresh Token (7 hari)
- OAuth Google (Authorization Code Flow)

# Cara Menjalankan
Jalankan Semua Service
- Gateway
cd gateway
npm install
npm run dev

- Auth Service
cd services/auth-service
npm install
npm run dev

- Property Service
cd services/property-service
composer install
php artisan serve --port=3002

- Booking Service
cd services/booking-service
npm install
npm run dev

- Payment Service
cd services/payment-service
npm install
npm run dev

# Laporan UTS
[Download Laporan UTS](docs/laporan-uts.pdf)

# Link video yt
https://youtu.be/qza5CJw_rec