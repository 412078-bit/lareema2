# 資料收集系統

## 📋 項目概述

一個完整的前端網頁系統，支持：
- ✅ 從任何 API 自動取得資料
- ✅ 實時資料預覽和搜尋
- ✅ 將資料保存到 Google Sheets
- ✅ 響應式設計，支援各種設備
- ✅ 本地存儲配置和設置

## 🎯 主要功能

### 1. **API 資料取得**
- 支援任何公開的 REST API
- 自動處理 JSON 和陣列格式
- 實時錯誤提示

### 2. **資料管理**
- 卡片式資料展示
- 搜尋過濾功能
- 記錄計數
- 一鍵清空

### 3. **Google Sheets 整合**
- 通過 Google Apps Script 儲存資料
- 自動添加時間戳和記錄編號
- 自動調整列寬

## 🚀 部署步驟

### 步驟 1: 部署前端到 GitHub Pages

```bash
# 1. 確保已在 GitHub 上建立倉庫
# 2. 在倉庫設置中啟用 GitHub Pages
# 3. 選擇主分支作為頁面來源
# 4. 網址為: https://[你的用戶名].github.io/lareema2/
```

### 步驟 2: 設置 Google Apps Script

#### 2.1 建立新的 Google Sheet
1. 訪問 [Google Sheets](https://sheets.google.com)
2. 建立新試算表，命名為 "資料收集系統"
3. 記下試算表 ID（URL 中 `/d/` 後面的部分）

#### 2.2 新增 Apps Script
1. 在試算表中點選 **副檔名 > Apps Script**
2. 刪除預設代碼，複製 [google-apps-script.gs](./google-apps-script.gs) 中的所有代碼
3. 點選 **儲存** (Ctrl+S)
4. 點選 **執行 > testScript** 來測試腳本
5. 選擇帳戶並授權

#### 2.3 部署為網路應用程式
1. 點選 **部署 > 新部署**
2. 類型選擇 **網路應用**
3. 執行為：選擇你的帳戶
4. 授予存取權限：所有人
5. 點選 **部署**
6. **複製部署 URL**（格式類似 `https://script.google.com/macros/d/[ID]/userweb`）

### 步驟 3: 配置前端

1. 打開 GitHub Pages 上部署的網址
2. 在「Google Apps Script 部署網址」欄位中貼上部署 URL
3. 在「API 網址」欄位中輸入任意公開 API（或使用預設的測試 API）
4. 點選「從 API 取得資料」測試連接

## 📖 使用指南

### 基本流程

1. **輸入 API 網址**
   - 預設使用 JSONPlaceholder 測試 API
   - 可輸入任何返回 JSON 的公開 API

2. **點選「從 API 取得資料」**
   - 系統會取得 API 數據
   - 在下方卡片式展示

3. **搜尋和篩選**
   - 使用搜尋框快速篩選資料
   - 支援任何欄位的模糊搜尋

4. **保存到 Google Sheets**
   - 點選「保存到 Google Sheets」按鈕
   - 資料將自動添加到試算表
   - 包含時間戳和記錄編號

### API 範例

#### JSONPlaceholder（已預設）
```
https://jsonplaceholder.typicode.com/users
https://jsonplaceholder.typicode.com/posts
https://jsonplaceholder.typicode.com/comments
```

#### 其他 API
- [OpenWeather API](https://openweathermap.org/api)
- [GitHub API](https://api.github.com)
- [REST Countries API](https://restcountries.com/v3.1/all)
- 等等...

## 🔧 常見問題

### Q: CORS 錯誤怎麼辦？

**A:** 如果遇到 CORS 錯誤，可以：
1. 使用支持 CORS 的 API（如 JSONPlaceholder）
2. 或在 GAS 中添加代理邏輯

### Q: 資料沒有保存到 Google Sheets？

**A:** 檢查：
1. Google Apps Script 部署 URL 是否正確
2. 授權是否完成
3. Google Sheet 是否正確建立
4. 檢查瀏覽器控制台的錯誤訊息

### Q: 如何修改 Google Sheet 工作表名稱？

**A:** 編輯 `google-apps-script.gs` 中的：
```javascript
const SHEET_NAME = '資料收集'; // 修改為你想要的名稱
```

## 📁 文件結構

```
lareema2/
├── index.html              # 主頁面
├── style.css              # 樣式檔案
├── app.js                 # 前端 JavaScript
├── google-apps-script.gs  # Google Apps Script 代碼
├── gs-deployment-guide.md # GAS 部署詳細指南
└── README.md              # 本文件
```

## 🌟 功能特性

### 前端特性
- 🎨 現代化 UI 設計
- 📱 完全響應式佈局
- 🔍 實時搜尋過濾
- 💾 本地存儲設置
- ⚡ 快速加載
- 🌐 零依賴（純原生 JavaScript）

### 後端特性
- ✅ 自動建立 Google Sheet
- ✅ 自動添加列標題
- ✅ 自動調整列寬
- ✅ 時間戳記錄
- ✅ 記錄編號
- ✅ 錯誤處理

## 🔐 安全性

- ✅ 所有資料通過 HTTPS 傳輸
- ✅ 前端無後端暴露
- ✅ Google Apps Script 提供額外安全層
- ⚠️ 避免在 API URL 中包含敏感訊息

## 📊 Google Sheets 結構

自動生成的表單將包含以下欄位：

| 時間戳 | 記錄編號 | [API 欄位] |
|-------|--------|-----------|
| 2026-06-11 10:30:45 | 1 | ... |
| 2026-06-11 10:31:12 | 2 | ... |

## 🎓 學習資源

- [Google Apps Script 文檔](https://developers.google.com/apps-script)
- [Fetch API 文檔](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [GitHub Pages 文檔](https://pages.github.com/)

## 💡 高級功能（可選）

### 1. 添加認證
在 GAS 中添加 API 金鑰驗證

### 2. 資料驗證
在保存前驗證資料格式

### 3. 計劃任務
使用 GAS 觸發器定時執行任務

### 4. 資料分析
在 Google Sheets 中添加圖表和統計

## 📝 更新日誌

### v1.0 (2026-06-11)
- ✅ 初始版本發布
- ✅ 支持 API 資料取得
- ✅ Google Sheets 整合
- ✅ GitHub Pages 部署

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📧 聯繫方式

有任何問題，請通過 GitHub Issues 聯繫。

---

**Happy Data Collection! 🎉**
