/* UtilityHub — "Featured Channel" ad slot.
   Paid ad subscribers get their YouTube channel shown here.
   Add a row to SPOTLIGHT_ADS (or set active:true) to publish a channel.
   Renders into any element with id="ad-channel-spotlight". */
(function () {
  // ---- Advertiser config (rotate: first active wins; multiple = auto-rotate) ----
  var SPOTLIGHT_ADS = [
    {
      name: 'Current Laughs',
      handle: '@Current_Laughs',
      url: 'https://www.youtube.com/@Current_Laughs?sub_confirmation=1',
      tagline: 'Weird & funny animal news — new Shorts every day.',
      emoji: '🎬',
      cta: 'Subscribe',
      active: true
    }
    // Paid slots: add { name, handle, url, tagline, emoji, cta, active:true } here
  ];

  var ROTATE_MS = 9000;
  var ADS = SPOTLIGHT_ADS.filter(function (a) { return a && a.active !== false; });

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var host = document.getElementById('ad-channel-spotlight');
    if (!host) return;

    var st = document.createElement('style');
    st.textContent = [
      '.uh-spot{border:1px solid #e2e8f0;border-radius:16px;background:#fff;',
      'box-shadow:0 4px 20px rgba(0,0,0,.06);overflow:hidden;font-family:Inter,-apple-system,Segoe UI,Roboto,sans-serif;}',
      '.uh-spot-head{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;',
      'background:linear-gradient(135deg,#0f0f0f,#242424);color:#fff;}',
      '.uh-spot-head .uh-spot-lab{font-size:.7rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#ff5a5a;}',
      '.uh-spot-head .uh-spot-ad{font-size:.66rem;color:#888;}',
      '.uh-spot-body{display:flex;align-items:center;gap:16px;padding:16px 18px;flex-wrap:wrap;}',
      '.uh-spot-av{width:56px;height:56px;border-radius:14px;background:#111;color:#fff;display:flex;',
      'align-items:center;justify-content:center;font-size:26px;flex:0 0 auto;border:2px solid #ff0000;}',
      '.uh-spot-meta{flex:1;min-width:180px;}',
      '.uh-spot-name{font-size:1.05rem;font-weight:800;color:#1e293b;line-height:1.1;}',
      '.uh-spot-h{font-size:.75rem;color:#ff0000;font-weight:700;margin-left:6px;}',
      '.uh-spot-tag{font-size:.85rem;color:#64748b;margin-top:4px;}',
      '.uh-spot-btn{display:inline-block;padding:10px 22px;background:#ff0000;color:#fff;border-radius:999px;',
      'text-decoration:none;font-weight:700;font-size:.85rem;white-space:nowrap;}',
      '.uh-spot-btn:hover{background:#d90000;}',
      '.uh-spot-foot{padding:9px 18px;border-top:1px solid #f1f5f9;text-align:center;background:#fafafa;}',
      '.uh-spot-foot a{font-size:.78rem;color:#6366f1;font-weight:600;text-decoration:none;}',
      '.uh-spot-foot a:hover{text-decoration:underline;}',
      '@media(max-width:560px){.uh-spot-body{gap:12px;padding:14px;}.uh-spot-av{width:48px;height:48px;font-size:22px;}}'
    ].join('');
    document.head.appendChild(st);

    if (!ADS.length) return;
    var i = 0;

    function render() {
      var a = ADS[i % ADS.length];
      host.innerHTML =
        '<div class="uh-spot">' +
          '<div class="uh-spot-head"><span class="uh-spot-lab">★ Featured Channel</span><span class="uh-spot-ad">Ad</span></div>' +
          '<div class="uh-spot-body">' +
            '<div class="uh-spot-av">' + (a.emoji || '▶') + '</div>' +
            '<div class="uh-spot-meta">' +
              '<div class="uh-spot-name">' + a.name + '<span class="uh-spot-h">' + (a.handle || '') + '</span></div>' +
              '<div class="uh-spot-tag">' + (a.tagline || '') + '</div>' +
            '</div>' +
            '<a class="uh-spot-btn" href="' + a.url + '" target="_blank" rel="noopener sponsored">' + (a.cta || 'Subscribe') + ' →</a>' +
          '</div>' +
          '<div class="uh-spot-foot"><a href="mailto:services@utilityshub.com?subject=Advertise%20my%20channel%20on%20UtilityHub">Advertise your channel here →</a></div>' +
        '</div>';
    }

    render();
    if (ADS.length > 1) setInterval(function () { i++; render(); }, ROTATE_MS);
  });
})();
