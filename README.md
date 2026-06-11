# 📊 資料收集系統 (Data Collection System)

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://412078-bit.github.io/lareema2/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

完整的前端網頁系統，支援從 API 自動取得資料並存儲到 Google Sheets。

**[查看完整說明（繁體中文）](./README-ZH.md)** | **[Google Apps Script 部署指南](./gs-deployment-guide.md)**

---

## ✨ 核心功能

- 🌐 **API 資料取得** - 支援任何公開 REST API
- 📱 **響應式設計** - 完美適配各種設備
- 🔍 **實時搜尋** - 快速篩選和過濾資料
- 💾 **Google Sheets 整合** - 自動保存到試算表
- ⚡ **零依賴** - 純原生 JavaScript
- 🎨 **現代化 UI** - 美觀易用的使用者介面

## 🚀 快速開始

### 方式 1：使用 GitHub Pages（推薦）

1. Fork 或 Clone 此倉庫
2. 在 GitHub 倉庫設定中啟用 Pages
3. 在 Google Sheet 中部署 Apps Script
4. 複製部署 URL 到前端
5. 訪問 `https://[用戶名].github.io/lareema2/`

### 方式 2：本地開發

```bash
# Clone 倉庫
git clone https://github.com/412078-bit/lareema2.git
cd lareema2

# 使用任何 HTTP 伺服器
python -m http.server 8000
# 或
npx http-server
```

然後訪問 `http://localhost:8000`

## 📖 使用指南

### 1. 設置 Google Apps Script

詳見 **[Google Apps Script 部署指南](./gs-deployment-guide.md)**

簡單步驟：
- 建立 Google Sheet
- 新增 Apps Script
- 複製 [google-apps-script.gs](./google-apps-script.gs) 的代碼
- 部署為網路應用
- 複製部署 URL

### 2. 使用前端

```
1. 輸入 API 網址
   └─ 預設：https://jsonplaceholder.typicode.com/users
   
2. 點擊「從 API 取得資料」
   └─ 資料將在卡片中展示
   
3. 搜尋/篩選資料（可選）
   └─ 使用搜尋框快速查找
   
4. 輸入 Google Apps Script URL
   └─ 貼上部署 URL
   
5. 點擊「保存到 Google Sheets」
   └─ 資料已保存！
```

## 📁 項目結構

```
lareema2/
├── index.html                 # 主頁面
├── style.css                 # 樣式表
├── app.js                    # 前端邏輯
├── google-apps-script.gs     # 後端腳本
├── README.md                 # 本文件
├── README-ZH.md              # 完整說明（繁體中文）
└── gs-deployment-guide.md    # GAS 部署詳細指南
```

## 🧪 測試 API

使用已預先配置的測試 API：

```
# 取得用戶列表
https://jsonplaceholder.typicode.com/users

# 取得文章列表
https://jsonplaceholder.typicode.com/posts

# 取得評論列表
https://jsonplaceholder.typicode.com/comments
```

## 🌍 線上演示

**[點此查看線上版本](https://412078-bit.github.io/lareema2/)**

## 🔧 技術堆疊

- **前端**
  - HTML5
  - CSS3 (Gradient, Grid, Flexbox)
  - Vanilla JavaScript (Fetch API)
  
- **後端**
  - Google Apps Script
  - Google Sheets API
  
- **部署**
  - GitHub Pages
  - Google Apps Script Web App

## 💡 使用場景

- 📊 資料監控儀表板
- 📝 自動表單提交
- 🔄 定時數據同步
- 📈 資料分析收集
- 🌐 API 集成工具

## 🎓 學習資源

- [Google Apps Script 文檔](https://developers.google.com/apps-script)
- [Fetch API 指南](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [GitHub Pages 說明](https://pages.github.com/)
- [Google Sheets 文檔](https://developers.google.com/sheets)

## ❓ 常見問題

**Q: 收費嗎？**
A: 完全免費！使用 Google 帳戶和 GitHub 即可。

**Q: 有 CORS 限制嗎？**
A: 取決於 API。JSONPlaceholder 支援 CORS。

**Q: 可以儲存多少資料？**
A: Google Sheets 支援最多 1000 萬個儲存格。

**Q: 如何修改樣式？**
A: 編輯 `style.css` 文件。

## 🤝 貢獻

歡迎提交 Issues 和 Pull Requests！

## 📄 授權

MIT License - 詳見 [LICENSE](LICENSE)

## 📧 聯繫

有任何問題？
- 提交 [GitHub Issue](https://github.com/412078-bit/lareema2/issues)
- 或檢查 [完整文檔](./README-ZH.md)

---

**Happy Data Collection! 🎉**

*最後更新：2026-06-11*