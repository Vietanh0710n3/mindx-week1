# 🔐 Luồng Xác Thực Người Dùng (Authentication Flow)

## 1. Giới thiệu
Ứng dụng sử dụng **OpenID Connect** để xác thực người dùng thông qua dịch vụ [https://id-dev.mindx.edu.vn](https://id-dev.mindx.edu.vn).

---

## 2. Luồng hoạt động

### Bước 1: Người dùng chọn đăng nhập
- Frontend chuyển hướng người dùng đến trang đăng nhập của **MindX ID** (OpenID Provider).  
- URL đăng nhập chứa các tham số client ID, redirect URI, và scope.

### Bước 2: Người dùng xác thực
- Người dùng đăng nhập trên trang MindX ID.  
- Sau khi xác thực thành công, hệ thống OpenID redirect về frontend với **authorization code**.

### Bước 3: Frontend trao đổi code lấy token
- Frontend gửi code đến backend qua API `/api/auth/callback`.  
- Backend gọi đến OpenID token endpoint để lấy **access_token** và **id_token**.

### Bước 4: Backend xác thực và lưu session
- Backend xác minh `id_token` (chữ ký + thời hạn).  
- Nếu hợp lệ, backend tạo hoặc cập nhật user trong database, rồi trả token JWT cho frontend.

### Bước 5: Gửi token khi gọi API
Frontend lưu token (localStorage / cookie) và gửi kèm trong header mỗi lần gọi API:
```http
Authorization: Bearer <accessToken>
```

---

## 3. Middleware xác thực trên backend
Ví dụ (Node.js + Express):
```js
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}
```

---

## 4. Sau khi đăng nhập
- Người dùng có thể truy cập các route được bảo vệ (protected routes).  
- Nếu token hết hạn, người dùng được chuyển hướng lại trang đăng nhập OpenID.  
- Logout sẽ xóa token khỏi client và redirect về trang chủ.

---

## 5. Ghi chú
- Mọi token cần được bảo mật qua HTTPS.  
- Cấu hình `redirect_uri` phải trùng với domain thật trên Azure.  
- Có thể mở rộng bằng Refresh Token nếu cần duy trì phiên lâu hơn.
