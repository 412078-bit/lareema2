# 📊 資料收集系統 (Data Collection System) + 💰 智能記帳系統

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://412078-bit.github.io/lareema2/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

完整的個人工具中心，包含資料收集系統和智能記帳系統。

**[個人工具中心首頁](https://412078-bit.github.io/lareema2/home.html)** | **[資料收集系統](https://412078-bit.github.io/lareema2/index.html)** | **[記帳系統](https://412078-bit.github.io/lareema2/expense-tracker.html)**

---

## ✨ 應用功能概述

### 📊 資料收集系統
- 🌐 **API 資料取得** - 支援任何公開 REST API
- 📱 **響應式設計** - 完美適配各種設備
- 🔍 **實時搜尋** - 快速篩選和過濾資料
- 💾 **Google Sheets 整合** - 自動保存到試算表
- ⚡ **零依賴** - 純原生 JavaScript
- 🎨 **現代化 UI** - 美觀易用的使用者介面

### 💰 智能記帳系統
- 📝 **快速記錄** - 支援快速模板和自訂項目
- 📊 **自動統計** - 按分類、按時間段分析
- 📈 **視覺化圖表** - 趨勢分析和支出分佈
- ☁️ **Google Sheets 同步** - 雲端備份和多設備訪問
- 💾 **本地存儲** - 首先數據保存在設備上
- 🔒 **隱私保護** - 完全可控的數據同步

---

## 🚀 快速開始

### 1. 打開主頁面

訪問：**https://412078-bit.github.io/lareema2/home.html**

### 2. 選擇應用

在首頁選擇要使用的應用：
- **📊 資料收集系統** - [詳細說明](./README-ZH.md)
- **💰 智能記帳系統** - [詳細說明](./EXPENSE-TRACKER-GUIDE.md)

## 🚀 快速開始

### 3. 可選：設置 Google Sheets 同步

兩個應用都支持同步到 Google Sheets：
- 詳見 **[Google Apps Script 部署指南](./gs-deployment-guide.md)**
- 或在應用設定頁面中設置

---

## 📁 項目結構

```
lareema2/
├── 🌐 主頁面
│   ├── home.html                 # 應用中心首頁
│   └── index.html                # 資料收集系統首頁
│
├── 💰 記帳系統
│   ├── expense-tracker.html      # 記帳應用頁面
│   ├── expense-tracker.css       # 記帳應用樣式
│   └── expense-tracker.js        # 記帳應用邏輯
│
├── 📊 資料收集系統
│   ├── style.css                 # 資料收集樣式
│   └── app.js                    # 資料收集邏輯
│
├── 🔧 後端
│   └── google-apps-script.gs     # Google Apps Script
│
├── 📚 文檔
│   ├── README.md                 # 英文概述
│   ├── README-ZH.md              # 詳細說明（繁體中文）
│   ├── EXPENSE-TRACKER-GUIDE.md  # 記帳系統完整指南
│   ├── TUTORIAL.md               # 資料收集系統教程
│   ├── gs-deployment-guide.md    # GAS 部署指南
│   ├── QUICK-REFERENCE.md        # 快速參考
│   └── DEPLOYMENT-CHECKLIST.md   # 部署檢查清單
│
├── ⚙️ 配置
│   ├── LICENSE                   # MIT 授權
│   └── .gitignore               # Git 忽略規則
│
└── 📊 構建信息
    └── git 提交歷史
```

---

## 🔗 應用鏈接

| 應用 | URL |
|-----|-----|
| **個人工具中心** | https://412078-bit.github.io/lareema2/home.html |
| **資料收集系統** | https://412078-bit.github.io/lareema2/index.html |
| **智能記帳系統** | https://412078-bit.github.io/lareema2/expense-tracker.html |
| **GitHub 倉庫** | https://github.com/412078-bit/lareema2 |

---

## 📖 使用指南

### 資料收集系統
- [完整中文說明](./README-ZH.md)
- [詳細教程](./TUTORIAL.md)
- [快速開始](./QUICK-REFERENCE.md)

### 智能記帳系統
- [完整使用指南](./EXPENSE-TRACKER-GUIDE.md)
- 支持快速模板和自訂分類
- 完整的統計分析功能

### Google Apps Script 設置
- [詳細部署指南](./gs-deployment-guide.md)
- 適用於兩個應用
- 支持數據同步到 Google Sheets

---

## 📊 功能對比

| 特性 | 資料收集 | 記帳系統 |
|-----|---------|---------|
| API 整合 | ✅ | ❌ |
| 自動取得數據 | ✅ | ❌ |
| 手動記錄 | ❌ | ✅ |
| 數據分析 | ✅ | ✅ |
| 圖表展示 | ✅ | ✅ |
| Google Sheets | ✅ | ✅ |
| 本地存儲 | ❌ | ✅ |
| 搜尋功能 | ✅ | ✅ |
| CSV 導出 | ❌ | ✅ |

---

## 🧪 測試 API（資料收集系統）

使用已預先配置的測試 API：

```
✅ Users:    https://jsonplaceholder.typicode.com/users
✅ Posts:    https://jsonplaceholder.typicode.com/posts
✅ Comments: https://jsonplaceholder.typicode.com/comments
✅ GitHub:   https://api.github.com/users
✅ Countries: https://restcountries.com/v3.1/all
```

---

## 🌍 線上演示

| 應用 | URL |
|-----|-----|
| **應用中心首頁** | https://412078-bit.github.io/lareema2/home.html |
| **資料收集系統** | https://412078-bit.github.io/lareema2/index.html |
| **智能記帳系統** | https://412078-bit.github.io/lareema2/expense-tracker.html |

---

## 🔧 技術堆疊

### 前端技術
- **HTML5** - 語義化標記
- **CSS3** - Gradient, Grid, Flexbox
- **Vanilla JavaScript** - 無框架依賴
- **Fetch API** - 現代網絡調用
- **LocalStorage** - 本地數據存儲

### 後端技術
- **Google Apps Script** - 無伺服器運算
- **Google Sheets API** - 數據庫替代品
- **ContentService** - HTTP 響應

### 部署技術
- **GitHub Pages** - 靜態網站託管
- **Git** - 版本控制
- **HTTPS** - 加密傳輸

---

## 💡 應用場景

### 資料收集系統
- 📊 API 數據監控
- 📝 自動爬取數據
- 🔄 定時數據同步
- 📈 對比分析

### 智能記帳系統
- 💰 日常支出管理
- 📊 消費習慣分析
- 💡 預算規劃
- 🏦 財務報告

---

## 🎓 學習資源

- [Google Apps Script 文檔](https://developers.google.com/apps-script)
- [Fetch API 指南](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [GitHub Pages 說明](https://pages.github.com/)
- [Google Sheets 文檔](https://developers.google.com/sheets)

---

## ❓ 常見問題

**Q: 完全免費嗎？**
A: 是的！完全免費。

**Q: 支持移動設備嗎？**
A: 是的！完全響應式設計。

**Q: 可以離線使用嗎？**
A: 記帳系統可以，資料收集需要網絡。

**Q: 數據安全嗎？**
A: 
- 默認存儲在本地
- 同步到 Google Sheets 需要主動操作
- 完全可控

**Q: 如何修改？**
A: 編輯相應的 CSS 和 JavaScript 文件

---

## 🤝 貢獻

歡迎提交 Issues 和 Pull Requests！

---

## 📄 授權

MIT License - 詳見 [LICENSE](LICENSE)

---

## 📧 聯繫

有任何問題或建議？
- 提交 [GitHub Issue](https://github.com/412078-bit/lareema2/issues)
- 查看 [完整文檔](./README-ZH.md)

---

**Happy Data Collection! 🎉**

*最後更新：2026-06-11*