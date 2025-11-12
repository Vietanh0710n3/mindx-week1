BÁO CÁO TIẾN ĐỘ: TRIỂN KHAI ỨNG DỤNG CONTAINER LÊN AZURE


Ngày báo cáo: 11/11/2026

Người thực hiện: Nguyễn Việt Anh

Dịch vụ liên quan: Azure Web App, Azure Container Registry (ACR)

2. TÓM TẮT HIỆN TRẠNG (EXECUTIVE SUMMARY)
    Đã làm được:

        ● Ứng dụng web Node.js/Express đã được đóng gói thành công dưới dạng Docker Container và triển khai lên môi trường Cloud Azure thông qua HTTPS. Tiến độ đã đạt được mục tiêu quan trọng nhất là thiết lập quy trình Triển khai Liên tục (Continuous Deployment – CD) dựa trên Container.

        ● Đã có thể buil và push image lên (Cập nhật theo phiên bản (VD: v1, v2, v3) để có thể dễ dàng lựa chọn và rollback lại khi cần thiết)

    Chưa làm được:
        
        ● Chưa xác thực được tích hợp và hoạt động bằng OpenID với https://id-dev.mindx.edu.vn.

        ● Chưa dùng kubernetes để deploy(Vì chưa fix được lỗi OpenID nên chưa làm bước này)

        ● Chưa gắn tên miền riêng

2. CHI TIẾT CÁC BƯỚC TRIỂN KHAI

2.1. Đóng gói và Lưu trữ Container (Dockerization)

Hạng mục Chi tiết Vai trò

Dockerfile Đã sử dụng Dockerfile để đóng gói ứng dụng Node.js/Express thành Image. Đảm bảo môi trường runtime nhất quán, độc lập với hệ thống.

Image Registry Azure Container Registry (ACR): vanh0710.azurecr.io Nơi lưu trữ an toàn Image Docker của ứng dụng, là nguồn kéo Image của WebApp.

Thao tác Push Đã thực hiện docker build, docker tag, và docker push thành công lên ACR. 

2.2. Cấu hình Dịch vụ Azure

Dịch vụ Cấu hình Mục đích

Web App Web App for Containers (Linux) Nền tảng PaaS (Platform as a Service) để chạy Container, giảm thiểu quản lý hạ tầng máy chủ.

App Service Plan (ASP) [Tên ASP của bạn] Cung cấp tài nguyên CPU/RAM/Storage chuyên dụng cho Web App.

Image Source Azure Container Registry (vanh0710) Chỉ định Web App kéo Image :lựa chọn phiên bản image từ ACR về để chạy.

3. KẾT LUẬN VÀ KIỂM TRA

● Link video demo login: https://drive.google.com/file/d/1j9UTUy0KZTGx6Y-z7bt73_deL5EI3SiQ/view?usp=drive_link

● Link Ứng dụng Đã Deploy: [mindx-frontend-app.azurewebsites.net](https://mindx-frontend-app.azurewebsites.net/)