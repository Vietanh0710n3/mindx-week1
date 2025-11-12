# 🧩 Hướng dẫn Setup Ứng dụng trên Azure Cloud

## 1. Giới thiệu
Mục tiêu: Thiết lập môi trường để chạy ứng dụng **Fullstack JS/TS** (bao gồm backend và frontend) trên **Azure Cloud**.

---

## 2. Yêu cầu môi trường
Trước khi bắt đầu, cần cài đặt:
- **Node.js** >= 18  
- **Docker & Docker Compose**  
- **Azure CLI**  
- Tài khoản Azure có quyền tạo Resource Group, App Service, và ACR  

---

## 3. Cài đặt local
```bash
# Clone repo
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# Cài dependencies
npm install
```

---

## 4. Cấu hình môi trường
Tạo file `.env` dựa trên `.env.example`:

```bash
cp .env.example .env
```

Cập nhật các giá trị cần thiết:
```env
PORT=8080
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-secret-key>
OPENID_URL=https://id-dev.mindx.edu.vn
```

---

## 5. Chạy thử ứng dụng local
```bash
npm run dev
```
Ứng dụng sẽ chạy tại:
```
http://localhost:8080
```
---

## 6. Kiểm tra
- API backend hoạt động bình thường qua endpoint `/api/health`.  
- Frontend React hiển thị giao diện chính và có thể truy cập trang đăng nhập.
