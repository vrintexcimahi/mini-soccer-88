import re

def update_admin_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update DEFAULT_ASSETS with fit mode and accurate logo/icon dimensions
    assets_old_pattern = r'const DEFAULT_ASSETS = \[.*?\];'
    assets_new = '''const DEFAULT_ASSETS = [
  { key: 'hero_desktop',     label: 'Hero Banner (Desktop)',     def: '/assets/img/ayoindonesia-padel-1.jpg',        hint: 'Foto latar utama desktop • Disarankan 1920×1080 px',  targetW: 1920, targetH: 1080, fit: 'cover'   },
  { key: 'hero_mobile',      label: 'Hero Banner (HP / Mobile)', def: '/assets/img/ayoindonesia-padel-mobile-1.jpg', hint: 'Foto latar utama ponsel • Disarankan 1080×1920 px',   targetW: 1080, targetH: 1920, fit: 'cover'   },
  { key: 'logo',             label: 'Logo Utama Website',        def: '/assets/logo/ms88-logo.svg',                  hint: 'Format SVG/PNG transparan • Proporsional max 240×60 px', targetW: 240,  targetH: 60,   fit: 'contain' },
  { key: 'favicon',          label: 'Favicon Tab Browser',       def: '/assets/logos/new-Favicon.png',               hint: 'Ikon kecil tab browser (PNG 32×32 / 64×64 px)',       targetW: 64,   targetH: 64,   fit: 'contain' },
  { key: 'banner_cta',       label: 'Banner Promo CTA',          def: '/assets/banner/baner.png',                    hint: 'Banner ajakan bermain • Disarankan 1200×400 px',      targetW: 1200, targetH: 400,  fit: 'cover'   },
  { key: 'banner_1_desktop', label: 'Slider Banner 1',           def: '/assets/banner/1-desktop.png',                hint: 'Banner carousel utama slide 1 • 1440×560 px',        targetW: 1440, targetH: 560,  fit: 'cover'   },
  { key: 'banner_2_desktop', label: 'Slider Banner 2',           def: '/assets/banner/2-desktop.png',                hint: 'Banner carousel utama slide 2 • 1440×560 px',        targetW: 1440, targetH: 560,  fit: 'cover'   },
  { key: 'phone_mockup1',    label: 'Mockup Aplikasi Mobile 1',  def: '/assets/img/hp-ayo.png',                      hint: 'Gambar tampilan aplikasi ponsel 1 • 480×960 px',      targetW: 480,  targetH: 960,  fit: 'contain' },
  { key: 'phone_mockup2',    label: 'Mockup Aplikasi Mobile 2',  def: '/assets/img/hp-ayo2.png',                     hint: 'Gambar tampilan aplikasi ponsel 2 • 480×960 px',      targetW: 480,  targetH: 960,  fit: 'contain' },
  { key: 'venue_prev',       label: 'Foto Preview Lapangan',     def: '/assets/img/venue-preview.webp',              hint: 'Foto fasilitas lapangan mini soccer • 960×640 px',   targetW: 960,  targetH: 640,  fit: 'cover'   },
  { key: 'kompetisi1',       label: 'Banner Turnamen 1',         def: '/assets/dummy/new_kompetisi_home1.png',       hint: 'Kartu kompetisi / turnamen 1 • 640×480 px',           targetW: 640,  targetH: 480,  fit: 'cover'   },
  { key: 'kompetisi2',       label: 'Banner Turnamen 2',         def: '/assets/dummy/new_kompetisi_home2.png',       hint: 'Kartu kompetisi / turnamen 2 • 640×480 px',           targetW: 640,  targetH: 480,  fit: 'cover'   },
  { key: 'kompetisi3',       label: 'Banner Turnamen 3',         def: '/assets/dummy/new_kompetisi_home3.png',       hint: 'Kartu kompetisi / turnamen 3 • 640×480 px',           targetW: 640,  targetH: 480,  fit: 'cover'   },
];'''
    content = re.sub(assets_old_pattern, assets_new, content, count=1, flags=re.DOTALL)

    # 2. Update renderAssets to include data-key and dimension badge
    render_old_pattern = r'<div class="asset-card \$\{isCustom \? \'is-custom\' : \'\'\}" id="assetCard_\$\{a\.key\}".*?<div class="asset-title-row">.*?<span class="asset-name">\$\{a\.label\}</span>.*?</div>'
    render_new = '''<div class="asset-card ${isCustom ? 'is-custom' : ''}" id="assetCard_${a.key}" data-key="${a.key}"
           ondragover="handleAssetDragOver(event, this)"
           ondragleave="handleAssetDragLeave(event, this)"
           ondrop="handleAssetDrop(event, '${a.key}', this)">
        
        <div class="asset-preview-wrap" onclick="triggerAssetUpload('${a.key}')" title="Klik untuk upload gambar baru">
          <img src="${imgSrc}" alt="${a.label}" class="asset-img" id="imgPrev_${a.key}" onerror="this.src='/assets/dummy/bola.png'">
          <div class="asset-badge ${isCustom ? 'badge-custom' : 'badge-default'}">
            ${isCustom ? (ICON.check + ' Gambar Kustom') : 'Bawaan'}
          </div>
          <div class="asset-overlay">
            <div class="overlay-content">
              ${ICON.upload}
              <span>Klik / Drag Gambar ke Sini</span>
            </div>
          </div>
        </div>

        <div class="asset-details">
          <div class="asset-title-row">
            <span class="asset-name">${a.label}</span>
            <span style="font-size:10.5px;padding:2px 7px;border-radius:4px;background:#f3f4f6;color:#6b7280;font-weight:600;margin-left:auto;">${a.targetW ? (a.targetW + (a.targetH ? '×' + a.targetH : '') + ' px') : 'Auto'}</span>
          </div>'''
    content = re.sub(render_old_pattern, render_new, content, count=1, flags=re.DOTALL)

    # 3. Completely replace autoCompressImage with accurate, robust containment and cropping
    compress_pattern = r'function autoCompressImage\(img, assetMeta, mimeType, onDone\) \{.*?\n\}'
    compress_new = '''function autoCompressImage(img, assetMeta, mimeType, onDone) {
  const origW = img.naturalWidth || img.width;
  const origH = img.naturalHeight || img.height;
  const tW = assetMeta && assetMeta.targetW ? assetMeta.targetW : null;
  const tH = assetMeta && assetMeta.targetH ? assetMeta.targetH : null;
  const fitMode = (assetMeta && assetMeta.fit) ? assetMeta.fit : 'cover';
  const isLogo = assetMeta && assetMeta.key === 'logo';
  const isFavicon = assetMeta && assetMeta.key === 'favicon';
  const isContain = fitMode === 'contain' || isLogo || isFavicon;

  let canvasW, canvasH;
  let sx = 0, sy = 0, sw = origW, sh = origH;
  let dx = 0, dy = 0, dw, dh;

  if (isContain) {
    // Proportional fit: never crop, maintain exact original aspect ratio inside bounding box
    const maxW = tW || (isLogo ? 240 : 400);
    const maxH = tH || (isLogo ? 60 : 400);
    const scale = Math.min(maxW / origW, maxH / origH, 1);
    canvasW = Math.max(1, Math.round(origW * scale));
    canvasH = Math.max(1, Math.round(origH * scale));
    dw = canvasW;
    dh = canvasH;
  } else if (tW && tH) {
    // Cover-fit: scale source to fill exact target box, center-crop excess
    canvasW = tW;
    canvasH = tH;
    const scaleX = tW / origW;
    const scaleY = tH / origH;
    const scale  = Math.max(scaleX, scaleY);
    sw = Math.round(tW / scale);
    sh = Math.round(tH / scale);
    sx = Math.round((origW - sw) / 2);
    sy = Math.round((origH - sh) / 2);
    dw = canvasW;
    dh = canvasH;
  } else if (tW) {
    // Proportional clamp to width target
    const scale = tW / origW;
    canvasW = tW;
    canvasH = Math.round(origH * scale);
    dw = canvasW;
    dh = canvasH;
  } else {
    // Fallback safe clamp
    const MAX_SAFE = 1600;
    let scale = 1;
    if (origW > MAX_SAFE || origH > MAX_SAFE) {
      scale = Math.min(MAX_SAFE / origW, MAX_SAFE / origH);
    }
    canvasW = Math.round(origW * scale);
    canvasH = Math.round(origH * scale);
    dw = canvasW;
    dh = canvasH;
  }

  const canvas = document.createElement('canvas');
  canvas.width  = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const isTransparent = isLogo || isFavicon || mimeType === 'image/png' || mimeType === 'image/webp';
  if (!isTransparent) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  // Multi-step downsampling for sharpness
  if (origW / canvasW > 2 || origH / canvasH > 2) {
    let tmpW = sw, tmpH = sh;
    let tmpCanvas = document.createElement('canvas');
    let tmpCtx = tmpCanvas.getContext('2d');
    tmpCanvas.width  = sw;
    tmpCanvas.height = sh;
    tmpCtx.imageSmoothingEnabled = true;
    tmpCtx.imageSmoothingQuality = 'high';
    tmpCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    while (tmpW / canvasW > 2 || tmpH / canvasH > 2) {
      const nw = Math.max(Math.round(tmpW / 2), canvasW);
      const nh = Math.max(Math.round(tmpH / 2), canvasH);
      const step = document.createElement('canvas');
      step.width = nw; step.height = nh;
      const sCtx = step.getContext('2d');
      sCtx.imageSmoothingEnabled = true;
      sCtx.imageSmoothingQuality = 'high';
      sCtx.drawImage(tmpCanvas, 0, 0, nw, nh);
      tmpCanvas = step;
      tmpW = nw; tmpH = nh;
    }
    ctx.drawImage(tmpCanvas, 0, 0, canvasW, canvasH);
  } else {
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  const outType = isTransparent ? 'image/png' : 'image/jpeg';
  const quality = isTransparent ? undefined : (canvasW >= 1200 ? 0.84 : 0.80);
  let dataUrl = canvas.toDataURL(outType, quality);

  // If PNG is over 500KB and not a logo/favicon, convert to JPEG to protect LocalStorage quota
  if (outType === 'image/png' && dataUrl.length > 550000 && !isLogo && !isFavicon) {
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = canvasW;
    bgCanvas.height = canvasH;
    const bgCtx = bgCanvas.getContext('2d');
    bgCtx.fillStyle = '#FFFFFF';
    bgCtx.fillRect(0, 0, canvasW, canvasH);
    bgCtx.drawImage(canvas, 0, 0);
    dataUrl = bgCanvas.toDataURL('image/jpeg', 0.82);
  }

  onDone(dataUrl, { origW, origH, outW: canvasW, outH: canvasH });
}'''
    content = re.sub(compress_pattern, compress_new, content, count=1, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath} OK")

def update_admin_css(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        css = f.read()

    css_fix = '''
/* Fix logo & mockup preview cards: contain image and prevent text clipping */
.asset-card[data-key="logo"] .asset-img,
.asset-card[data-key="favicon"] .asset-img,
.asset-card[data-key*="mockup"] .asset-img {
  object-fit: contain !important;
  padding: 10px;
  background: #0f172a;
}
'''
    if 'data-key="logo"' not in css:
        css = css.replace('.asset-preview-wrap .asset-img {', css_fix + '\n.asset-preview-wrap .asset-img {')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(css)
        print(f"Updated {filepath} OK")
    else:
        print(f"{filepath} already has logo preview rule")

def update_assets_sync():
    with open('js/assets-sync.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Inject global CSS constraint immediately
    style_injection = '''
  // Inject global strict size constraints for logo so it NEVER overflows navbar
  if (!document.getElementById('ms88-logo-constraint-style')) {
    const s = document.createElement('style');
    s.id = 'ms88-logo-constraint-style';
    s.textContent = `
      img.ayo-logo, img.ms88-brand-logo, .nav-logo img, .navbar-brand img, header.navbar .navbar-top-row a img, header.navbar a.p-0 img {
        max-height: 50px !important;
        max-width: 220px !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        display: inline-block !important;
      }
    `;
    document.head.appendChild(s);
  }
'''
    if 'ms88-logo-constraint-style' not in content:
        content = content.replace('function applyCustomAssets() {', 'function applyCustomAssets() {' + style_injection)

    # Make sure applyCustomAssets also forces inline styles on any logo found
    old_logo_sync = r'if \(assets\.logo\) \{.*?\.forEach\(el => \{.*?el\.src = assets\.logo;.*?\}\);.*?\}'
    new_logo_sync = '''if (assets.logo) {
        document.querySelectorAll('img.ayo-logo, img.ms88-brand-logo, img[alt*="Ayo Indonesia Logo"], img[alt*="Mini Soccer 88"], img[alt="Logo"], .navbar-brand img, .nav-logo img').forEach(el => {
          el.src = assets.logo;
          el.style.setProperty('max-height', '50px', 'important');
          el.style.setProperty('max-width', '220px', 'important');
          el.style.setProperty('width', 'auto', 'important');
          el.style.setProperty('height', 'auto', 'important');
          el.style.setProperty('object-fit', 'contain', 'important');
        });
      }'''
    content = re.sub(old_logo_sync, new_logo_sync, content, count=1, flags=re.DOTALL)

    with open('js/assets-sync.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated js/assets-sync.js OK")

def update_index_css():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Add strict rule in ms88-custom-styles
    rule = '''
  .ms88-brand-logo,
  .ayo-logo,
  .nav-logo img,
  .navbar-brand img,
  header.navbar .navbar-top-row a img,
  header.navbar a.p-0 img {
    max-height: 50px !important;
    max-width: 220px !important;
    width: auto !important;
    height: auto !important;
    object-fit: contain !important;
    display: inline-block !important;
    transition: transform 0.2s ease;
  }
'''
    if 'header.navbar a.p-0 img' not in html:
        html = html.replace('.ms88-brand-logo {', rule + '\n  .ms88-brand-logo-old {')
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Updated index.html CSS OK")

if __name__ == '__main__':
    update_admin_js('superadmin/admin.js')
    update_admin_js('admin.js')
    update_admin_css('superadmin/admin.css')
    update_admin_css('admin.css')
    update_assets_sync()
    update_index_css()
    print("All compression and layout fixes applied successfully!")
