# 🚀 Hướng dẫn Triển khai (Deployment) lên Azure Cloud

## 1. Chuẩn bị
Trước khi deploy, đảm bảo bạn đã:
- Đăng nhập Azure CLI:  
  ```bash
  az login
  ```
- Tạo sẵn **Resource Group** và **Azure Container Registry (ACR)**.

---

## 2. Build và Push Docker Image
```bash
# Build image backend
docker build -t mindx-backend:v1 .

# Tag image để push lên ACR
docker tag mindx-backend:v1 <acr-name>.azurecr.io/mindx-backend:v1

# Đăng nhập ACR và push image
az acr login --name <acr-name>
docker push <acr-name>.azurecr.io/mindx-backend:v1
```

---

## 3. Deploy lên Azure App Service
```bash
az webapp create   --resource-group <resource-group>   --plan <appservice-plan>   --name <app-name>   --deployment-container-image-name <acr-name>.azurecr.io/mindx-backend:v1
```

---

## 4. Cấu hình HTTPS
Bật HTTPS cho toàn bộ endpoint:
```bash
az webapp update   --set httpsOnly=true   --name <app-name>   --resource-group <resource-group>
```

---

## 5. Kiểm tra sau khi deploy
- Truy cập API: `https://<app-name>.azurewebsites.net/api/health`  
- Kiểm tra frontend React web app trên domain HTTPS.  
- Xác thực hoạt động đăng nhập thông qua OpenID.
