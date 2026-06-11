// 全局變量
let currentData = [];
let currentJson = null;

// DOM 元素
const apiUrlInput = document.getElementById('apiUrl');
const gasUrlInput = document.getElementById('gasUrl');
const fetchBtn = document.getElementById('fetchBtn');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const status = document.getElementById('status');
const dataContainer = document.getElementById('dataContainer');
const jsonData = document.getElementById('jsonData');
const searchInput = document.getElementById('searchInput');
const recordCount = document.getElementById('recordCount');
const toggleJsonBtn = document.getElementById('toggleJson');

// 事件監聽器
fetchBtn.addEventListener('click', fetchFromAPI);
saveBtn.addEventListener('click', saveToGoogleSheets);
clearBtn.addEventListener('click', clearData);
toggleJsonBtn.addEventListener('click', toggleJSON);
searchInput.addEventListener('input', filterData);

// 狀態管理函數
function showStatus(message, type = 'info') {
    status.textContent = message;
    status.className = `status ${type}`;
    if (type === 'success') {
        setTimeout(() => {
            status.className = 'status empty';
        }, 5000);
    }
}

// 從 API 取得資料
async function fetchFromAPI() {
    const apiUrl = apiUrlInput.value.trim();
    
    if (!apiUrl) {
        showStatus('❌ 請輸入 API 網址', 'error');
        return;
    }

    fetchBtn.disabled = true;
    showStatus('🔄 正在從 API 取得資料...', 'loading');

    try {
        // 添加 CORS 代理（如果需要）
        let url = apiUrl;
        
        // 如果 URL 不是 CORS 友善的，嘗試使用代理
        if (!apiUrl.includes('jsonplaceholder')) {
            // 可以在這裡添加自己的 CORS 代理
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // 確保數據是陣列
        if (Array.isArray(data)) {
            currentData = data;
        } else if (typeof data === 'object' && data !== null) {
            currentData = [data];
        } else {
            throw new Error('API 回傳格式不支援');
        }

        currentJson = data;
        
        // 更新顯示
        renderData(currentData);
        displayJSON(currentJson);
        updateRecordCount();
        
        saveBtn.disabled = false;
        showStatus(`✅ 成功取得 ${currentData.length} 筆資料`, 'success');

    } catch (error) {
        console.error('API 錯誤:', error);
        showStatus(`❌ API 錯誤: ${error.message}`, 'error');
        saveBtn.disabled = true;
    } finally {
        fetchBtn.disabled = false;
    }
}

// 渲染資料卡片
function renderData(data) {
    if (data.length === 0) {
        dataContainer.innerHTML = '<p class="placeholder">尚無資料</p>';
        return;
    }

    dataContainer.innerHTML = data.map((item, index) => {
        const fields = formatFields(item);
        return `
            <div class="data-card" data-index="${index}">
                <div style="color: #667eea; font-weight: bold; margin-bottom: 15px;">
                    📋 記錄 #${index + 1}
                </div>
                ${fields}
            </div>
        `;
    }).join('');
}

// 格式化欄位顯示
function formatFields(item) {
    if (typeof item !== 'object' || item === null) {
        return `<div class="card-field"><span class="card-value">${String(item)}</span></div>`;
    }

    return Object.entries(item).map(([key, value]) => {
        let displayValue = value;
        
        if (typeof value === 'object') {
            displayValue = JSON.stringify(value, null, 2);
        } else if (typeof value === 'boolean') {
            displayValue = value ? '✓' : '✗';
        } else if (typeof value === 'number' && value > 1000000000000) {
            // 處理時間戳
            displayValue = new Date(value).toLocaleString('zh-TW');
        }

        return `
            <div class="card-field">
                <div class="card-label">${escapeHtml(String(key))}</div>
                <div class="card-value">${escapeHtml(String(displayValue))}</div>
            </div>
        `;
    }).join('');
}

// 顯示 JSON 資料
function displayJSON(data) {
    try {
        jsonData.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        jsonData.textContent = '無法序列化為 JSON';
    }
}

// 切換 JSON 顯示
function toggleJSON() {
    jsonData.style.display = jsonData.style.display === 'none' ? 'block' : 'none';
}

// 過濾資料
function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
        renderData(currentData);
        return;
    }

    const filtered = currentData.filter(item => {
        const str = JSON.stringify(item).toLowerCase();
        return str.includes(searchTerm);
    });

    renderData(filtered);
    recordCount.textContent = `已篩選 ${filtered.length} / ${currentData.length} 筆資料`;
}

// 更新記錄計數
function updateRecordCount() {
    recordCount.textContent = `共 ${currentData.length} 筆資料`;
}

// 保存到 Google Sheets
async function saveToGoogleSheets() {
    const gasUrl = gasUrlInput.value.trim();
    
    if (!gasUrl) {
        showStatus('❌ 請輸入 Google Apps Script 部署網址', 'error');
        return;
    }

    if (currentData.length === 0) {
        showStatus('❌ 沒有資料可以保存', 'error');
        return;
    }

    saveBtn.disabled = true;
    showStatus('💾 正在保存到 Google Sheets...', 'loading');

    try {
        const payload = {
            action: 'appendData',
            data: currentData,
            timestamp: new Date().toISOString()
        };

        const response = await fetch(gasUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {
            showStatus(`✅ 成功保存 ${currentData.length} 筆資料到 Google Sheets`, 'success');
        } else {
            throw new Error(result.error || '保存失敗');
        }

    } catch (error) {
        console.error('保存錯誤:', error);
        showStatus(`❌ 保存失敗: ${error.message}`, 'error');
    } finally {
        saveBtn.disabled = false;
    }
}

// 清空資料
function clearData() {
    if (confirm('確定要清空所有資料嗎？')) {
        currentData = [];
        currentJson = null;
        dataContainer.innerHTML = '<p class="placeholder">尚無資料，請先點擊「從 API 取得資料」</p>';
        jsonData.textContent = '無資料';
        recordCount.textContent = '共 0 筆資料';
        searchInput.value = '';
        saveBtn.disabled = true;
        showStatus('🗑️ 資料已清空', 'success');
    }
}

// HTML 安全轉義
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('資料收集系統已啟動');
    
    // 讀取本地存儲的設置
    const savedGasUrl = localStorage.getItem('gasUrl');
    const savedApiUrl = localStorage.getItem('apiUrl');
    
    if (savedGasUrl) gasUrlInput.value = savedGasUrl;
    if (savedApiUrl) apiUrlInput.value = savedApiUrl;
    
    // 保存設置到本地存儲
    apiUrlInput.addEventListener('change', () => {
        localStorage.setItem('apiUrl', apiUrlInput.value);
    });
    
    gasUrlInput.addEventListener('change', () => {
        localStorage.setItem('gasUrl', gasUrlInput.value);
    });
});
