// Render tool cards by phase
const grid1 = document.getElementById('toolsGrid1');
const grid2 = document.getElementById('toolsGrid2');
const grid3 = document.getElementById('toolsGrid3');
if (grid1 || grid2 || grid3) {
  tools.forEach(t => {
    const card = document.createElement('a');
    card.className = 'tool-card';
    card.href = t.url;
    card.dataset.name = t.name.toLowerCase();
    card.innerHTML = `
      <div class="tool-icon">${t.icon}</div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-desc">${t.desc}</div>
    `;
    if (t.phase === 1 && grid1) grid1.appendChild(card);
    else if (t.phase === 2 && grid2) grid2.appendChild(card);
    else if (t.phase === 3 && grid3) grid3.appendChild(card);
  });
}

// Search filter
function filterTools() {
  const q = document.getElementById('toolSearch').value.toLowerCase();
  document.querySelectorAll('.tool-card').forEach(card => {
    const match = card.dataset.name.includes(q);
    card.style.display = match ? '' : 'none';
  });
}

// Format currency based on selected currency
let currentCurrency = 'INR';
const currencySymbols = { INR:'₹', USD:'$', EUR:'€', GBP:'£', AED:'AED', CAD:'C$', AUD:'A$', SGD:'S$', JPY:'¥', CNY:'¥', PKR:'₨', BDT:'৳', NPR:'₨', LKR:'₨', ZAR:'R', NGN:'₦', KES:'KSh', BRL:'R$', MXN:'$', MYR:'RM', PHP:'₱', IDR:'Rp', THB:'฿', VND:'₫', EGP:'E£', SAR:'﷼', QAR:'﷼', KWD:'د.ك', TRY:'₺', RUB:'₽' };
const currencyLocales = { INR:'en-IN', USD:'en-US', EUR:'en-IE', GBP:'en-GB', AED:'en-AE', CAD:'en-CA', AUD:'en-AU', SGD:'en-SG', JPY:'ja-JP', CNY:'zh-CN', PKR:'ur-PK', BDT:'bn-BD', NPR:'ne-NP', LKR:'si-LK', ZAR:'en-ZA', NGN:'en-NG', KES:'sw-KE', BRL:'pt-BR', MXN:'es-MX', MYR:'ms-MY', PHP:'en-PH', IDR:'id-ID', THB:'th-TH', VND:'vi-VN', EGP:'ar-EG', SAR:'ar-SA', QAR:'ar-QA', KWD:'ar-KW', TRY:'tr-TR', RUB:'ru-RU' };

function formatINR(num) {
  const sym = currencySymbols[currentCurrency] || '₹';
  const loc = currencyLocales[currentCurrency] || 'en-IN';
  return sym + new Intl.NumberFormat(loc).format(Math.round(num));
}

// Format number
function formatNum(num, decimals = 2) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: decimals }).format(num);
}

// Show result
function showResult(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('show');
}

// Set result row
function setResult(labelId, value) {
  const el = document.getElementById(labelId);
  if (el) el.textContent = value;
}

// ===== Phase 3: Ads + Affiliate Injection =====
// Load monetization script on non-premium pages
if (typeof loadAdSense !== 'undefined') {
  loadAdSense();
}

// Inject homepage sponsored ads
if (typeof injectHomepageAds !== 'undefined') {
  injectHomepageAds();
}

// Inject ads on tool pages (not homepage, not premium page)
(function injectAds() {
  const isToolPage = window.location.pathname.includes('/tools/');
  if (!isToolPage) return;

  const toolPage = document.querySelector('.tool-page');
  if (!toolPage) return;

  // Top banner ad
  const topAd = document.createElement('div');
  topAd.innerHTML = createAd ? createAd('banner') : '';
  toolPage.insertBefore(topAd, toolPage.querySelector('.calculator-card'));

  // Footer ad
  const footerAd = document.createElement('div');
  footerAd.innerHTML = createAd ? createAd('footer') : '';
  toolPage.appendChild(footerAd);

  // Init ad slots
  if (typeof initAds !== 'undefined') initAds();
})();

// Inject relevant affiliate cards on calculator pages
(function injectAffiliate() {
  const path = window.location.pathname;
  const isToolPage = path.includes('/tools/');
  if (!isToolPage) return;

  const resultArea = document.querySelector('.result-area');
  if (!resultArea || !createAffiliateCard) return;

  // Context-aware affiliate content
  const affiliateMap = {
    'emi-calculator': { query: 'home loan EMI calculator', title: 'Compare Home Loan Offers', desc: 'Check current interest rates from top banks and find the best EMI for your loan amount.' },
    'sip-calculator': { query: 'mutual fund SIP investment', title: 'Start Your SIP Today', desc: 'Compare mutual fund platforms with zero commission investing and direct plans.' },
    'salary-calculator': { query: 'salary account zero balance', title: 'Best Salary Accounts', desc: 'Compare zero-balance salary accounts with premium banking benefits.' },
    'ctc-calculator': { query: 'tax saving investment', title: 'Save More Tax', desc: 'Explore 80C, 80D, and other tax-saving investment options to increase your take-home.' },
    'pf-calculator': { query: 'PF investment options', title: 'Grow Your PF Returns', desc: 'Compare EPF, PPF, and VPF interest rates and maximize your retirement corpus.' },
    'gst-calculator': { query: 'GST billing software', title: 'GST Billing Software', desc: 'Generate GST-compliant invoices with these top-rated billing tools.' },
    'gratuity-calculator': { query: 'term life insurance', title: 'Protect Your Family', desc: 'Compare term insurance plans starting ₹500/month with coverage up to ₹1 crore.' },
  };

  const toolName = path.split('/').pop().replace('.html','');
  const aff = affiliateMap[toolName];
  if (aff) {
    const card = document.createElement('div');
    card.innerHTML = createAffiliateCard(aff.query, aff.title, aff.desc);
    resultArea.parentElement.insertBefore(card, resultArea.nextSibling);
  }
})();

// Add Premium nav link to header on all pages
(function addPremiumNav() {
  const nav = document.querySelector('.nav');
  if (!nav || nav.querySelector('.nav-premium')) return;
  const link = document.createElement('a');
  link.href = '/premium.html';
  link.className = 'nav-link nav-premium';
  link.textContent = 'Premium';
  link.style.cssText = 'color:var(--primary);font-weight:600;';
  nav.appendChild(link);
})();

// Track tool usage
(function trackToolUsage() {
  const path = window.location.pathname;
  const toolName = path.split('/').pop().replace('.html','');
  if (toolName && toolName !== 'index') {
    trackEvent('tool', 'visit', toolName);
  }
})();

// ===== Animated Stats Counter =====
(function animateStats() {
  const stats = [
    { id: 'statTools', target: 25, suffix: '+' },
    { id: 'statCurrencies', target: 30, suffix: '+' },
    { id: 'statSignup', target: 0, suffix: '' },
    { id: 'statCost', target: 0, suffix: '' },
  ];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(s => {
          const el = document.getElementById(s.id);
          if (!el || el.dataset.animated) return;
          el.dataset.animated = '1';
          let current = 0;
          const increment = Math.max(1, Math.ceil(s.target / 30));
          const timer = setInterval(() => {
            current += increment;
            if (current >= s.target) { current = s.target; clearInterval(timer); }
            el.textContent = current + s.suffix;
          }, 40);
        });
      }
    });
  }, { threshold: 0.3 });
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
})();