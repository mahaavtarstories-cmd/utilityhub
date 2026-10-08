/* UtilityHub — Payments config (PUBLIC-SAFE).
   ⚠️ Never place an email, API key, or secret in this file: it is served publicly
   and the repository is public. Use PayPal *hosted* payment links / buttons
   (or a PayPal-hosted payment page) only — those keep the receiving account hidden.

   To go live: paste the hosted link for each price point below.
   Each link is created in the PayPal dashboard (no code, no email in the URL). */
window.UH_PAY = {
  // Hosted checkout links — safe to publish. Empty => falls back to email enquiry.
  links: {
    'ad-starter':       'https://www.paypal.com/ncp/payment/NP864JMQXQX2Q',   // $9.00/mo   — Channel Starter
    'ad-growth':        'https://www.paypal.com/ncp/payment/7WEHAKASGNSFQ',   // $29.00/mo  — Channel Growth
    'ad-pro':           'https://www.paypal.com/ncp/payment/S5LZRGXT64668',   // $79.00/mo  — Channel Pro
    'premium-pro':      'https://www.paypal.com/ncp/payment/EFNTLJ8FGHBCS',   // $3.49/mo   — Premium Pro (₹299)
    'premium-business': 'https://www.paypal.com/ncp/payment/BTBKJD5U59ZR4'    // $11.49/mo  — Premium Business (₹999)
  },

  // Display-only: shown to Indian visitors so they know the USD charge.
  // PayPal India settles international payments in USD -> auto-converted to INR.
  fx: { inrPerUsd: 86 },

  // Returns a usable hosted link for a price key, or '' when not configured.
  link: function (key) {
    var u = (this.links || {})[key];
    return (u && u.indexOf('http') === 0) ? u : '';
  },

  // True when at least one hosted link is set.
  isLive: function () {
    var L = this.links || {};
    for (var k in L) { if (L[k]) return true; }
    return false;
  },

  // ₹ -> $ display conversion (e.g. 299 => "3.49")
  usdFromInr: function (inr) {
    var r = (this.fx && this.fx.inrPerUsd) || 86;
    return (Number(inr) / r).toFixed(2);
  }
};
