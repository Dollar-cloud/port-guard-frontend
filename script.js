// ============ PORT GUARD IDS - JAVASCRIPT ============

// Admin accounts
const adminAccounts = [
  { username: "alice", password: "adminpass1", adminId: "Admin-1" },
  { username: "bob", password: "adminpass2", adminId: "Admin-2" },
  { username: "carol", password: "adminpass3", adminId: "Admin-3" },
  { username: "dan", password: "adminpass4", adminId: "Admin-4" },
  { username: "eve", password: "adminpass5", adminId: "Admin-5" },
];

// App State
let appState = {
  user: null,
  isAdmin: false,
  adminId: null,
  scope: null,
  deviceCount: 5,
  isMonitoring: true,
  currentSection: 'hub',
  theme: localStorage.getItem('portguard-theme') || 'dark',
  devices: ['00:1A:2B:3C:4D:5E', '192.168.1.100', '00:1A:2B:3C:4D:5F'],
  blocks: ['malware-site.com', 'phishing-domain.net', '203.0.113.55'],
  settings: {
    emailNotif: true,
    smsNotif: false,
    autoUpdate: 'Daily',
    backupFreq: 'Daily'
  },
  notifications: [],
  alertCounter: 0
};

// Mock Data
const alerts = [
  { id: '1', time: "14:32:05", ip: "192.168.1.105", type: "Port Scan", severity: "critical", description: "Detected aggressive port scanning activity" },
  { id: '2', time: "14:28:41", ip: "10.0.0.45", type: "Brute Force", severity: "high", description: "Multiple failed SSH login attempts" },
  { id: '3', time: "14:15:22", ip: "192.168.1.88", type: "Malware", severity: "critical", description: "Suspicious executable detected" },
  { id: '4', time: "13:55:10", ip: "172.16.0.12", type: "DDoS", severity: "high", description: "Unusual traffic volume detected" },
  { id: '5', time: "13:42:33", ip: "192.168.1.200", type: "Intrusion", severity: "medium", description: "Unauthorized access attempt blocked" },
  { id: '6', time: "12:30:18", ip: "10.0.0.78", type: "Phishing", severity: "medium", description: "Suspicious URL access blocked" },
  { id: '7', time: "11:15:45", ip: "192.168.1.50", type: "Data Exfil", severity: "low", description: "Large file transfer detected" },
];

const logs = [
  { timestamp: "2024-01-15 14:32:05", level: "error", message: "[ALERT] Port scan detected from 192.168.1.105" },
  { timestamp: "2024-01-15 14:30:12", level: "warning", message: "[WARN] High network traffic on eth0" },
  { timestamp: "2024-01-15 14:28:41", level: "error", message: "[ALERT] Brute force attempt blocked" },
  { timestamp: "2024-01-15 14:25:00", level: "info", message: "[INFO] System scan completed - No threats found" },
  { timestamp: "2024-01-15 14:20:33", level: "success", message: "[OK] Firewall rules updated successfully" },
  { timestamp: "2024-01-15 14:15:22", level: "error", message: "[ALERT] Malware signature detected" },
  { timestamp: "2024-01-15 14:10:00", level: "info", message: "[INFO] Database backup completed" },
  { timestamp: "2024-01-15 14:05:18", level: "success", message: "[OK] SSL certificates renewed" },
  { timestamp: "2024-01-15 14:00:00", level: "info", message: "[INFO] Scheduled maintenance started" },
  { timestamp: "2024-01-15 13:55:10", level: "warning", message: "[WARN] DDoS mitigation activated" },
];

const templates = [
  { id: '1', name: "Home Network", mode: 'single', deviceCount: 1, lastUpdated: "2024-01-15 10:30" },
  { id: '2', name: "Office LAN Setup", mode: 'multi', deviceCount: 10, lastUpdated: "2024-01-14 16:45" },
  { id: '3', name: "Enterprise Scan", mode: 'custom', deviceCount: 25, lastUpdated: "2024-01-13 09:15" },
  { id: '4', name: "Small Business", mode: 'custom', deviceCount: 8, lastUpdated: "2024-01-12 14:20" },
  { id: '5', name: "Data Center", mode: 'custom', deviceCount: 50, lastUpdated: "2024-01-11 11:00" },
  { id: '6', name: "IoT Monitoring", mode: 'multi', deviceCount: 10, lastUpdated: "2024-01-10 08:30" },
];

const sysInfo = [
  { label: "CPU", value: "Intel Core i7-9750H" },
  { label: "CPU Usage", value: "22%" },
  { label: "RAM", value: "16 GB DDR4" },
  { label: "RAM Usage", value: "54%" },
  { label: "SSD", value: "512 GB NVMe" },
  { label: "SSD Usage", value: "41%" },
  { label: "Network", value: "1 Gbps Ethernet" },
  { label: "Public IP", value: "192.0.2.101" },
];

// ============ DOM ELEMENTS ============
const $ = (id) => document.getElementById(id);

// ============ THEME ============
function initTheme() {
  if (appState.theme === 'light') {
    document.body.classList.add('light');
    if ($('sunIcon')) $('sunIcon').classList.add('hidden');
    if ($('moonIcon')) $('moonIcon').classList.remove('hidden');
    if ($('sunIconLanding')) $('sunIconLanding').classList.add('hidden');
    if ($('moonIconLanding')) $('moonIconLanding').classList.remove('hidden');
  }
}

function toggleTheme() {
  appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portguard-theme', appState.theme);
  document.body.classList.toggle('light');
  if ($('sunIcon')) $('sunIcon').classList.toggle('hidden');
  if ($('moonIcon')) $('moonIcon').classList.toggle('hidden');
  if ($('sunIconLanding')) $('sunIconLanding').classList.toggle('hidden');
  if ($('moonIconLanding')) $('moonIconLanding').classList.toggle('hidden');
}

// ============ LANDING PAGE ============
function initLandingPage() {
  const landingPage = $('landingPage');
  const landingEnterBtn = $('landingEnterBtn');
  const themeToggleLanding = $('themeToggleLanding');
  
  if (!landingPage) return;
  
  if (landingEnterBtn) {
    landingEnterBtn.addEventListener('click', () => {
      landingPage.classList.add('fade-out');
      setTimeout(() => {
        landingPage.classList.add('hidden');
        initBootLoader();
        $('bootLoader').classList.remove('hidden');
      }, 600);
    });
  }
  
  if (themeToggleLanding) {
    themeToggleLanding.addEventListener('click', toggleTheme);
  }
}

// ============ BOOT LOADER ============
function initBootLoader() {
  const bootLoader = $('bootLoader');
  const progressFill = $('progressFill');
  const progressText = $('progressText');
  
  if (!bootLoader || !progressFill || !progressText) return;
  
  let progress = 0;
  const duration = 3000;
  const startTime = Date.now();
  
  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    progress = Math.min((elapsed / duration) * 100, 100);
    
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}% Complete`;
    
    if (elapsed >= duration) {
      clearInterval(interval);
      bootLoader.classList.add('fade-out');
      setTimeout(() => {
        bootLoader.classList.add('hidden');
        $('authScreen').classList.remove('hidden');
      }, 400);
    }
  }, 50);
}

// ============ AUTH SCREEN ============
function initAuthScreen() {
  const authForm = $('authForm');
  const toggleModeBtn = $('toggleModeBtn');
  const toggleAdminBtn = $('toggleAdminBtn');
  
  let isLogin = true;
  let isAdminLogin = false;
  
  function updateAuthUI() {
    $('formTitle').textContent = isAdminLogin ? 'Admin Login' : (isLogin ? 'Welcome Back' : 'Create Account');
    $('submitBtn').textContent = isLogin || isAdminLogin ? 'Sign In' : 'Sign Up';
    $('toggleText').textContent = isLogin ? "Don't have an account?" : "Already have an account?";
    toggleModeBtn.textContent = isLogin ? 'Sign Up' : 'Sign In';
    toggleAdminBtn.textContent = isAdminLogin ? 'User Login' : 'Admin Login';
    if (isAdminLogin) {
      $('toggleText').textContent = '';
      toggleModeBtn.classList.add('hidden');
    } else {
      toggleModeBtn.classList.remove('hidden');
    }
  }
  
  toggleModeBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    isAdminLogin = false;
    hideAuthMessage();
    updateAuthUI();
  });
  
  toggleAdminBtn.addEventListener('click', () => {
    isAdminLogin = !isAdminLogin;
    isLogin = true;
    hideAuthMessage();
    updateAuthUI();
  });
  
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = $('username').value.trim();
    const password = $('password').value;
    
    if (!username || !password) {
      showAuthMessage('Please enter both username and password.', 'error');
      return;
    }
    
    if (isAdminLogin) {
      const admin = adminAccounts.find(a => 
        a.username.toLowerCase() === username.toLowerCase() && a.password === password
      );
      if (admin) {
        appState.user = admin.username;
        appState.isAdmin = true;
        appState.adminId = admin.adminId;
        showAuthMessage('Admin login successful!', 'success');
        setTimeout(() => transitionToScope(), 500);
      } else {
        showAuthMessage('Invalid admin credentials.', 'error');
      }
    } else if (isLogin) {
      appState.user = username;
      appState.isAdmin = false;
      showAuthMessage('Login successful!', 'success');
      setTimeout(() => transitionToScope(), 500);
    } else {
      if (password.length < 4) {
        showAuthMessage('Password must be at least 4 characters.', 'error');
        return;
      }
      showAuthMessage('Registration successful! Please login.', 'success');
      setTimeout(() => {
        isLogin = true;
        updateAuthUI();
        hideAuthMessage();
      }, 1200);
    }
  });
}

function showAuthMessage(text, type) {
  const msg = $('authMessage');
  msg.textContent = text;
  msg.className = `auth-message ${type}`;
  msg.classList.remove('hidden');
}

function hideAuthMessage() {
  $('authMessage').classList.add('hidden');
}

function transitionToScope() {
  const authScreen = $('authScreen');
  authScreen.classList.add('fade-out');
  setTimeout(() => {
    authScreen.classList.add('hidden');
    initScopeModal();
    $('scopeModal').classList.remove('hidden');
  }, 400);
}

// ============ SCOPE MODAL ============
function initScopeModal() {
  const scopeOptions = $('scopeOptions');
  const customCountDiv = $('customCountDiv');
  const selectedDeviceText = $('selectedDeviceText');
  const scopeContinueBtn = $('scopeContinueBtn');
  
  // Render scope options - all modes available for both admin and user
  const scopes = [
    { id: 'single', icon: 'monitor', title: 'Single System', desc: 'Monitor one device' },
    { id: 'multi', icon: 'server', title: 'Multiple Systems (LAN)', desc: 'Monitor up to 10 devices' },
    { id: 'custom', icon: 'settings', title: 'Custom', desc: 'Select device count' },
  ];
  
  const iconSVGs = {
    monitor: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    server: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>',
    settings: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };
  
  scopeOptions.innerHTML = scopes.map(s => `
    <button class="scope-btn" data-scope="${s.id}">
      ${iconSVGs[s.icon]}
      <div class="scope-btn-text">
        <div class="title">${s.title}</div>
        <div class="desc">${s.desc}</div>
      </div>
    </button>
  `).join('');
  
  // Generate device selector numbers
  const deviceScroll = $('deviceScroll');
  let numbersHtml = '<div class="selector-spacer"></div>';
  for (let i = 2; i <= 50; i++) {
    numbersHtml += `<div class="selector-item" data-value="${i}">${i}</div>`;
  }
  numbersHtml += '<div class="selector-spacer"></div>';
  deviceScroll.innerHTML = numbersHtml;
  
  let selectedScope = null;
  
  // Scope button click handlers
  scopeOptions.querySelectorAll('.scope-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      scopeOptions.querySelectorAll('.scope-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedScope = btn.dataset.scope;
      
      if (selectedScope === 'custom') {
        customCountDiv.classList.remove('hidden');
        selectedDeviceText.classList.remove('hidden');
        // Scroll to initial value and focus for keyboard input
        setTimeout(() => {
          const item = deviceScroll.querySelector(`[data-value="${appState.deviceCount}"]`);
          if (item) {
            item.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
          deviceScroll.focus();
        }, 100);
      } else {
        customCountDiv.classList.add('hidden');
        selectedDeviceText.classList.add('hidden');
      }
    });
  });
  
  // Device scroll handler with momentum scrolling
  let scrollTimeout = null;
  let isScrolling = false;
  
  deviceScroll.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true;
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      snapToClosest();
    }, 150);
    
    const items = deviceScroll.querySelectorAll('.selector-item');
    const containerRect = deviceScroll.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;
    
    let closestItem = null;
    let closestDistance = Infinity;
    
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
      }
      
      item.classList.remove('selected');
    });
    
    if (closestItem) {
      closestItem.classList.add('selected');
      appState.deviceCount = parseInt(closestItem.dataset.value);
      $('selectedCount').textContent = appState.deviceCount;
    }
  });
  
  function snapToClosest() {
    const items = deviceScroll.querySelectorAll('.selector-item');
    const containerRect = deviceScroll.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;
    
    let closestItem = null;
    let closestDistance = Infinity;
    
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
      }
    });
    
    if (closestItem) {
      closestItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
  
  // Click on number to select
  deviceScroll.querySelectorAll('.selector-item').forEach(item => {
    item.addEventListener('click', () => {
      item.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  });
  
  // Keyboard input handler
  let numberInputBuffer = '';
  let numberInputTimeout = null;
  
  deviceScroll.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const currentValue = appState.deviceCount;
      const newValue = e.key === 'ArrowUp' ? Math.min(50, currentValue + 1) : Math.max(2, currentValue - 1);
      const item = deviceScroll.querySelector(`[data-value="${newValue}"]`);
      if (item) {
        item.scrollIntoView({ block: 'center', behavior: 'smooth' });
        appState.deviceCount = newValue;
        $('selectedCount').textContent = newValue;
      }
    } else if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      numberInputBuffer += e.key;
      clearTimeout(numberInputTimeout);
      numberInputTimeout = setTimeout(() => {
        const num = parseInt(numberInputBuffer);
        if (num >= 2 && num <= 50) {
          const item = deviceScroll.querySelector(`[data-value="${num}"]`);
          if (item) {
            item.scrollIntoView({ block: 'center', behavior: 'smooth' });
            appState.deviceCount = num;
            $('selectedCount').textContent = num;
          }
        }
        numberInputBuffer = '';
      }, 500);
    }
  });
  
  // Make device selector focusable
  deviceScroll.setAttribute('tabindex', '0');
  
  scopeContinueBtn.addEventListener('click', () => {
    if (!selectedScope) {
      alert('Please select an interface scope.');
      return;
    }
    
    appState.scope = selectedScope;
    if (selectedScope === 'single') {
      appState.deviceCount = 1;
    } else if (selectedScope === 'multi') {
      appState.deviceCount = 10;
    }
    
    transitionToDashboard();
  });
}

function transitionToDashboard() {
  const scopeModal = $('scopeModal');
  scopeModal.classList.add('fade-out');
  setTimeout(() => {
    scopeModal.classList.add('hidden');
    $('appContainer').classList.remove('hidden');
    renderDashboard();
  }, 400);
}

// ============ DASHBOARD ============
function renderDashboard() {
  updateTopBar();
  updateMonitoringBar();
  renderHub();
  initBottomNav();
  initThemeToggle();
}

function updateTopBar() {
  const statusPill = $('statusPill');
  const userInfo = $('userInfo');
  
  statusPill.className = `status-pill ${appState.isMonitoring ? 'secure' : 'danger'}`;
  statusPill.textContent = appState.isMonitoring ? 'System Secure' : 'Monitoring Paused';
  
  userInfo.innerHTML = appState.user ? 
    `${appState.user} ${appState.isAdmin ? '<span class="admin">(Admin)</span>' : ''}` : '';
  
  updateNotificationBadge();
  initNotificationSystem();
}

function updateMonitoringBar() {
  const statusText = $('monitoringStatusText');
  const startBtn = $('startBtn');
  const stopBtn = $('stopBtn');
  
  statusText.className = appState.isMonitoring ? 'active' : 'paused';
  statusText.textContent = appState.isMonitoring ? 'Active' : 'Inactive';
  
  startBtn.disabled = appState.isMonitoring;
  stopBtn.disabled = !appState.isMonitoring;
}

function initThemeToggle() {
  $('themeToggle').addEventListener('click', toggleTheme);
}

// ============ NOTIFICATION SYSTEM ============
function initNotificationSystem() {
  const notificationBtn = $('notificationBtn');
  const notificationClose = $('notificationClose');
  const alertDetailClose = $('alertDetailClose');
  
  if (notificationBtn) {
    notificationBtn.addEventListener('click', showNotificationCenter);
  }
  
  if (notificationClose) {
    notificationClose.addEventListener('click', hideNotificationCenter);
  }
  
  if (alertDetailClose) {
    alertDetailClose.addEventListener('click', hideAlertDetail);
  }
  
  const notificationOverlay = $('notificationOverlay');
  const alertDetailOverlay = $('alertDetailOverlay');
  
  if (notificationOverlay) {
    notificationOverlay.addEventListener('click', (e) => {
      if (e.target === notificationOverlay) hideNotificationCenter();
    });
  }
  
  if (alertDetailOverlay) {
    alertDetailOverlay.addEventListener('click', (e) => {
      if (e.target === alertDetailOverlay) hideAlertDetail();
    });
  }
  
  // Simulate alert generation when monitoring is active
  if (appState.isMonitoring) {
    simulateAlertGeneration();
  }
}

function generateAlert(attackType, severity, affectedIP, preventionStatus, suggestionList = []) {
  appState.alertCounter++;
  const alert = {
    id: `alert-${appState.alertCounter}`,
    attackType: attackType,
    severity: severity,
    affectedIP: affectedIP,
    timestamp: new Date().toISOString(),
    preventionStatus: preventionStatus,
    suggestionList: suggestionList,
    status: 'active',
    read: false
  };
  
  appState.notifications.unshift(alert);
  updateNotificationBadge();
  renderNotificationList();
  
  return alert;
}

function generateSuggestions(attackType, severity, affectedIP) {
  const suggestions = [];
  
  if (severity === 'critical' || severity === 'high') {
    suggestions.push({ action: 'Block IP', type: 'block-ip', target: affectedIP });
    suggestions.push({ action: 'Add to Block List', type: 'add-blocklist', target: affectedIP });
  }
  
  if (attackType === 'Port Scan' || attackType === 'Brute Force') {
    suggestions.push({ action: 'Increase Monitoring', type: 'increase-monitoring', target: affectedIP });
  }
  
  if (severity === 'low' || severity === 'medium') {
    suggestions.push({ action: 'Ignore / False Positive', type: 'ignore', target: affectedIP });
  }
  
  return suggestions;
}

function simulateAlertGeneration() {
  // Generate alerts based on existing alerts data
  const attackTypes = ['Port Scan', 'Brute Force', 'Malware', 'DDoS', 'Intrusion', 'Phishing', 'Data Exfil'];
  const severities = ['low', 'medium', 'high', 'critical'];
  const ips = ['192.168.1.105', '10.0.0.45', '192.168.1.88', '172.16.0.12', '192.168.1.200'];
  
  // Generate 2-3 random alerts
  const numAlerts = Math.floor(Math.random() * 2) + 2;
  
  for (let i = 0; i < numAlerts; i++) {
    setTimeout(() => {
      const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      const affectedIP = ips[Math.floor(Math.random() * ips.length)];
      const canPrevent = Math.random() > 0.4;
      const preventionStatus = canPrevent ? 'prevented' : 'not prevented';
      const suggestionList = canPrevent ? [] : generateSuggestions(attackType, severity, affectedIP);
      
      generateAlert(attackType, severity, affectedIP, preventionStatus, suggestionList);
    }, (i + 1) * 5000);
  }
}

function updateNotificationBadge() {
  const badge = $('notificationBadge');
  if (!badge) return;
  
  const unreadCount = appState.notifications.filter(n => !n.read).length;
  
  if (unreadCount > 0) {
    badge.textContent = unreadCount > 99 ? '99+' : unreadCount.toString();
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function showNotificationCenter() {
  const overlay = $('notificationOverlay');
  if (!overlay) return;
  
  renderNotificationList();
  overlay.classList.remove('hidden');
}

function hideNotificationCenter() {
  const overlay = $('notificationOverlay');
  if (!overlay) return;
  
  overlay.classList.add('hidden');
}

function renderNotificationList() {
  const list = $('notificationList');
  if (!list) return;
  
  if (appState.notifications.length === 0) {
    list.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No notifications</div>';
    return;
  }
  
  list.innerHTML = appState.notifications.map(notif => {
    const date = new Date(notif.timestamp);
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `
      <div class="notification-item ${notif.read ? '' : 'unread'}" onclick="showAlertDetail('${notif.id}')">
        <div class="notification-item-header">
          <div class="notification-item-title">${notif.attackType}</div>
          <div class="notification-item-time">${dateStr} ${timeStr}</div>
        </div>
        <div class="notification-item-body">
          <div style="margin-bottom: 0.5rem;">
            <span class="notification-item-severity ${notif.severity}">${notif.severity}</span>
          </div>
          <div style="font-family: 'SF Mono', 'Consolas', monospace; color: var(--primary); margin-bottom: 0.25rem;">${notif.affectedIP}</div>
          <div class="notification-item-status ${notif.preventionStatus === 'prevented' ? 'prevented' : ''}">
            ${notif.preventionStatus === 'prevented' ? '✓ Prevented' : '⚠ Requires Action'}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function showAlertDetail(alertId) {
  const alert = appState.notifications.find(n => n.id === alertId);
  if (!alert) return;
  
  // Mark as read
  alert.read = true;
  updateNotificationBadge();
  renderNotificationList();
  
  const overlay = $('alertDetailOverlay');
  const content = $('alertDetailContent');
  const title = $('alertDetailTitle');
  
  if (!overlay || !content || !title) return;
  
  title.textContent = alert.attackType;
  
  const date = new Date(alert.timestamp);
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  content.innerHTML = `
    <div class="alert-detail-section">
      <h4>Severity</h4>
      <div class="alert-detail-value">
        <span class="notification-item-severity ${alert.severity}">${alert.severity}</span>
      </div>
    </div>
    
    <div class="alert-detail-section">
      <h4>Affected IP / Device</h4>
      <div class="alert-detail-value alert-detail-ip">${alert.affectedIP}</div>
    </div>
    
    <div class="alert-detail-section">
      <h4>Detection Time</h4>
      <div class="alert-detail-value">${dateStr} at ${timeStr}</div>
    </div>
    
    <div class="alert-detail-section">
      <h4>Prevention Status</h4>
      <div class="alert-detail-value ${alert.preventionStatus === 'prevented' ? 'notification-item-status prevented' : ''}">
        ${alert.preventionStatus === 'prevented' ? '✓ Successfully Prevented' : '⚠ Not Prevented - Action Required'}
      </div>
    </div>
    
    ${alert.suggestionList.length > 0 ? `
    <div class="alert-detail-section">
      <h4>Suggested Actions</h4>
      <div class="alert-detail-suggestions">
        ${alert.suggestionList.map(suggestion => `
          <div class="alert-suggestion-item">
            <div class="alert-suggestion-text">${suggestion.action}</div>
            ${appState.isAdmin ? `
              <button class="alert-suggestion-action" onclick="executeSuggestion('${alert.id}', '${suggestion.type}', '${suggestion.target}')">
                Execute
              </button>
            ` : `
              <button class="alert-suggestion-action user-only" disabled>
                Admin Only
              </button>
            `}
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
    
    <div class="alert-detail-actions">
      <button class="alert-action-btn secondary" onclick="markAlertResolved('${alert.id}')">
        Mark as Resolved
      </button>
      ${alert.status === 'active' ? `
        <button class="alert-action-btn primary" onclick="dismissAlert('${alert.id}')">
          Dismiss
        </button>
      ` : ''}
    </div>
  `;
  
  overlay.classList.remove('hidden');
}

function hideAlertDetail() {
  const overlay = $('alertDetailOverlay');
  if (!overlay) return;
  
  overlay.classList.add('hidden');
}

function executeSuggestion(alertId, actionType, target) {
  const alert = appState.notifications.find(n => n.id === alertId);
  if (!alert || !appState.isAdmin) return;
  
  switch(actionType) {
    case 'block-ip':
      if (!appState.blocks.includes(target)) {
        appState.blocks.push(target);
      }
      break;
    case 'add-blocklist':
      if (!appState.blocks.includes(target)) {
        appState.blocks.push(target);
      }
      break;
    case 'increase-monitoring':
      // Increase monitoring logic
      break;
    case 'ignore':
      alert.status = 'ignored';
      break;
  }
  
  alert.preventionStatus = 'prevented';
  alert.suggestionList = [];
  updateNotificationBadge();
  renderNotificationList();
  showAlertDetail(alertId);
}

function markAlertResolved(alertId) {
  const alert = appState.notifications.find(n => n.id === alertId);
  if (!alert) return;
  
  alert.status = 'resolved';
  updateNotificationBadge();
  renderNotificationList();
  hideAlertDetail();
}

function dismissAlert(alertId) {
  const alert = appState.notifications.find(n => n.id === alertId);
  if (!alert) return;
  
  alert.status = 'dismissed';
  updateNotificationBadge();
  renderNotificationList();
  hideAlertDetail();
}

window.showAlertDetail = showAlertDetail;
window.executeSuggestion = executeSuggestion;
window.markAlertResolved = markAlertResolved;
window.dismissAlert = dismissAlert;

// ============ LIVE ALERTS ============
// Removed - no longer showing full-width alert banners

// ============ MONITORING CONTROLS ============
$('startBtn').addEventListener('click', () => {
  appState.isMonitoring = true;
  updateTopBar();
  updateMonitoringBar();
  renderHub();
});

$('stopBtn').addEventListener('click', () => {
  appState.isMonitoring = false;
  updateTopBar();
  updateMonitoringBar();
  renderHub();
});

// ============ HUB SECTION ============
function renderHub() {
  const content = $('mainContent');
  const showLan = (appState.scope === 'multi' || appState.scope === 'custom') && appState.isAdmin;
  const latestAlert = alerts[0];
  const latestLog = logs[0];
  const detectionEngineStatus = appState.isMonitoring ? 'Operational' : 'Non-Operational';
  const detectionEngineClass = appState.isMonitoring ? 'success' : 'danger';
  
  content.innerHTML = `
    <div class="animate-fade-in-up">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="title">Connected Devices</div>
          <div class="value">9<span class="sub-value"> / 20</span></div>
        </div>
        <div class="stat-card">
          <div class="title">Active Alerts</div>
          <div class="value danger">${alerts.length}</div>
        </div>
        <div class="stat-card">
          <div class="title">Detection Engine</div>
          <div class="value ${detectionEngineClass}">${detectionEngineStatus}</div>
        </div>
      </div>
      
      <div class="hub-grid hub-grid-two-rows">
        <div class="hub-card" onclick="showSection('alerts')">
          <div class="hub-card-header">
            <div class="hub-card-info">
              <div class="hub-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div class="hub-card-title">Security Alerts</div>
                <div class="hub-card-desc">View and manage security threats</div>
              </div>
            </div>
            <span class="hub-card-badge badge-danger">${alerts.length} Active</span>
          </div>
          <div class="hub-card-preview">
            <span class="preview-time">${latestAlert.time}</span>
            <span class="preview-text">${latestAlert.type}: ${latestAlert.description}</span>
          </div>
        </div>
        
        <div class="hub-card" onclick="showSection('logs')">
          <div class="hub-card-header">
            <div class="hub-card-info">
              <div class="hub-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div>
                <div class="hub-card-title">System Logs</div>
                <div class="hub-card-desc">Monitor system activity and events</div>
              </div>
            </div>
          </div>
          <div class="hub-card-preview">
            <span class="preview-time">${latestLog.timestamp.split(' ')[1]}</span>
            <span class="preview-text ${latestLog.level}">${latestLog.message}</span>
          </div>
        </div>
        
        <div class="hub-card" onclick="showSection('sysinfo')">
          <div class="hub-card-header">
            <div class="hub-card-info">
              <div class="hub-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <div>
                <div class="hub-card-title">System Info</div>
                <div class="hub-card-desc">Hardware and network information</div>
              </div>
            </div>
          </div>
        </div>
        
        ${appState.isAdmin ? `
        <div class="hub-card" onclick="showSection('admin')">
          <div class="hub-card-header">
            <div class="hub-card-info">
              <div class="hub-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div>
                <div class="hub-card-title">Admin Panel</div>
                <div class="hub-card-desc">Manage devices and block lists</div>
              </div>
            </div>
            <span class="hub-card-badge badge-default">Admin</span>
          </div>
          <div class="hub-card-preview">
            <span class="preview-label">Mode:</span>
            <span class="preview-text">${appState.scope ? appState.scope.charAt(0).toUpperCase() + appState.scope.slice(1) : 'N/A'}</span>
          </div>
        </div>
        
        <div class="hub-card" onclick="showSection('templates')">
          <div class="hub-card-header">
            <div class="hub-card-info">
              <div class="hub-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
              </div>
              <div>
                <div class="hub-card-title">Templates</div>
                <div class="hub-card-desc">Saved monitoring configurations</div>
              </div>
            </div>
            <span class="hub-card-badge badge-default">${templates.length} Saved</span>
          </div>
        </div>
        ` : ''}
        
        ${showLan ? `
        <div class="hub-card" onclick="showSection('lan')">
          <div class="hub-card-header">
            <div class="hub-card-info">
              <div class="hub-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="8" rx="2"/>
                  <rect x="2" y="14" width="20" height="8" rx="2"/>
                  <line x1="6" y1="6" x2="6.01" y2="6"/>
                  <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
              </div>
              <div>
                <div class="hub-card-title">LAN Devices</div>
                <div class="hub-card-desc">Connected network devices</div>
              </div>
            </div>
            <span class="hub-card-badge badge-success">${appState.scope === 'multi' ? '10' : 'Custom'}</span>
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  `;
  
  appState.currentSection = 'hub';
}

// ============ SECTION RENDERING ============
function showSection(section) {
  appState.currentSection = section;
  const content = $('mainContent');
  
  // Fade out animation
  content.style.animation = 'fade-out 0.2s ease-out forwards';
  
  setTimeout(() => {
    switch(section) {
      case 'hub':
        renderHub();
        break;
      case 'alerts':
        renderAlerts();
        break;
      case 'logs':
        renderLogs();
        break;
      case 'sysinfo':
        renderSysInfo();
        break;
      case 'admin':
        if (appState.isAdmin) renderAdmin();
        break;
      case 'templates':
        if (appState.isAdmin) renderTemplates();
        break;
      case 'lan':
        if (appState.isAdmin) renderLan();
        break;
      case 'settings':
        renderSettings();
        break;
    }
    content.style.animation = 'fade-in-up 0.3s ease-out forwards';
  }, 200);
}

function renderAlerts() {
  const content = $('mainContent');
  const visibleAlerts = appState.isAdmin ? alerts : alerts.slice(0, 5);
  
  content.innerHTML = `
    <div class="section-page">
      <div class="section-header">
        <button class="btn btn-ghost" onclick="showSection('hub')">
          ← Back
        </button>
        <h2 class="gradient-text">Security Alerts</h2>
        ${!appState.isAdmin ? '<span class="section-tag">Read-only</span>' : ''}
      </div>
      
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>IP</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${visibleAlerts.map(a => `
                <tr>
                  <td class="font-mono">${a.time}</td>
                  <td class="font-mono">${a.ip}</td>
                  <td>${a.type}</td>
                  <td><span class="badge ${a.severity}">${a.severity}</span></td>
                  <td style="color: var(--text-muted)">${a.description}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderLogs() {
  const content = $('mainContent');
  const visibleLogs = appState.isAdmin ? logs : logs.slice(0, 5);
  
  content.innerHTML = `
    <div class="section-page">
      <div class="section-header">
        <button class="btn btn-ghost" onclick="showSection('hub')">
          ← Back
        </button>
        <h2 class="gradient-text">System Logs</h2>
        ${!appState.isAdmin ? '<span class="section-tag">Limited</span>' : ''}
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="log-controls">
            <input type="text" class="form-control" id="logFilter" placeholder="Filter logs..." oninput="filterLogs()">
            ${appState.isAdmin ? '<button class="btn btn-start" onclick="exportLogs()">Export CSV</button>' : ''}
          </div>
          
          <div class="log-container" id="logContainer">
            ${visibleLogs.map(l => `
              <div class="log-entry">
                <span class="log-timestamp">${l.timestamp}</span>
                <span class="log-message ${l.level}">${l.message}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function filterLogs() {
  const filter = $('logFilter').value.toLowerCase();
  const container = $('logContainer');
  const baseLogs = appState.isAdmin ? logs : logs.slice(0, 5);
  const filtered = baseLogs.filter(l => 
    l.message.toLowerCase().includes(filter) || l.timestamp.includes(filter)
  );
  
  container.innerHTML = filtered.map(l => `
    <div class="log-entry">
      <span class="log-timestamp">${l.timestamp}</span>
      <span class="log-message ${l.level}">${l.message}</span>
    </div>
  `).join('');
}

function exportLogs() {
  const csv = "Timestamp,Level,Message\n" + 
    logs.map(l => `"${l.timestamp}","${l.level}","${l.message}"`).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "port_guard_logs.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function renderSysInfo() {
  const content = $('mainContent');
  
  if (!appState.isAdmin) {
    content.innerHTML = `
      <div class="section-page">
        <div class="section-header">
          <button class="btn btn-ghost" onclick="showSection('hub')">
            ← Back
          </button>
          <h2 class="gradient-text">System Information</h2>
        </div>
        <div class="card">
          <div class="card-body">
            <p style="color: var(--text-muted);">Access restricted to administrators.</p>
          </div>
        </div>
      </div>
    `;
    return;
  }
  
  content.innerHTML = `
    <div class="section-page">
      <div class="section-header">
        <button class="btn btn-ghost" onclick="showSection('hub')">
          ← Back
        </button>
        <h2 class="gradient-text">System Information</h2>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3>System Information</h3>
        </div>
        <table>
          <tbody>
            ${sysInfo.map(s => `
              <tr>
                <td style="color: var(--text-muted); width: 33%;">${s.label}</td>
                <td>${s.value}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTemplates() {
  const content = $('mainContent');
  
  const modeIcons = {
    single: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    multi: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>',
    custom: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };
  
  content.innerHTML = `
    <div class="section-page">
      <div class="section-header">
        <button class="btn btn-ghost" onclick="showSection('hub')">
          ← Back
        </button>
        <h2 class="gradient-text">Templates</h2>
      </div>
      
      <div class="templates-grid">
        ${templates.map(t => `
          <div class="template-card">
            <div class="template-header">
              <div class="template-icon">${modeIcons[t.mode]}</div>
              <div class="template-name">${t.name}</div>
            </div>
            <div class="template-info">
              <div class="template-row">
                <span class="label">Mode</span>
                <span class="badge ${t.mode}">${t.mode}</span>
              </div>
              <div class="template-row">
                <span class="label">Devices</span>
                <span class="value">${t.deviceCount}</span>
              </div>
            </div>
            <div class="template-footer">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Last updated
              </span>
              <span>${t.lastUpdated}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAdmin() {
  const content = $('mainContent');
  
  content.innerHTML = `
    <div class="section-page">
      <div class="section-header">
        <button class="btn btn-ghost" onclick="showSection('hub')">
          ← Back
        </button>
        <h2 class="gradient-text">Admin Panel</h2>
      </div>
      
      <div class="admin-scope-panel">
        <h3>Mode:</h3>
        <div class="scope-buttons">
          <button class="scope-btn-small ${appState.scope === 'single' ? 'selected' : ''}" onclick="setAdminScope('single')">Single System</button>
          <button class="scope-btn-small ${appState.scope === 'multi' ? 'selected' : ''}" onclick="setAdminScope('multi')">Multiple Systems (LAN)</button>
          <button class="scope-btn-small ${appState.scope === 'custom' ? 'selected' : ''}" onclick="setAdminScope('custom')">Custom</button>
        </div>
        ${appState.scope === 'custom' ? `
          <div class="custom-count" style="margin-top: 1rem;">
            <input type="number" class="form-control" id="adminDeviceCount" min="2" max="50" value="${appState.deviceCount}" style="width: 80px; text-align: center;" onchange="updateAdminDeviceCount()">
            <span>devices</span>
          </div>
        ` : ''}
        <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">* Changing mode applies globally</p>
      </div>
      
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-body">
          <h3 style="color: var(--text-muted); margin-bottom: 1rem;">Authorized Devices</h3>
          <div class="device-list" id="deviceList">
            ${appState.devices.map((d, i) => `
              <div class="device-item">
                <span>${d}</span>
                <button class="remove-btn" onclick="removeDevice(${i})">✕</button>
              </div>
            `).join('')}
          </div>
          <div class="add-form">
            <input type="text" class="form-control" id="newDeviceInput" placeholder="00:1A:2B:3C:4D:5E or 192.168.1.100">
            <button onclick="addDevice()">+</button>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <h3 style="color: var(--text-muted); margin-bottom: 1rem;">Global Block List</h3>
          <div class="block-list" id="blockList">
            ${appState.blocks.map((b, i) => `
              <div class="block-item">
                <span>${b}</span>
                <button class="remove-btn" onclick="removeBlock(${i})">✕</button>
              </div>
            `).join('')}
          </div>
          <div class="add-form">
            <input type="text" class="form-control" id="newBlockInput" placeholder="example.com or 203.0.113.55">
            <button onclick="addBlock()">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setAdminScope(scope) {
  appState.scope = scope;
  if (scope === 'single') appState.deviceCount = 1;
  else if (scope === 'multi') appState.deviceCount = 10;
  updateMonitoringBar();
  renderAdmin();
}

function updateAdminDeviceCount() {
  const input = $('adminDeviceCount');
  appState.deviceCount = Math.min(50, Math.max(2, parseInt(input.value) || 5));
  input.value = appState.deviceCount;
  updateMonitoringBar();
}

function addDevice() {
  const input = $('newDeviceInput');
  if (input.value.trim()) {
    appState.devices.push(input.value.trim());
    renderAdmin();
  }
}

function removeDevice(index) {
  appState.devices.splice(index, 1);
  renderAdmin();
}

function addBlock() {
  const input = $('newBlockInput');
  if (input.value.trim()) {
    appState.blocks.push(input.value.trim());
    renderAdmin();
  }
}

function removeBlock(index) {
  appState.blocks.splice(index, 1);
  renderAdmin();
}

function renderLan() {
  const devices = [];
  for (let i = 0; i < appState.deviceCount; i++) {
    devices.push({
      ip: `192.168.1.${100 + i}`,
      mac: `00:0A:E6:3E:FD:${i.toString(16).padStart(2, '0').toUpperCase()}`,
      status: i === 0 ? 'Online' : (Math.random() > 0.4 ? 'Online' : 'Offline'),
      cpu: i === 0 ? 'Intel Core i7' : '—',
      cpuUsage: i === 0 ? '20%' : '—',
      ram: i === 0 ? '16GB' : '—',
      ramUsage: i === 0 ? '54%' : '—',
      ssd: i === 0 ? '512GB' : '—',
      ssdUsage: i === 0 ? '38%' : '—',
    });
  }
  
  const content = $('mainContent');
  content.innerHTML = `
    <div class="section-page">
      <div class="section-header">
        <button class="btn btn-ghost" onclick="showSection('hub')">
          ← Back
        </button>
        <h2 class="gradient-text">LAN Connected Devices</h2>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3>LAN Device List (${devices.length} devices)</h3>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>IP Address</th>
                <th>MAC Address</th>
                <th>Status</th>
                <th>CPU</th>
                <th>CPU Usage</th>
                <th>RAM</th>
                <th>RAM Usage</th>
                <th>SSD</th>
                <th>SSD Usage</th>
              </tr>
            </thead>
            <tbody>
              ${devices.map(d => `
                <tr>
                  <td class="font-mono">${d.ip}</td>
                  <td class="font-mono">${d.mac}</td>
                  <td style="color: ${d.status === 'Online' ? 'var(--success)' : 'var(--text-muted)'}; font-weight: 600;">${d.status}</td>
                  <td style="color: var(--text-muted)">${d.cpu}</td>
                  <td style="color: var(--text-muted)">${d.cpuUsage}</td>
                  <td style="color: var(--text-muted)">${d.ram}</td>
                  <td style="color: var(--text-muted)">${d.ramUsage}</td>
                  <td style="color: var(--text-muted)">${d.ssd}</td>
                  <td style="color: var(--text-muted)">${d.ssdUsage}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderSettings() {
  const content = $('mainContent');
  
  content.innerHTML = `
    <div class="section-page">
      <div class="section-header">
        <button class="btn btn-ghost" onclick="showSection('hub')">
          ← Back
        </button>
        <h2 class="gradient-text">Settings</h2>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="setting-row">
            <div class="setting-info">
              <div class="title">Enable Email Notifications</div>
              <div class="desc">Receive alerts via email</div>
            </div>
            <div class="toggle-switch ${appState.settings.emailNotif ? 'on' : 'off'}" onclick="toggleSetting('emailNotif')">
              <div class="knob"></div>
            </div>
          </div>
          
          <div class="setting-row">
            <div class="setting-info">
              <div class="title">Enable SMS Alerts (Critical only)</div>
              <div class="desc">Get SMS for critical threats</div>
            </div>
            <div class="toggle-switch ${appState.settings.smsNotif ? 'on' : 'off'}" onclick="toggleSetting('smsNotif')">
              <div class="knob"></div>
            </div>
          </div>
          
          <div style="margin: 1rem 0;">
            <label style="font-weight: 500;">Automatic Updates</label>
            <select class="select-control" onchange="appState.settings.autoUpdate = this.value">
              <option ${appState.settings.autoUpdate === 'Daily' ? 'selected' : ''}>Daily</option>
              <option ${appState.settings.autoUpdate === 'Weekly' ? 'selected' : ''}>Weekly</option>
              <option ${appState.settings.autoUpdate === 'Manual' ? 'selected' : ''}>Manual</option>
            </select>
          </div>
          
          <div style="margin: 1rem 0;">
            <label style="font-weight: 500;">Backup Frequency</label>
            <select class="select-control" onchange="appState.settings.backupFreq = this.value">
              <option ${appState.settings.backupFreq === 'Daily' ? 'selected' : ''}>Daily</option>
              <option ${appState.settings.backupFreq === 'Every 3 days' ? 'selected' : ''}>Every 3 days</option>
              <option ${appState.settings.backupFreq === 'Weekly' ? 'selected' : ''}>Weekly</option>
            </select>
          </div>
          
          <button class="btn btn-primary" style="margin-top: 1rem;" onclick="saveSettings()">Save Settings</button>
        </div>
      </div>
    </div>
  `;
}

function toggleSetting(key) {
  appState.settings[key] = !appState.settings[key];
  renderSettings();
}

function saveSettings() {
  alert('Settings saved successfully!');
}

// ============ BOTTOM NAV ============
function initBottomNav() {
  $('navProfile').addEventListener('click', showProfile);
  $('navSettings').addEventListener('click', () => showSection('settings'));
  $('navLogout').addEventListener('click', logout);
  $('userInfoBtn').addEventListener('click', showProfile);
}

// ============ PROFILE PANEL ============
function showProfile() {
  const overlay = $('profileOverlay');
  const profileContent = $('profileContent');
  const profileBadge = $('profileBadge');
  
  $('profileName').textContent = appState.user;
  $('profileRole').textContent = appState.isAdmin ? 'Administrator' : 'Standard User';
  
  const profileData = appState.isAdmin ? [
    { icon: 'user', label: 'Role', value: 'Admin' },
    { icon: 'key', label: 'Admin ID', value: appState.adminId || 'Admin-1' },
    { icon: 'monitor', label: 'Logged-in Control System', value: 'Central Console' },
    { icon: 'shield', label: 'Permissions', value: 'Full' },
  ] : [
    { icon: 'user', label: 'Role', value: 'User' },
    { icon: 'monitor', label: 'Logged-in Device', value: 'Personal Workstation' },
    { icon: 'shield', label: 'Access Level', value: 'Limited' },
  ];
  
  const icons = {
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    key: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    monitor: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    shield: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  };
  
  profileContent.innerHTML = profileData.map((item, i) => `
    <div class="profile-item" style="animation-delay: ${i * 50}ms">
      ${icons[item.icon]}
      <div class="profile-item-info">
        <div class="label">${item.label}</div>
        <div class="value">${item.value}</div>
      </div>
    </div>
  `).join('');
  
  profileBadge.className = `profile-badge ${appState.isAdmin ? 'admin' : 'user'}`;
  profileBadge.textContent = appState.isAdmin ? '🔐 Full Access Granted' : '✓ Account Active';
  
  overlay.classList.remove('hidden');
  
  // Close handlers
  $('profileClose').onclick = hideProfile;
  overlay.onclick = (e) => {
    if (e.target === overlay) hideProfile();
  };
}

function hideProfile() {
  $('profileOverlay').classList.add('hidden');
}

// ============ LOGOUT ============
function logout() {
  appState.user = null;
  appState.isAdmin = false;
  appState.adminId = null;
  appState.scope = null;
  appState.currentSection = 'hub';
  
  // Hide app container and show auth screen
  $('appContainer').classList.add('hidden');
  $('scopeModal').classList.add('hidden');
  $('profileOverlay').classList.add('hidden');
  $('authForm').reset();
  hideAuthMessage();
  
  // Show auth screen directly (skip boot loader on logout)
  $('bootLoader').classList.add('hidden');
  $('authScreen').classList.remove('hidden');
}

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLandingPage();
  initAuthScreen();
});
