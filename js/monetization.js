// ===== AdSense Manager =====
// Replace ADSENSE_CLIENT with your actual AdSense publisher ID when approved
const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX';
let adsenseLoaded = false;

function loadAdSense() {
  if (adsenseLoaded) return;
  adsenseLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}

// Ad slot types
const adSlots = {
  banner: { format: 'auto', slot: '1234567890' },     // Top banner (728x90 / responsive)
  sidebar: { format: 'auto', slot: '1234567891' },     // Sidebar (300x250)
  inContent: { format: 'fluid', slot: '1234567892' },  // In-content native
  footer: { format: 'auto', slot: '1234567893' },      // Footer banner
};

function createAd(type) {
  if (ADSENSE_CLIENT.includes('XXXXXXXX')) {
    // Placeholder until AdSense is approved
    return `<div class="ad-placeholder" style="background:#f1f5f9;border:1px dashed #cbd5e1;border-radius:8px;padding:20px;text-align:center;color:#94a3b8;font-size:.8rem;margin:16px 0;">Ad Space (${type}) — AdSense pending approval</div>`;
  }
  return `<div class="ad-container" style="margin:16px 0;text-align:center;min-height:90px;">
    <ins class="adsbygoogle" style="display:block;" data-ad-client="${ADSENSE_CLIENT}" data-ad-slot="${adSlots[type].slot}" data-ad-format="${adSlots[type].format}" data-full-width-responsive="true"></ins>
  </div>`;
}

function initAds() {
  loadAdSense();
  // Push all ad slots
  setTimeout(() => {
    document.querySelectorAll('.adsbygoogle').forEach(ad => {
      try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
    });
  }, 100);
}

// ===== Affiliate Manager =====
const affiliates = {
  amazon: {
    name: 'Amazon',
    tag: 'utilityhub-21',
    buildUrl: (query) => `https://www.amazon.in/s?k=${encodeURIComponent(query)}&tag=utilityhub-21`,
  },
  flipkart: {
    name: 'Flipkart',
    tag: 'utilityhub',
    buildUrl: (query) => `https://www.flipkart.com/search?q=${encodeURIComponent(query)}&affid=utilityhub`,
  },
};

function createAffiliateCard(query, title, desc) {
  const links = Object.values(affiliates).map(a => 
    `<a href="${a.buildUrl(query)}" target="_blank" rel="nofollow sponsored" class="aff-link">${a.name} →</a>`
  ).join('');
  return `<div class="affiliate-card" style="background:linear-gradient(135deg,#fef3c7,#fde68a);border:1px solid #fcd34d;border-radius:12px;padding:16px;margin:20px 0;">
    <div style="font-weight:700;font-size:.95rem;margin-bottom:6px;">📌 ${title}</div>
    <div style="font-size:.85rem;color:#92400e;margin-bottom:10px;">${desc}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">${links}</div>
  </div>`;
}

// ===== Premium Tools Gate =====
const PREMIUM_TOOLS = [
  { id: 'advanced-emi', name: 'Advanced EMI Planner', desc: 'Prepayment scenarios, balance transfer analysis, interest savings calculator', icon: '🏦' },
  { id: 'tax-planner', name: 'Income Tax Planner', desc: 'Old vs new regime comparison, deductions optimizer, tax saving recommendations', icon: '🧾' },
  { id: 'investment-roi', name: 'Investment ROI Tracker', desc: 'Multi-asset portfolio returns, CAGR, XIRR calculation with dividend tracking', icon: '📊' },
  { id: 'batch-pdf', name: 'Batch PDF Processor', desc: 'Process 50+ PDFs at once — bulk merge, compress, watermark, split', icon: '📦' },
  { id: 'logo-maker', name: 'Logo Maker', desc: 'AI-assisted logo design with 100+ templates, custom colors, and SVG export', icon: '🎨' },
  { id: 'invoice-gen', name: 'Invoice Generator', desc: 'Professional GST invoices with templates, client database, and recurring billing', icon: '🧾' },
];

function checkPremium() {
  return localStorage.getItem('utilityhub_premium') === 'active';
}

function gatePremium(toolId) {
  if (checkPremium()) return true;
  window.location.href = `/premium.html?tool=${toolId}`;
  return false;
}

// ===== Analytics =====
function trackEvent(category, action, label) {
  // Simple event tracking — replace with GA4 when ready
  if (typeof gtag !== 'undefined') {
    gtag('event', action, { event_category: category, event_label: label });
  }
  console.log(`[Analytics] ${category} / ${action} / ${label}`);
}