/* UtilityHub — Payments config (PUBLIC-SAFE).
   ⚠️ Never place an email, API key, or secret in this file: it is served publicly
   and the repository is public. Use PayPal *hosted* payment links / buttons
   (or a Razorpay payment page) only — those keep the receiving account hidden.

   To go live: paste the hosted link for each price point below.
   Each link is created in the PayPal dashboard (no code, no email in the URL). */
window.UH_PAY = {
  // Hosted checkout links — safe to publish. Empty => falls back to email enquiry.
  links: {
    'ad-starter':       '',   // $9/mo   (YouTube channel / small ad)
    'ad-growth':        '',   // $29/mo
    'ad-pro':           '',   // $79/mo
    'premium-pro':      '',   // ~$3.49/mo  (₹299, charged in USD)
    'premium-business': ''    // ~$11.49/mo (₹999, charged in USD)
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
