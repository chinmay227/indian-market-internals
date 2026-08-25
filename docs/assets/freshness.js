(() => {
  const meta = document.querySelector('meta[name="site-version"]');
  const current = meta ? meta.content : '';
  const cleanUrl = () => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('sitev')) {
      url.searchParams.delete('sitev');
      const qs = url.searchParams.toString();
      history.replaceState(null, '', url.pathname + (qs ? `?${qs}` : '') + url.hash);
    }
  };

  fetch(`/site-version.json?t=${Date.now()}`, {
    cache: 'no-store',
    headers: { 'Cache-Control': 'no-cache' }
  })
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data || !data.version) {
        cleanUrl();
        return;
      }
      if (current && data.version !== current) {
        const url = new URL(window.location.href);
        url.searchParams.set('sitev', data.version);
        window.location.replace(url.toString());
        return;
      }
      cleanUrl();
    })
    .catch(cleanUrl);
})();