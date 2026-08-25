// Currency selector — injected on all calculator pages
const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  { code: 'NPR', symbol: '₨', name: 'Nepali Rupee' },
  { code: 'LKR', symbol: '₨', name: 'Sri Lankan Rupee' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
];

function getCurrencySymbol() {
  const c = currencies.find(c => c.code === currentCurrency);
  return c ? c.symbol : '₹';
}

function updateCurrencyLabels() {
  const sym = getCurrencySymbol();
  // Update all labels that contain ₹ or currency hints
  document.querySelectorAll('label').forEach(label => {
    label.textContent = label.textContent
      .replace(/₹/g, sym)
      .replace(/\(₹\)/g, '(' + sym + ')')
      .replace(/\(INR\)/g, '(' + currentCurrency + ')');
  });
  // Update placeholders
  document.querySelectorAll('input[type="number"]').forEach(input => {
    if (input.placeholder && input.placeholder.includes('₹')) {
      input.placeholder = input.placeholder.replace(/₹/g, sym);
    }
  });
}

(function injectCurrencySelector() {
  const isToolPage = window.location.pathname.includes('/tools/');
  if (!isToolPage) return;
  
  // Skip non-currency tools
  const skipTools = ['age-calculator', 'percentage-calculator', 'unit-converter', 'qr-generator', 'resume-builder', 'ai-writing-tools', 'pdf-tools', 'image-tools'];
  const toolName = window.location.pathname.split('/').pop().replace('.html','');
  if (skipTools.includes(toolName)) return;

  const toolPage = document.querySelector('.tool-page');
  if (!toolPage) return;

  const savedCurrency = localStorage.getItem('utilityhub_currency') || 'INR';
  currentCurrency = savedCurrency;

  const selector = document.createElement('div');
  selector.style.cssText = 'margin-bottom:24px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;';
  selector.innerHTML = `
    <span style="font-size:.85rem;font-weight:600;color:var(--text-muted);">🌍 Currency:</span>
    <select id="currencySelect" onchange="changeCurrency(this.value)" style="padding:8px 14px;border:1.5px solid var(--border);border-radius:8px;font-size:.9rem;font-family:inherit;outline:none;cursor:pointer;background:var(--card);">
      ${currencies.map(c => `<option value="${c.code}" ${c.code === savedCurrency ? 'selected' : ''}>${c.symbol} ${c.code} — ${c.name}</option>`).join('')}
    </select>
  `;
  toolPage.insertBefore(selector, toolPage.querySelector('.calculator-card'));
  
  // Update labels after DOM is ready
  setTimeout(updateCurrencyLabels, 50);
})();

function changeCurrency(code) {
  currentCurrency = code;
  localStorage.setItem('utilityhub_currency', code);
  updateCurrencyLabels();
  // Re-run the last calculation if result is visible
  const resultArea = document.querySelector('.result-area.show');
  if (resultArea) {
    const btn = document.querySelector('.btn-calc');
    if (btn) btn.click();
  }
}