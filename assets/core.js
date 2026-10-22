/* Utilidades compartidas: conexión a Supabase, edad, WhatsApp, avisos */
(function(){
  const C = window.OP_CONFIG || {};

  const db = (C.supabaseUrl && C.supabaseAnonKey && window.supabase)
    ? window.supabase.createClient(C.supabaseUrl, C.supabaseAnonKey)
    : null;

  // Edad exacta en años a partir de 'AAAA-MM-DD'
  function ageFrom(dateStr){
    if(!dateStr) return null;
    const [y, m, d] = dateStr.split('-').map(Number);
    if(!y || !m || !d) return null;
    const t = new Date();
    let a = t.getFullYear() - y;
    if(t.getMonth() + 1 < m || (t.getMonth() + 1 === m && t.getDate() < d)) a--;
    return a;
  }

  // Número colombiano a formato internacional (57XXXXXXXXXX)
  function intlPhone(p){
    let n = String(p || '').replace(/\D/g, '');
    if(n.length === 10 && n.startsWith('3')) n = '57' + n;
    return n;
  }

  function waLink(phone, text){
    return `https://wa.me/${intlPhone(phone)}?text=${encodeURIComponent(text)}`;
  }

  function toast(msg, ms = 2600){
    let el = document.querySelector('.toast-msg');
    if(!el){ el = document.createElement('div'); el.className = 'toast-msg'; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), ms);
  }

  function esc(s){
    return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function fmtDate(d, withTime){
    if(!d) return '—';
    const o = { day:'2-digit', month:'short', year:'numeric' };
    if(withTime) Object.assign(o, { hour:'2-digit', minute:'2-digit' });
    return new Date(d.length === 10 ? d + 'T12:00:00' : d).toLocaleString('es-CO', o);
  }

  // Reduce fotos grandes antes de subirlas (más rápido desde el celular)
  async function shrinkImage(file, maxSide = 2000, quality = .85){
    if(!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
    const bmp = await createImageBitmap(file).catch(() => null);
    if(!bmp) return file;
    const k = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
    if(k === 1 && file.size < 1.5e6) return file;
    const cv = document.createElement('canvas');
    cv.width = Math.round(bmp.width * k); cv.height = Math.round(bmp.height * k);
    cv.getContext('2d').drawImage(bmp, 0, 0, cv.width, cv.height);
    const blob = await new Promise(r => cv.toBlob(r, 'image/jpeg', quality));
    return blob ? new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type:'image/jpeg' }) : file;
  }

  window.OP = { C, db, ageFrom, intlPhone, waLink, toast, esc, fmtDate, shrinkImage };
})();
