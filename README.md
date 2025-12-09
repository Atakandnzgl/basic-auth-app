<div align="center">

# 🔐 Basic Auth App  
Minimal, modern ve tam işlevli bir **Authentication + Profile Management** uygulaması  
Next.js 14, Prisma, NextAuth ve Tailwind ile geliştirilmiştir.

<br/>

![Next.js Badge](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Prisma Badge](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![NextAuth Badge](https://img.shields.io/badge/Auth-NextAuth-3C3C3C?style=for-the-badge&logo=auth0)
![Tailwind Badge](https://img.shields.io/badge/TailwindCSS-3EBFF8?style=for-the-badge&logo=tailwindcss)
![Typescript Badge](https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=typescript)

</div>

---

## 🌟 Özellikler

- 👤 **Kayıt Olma (Register)**  
- 🔑 **Giriş Yapma (Login) – NextAuth Credentials Provider**  
- 🔒 **Korumalı Sayfa (Protected Route) – `/profile`**  
- ✏️ **Profil Güncelleme (PUT /api/profile)**  
- 🔐 **Session Yönetimi (JWT + Cookies – NextAuth otomatik yönetir)**  
- 🎨 **Modern UI (Tailwind + Custom UI Components)**  
- 🧱 **App Router + Server/Client bileşen yapısı**

---

## 🖼️ UI Önizleme

> Buraya istersen ekran görüntüsü ekleyebilirsin.  
> Örneğin:


Eğer screenshot vermek istersen, ben sana modern auth ekran mockup’ı da üretebilirim.

---

## ⚙️ Teknolojiler

| Teknoloji | Açıklama |
|----------|----------|
| **Next.js 14** | App Router, Server Components |
| **NextAuth** | Credential tabanlı Auth |
| **Prisma ORM** | Database modelleri + migrations |
| **SQLite** | Lokal geliştirme DB |
| **TailwindCSS** | UI utility framework |
| **TypeScript** | Tip güvenliği |

---

## 📂 Proje Yapısı

```bash
src/
  app/
    (auth)/
      login/
        page.tsx
      register/
        page.tsx
      layout.tsx         # Ortak auth layout (UI upgrade)
    profile/
      page.tsx           # Protected + session check
      ProfileForm.tsx    # Profil güncelleme formu (client)
    api/
      register/
        route.ts         # POST /api/register
      profile/
        route.ts         # PUT /api/profile
      auth/
        [...nextauth]/
          route.ts       # NextAuth endpoint
  components/
    ui/
      button.tsx
      input.tsx
  lib/
    auth.ts              # NextAuth config
prisma/
  schema.prisma
.env
🚀 Kurulum
1️⃣ Repoyu klonla
git@github.com:Atakandnzgl/basic-auth-app.git
cd basic-auth-app
2️⃣ Bağımlılıkları yükle
npm install
3️⃣ Environment dosyası oluştur
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
4️⃣ Prisma migrate
npx prisma migrate dev --name init
5️⃣ Geliştirme sunucusu
npm run dev
🔌 API Endpoint'leri
POST /api/register

Kullanıcı oluşturur → bcrypt hash + email uniq kontrolü.

POST /api/auth/[...nextauth]

NextAuth login/logout/session endpoint'i.

PUT /api/profile

Giriş yapan kullanıcının profil adını günceller.