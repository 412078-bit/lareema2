# ⚡ 快速參考卡 (Quick Reference)

## 🎯 5 分鐘快速開始

### 1️⃣ GitHub Pages 部署（1 分鐘）
```
✓ 倉庫已就緒，代碼已推送
✓ 打開倉庫 Settings → Pages
✓ 選擇 main 分支，點 Save
✓ 等待 1-2 分鐘，訪問：
  https://412078-bit.github.io/lareema2/
```

### 2️⃣ Google Sheets 設置（2 分鐘）
```
1. 新建 Google Sheet
2. 副檔名 → Apps Script
3. 複製 google-apps-script.gs 代碼
4. 執行 testScript()
5. 部署為網路應用
6. 複製部署 URL
```

### 3️⃣ 連接前端（1 分鐘）
```
1. 打開前面的 GitHub Pages 網址
2. 貼入 Google Apps Script URL
3. 點「儲存」
4. 完成！✅
```

---

## 📋 常用命令

### 本地測試
```bash
# 方式 1: Python
python -m http.server 8000

# 方式 2: Node.js
npx http-server

# 然後訪問：http://localhost:8000
```

### Git 操作
```bash
# 推送更改
git add .
git commit -m "描述"
git push

# 查看狀態
git status
git log --oneline
```

### Google Apps Script 調試
```javascript
// 在 Apps Script 編輯器中執行

// 測試
testScript()

// 查看所有資料
getAllData()

// 清空資料（危險！）
clearSheet()
```

---

## 🔗 重要 URLs

| 資源 | 網址 |
|-----|------|
| 前端應用 | https://412078-bit.github.io/lareema2/ |
| 倉庫 | https://github.com/412078-bit/lareema2 |
| 完整文檔 | [README-ZH.md](./README-ZH.md) |
| 詳細教程 | [TUTORIAL.md](./TUTORIAL.md) |
| GAS 指南 | [gs-deployment-guide.md](./gs-deployment-guide.md) |

---

## 🧪 測試 API（複製即用）

```
# 用戶
https://jsonplaceholder.typicode.com/users

# 文章
https://jsonplaceholder.typicode.com/posts

# 評論
https://jsonplaceholder.typicode.com/comments

# GitHub 用戶
https://api.github.com/users

# 所有國家
https://restcountries.com/v3.1/all
```

---

## ❌ 快速排障

| 問題 | 解決方案 |
|-----|--------|
| **頁面 404** | 確認 Pages 已啟用，等待部署 |
| **CORS 錯誤** | 使用支持 CORS 的 API |
| **資料沒保存** | 檢查 GAS URL，執行 testScript() |
| **GAS 授權失敗** | 點「檢閱權限」，允許存取 |
| **API 無回應** | 直接在瀏覽器打開 API URL 測試 |

---

## 📞 求助

1. **檢查日誌**
   - 開發者工具：F12 → Console
   - GAS 編輯器：執行日誌

2. **查看文檔**
   - [完整說明](./README-ZH.md)
   - [詳細教程](./TUTORIAL.md)
   - [GAS 指南](./gs-deployment-guide.md)

3. **提交 Issue**
   - GitHub Issues

---

## 🎨 自定義

### 改 UI 顏色
編輯 `style.css`：
```css
/* 紫色漸層 → 藍色、綠色等 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### 改標題
編輯 `index.html` 第 9 行：
```html
<title>你的標題</title>
```

### 改預設 API
編輯 `index.html` 第 27 行：
```html
value="你的 API URL"
```

---

## 📊 功能總結

```
✅ 前端網頁
   ├─ HTML 頁面（index.html）
   ├─ CSS 樣式（style.css）
   └─ JavaScript 邏輯（app.js）

✅ API 集成
   ├─ 支持任何 JSON API
   ├─ Fetch API 調用
   └─ 錯誤處理

✅ Google Sheets 存儲
   ├─ Google Apps Script（google-apps-script.gs）
   ├─ 自動表頭
   └─ 時間戳記錄

✅ GitHub Pages 部署
   ├─ 自動 HTTPS
   ├─ 零配置
   └─ 免費無限
```

---

## 💡 進階提示

```
1. 可以多次「取得資料」，每次都會累積到 Sheets
2. 搜尋在本地進行，不消耗 API 配額
3. 設置會自動保存到 localStorage
4. 可以修改 GAS 以支持其他功能
5. 可以自定義 Google Sheet 名稱
```

---

## 🔄 更新流程

```
1. 修改文件（HTML/CSS/JS）
2. git add . && git commit -m "描述" && git push
3. GitHub Pages 自動更新（1-2 分鐘）
4. 刷新瀏覽器查看更改
```

---

**祝您使用愉快！🎉**

*更新於：2026-06-11*
