/**
 * Google Apps Script - 資料收集系統
 * 
 * 用途：
 * 1. 接收前端網頁傳來的資料
 * 2. 將資料寫入 Google Sheets
 * 3. 提供相應的回應
 * 
 * 使用步驟：
 * 1. 複製下面的代碼到 Google Apps Script 編輯器
 * 2. 授權腳本
 * 3. 部署為網路應用程式
 * 4. 將部署 URL 填入前端網頁中
 */

// 全局變量
const SHEET_NAME = '資料收集'; // Google Sheet 工作表名稱
const HEADER_ROW = 1;

/**
 * 主要的 HTTP GET 處理函數
 */
function doGet(e) {
    return ContentService.createTextOutput('Google Apps Script 已連接');
}

/**
 * 主要的 HTTP POST 處理函數
 */
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const action = data.action;
        
        if (action === 'appendData') {
            return appendDataToSheet(data.data, data.timestamp);
        } else if (action === 'appendExpenses') {
            return appendExpensesToSheet(data.data, data.timestamp);
        } else if (action === 'test') {
            return createResponse(true, '連接成功', '');
        } else {
            return createResponse(false, '未知的操作', '');
        }
    } catch (error) {
        Logger.log('錯誤: ' + error.toString());
        return createResponse(false, '處理失敗: ' + error.toString(), '');
    }
}

/**
 * 將資料添加到 Google Sheet
 */
function appendDataToSheet(data, timestamp) {
    try {
        const sheet = getOrCreateSheet(SHEET_NAME);
        
        // 確保資料是陣列
        if (!Array.isArray(data)) {
            data = [data];
        }
        
        // 获取所有键（列标题）
        const allKeys = new Set();
        data.forEach(item => {
            if (typeof item === 'object' && item !== null) {
                Object.keys(item).forEach(key => allKeys.add(key));
            }
        });
        
        const headers = ['時間戳', '記錄編號', ...Array.from(allKeys)];
        
        // 初始化表頭
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(headers);
        }
        
        // 添加資料行
        let recordNumber = sheet.getLastRow(); // 從現有行數開始編號
        data.forEach((item, index) => {
            const row = [
                new Date(timestamp).toLocaleString('zh-TW'),
                recordNumber + index,
                ...headers.slice(2).map(key => {
                    const value = item[key];
                    if (typeof value === 'object') {
                        return JSON.stringify(value);
                    }
                    return value || '';
                })
            ];
            sheet.appendRow(row);
        });
        
        // 自動調整列寬
        autoResizeColumns(sheet, headers.length);
        
        return createResponse(
            true,
            `成功保存 ${data.length} 筆資料`,
            {
                recordsAdded: data.length,
                sheetName: SHEET_NAME,
                timestamp: new Date().toISOString()
            }
        );
        
    } catch (error) {
        Logger.log('appendDataToSheet 錯誤: ' + error.toString());
        return createResponse(false, '保存失敗: ' + error.toString(), '');
    }
}

/**
 * 將支出資料添加到 Google Sheet
 */
function appendExpensesToSheet(expenses, timestamp) {
    try {
        const sheet = getOrCreateSheet('記帳');
        
        // 確保資料是陣列
        if (!Array.isArray(expenses)) {
            expenses = [expenses];
        }
        
        // 初始化表頭
        if (sheet.getLastRow() === 0) {
            const headers = ['日期', '項目', '金額', '分類', '備註', '同步時間'];
            sheet.appendRow(headers);
        }
        
        // 分類映射
        const categoryNames = {
            'food': '飲食',
            'transport': '交通',
            'shopping': '購物',
            'entertainment': '娛樂',
            'utilities': '生活',
            'medical': '醫療',
            'education': '教育',
            'other': '其他'
        };
        
        // 添加資料行
        expenses.forEach(expense => {
            const categoryName = categoryNames[expense.category] || expense.category;
            const row = [
                expense.date,
                expense.project,
                expense.amount,
                categoryName,
                expense.note || '',
                new Date(timestamp).toLocaleString('zh-TW')
            ];
            sheet.appendRow(row);
        });
        
        // 自動調整列寬
        autoResizeColumns(sheet, 6);
        
        // 設置格式
        formatExpenseSheet(sheet);
        
        return createResponse(
            true,
            `成功保存 ${expenses.length} 筆支出記錄`,
            {
                recordsAdded: expenses.length,
                sheetName: '記帳',
                timestamp: new Date().toISOString()
            }
        );
        
    } catch (error) {
        Logger.log('appendExpensesToSheet 錯誤: ' + error.toString());
        return createResponse(false, '保存失敗: ' + error.toString(), '');
    }
}

/**
 * 格式化支出工作表
 */
function formatExpenseSheet(sheet) {
    try {
        // 設置表頭格式
        const headerRange = sheet.getRange(1, 1, 1, 6);
        headerRange.setBackground('#667eea');
        headerRange.setFontColor('white');
        headerRange.setFontWeight('bold');
        
        // 設置數字格式
        const lastRow = sheet.getLastRow();
        if (lastRow > 1) {
            const amountRange = sheet.getRange(2, 3, lastRow - 1, 1);
            amountRange.setNumberFormat('NT$ #,##0.00');
            
            // 設置日期格式
            const dateRange = sheet.getRange(2, 1, lastRow - 1, 1);
            dateRange.setNumberFormat('yyyy-mm-dd');
        }
    } catch (error) {
        Logger.log('格式化失敗: ' + error.toString());
    }
}

/**
 * 獲取或建立 Google Sheet
 */
function getOrCreateSheet(sheetName) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        Logger.log('已建立新工作表: ' + sheetName);
    }
    
    return sheet;
}

/**
 * 自動調整列寬
 */
function autoResizeColumns(sheet, numColumns) {
    try {
        sheet.autoResizeColumns(1, numColumns);
    } catch (error) {
        Logger.log('調整列寬失敗: ' + error.toString());
    }
}

/**
 * 創建標準化的 HTTP 回應
 */
function createResponse(success, message, data) {
    const output = {
        success: success,
        message: message,
        data: data || {},
        timestamp: new Date().toISOString()
    };
    
    return ContentService
        .createTextOutput(JSON.stringify(output))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 測試函數（在編輯器中運行測試）
 */
function testScript() {
    // 測試數據
    const testData = [
        {
            id: 1,
            name: '測試用戶 1',
            email: 'test1@example.com',
            status: '正常'
        },
        {
            id: 2,
            name: '測試用戶 2',
            email: 'test2@example.com',
            status: '正常'
        }
    ];
    
    // 調用主函數
    const mockPostData = {
        postData: {
            contents: JSON.stringify({
                action: 'appendData',
                data: testData,
                timestamp: new Date().toISOString()
            })
        }
    };
    
    const result = doPost(mockPostData);
    Logger.log('測試結果: ' + result.getContent());
}

/**
 * 讀取所有資料（用於調試）
 */
function getAllData() {
    const sheet = getOrCreateSheet(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    Logger.log('工作表數據:');
    Logger.log(JSON.stringify(data, null, 2));
    return data;
}

/**
 * 清空工作表（謹慎使用）
 */
function clearSheet() {
    const sheet = getOrCreateSheet(SHEET_NAME);
    if (sheet.getLastRow() > 0) {
        sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();
        Logger.log('已清空工作表');
    }
}
