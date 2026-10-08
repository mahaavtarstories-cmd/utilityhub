/* UtilityHub — Payments config + link builders.
   No API keys needed: PayPal hosted checkout works from the business email/handle.
   Fill PAYPAL below to go live; while empty, callers fall back to enquiry/alert. */
window.UH_PAY = {
  // ---- Set these to go live ----
  // PayPal business email (the account that receives money — e.g. Anant Infotech):
  paypalEmail: '',
  // Optional PayPal.me handle (e.g. 'AnantInfotech'): used for simple tip-style links
  paypalMe: '',
  // Optional INR option (Razorpay/UPI payment-page URL) for domestic premium:
  inrLink: '',
  // Where PayPal sends the buyer back after paying:
  returnUrl: 'https://utilityshub.com/premium.html?paid=1',
  cancelUrl: 'https://utilityshub.com/premium.html?canceled=1',

  // ---- Helpers ----
  isLive: function () { return !!(this.paypalEmail || this.paypalMe || this.inrLink); },

  // One-time payment link (USD)
  oneTime: function (amountUSD, itemName) {
    if (this.paypalMe) {
      return 'https://www.paypal.com/paypalme/' + this.paypalMe + '/' + amountUSD + 'USD';
    }
    if (!this.paypalEmail) return '';
    return 'https://www.paypal.com/cgi-bin/webscr'
      + '?cmd=_xclick'
      + '&business=' + encodeURIComponent(this.paypalEmail)
      + '&item_name=' + encodeURIComponent(itemName || 'UtilityHub payment')
      + '&amount=' + encodeURIComponent(amountUSD)
      + '&currency_code=USD'
      + '&no_shipping=1'
      + '&return=' + encodeURIComponent(this.returnUrl)
      + '&cancel_return=' + encodeURIComponent(this.cancelUrl);
  },

  // Recurring monthly subscription link (USD). Requires a PayPal business account;
  // buyer can pay with card or PayPal. No API keys needed.
  monthly: function (amountUSD, itemName) {
    if (!this.paypalEmail) return '';
    return 'https://www.paypal.com/cgi-bin/webscr'
      + '?cmd=_xclick-subscriptions'
      + '&business=' + encodeURIComponent(this.paypalEmail)
      + '&item_name=' + encodeURIComponent(itemName || 'UtilityHub subscription')
      + '&a3=' + encodeURIComponent(amountUSD)          // amount
      + '&p3=1&t3=M'                                    // every 1 Month
      + '&src=1&sra=1'                                  // reattempt on failure
      + '&currency_code=USD'
      + '&no_shipping=1'
      + '&return=' + encodeURIComponent(this.returnUrl)
      + '&cancel_return=' + encodeURIComponent(this.cancelUrl);
  },

  // INR (domestic) — a hosted payment-page link (Razorpay/UPI); no keys here.
  inr: function () { return this.inrLink; }
};
