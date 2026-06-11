# 📚 詳細使用教程

## 目錄

1. [初始化設置](#初始化設置)
2. [基本操作](#基本操作)
3. [進階功能](#進階功能)
4. [排障指南](#排障指南)
5. [API 範例](#api-範例)

---

## 初始化設置

### Step 1: 部署前端到 GitHub Pages

#### 1.1 Fork 倉庫或建立新倉庫

```bash
# 方式 A: Fork（推薦新手）
# 在 GitHub 上點擊 "Fork" 按鈕

# 方式 B: Clone 並推送（用於自己的倉庫）
git clone https://github.com/412078-bit/lareema2.git
cd lareema2
git remote set-url origin https://github.com/[你的用戶名]/lareema2.git
git push -u origin main
```

#### 1.2 啟用 GitHub Pages

1. 進入倉庫的 **Settings**
2. 左側選擇 **Pages**
3. 在「Source」下選擇 **main** 分支
4. 點擊「Save」
5. 等待部署完成（通常 1-2 分鐘）
6. 你會看到 GitHub Pages 網址：`https://[用戶名].github.io/lareema2/`

### Step 2: 設置 Google Apps Script

詳見 [gs-deployment-guide.md](./gs-deployment-guide.md)

**快速摘要：**

```
1. 建立 Google Sheet
2. 副檔名 → Apps Script
3. 複製 google-apps-script.gs 的代碼
4. 執行 testScript() 進行測試
5. 部署 → 新部署 → 網路應用
6. 複製部署 URL
```

### Step 3: 連接前端和後端

1. 打開你的 GitHub Pages 網址
2. 在「Google Apps Script 部署網址」欄位中貼上 URL
3. 點擊「儲存」（會自動保存到本地存儲）

---

## 基本操作

### 使用流程圖

```
┌─────────────────────┐
│   打開網頁應用      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  輸入 API 網址      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 點擊「取得資料」    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  資料顯示在卡片中   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   搜尋/篩選資料     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 點擊「保存」按鈕    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 資料已保存到 Sheets │
└─────────────────────┘
```

### 詳細操作步驟

#### 步驟 1: 輸入 API 網址

```
在「API 網址」欄位中輸入，例如：
- https://jsonplaceholder.typicode.com/users
- https://jsonplaceholder.typicode.com/posts
- https://api.example.com/data
```

**提示：** 下拉菜單會記住你最後使用的 URL

#### 步驟 2: 取得資料

```
1. 點擊「🔄 從 API 取得資料」按鈕
2. 等待載入完成
3. 看到「✅ 成功取得 X 筆資料」提示
4. 資料以卡片形式顯示
```

#### 步驟 3: 檢視和搜尋

```
1. 資料會自動展開為卡片
2. 每張卡片顯示一筆記錄的所有欄位
3. 使用搜尋框快速篩選
4. 記錄計數會實時更新
```

#### 步驟 4: 保存資料

```
1. 確認已輸入 Google Apps Script URL
2. 點擊「💾 保存到 Google Sheets」
3. 看到「✅ 成功保存 X 筆資料」提示
4. 資料已自動添加到 Google Sheet
```

#### 步驟 5: 驗證保存

```
1. 打開你的 Google Sheet
2. 應該看到新添加的資料列
3. 包含：時間戳、記錄編號、所有 API 欄位
```

---

## 進階功能

### 1. 高級搜尋

搜尋支持模糊匹配和任何欄位：

```
搜尋「new york」會找到：
- "City": "New York"
- "Name": "New York Times"
- "Description": "Located in New York"
```

### 2. JSON 檢視

```
1. 點擊「展開/收起」按鈕
2. 查看完整的原始 JSON 數據
3. 有助於調試和驗證
```

### 3. 本地存儲

所有設置會自動保存到瀏覽器：

```javascript
// 自動保存的內容：
localStorage.apiUrl          // 最後使用的 API URL
localStorage.gasUrl          // Google Apps Script URL
```

### 4. 批量操作

```
✓ 可以多次點擊「取得資料」
✓ 每次都會更新顯示
✓ 所有資料都會累積到 Google Sheets
```

### 5. 自定義 Google Sheet 名稱

編輯 `google-apps-script.gs`：

```javascript
const SHEET_NAME = '資料收集'; // 改為任意名稱
```

---

## 排障指南

### 常見錯誤

#### ❌ 錯誤 1: "CORS error" 或 "Network error"

**原因**：API 不支持 CORS

**解決方案**：
- 使用支持 CORS 的 API（如 JSONPlaceholder）
- 或在 Google Apps Script 中使用 `UrlFetchApp` 作為代理

**測試 API：**
```
✓ https://jsonplaceholder.typicode.com/users
✓ https://api.github.com/users
✓ https://restcountries.com/v3.1/all
```

#### ❌ 錯誤 2: "Cannot POST to URL"

**原因**：Google Apps Script URL 不正確或未部署

**解決方案**：
1. 確認 URL 完整無誤
2. 檢查是否已部署為「網路應用」
3. 確認授權設置為「所有人」
4. 重新部署並複製新 URL

#### ❌ 錯誤 3: "資料沒有出現在 Google Sheets"

**原因**：
- GAS 授權失敗
- Sheet 名稱不匹配
- 網路連接問題

**解決方案**：
1. 在 Apps Script 編輯器中執行 `testScript()`
2. 檢查執行日誌中是否有錯誤
3. 確認試算表名稱與 `SHEET_NAME` 變數匹配
4. 嘗試手動刷新 Google Sheet

#### ❌ 錯誤 4: "Empty response from API"

**原因**：API 返回格式不支持或為空

**解決方案**：
1. 確認 API 返回 JSON 數據
2. 測試 API 是否可訪問（在瀏覽器中直接打開）
3. 檢查瀏覽器控制台中的詳細信息

### 調試技巧

#### 1. 檢查瀏覽器控制台

```
1. 按 F12 打開開發者工具
2. 點擊「Console」標籤
3. 執行操作並查看錯誤訊息
```

#### 2. 檢查 Google Apps Script 日誌

```
1. 在 Apps Script 編輯器中
2. 點擊「執行日誌」
3. 查看最近的執行記錄
```

#### 3. 測試 API 連接

```
在瀏覽器中直接測試：
https://jsonplaceholder.typicode.com/users

應該看到 JSON 格式的數據
```

---

## API 範例

### 1. JSONPlaceholder（測試用）

```
用戶：
https://jsonplaceholder.typicode.com/users

文章：
https://jsonplaceholder.typicode.com/posts

評論：
https://jsonplaceholder.typicode.com/comments

✅ 支持 CORS
✅ 無需認證
✅ 適合測試
```

### 2. GitHub API

```
用戶信息：
https://api.github.com/users

搜尋倉庫：
https://api.github.com/search/repositories?q=javascript

⚠️ 限制：60 請求/小時（未認證）
```

### 3. REST Countries

```
所有國家：
https://restcountries.com/v3.1/all

特定國家：
https://restcountries.com/v3.1/name/taiwan

✅ 無需認證
✅ 數據豐富
```

### 4. Public APIs

```
漫威字符：
https://gateway.marvel.com/v1/public/characters

天氣數據：
https://api.openweathermap.org/data/2.5/weather

⚠️ 需要 API 金鑰
```

### 5. 建立自己的 API

可以在 Google Apps Script 中：

```javascript
function doGet() {
    return ContentService.createTextOutput(JSON.stringify([
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" }
    ])).setMimeType(ContentService.MimeType.JSON);
}
```

---

## 📱 響應式設計

該應用完全響應式，支持：

```
✓ 桌面 (1200px+)
✓ 平板 (768px - 1199px)
✓ 手機 (320px - 767px)

布局會自動調整以適應屏幕大小
```

---

## 🔐 安全實踐

1. **不要在 URL 中暴露 API 金鑰**
   ```
   ❌ https://api.example.com/?key=sk_live_xxxxx
   ✅ 在後端或環境變量中存儲金鑰
   ```

2. **使用 HTTPS**
   ```
   ✅ GitHub Pages 強制使用 HTTPS
   ✅ Google Apps Script 部署也使用 HTTPS
   ```

3. **驗證 API 數據**
   ```javascript
   // 在前端驗證接收的數據
   if (!Array.isArray(data)) {
       data = [data];
   }
   ```

---

## 📊 性能優化

1. **分頁（未實現，可作為改進）**
   - 對於大型數據集，考慮分頁加載

2. **搜尋優化**
   - 搜尋在本地進行，無需 API 調用

3. **本地緩存**
   - 設置自動保存到 localStorage

---

## 🎓 進階自定義

### 1. 修改卡片樣式

編輯 `style.css`：

```css
.data-card {
    /* 修改顏色、邊框等 */
    border-left: 4px solid #667eea; /* 改顏色 */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* 調整陰影 */
}
```

### 2. 添加新功能

編輯 `app.js`：

```javascript
// 例如：添加導出 CSV 功能
function exportToCSV() {
    // 實現邏輯
}
```

### 3. 修改 GAS 行為

編輯 `google-apps-script.gs`：

```javascript
// 例如：添加數據驗證
function validateData(data) {
    // 驗證邏輯
}
```

---

## 💡 常見修改

### 修改 1: 更改標題和描述

在 `index.html` 中：

```html
<h1>📊 資料收集系統</h1>
<p>自動從 API 取得資料並存儲到 Google Sheets</p>

<!-- 改為你想要的內容 -->
```

### 修改 2: 更改預設 API

在 `index.html` 中：

```html
value="https://jsonplaceholder.typicode.com/users"
<!-- 改為你想要的 API -->
```

### 修改 3: 添加更多按鈕

在 `index.html` 中添加按鈕，在 `app.js` 中添加事件處理。

---

## 📞 獲取幫助

1. 查看 [README-ZH.md](./README-ZH.md) 完整文檔
2. 查看 [gs-deployment-guide.md](./gs-deployment-guide.md) GAS 部署
3. 打開瀏覽器開發者工具查看日誌
4. 提交 GitHub Issues

---

**祝你使用愉快！😊**
