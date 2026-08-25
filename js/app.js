// Render tool cards by phase
const grid1 = document.getElementById('toolsGrid1');
const grid2 = document.getElementById('toolsGrid2');
if (grid1 || grid2) {
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

// Format currency (INR)
function formatINR(num) {
  return '₹' + new Intl.NumberFormat('en-IN').format(Math.round(num));
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