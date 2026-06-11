# Google Apps Script 部署完整指南

## 📌 前置要求

- Google 帳戶
- 可访问的 Google Sheets
- 網際網路連接

## 🎯 部署步驟

### 第 1 步：建立 Google Sheet

#### 1.1 建立新試算表
1. 打開 [Google Sheets](https://sheets.google.com)
2. 點選「建立新試算表」或「+」圖標
3. 命名為 "資料收集系統"（或任意名稱）
4. 默認會建立一個「工作表1」

#### 1.2 複製試算表 ID（供後續使用）
- 在瀏覽器 URL 列中找到試算表 ID
- 格式：`https://docs.google.com/spreadsheets/d/[試算表ID]/edit`
- **複製 [試算表ID] 部分**

### 第 2 步：打開 Apps Script 編輯器

#### 2.1 在 Google Sheet 中新增 Apps Script

方法 1（推薦）：
1. 在試算表中，點選功能表「副檔名」
2. 選擇「Apps Script」
3. 會新開一個標籤頁打開 Apps Script 編輯器

方法 2：
1. 直接訪問 [Google Apps Script](https://script.google.com)
2. 點選「新增專案」
3. 點選專案名稱（預設為「未命名專案」），重命名為 "資料收集系統"

### 第 3 步：複製 Apps Script 代碼

#### 3.1 清空預設代碼
1. 在編輯器中，選擇 `Code.gs` 文件
2. 全選並刪除預設代碼

#### 3.2 貼上新代碼
1. 將 [google-apps-script.gs](./google-apps-script.gs) 中的所有代碼複製
2. 貼入編輯器中
3. **按 Ctrl+S（或 Cmd+S）儲存**

### 第 4 步：測試腳本

#### 4.1 運行測試函數
1. 在編輯器頂部的「選擇函數」下拉菜單中，選擇 `testScript`
2. 點選「執行」（播放圖標）按鈕
3. 會彈出授權視窗

#### 4.2 授權腳本
1. 點選「檢閱權限」
2. 選擇你的 Google 帳戶
3. 點選「允許」給予所需權限
4. 腳本運行完成

#### 4.3 查看執行日誌
1. 點選「執行日誌」
2. 應該看到類似的成功訊息：
   ```
   資料收集系統已啟動
   成功保存 2 筆資料
   已建立新工作表: 資料收集
   ```

### 第 5 步：部署為網路應用程式

#### 5.1 新增部署
1. 在編輯器左側，點選「部署」圖標（或點選「部署」按鈕）
2. 點選「新部署」

#### 5.2 配置部署設置
1. **類型**：選擇「網路應用」（Web app）
2. **執行為**：選擇你的 Google 帳戶
3. **授予存取權限**：選擇「所有人」
4. 點選「部署」

#### 5.3 複製部署 URL
1. 部署完成後，會顯示部署 ID 和 URL
2. 點選「複製」按鈕，或手動複製 URL
3. **保存此 URL，前端將需要它**

URL 格式示例：
```
https://script.google.com/macros/d/AKfycbxAbCdEfGhIjKlMnOpQrStUvWxYz/userweb
```

### 第 6 步：測試網路應用

#### 6.1 測試部署 URL
1. 在新標籤中打開部署 URL
2. 應該看到 "Google Apps Script 已連接" 的訊息
3. 確認部署成功

## ✅ 驗證部署

### 檢查清單
- [ ] Google Sheet 已建立
- [ ] Apps Script 代碼已粘貼
- [ ] testScript 函數已成功運行
- [ ] 在 Google Sheet 中可以看到測試數據
- [ ] 部署 URL 正確複製
- [ ] 訪問部署 URL 顯示 "已連接"

## 🔧 常見問題與解決方案

### 問題 1: 授權失敗

**症狀**：運行腳本時顯示 "未授權"

**解決方案**：
1. 點選「審查權限」
2. 選擇帳戶
3. 點選「允許」

### 問題 2: 腳本執行失敗

**症狀**：運行 testScript 時報錯

**解決方案**：
1. 檢查是否正確貼入所有代碼
2. 檢查瀏覽器控制台中的詳細錯誤訊息
3. 點選「執行日誌」查看錯誤

### 問題 3: 部署 URL 不工作

**症狀**：訪問 URL 時顯示 404 或其他錯誤

**解決方案**：
1. 確認 URL 完整無誤
2. 確認 Apps Script 已保存
3. 重新部署（創建新部署）
4. 清除瀏覽器快取

### 問題 4: 資料沒有保存到 Google Sheet

**症狀**：執行保存功能後 Sheet 中沒有數據

**解決方案**：
1. 確認 Google Sheet 是在同一帳戶中
2. 檢查 Apps Script 是否與 Sheet 關聯
3. 查看執行日誌中是否有錯誤
4. 確認表單名稱 `SHEET_NAME` 是否存在

## 🔄 更新 Apps Script

### 當需要更新代碼時：

1. 在 Apps Script 編輯器中打開 `Code.gs`
2. 修改代碼
3. 按 Ctrl+S 儲存
4. 重新部署：
   - 點選「部署」
   - 選擇現有部署
   - 點選「更新」
5. 或創建新部署以獲取新 URL

## 📊 測試資料範例

當運行 `testScript()` 時，會添加以下測試數據：

| 時間戳 | 記錄編號 | id | name | email | status |
|-------|--------|-----|------|-------|--------|
| 2026-06-11 10:30:45 | 1 | 1 | 測試用戶 1 | test1@example.com | 正常 |
| 2026-06-11 10:30:45 | 2 | 2 | 測試用戶 2 | test2@example.com | 正常 |

## 🎓 高級操作

### 查看所有保存的數據
在 Apps Script 編輯器中：
1. 選擇 `getAllData` 函數
2. 點選「執行」
3. 在執行日誌中查看所有數據

### 清空 Google Sheet 中的資料
在 Apps Script 編輯器中：
1. 選擇 `clearSheet` 函數
2. 點選「執行」

⚠️ **警告**：此操作無法撤銷！

### 修改工作表名稱
如果要改變 Google Sheet 中的表單名稱：

1. 編輯 `google-apps-script.gs` 中的：
```javascript
const SHEET_NAME = '資料收集'; // 改為你想要的名稱
```

2. 保存並重新部署

## 🔐 安全建議

1. **不要在 URL 中包含敏感訊息**
   - 避免在 API URL 中暴露 API 金鑰

2. **定期審查授權**
   - 檢查已授權的應用
   - 移除不再需要的授權

3. **限制存取範圍**
   - 只授予必要的權限

4. **備份重要數據**
   - 定期下載 Google Sheet 備份

## 📞 需要幫助？

1. 檢查 [Google Apps Script 官方文檔](https://developers.google.com/apps-script)
2. 查看執行日誌中的錯誤訊息
3. 嘗試在 testScript() 中添加調試代碼
4. 聯繫 Google 支持

---

**部署完成後，複製部署 URL 並在前端網頁中使用！** ✅
