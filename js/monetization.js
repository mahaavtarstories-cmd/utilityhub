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

// ===== Homepage Sponsored Ads =====
// Small sponsored ad blocks for product listings & accounting services
function injectHomepageAds() {
  // Ad 1: Our Services — eBay / GunBroker / Amazon / Website
  const adProduct = document.getElementById('ad-product-listing');
  if (adProduct) {
    adProduct.innerHTML = `
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,.08);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">
          <span style="font-size:.78rem;font-weight:800;color:#6366f1;text-transform:uppercase;letter-spacing:2px;">⚡ Our Services</span>
          <span style="font-size:.68rem;color:#cbd5e1;">Sponsored</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:18px;">
          <a href="/services/ebay-listing-services.html" style="text-decoration:none;color:inherit;">
          <div style="border:1px solid #e2e8f0;border-radius:14px;padding:20px;transition:all .3s;" onmouseover="this.style.borderColor='#e53236';this.style.boxShadow='0 8px 24px rgba(229,50,54,.12)';this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#e2e8f0';this.style.boxShadow='none';this.style.transform='translateY(0)'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <div style="width:44px;height:44px;background:#fee2e2;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;">🏷️</div>
              <div>
                <div style="font-size:1rem;font-weight:800;color:#1e293b;">eBay Listing Services</div>
                <div style="font-size:.72rem;color:#e53236;font-weight:600;">Sell smarter on eBay</div>
              </div>
            </div>
            <ul style="list-style:none;padding:0;margin:0;">
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Product title optimization with keywords for max visibility</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Professional HTML descriptions with features & specs</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Competitive pricing research & market analysis</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Bulk listing creation — 100s of products fast</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Category mapping & item specificity setup</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Image editing — crop, watermark, enhance</li>
            </ul>
          </div>
          </a>

          <!-- GunBroker -->
          <a href="/services/gunbroker-listing-services.html" style="text-decoration:none;color:inherit;">
          <div style="border:1px solid #e2e8f0;border-radius:14px;padding:20px;transition:all .3s;" onmouseover="this.style.borderColor='#1a5632';this.style.boxShadow='0 8px 24px rgba(26,86,50,.12)';this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#e2e8f0';this.style.boxShadow='none';this.style.transform='translateY(0)'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <div style="width:44px;height:44px;background:#dcfce7;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;">🎯</div>
              <div>
                <div style="font-size:1rem;font-weight:800;color:#1e293b;">GunBroker Listings</div>
                <div style="font-size:.72rem;color:#1a5632;font-weight:600;">Tactical & hunting market</div>
              </div>
            </div>
            <ul style="list-style:none;padding:0;margin:0;">
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Auction & fixed-price listing setup</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> FFL-compliant product descriptions</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Tactical gear keyword research for buyer reach</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Multi-image gallery with zoom-ready photos</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Category-specific formatting (hunting, shooting, outdoor)</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Competitor price tracking & buy-now strategy</li>
            </ul>
          </div>
          </a>

          <!-- Amazon -->
          <a href="/services/amazon-seller-services.html" style="text-decoration:none;color:inherit;">
          <div style="border:1px solid #e2e8f0;border-radius:14px;padding:20px;transition:all .3s;" onmouseover="this.style.borderColor='#ff9900';this.style.boxShadow='0 8px 24px rgba(255,153,0,.12)';this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#e2e8f0';this.style.boxShadow='none';this.style.transform='translateY(0)'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <div style="width:44px;height:44px;background:#fef3c7;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;">📦</div>
              <div>
                <div style="font-size:1rem;font-weight:800;color:#1e293b;">Amazon Seller Services</div>
                <div style="font-size:.72rem;color:#ff9900;font-weight:600;">FBA & FBM optimization</div>
              </div>
            </div>
            <ul style="list-style:none;padding:0;margin:0;">
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Product listing creation with A+ content</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Keyword-rich titles, bullets & backend search terms</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> FBA vs FBM strategy — what's cheaper for your product</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Buy Box winning price optimization</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Listing SEO to rank in Amazon search results</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Review strategy & customer feedback management</li>
            </ul>
          </div>
          </a>

          <!-- Website & SEO -->
          <a href="/services/website-seo-services.html" style="text-decoration:none;color:inherit;">
          <div style="border:1px solid #e2e8f0;border-radius:14px;padding:20px;transition:all .3s;" onmouseover="this.style.borderColor='#6366f1';this.style.boxShadow='0 8px 24px rgba(99,102,241,.12)';this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#e2e8f0';this.style.boxShadow='none';this.style.transform='translateY(0)'">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <div style="width:44px;height:44px;background:#e0e7ff;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;">💻</div>
              <div>
                <div style="font-size:1rem;font-weight:800;color:#1e293b;">Website & SEO</div>
                <div style="font-size:.72rem;color:#6366f1;font-weight:600;">Build • Rank • Grow</div>
              </div>
            </div>
            <ul style="list-style:none;padding:0;margin:0;">
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Custom website design — HTML, CSS, responsive</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> On-page SEO — meta tags, schema, sitemap, robots</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Google Search Console & Analytics setup</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Speed optimization — Core Web Vitals, caching</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> AdSense & affiliate monetization integration</li>
              <li style="padding:4px 0;font-size:.82rem;color:#475569;display:flex;align-items:start;gap:6px;"><span style="color:#10b981;font-weight:700;">✓</span> Domain setup, SSL, deployment & hosting</li>
            </ul>
          </div>
          </a>
        </div>

        <div style="margin-top:20px;padding:16px 20px;background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-radius:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <span style="font-size:.85rem;color:#475569;">🔥 <strong style="color:#1e293b;">Full-service listing & selling solutions</strong> — from product research to SEO to website development</span>
          <a href="mailto:services@utilityshub.com?subject=Services%20Inquiry" style="display:inline-block;padding:10px 22px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-radius:10px;text-decoration:none;font-weight:700;font-size:.85rem;white-space:nowrap;">Get Free Quote →</a>
        </div>
      </div>
    `;
  }

  // Ad 2: Accounting Services (after Utility Tools)
  const adAcct = document.getElementById('ad-accounting');
  if (adAcct) {
    adAcct.innerHTML = `
      <div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <span style="font-size:.72rem;font-weight:600;color:#16a34a;text-transform:uppercase;letter-spacing:1px;">Sponsored</span>
          <span style="font-size:.72rem;color:#bbf7d0;">Ad</span>
        </div>
        <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;">
          <div style="flex:1;min-width:200px;">
            <div style="font-size:1.1rem;font-weight:700;color:#14532d;margin-bottom:6px;">📊 Need Accounting Services?</div>
            <div style="font-size:.88rem;color:#166534;margin-bottom:12px;">GST filing • Income Tax • Bookkeeping • Payroll • Company Registration — Professional CA services at affordable rates.</div>
            <a href="mailto:services@utilityshub.com?subject=Accounting%20Services%20Inquiry" style="display:inline-block;padding:8px 20px;background:#16a34a;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:.85rem;">Get Free Consultation →</a>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <span style="background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-size:.75rem;font-weight:500;">GST Filing</span>
            <span style="background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-size:.75rem;font-weight:500;">ITR Filing</span>
            <span style="background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-size:.75rem;font-weight:500;">Bookkeeping</span>
            <span style="background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-size:.75rem;font-weight:500;">Payroll</span>
            <span style="background:#dcfce7;color:#166534;padding:4px 12px;border-radius:20px;font-size:.75rem;font-weight:500;">Company Setup</span>
          </div>
        </div>
      </div>
    `;
  }

  // Ad 3: Accounting (in About section)
  const adAcctAbout = document.getElementById('ad-accounting-about');
  if (adAcctAbout) {
    adAcctAbout.innerHTML = `
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;box-shadow:0 1px 3px rgba(0,0,0,.04);">
        <span style="font-size:.72rem;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:0;">Sponsored</span>
        <div style="flex:1;min-width:180px;">
          <span style="font-weight:600;color:#1e293b;">📊 Professional Accounting Services</span>
          <span style="font-size:.85rem;color:#64748b;display:block;margin-top:2px;">GST • ITR • Bookkeeping • Payroll — Affordable CA services for businesses & freelancers.</span>
        </div>
        <a href="mailto:services@utilityshub.com?subject=Accounting%20Services%20Inquiry" style="padding:8px 16px;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;border-radius:8px;text-decoration:none;font-weight:600;font-size:.85rem;white-space:nowrap;">Get Free Quote →</a>
      </div>
    `;
  }
}

// ===== Analytics =====
function trackEvent(category, action, label) {
  // Simple event tracking — replace with GA4 when ready
  if (typeof gtag !== 'undefined') {
    gtag('event', action, { event_category: category, event_label: label });
  }
  console.log(`[Analytics] ${category} / ${action} / ${label}`);
}