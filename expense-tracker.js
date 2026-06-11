// ========== 常數定義 ==========
const STORAGE_KEY = 'expenses';
const CATEGORIES = {
    food: { name: '飲食', icon: '🍔', color: '#f59e0b' },
    transport: { name: '交通', icon: '🚗', color: '#06b6d4' },
    shopping: { name: '購物', icon: '🛍️', color: '#ec4899' },
    entertainment: { name: '娛樂', icon: '🎮', color: '#8b5cf6' },
    utilities: { name: '生活', icon: '💡', color: '#14b8a6' },
    medical: { name: '醫療', icon: '⚕️', color: '#ef4444' },
    education: { name: '教育', icon: '📚', color: '#3b82f6' },
    other: { name: '其他', icon: '📌', color: '#6b7280' }
};

const QUICK_TEMPLATES = {
    breakfast: { project: '早餐', category: 'food', amount: 50 },
    lunch: { project: '午餐', category: 'food', amount: 80 },
    dinner: { project: '晚餐', category: 'food', amount: 100 },
    coffee: { project: '飲料', category: 'food', amount: 60 },
    taxi: { project: '計程車', category: 'transport', amount: 100 },
    mrt: { project: '捷運', category: 'transport', amount: 50 }
};

// ========== 全局變量 ==========
let expenses = [];
let currentEditingId = null;
let currentTimeRange = 'month';
let customDateStart = null;
let customDateEnd = null;

// ========== DOM 元素 ==========
const elements = {
    navItems: document.querySelectorAll('.nav-item'),
    pages: document.querySelectorAll('.page'),
    expenseDate: document.getElementById('expenseDate'),
    expenseAmount: document.getElementById('expenseAmount'),
    expenseProject: document.getElementById('expenseProject'),
    expenseCategory: document.getElementById('expenseCategory'),
    expenseNote: document.getElementById('expenseNote'),
    addBtn: document.getElementById('addBtn'),
    clearFormBtn: document.getElementById('clearFormBtn'),
    templateBtns: document.querySelectorAll('.template-btn'),
    syncBtn: document.getElementById('syncBtn'),
    notification: document.getElementById('notification'),
    todayTotal: document.getElementById('todayTotal'),
    todayCount: document.getElementById('todayCount'),
    monthTotal: document.getElementById('monthTotal'),
    monthCount: document.getElementById('monthCount'),
    timeButtons: document.querySelectorAll('.time-btn'),
    customDateRange: document.getElementById('customDateRange'),
    startDate: document.getElementById('startDate'),
    endDate: document.getElementById('endDate'),
    expenseList: document.getElementById('expenseList'),
    searchInput: document.getElementById('searchInput'),
    filterCategory: document.getElementById('filterCategory'),
    filterMonth: document.getElementById('filterMonth'),
    exportBtn: document.getElementById('exportBtn'),
    gasUrl: document.getElementById('gasUrl'),
    testGasBtn: document.getElementById('testGasBtn'),
    gasStatus: document.getElementById('gasStatus'),
    exportDataBtn: document.getElementById('exportDataBtn'),
    importDataBtn: document.getElementById('importDataBtn'),
    clearDataBtn: document.getElementById('clearDataBtn'),
    importFile: document.getElementById('importFile'),
    editModal: document.getElementById('editModal'),
    editForm: document.getElementById('editForm'),
    deleteBtn: document.getElementById('deleteBtn'),
    categoryChart: document.getElementById('categoryChart'),
    trendChart: document.getElementById('trendChart'),
    categoryList: document.getElementById('categoryList'),
    categoryListEdit: document.getElementById('categoryList'),
    addCategoryBtn: document.getElementById('addCategoryBtn'),
    pageTitle: document.getElementById('page-title')
};

// ========== 初始化 ==========
function init() {
    loadExpenses();
    setupEventListeners();
    setDefaultDate();
    populateFilterMonths();
    updateTodaySummary();
    renderStats();
    renderExpenseList();
}

// ========== 事件監聽器 ==========
function setupEventListeners() {
    // 導航
    elements.navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });

    // 表單
    elements.addBtn.addEventListener('click', handleAddExpense);
    elements.clearFormBtn.addEventListener('click', clearForm);
    elements.templateBtns.forEach(btn => {
        btn.addEventListener('click', handleTemplate);
    });

    // 同步
    elements.syncBtn.addEventListener('click', syncToGoogleSheets);

    // 時間範圍
    elements.timeButtons.forEach(btn => {
        btn.addEventListener('click', handleTimeRangeChange);
    });

    // 篩選
    elements.searchInput.addEventListener('input', handleSearch);
    elements.filterCategory.addEventListener('change', handleFilter);
    elements.filterMonth.addEventListener('change', handleFilter);
    elements.exportBtn.addEventListener('click', handleExport);

    // 設定
    elements.testGasBtn.addEventListener('click', testGASConnection);
    elements.exportDataBtn.addEventListener('click', handleExportData);
    elements.importDataBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', handleImportData);
    elements.clearDataBtn.addEventListener('click', handleClearAll);

    // 編輯表單
    elements.editForm.addEventListener('submit', handleSaveEdit);
    elements.deleteBtn.addEventListener('click', handleDelete);
    document.querySelector('.modal-close').addEventListener('click', closeModal);
}

// ========== 導航 ==========
function handleNavigation(e) {
    const page = e.currentTarget.dataset.page;
    showPage(page);
    
    // 更新標題
    const titles = {
        input: '記錄支出',
        view: '查看統計',
        list: '詳細列表',
        settings: '設定'
    };
    elements.pageTitle.textContent = titles[page];
}

function showPage(page) {
    // 隱藏所有頁面
    elements.pages.forEach(p => p.classList.remove('active'));
    
    // 顯示選定頁面
    document.getElementById(`${page}-page`).classList.add('active');
    
    // 更新導航活躍狀態
    elements.navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });

    // 頁面特定的初始化
    if (page === 'view') {
        renderStats();
    } else if (page === 'list') {
        renderExpenseList();
    }
}

// ========== 表單功能 ==========
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    elements.expenseDate.value = today;
}

function handleAddExpense() {
    const date = elements.expenseDate.value;
    const amount = parseFloat(elements.expenseAmount.value);
    const project = elements.expenseProject.value.trim();
    const category = elements.expenseCategory.value;
    const note = elements.expenseNote.value.trim();

    // 驗證
    if (!date || !amount || !project || !category) {
        showNotification('請填寫所有必填項目', 'error');
        return;
    }

    if (amount <= 0) {
        showNotification('金額必須大於 0', 'error');
        return;
    }

    // 創建新支出
    const expense = {
        id: Date.now(),
        date,
        amount,
        project,
        category,
        note,
        createdAt: new Date().toISOString()
    };

    expenses.push(expense);
    saveExpenses();
    clearForm();
    showNotification(`✅ 新增 "${project}" 支出 NT$${amount}`, 'success');
    updateTodaySummary();
    renderStats();
}

function clearForm() {
    elements.expenseAmount.value = '';
    elements.expenseProject.value = '';
    elements.expenseCategory.value = '';
    elements.expenseNote.value = '';
    setDefaultDate();
}

function handleTemplate(e) {
    const templateName = e.target.dataset.template;
    const template = QUICK_TEMPLATES[templateName];
    
    if (template) {
        elements.expenseAmount.value = template.amount;
        elements.expenseProject.value = template.project;
        elements.expenseCategory.value = template.category;
        elements.expenseNote.value = '';
        elements.expenseAmount.focus();
    }
}

// ========== 統計功能 ==========
function updateTodaySummary() {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);

    const todayExpenses = expenses.filter(e => e.date === today);
    const monthExpenses = expenses.filter(e => e.date.startsWith(thisMonth));

    const todaySum = todayExpenses.reduce((sum, e) => sum + e.amount, 0);
    const monthSum = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

    elements.todayTotal.textContent = `NT$ ${todaySum.toLocaleString('zh-TW', { minimumFractionDigits: 0 })}`;
    elements.todayCount.textContent = todayExpenses.length;
    elements.monthTotal.textContent = `NT$ ${monthSum.toLocaleString('zh-TW', { minimumFractionDigits: 0 })}`;
    elements.monthCount.textContent = monthExpenses.length;
}

function renderStats() {
    const filtered = getFilteredExpenses();
    
    if (filtered.length === 0) {
        elements.categoryChart.innerHTML = '<p style="padding: 40px; text-align: center;">無數據</p>';
        elements.trendChart.innerHTML = '<p style="padding: 40px; text-align: center;">無數據</p>';
        updateStatCards(0, 0, 0, 0);
        return;
    }

    // 計算統計
    const total = filtered.reduce((sum, e) => sum + e.amount, 0);
    const average = total / filtered.length;
    const highest = Math.max(...filtered.map(e => e.amount));

    updateStatCards(total, average, highest, filtered.length);

    // 分類統計
    renderCategoryChart(filtered);

    // 趨勢圖
    renderTrendChart(filtered);
}

function updateStatCards(total, average, highest, count) {
    document.getElementById('statTotal').textContent = `NT$ ${total.toLocaleString('zh-TW')}`;
    document.getElementById('statAverage').textContent = `NT$ ${average.toLocaleString('zh-TW', { minimumFractionDigits: 2 })}`;
    document.getElementById('statHighest').textContent = `NT$ ${highest.toLocaleString('zh-TW')}`;
    document.getElementById('statCount').textContent = count;
}

function renderCategoryChart(data) {
    const categories = {};
    
    data.forEach(expense => {
        if (!categories[expense.category]) {
            categories[expense.category] = 0;
        }
        categories[expense.category] += expense.amount;
    });

    let categoryListHTML = '';
    let totalAmount = Object.values(categories).reduce((a, b) => a + b, 0);

    Object.entries(categories).forEach(([category, amount]) => {
        const percentage = (amount / totalAmount * 100).toFixed(1);
        const categoryInfo = CATEGORIES[category];
        const color = categoryInfo.color;

        categoryListHTML += `
            <div class="category-item">
                <div class="name">
                    <span>${categoryInfo.icon} ${categoryInfo.name}</span>
                    <span>NT$ ${amount.toLocaleString('zh-TW')}</span>
                </div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${percentage}%; background-color: ${color};"></div>
                </div>
                <div style="text-align: right; font-size: 0.85em; color: #999; margin-top: 5px;">
                    ${percentage}%
                </div>
            </div>
        `;
    });

    document.getElementById('categoryList').innerHTML = categoryListHTML;

    // 簡單的柱狀圖
    renderBarChart(categories);
}

function renderBarChart(categories) {
    let chartHTML = '<div style="display: flex; align-items: flex-end; height: 300px; gap: 10px; padding: 20px; border-bottom: 2px solid #ddd;">';
    
    const total = Object.values(categories).reduce((a, b) => a + b, 0);
    const max = Math.max(...Object.values(categories));

    Object.entries(categories).forEach(([category, amount]) => {
        const height = (amount / max * 100);
        const categoryInfo = CATEGORIES[category];
        
        chartHTML += `
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                <div style="width: 100%; background-color: ${categoryInfo.color}; height: ${height}%; min-height: 20px; border-radius: 4px 4px 0 0;" title="NT$ ${amount}"></div>
                <div style="margin-top: 10px; font-size: 0.85em; text-align: center;">
                    <div>${categoryInfo.icon}</div>
                    <div>NT$ ${amount.toLocaleString('zh-TW')}</div>
                </div>
            </div>
        `;
    });

    chartHTML += '</div>';
    elements.categoryChart.innerHTML = chartHTML;
}

function renderTrendChart(data) {
    // 按日期分組
    const dailyTotals = {};
    
    data.forEach(expense => {
        if (!dailyTotals[expense.date]) {
            dailyTotals[expense.date] = 0;
        }
        dailyTotals[expense.date] += expense.amount;
    });

    // 排序日期
    const sortedDates = Object.keys(dailyTotals).sort();
    const max = Math.max(...Object.values(dailyTotals));

    let chartHTML = '<div style="display: flex; align-items: flex-end; height: 250px; gap: 5px; padding: 20px; border-bottom: 2px solid #ddd; overflow-x: auto;">';

    sortedDates.forEach(date => {
        const amount = dailyTotals[date];
        const height = (amount / max * 100);
        const dateObj = new Date(date + 'T00:00:00');
        const dayName = ['日', '一', '二', '三', '四', '五', '六'][dateObj.getDay()];

        chartHTML += `
            <div style="flex-shrink: 0; display: flex; flex-direction: column; align-items: center; width: 40px;">
                <div style="width: 30px; background: linear-gradient(135deg, #667eea, #764ba2); height: ${height}%; border-radius: 4px 4px 0 0;" title="NT$ ${amount}"></div>
                <div style="margin-top: 8px; font-size: 0.75em; text-align: center; color: #999;">
                    <div>${date.slice(5)}</div>
                    <div>週${dayName}</div>
                </div>
            </div>
        `;
    });

    chartHTML += '</div>';
    elements.trendChart.innerHTML = chartHTML;
}

// ========== 時間範圍控制 ==========
function handleTimeRangeChange(e) {
    const range = e.target.dataset.range;
    currentTimeRange = range;

    elements.timeButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    if (range === 'custom') {
        elements.customDateRange.style.display = 'flex';
    } else {
        elements.customDateRange.style.display = 'none';
    }

    renderStats();
}

function getFilteredExpenses() {
    let filtered = [...expenses];

    if (currentTimeRange === 'month') {
        const thisMonth = new Date().toISOString().slice(0, 7);
        filtered = filtered.filter(e => e.date.startsWith(thisMonth));
    } else if (currentTimeRange === 'week') {
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const weekStartStr = weekStart.toISOString().split('T')[0];
        const weekEndStr = weekEnd.toISOString().split('T')[0];

        filtered = filtered.filter(e => e.date >= weekStartStr && e.date <= weekEndStr);
    } else if (currentTimeRange === 'custom' && customDateStart && customDateEnd) {
        filtered = filtered.filter(e => e.date >= customDateStart && e.date <= customDateEnd);
    }

    return filtered;
}

// ========== 列表和搜尋 ==========
function handleSearch() {
    renderExpenseList();
}

function handleFilter() {
    renderExpenseList();
}

function renderExpenseList() {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const selectedCategory = elements.filterCategory.value;
    const selectedMonth = elements.filterMonth.value;

    let filtered = expenses;

    // 搜尋
    if (searchTerm) {
        filtered = filtered.filter(e =>
            e.project.toLowerCase().includes(searchTerm) ||
            e.note.toLowerCase().includes(searchTerm)
        );
    }

    // 分類篩選
    if (selectedCategory) {
        filtered = filtered.filter(e => e.category === selectedCategory);
    }

    // 月份篩選
    if (selectedMonth) {
        filtered = filtered.filter(e => e.date.startsWith(selectedMonth));
    }

    // 排序（最新在前）
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filtered.length === 0) {
        elements.expenseList.innerHTML = '<p class="placeholder">無記錄</p>';
        return;
    }

    let listHTML = '';
    filtered.forEach(expense => {
        const categoryInfo = CATEGORIES[expense.category];
        const dateObj = new Date(expense.date + 'T00:00:00');
        const dateStr = dateObj.toLocaleDateString('zh-TW', { 
            month: 'short', 
            day: 'numeric',
            weekday: 'short'
        });

        listHTML += `
            <div class="expense-item" onclick="openEditModal('${expense.id}')">
                <div class="expense-info">
                    <div class="expense-header">
                        <div class="expense-project">${categoryInfo.icon} ${expense.project}</div>
                        <div class="expense-date">${dateStr}</div>
                    </div>
                    <span class="expense-category">${categoryInfo.name}</span>
                    ${expense.note ? `<div class="expense-note">${expense.note}</div>` : ''}
                </div>
                <div class="expense-amount">NT$ ${expense.amount.toLocaleString('zh-TW', { minimumFractionDigits: 0 })}</div>
            </div>
        `;
    });

    elements.expenseList.innerHTML = listHTML;
}

function populateFilterMonths() {
    const months = new Set();
    
    expenses.forEach(e => {
        months.add(e.date.slice(0, 7));
    });

    const sortedMonths = Array.from(months).sort().reverse();
    
    let options = '<option value="">全部月份</option>';
    sortedMonths.forEach(month => {
        const [year, monthNum] = month.split('-');
        const monthName = new Date(year, monthNum - 1).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long' });
        options += `<option value="${month}">${monthName}</option>`;
    });

    elements.filterMonth.innerHTML = options;
}

// ========== 編輯功能 ==========
function openEditModal(id) {
    currentEditingId = id;
    const expense = expenses.find(e => e.id === parseInt(id));
    
    if (!expense) return;

    document.getElementById('editDate').value = expense.date;
    document.getElementById('editAmount').value = expense.amount;
    document.getElementById('editProject').value = expense.project;
    document.getElementById('editCategory').value = expense.category;
    document.getElementById('editNote').value = expense.note;

    elements.editModal.classList.add('show');
}

function closeModal() {
    elements.editModal.classList.remove('show');
    currentEditingId = null;
}

function handleSaveEdit(e) {
    e.preventDefault();

    const expense = expenses.find(ex => ex.id === currentEditingId);
    if (!expense) return;

    expense.date = document.getElementById('editDate').value;
    expense.amount = parseFloat(document.getElementById('editAmount').value);
    expense.project = document.getElementById('editProject').value;
    expense.category = document.getElementById('editCategory').value;
    expense.note = document.getElementById('editNote').value;

    saveExpenses();
    closeModal();
    showNotification('✅ 已更新支出記錄', 'success');
    renderExpenseList();
    updateTodaySummary();
    renderStats();
}

function handleDelete() {
    if (confirm('確定要刪除此記錄嗎？')) {
        expenses = expenses.filter(e => e.id !== currentEditingId);
        saveExpenses();
        closeModal();
        showNotification('✅ 已刪除記錄', 'success');
        renderExpenseList();
        updateTodaySummary();
        renderStats();
    }
}

// ========== 導出和匯入 ==========
function handleExport() {
    const filtered = getFilteredExpenses();
    
    if (filtered.length === 0) {
        showNotification('無數據可導出', 'error');
        return;
    }

    let csv = '日期,金額,項目,分類,備註\n';
    filtered.forEach(e => {
        const categoryInfo = CATEGORIES[e.category];
        csv += `"${e.date}","${e.amount}","${e.project}","${categoryInfo.name}","${e.note}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `expenses_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    showNotification('✅ 已導出 CSV 文件', 'success');
}

function handleExportData() {
    const data = {
        expenses,
        exportedAt: new Date().toISOString(),
        version: '1.0'
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `expenses_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();

    showNotification('✅ 已導出備份文件', 'success');
}

function handleImportData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            if (data.expenses && Array.isArray(data.expenses)) {
                if (confirm(`確定要匯入 ${data.expenses.length} 筆記錄嗎？`)) {
                    expenses = data.expenses;
                    saveExpenses();
                    showNotification('✅ 已成功匯入數據', 'success');
                    updateTodaySummary();
                    renderExpenseList();
                    renderStats();
                }
            }
        } catch (error) {
            showNotification('❌ 文件格式錯誤', 'error');
        }
    };
    reader.readAsText(file);

    elements.importFile.value = '';
}

function handleClearAll() {
    if (confirm('確定要清空所有記錄嗎？此操作無法撤銷！')) {
        if (confirm('再次確認？')) {
            expenses = [];
            saveExpenses();
            showNotification('✅ 已清空所有記錄', 'success');
            updateTodaySummary();
            renderExpenseList();
            renderStats();
        }
    }
}

// ========== Google Sheets 同步 ==========
function syncToGoogleSheets() {
    const gasUrl = elements.gasUrl.value || localStorage.getItem('expenseGasUrl');

    if (!gasUrl) {
        showNotification('❌ 請先設置 Google Apps Script URL', 'error');
        showPage('settings');
        return;
    }

    elements.syncBtn.disabled = true;
    elements.syncBtn.innerHTML = '💫 同步中...';

    const payload = {
        action: 'appendExpenses',
        data: expenses,
        timestamp: new Date().toISOString()
    };

    fetch(gasUrl, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification(`✅ 已同步 ${expenses.length} 筆記錄到 Google Sheets`, 'success');
        } else {
            showNotification(`❌ 同步失敗: ${result.error}`, 'error');
        }
    })
    .catch(error => {
        showNotification(`❌ 同步錯誤: ${error.message}`, 'error');
    })
    .finally(() => {
        elements.syncBtn.disabled = false;
        elements.syncBtn.innerHTML = '☁️ 同步到 Google Sheets';
    });
}

function testGASConnection() {
    const gasUrl = elements.gasUrl.value;

    if (!gasUrl) {
        showNotification('❌ 請輸入 Google Apps Script URL', 'error');
        return;
    }

    elements.testGasBtn.disabled = true;
    const statusEl = elements.gasStatus;
    statusEl.classList.add('show', 'success');
    statusEl.textContent = '🔄 測試中...';

    fetch(gasUrl, {
        method: 'POST',
        body: JSON.stringify({ action: 'test' })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            statusEl.classList.remove('error');
            statusEl.classList.add('success');
            statusEl.textContent = '✅ 連接成功！';
            localStorage.setItem('expenseGasUrl', gasUrl);
        } else {
            statusEl.classList.remove('success');
            statusEl.classList.add('error');
            statusEl.textContent = `❌ 連接失敗: ${result.error}`;
        }
    })
    .catch(error => {
        statusEl.classList.remove('success');
        statusEl.classList.add('error');
        statusEl.textContent = `❌ 錯誤: ${error.message}`;
    })
    .finally(() => {
        elements.testGasBtn.disabled = false;
        setTimeout(() => {
            statusEl.classList.remove('show');
        }, 3000);
    });
}

// ========== 通知系統 ==========
function showNotification(message, type = 'info') {
    const notification = elements.notification;
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ========== 存儲功能 ==========
function saveExpenses() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function loadExpenses() {
    const data = localStorage.getItem(STORAGE_KEY);
    expenses = data ? JSON.parse(data) : [];
}

// ========== 啟動應用 ==========
document.addEventListener('DOMContentLoaded', init);

// 輔助函數
function closeModal() {
    elements.editModal.classList.remove('show');
    currentEditingId = null;
}

// 初始化彈出選擇的編輯表單分類
document.addEventListener('DOMContentLoaded', () => {
    const editCategory = document.getElementById('editCategory');
    Object.entries(CATEGORIES).forEach(([key, value]) => {
        editCategory.innerHTML += `<option value="${key}">${value.icon} ${value.name}</option>`;
    });
});
