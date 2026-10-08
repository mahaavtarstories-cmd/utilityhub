/* UtilityHub — compact site-wide YouTube promo strip (half height).
   Promotes the owner's channel "Current Laughs" (funny/weird animal news shorts).
   Dismissible; remembers choice in localStorage. Loaded on every page. */
(function () {
  var CH = 'https://www.youtube.com/@Current_Laughs?sub_confirmation=1';
  var KEY = 'uh_yt_promo_dismissed';
  try { if (localStorage.getItem(KEY) === '1') return; } catch (e) {}

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    if (document.getElementById('uh-yt-promo')) return;

    var st = document.createElement('style');
    st.textContent = [
      '#uh-yt-promo{position:fixed;left:0;right:0;bottom:0;z-index:9998;',
      'background:#0f0f0f;color:#fff;border-top:2px solid #ff0000;',
      'font-family:Inter,-apple-system,Segoe UI,Roboto,sans-serif;',
      'box-shadow:0 -3px 14px rgba(0,0,0,.24);}',
      'body{padding-bottom:44px;}',
      '#uh-yt-promo .uh-yt-in{max-width:1080px;margin:0 auto;display:flex;align-items:center;gap:8px;',
      'padding:5px 14px;}',
      '#uh-yt-promo a.uh-yt-link{display:flex;align-items:center;gap:8px;color:#fff;text-decoration:none;',
      'flex:1;min-width:0;}',
      '#uh-yt-promo .uh-yt-badge{background:#ff0000;border-radius:5px;width:28px;height:19px;',
      'display:flex;align-items:center;justify-content:center;flex:0 0 auto;font-size:12px;}',
      '#uh-yt-promo .uh-yt-txt{font-size:.74rem;line-height:1.15;overflow:hidden;white-space:nowrap;',
      'text-overflow:ellipsis;}',
      '#uh-yt-promo .uh-yt-txt strong{font-weight:800;}',
      '#uh-yt-promo .uh-yt-sub{color:#aaa;font-weight:400;}',
      '#uh-yt-promo .uh-yt-cta{background:#ff0000;color:#fff;border-radius:999px;padding:4px 13px;',
      'font-weight:700;font-size:.72rem;white-space:nowrap;flex:0 0 auto;}',
      '#uh-yt-promo .uh-yt-x{background:none;border:0;color:#888;font-size:16px;cursor:pointer;',
      'padding:0 3px;line-height:1;flex:0 0 auto;}',
      '#uh-yt-promo .uh-yt-x:hover{color:#fff;}',
      '@media(max-width:560px){#uh-yt-promo .uh-yt-sub{display:none;}',
      '#uh-yt-promo .uh-yt-in{padding:4px 10px;gap:7px;}',
      '#uh-yt-promo .uh-yt-txt{font-size:.7rem;}}'
    ].join('');
    document.head.appendChild(st);

    var bar = document.createElement('div');
    bar.id = 'uh-yt-promo';
    bar.innerHTML =
      '<div class="uh-yt-in">' +
        '<a class="uh-yt-link" href="' + CH + '" target="_blank" rel="noopener">' +
          '<span class="uh-yt-badge">▶</span>' +
          '<span class="uh-yt-txt"><strong>Current Laughs</strong> on YouTube ' +
            '<span class="uh-yt-sub">— weird &amp; funny animal news, daily shorts.</span></span>' +
        '</a>' +
        '<a class="uh-yt-cta" href="' + CH + '" target="_blank" rel="noopener">Subscribe</a>' +
        '<button class="uh-yt-x" aria-label="Dismiss" title="Dismiss">×</button>' +
      '</div>';

    bar.querySelector('.uh-yt-x').addEventListener('click', function () {
      bar.remove();
      try { localStorage.setItem(KEY, '1'); } catch (e) {}
    });

    document.body.appendChild(bar);
  });
})();
