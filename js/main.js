/* ===== Azura Estates – main.js ===== */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const page = document.body.dataset.page || 'home';
  const hasGsap = !!window.gsap;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = p => {
    if (p.rent) return '$' + p.price.toLocaleString('en-US') + '<small> / month</small>';
    return '$' + (p.price / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  };

  /* broken image -> blue gradient instead of a broken icon */
  document.addEventListener('error', e => {
    if (e.target.tagName === 'IMG') { const p = e.target.parentElement; e.target.remove(); p && p.classList.add('noimg'); }
  }, true);

  /* ---------- layout ---------- */
  const links = [['index.html', 'Home', 'home'], ['about.html', 'About', 'about'], ['properties.html', 'Properties', 'properties'],
    ['services.html', 'Services', 'services'], ['agents.html', 'Agents', 'agents'], ['blog.html', 'Journal', 'blog'], ['contact.html', 'Contact', 'contact']];
  const activeKey = page === 'details' ? 'properties' : page;
  const archSvg = '<svg viewBox="0 0 22 26" fill="none"><path d="M1 25V11C1 5.5 5.5 1 11 1s10 4.5 10 10v14" stroke="#21A6E0" stroke-width="2"/><path d="M6 25V12c0-3 2.2-5 5-5s5 2 5 5v13" stroke="currentColor" stroke-width="1.6"/></svg>';

  document.body.insertAdjacentHTML('afterbegin', `
    <div id="loader"><span>Azura</span></div>
    <div id="cursor"></div>
    <header class="nav"><div class="wrap">
      <a href="index.html" class="logo" aria-label="Azura Estates">${archSvg}Azura</a>
      <nav class="menu">${links.map(l => `<a href="${l[0]}" class="${l[2] === activeKey ? 'active' : ''}">${l[1]}</a>`).join('')}</nav>
      <a href="contact.html" class="btn sea">Book a viewing</a>
      <button class="burger" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>
    </div></header>
    <button id="totop" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>`);

  $('#scroll').insertAdjacentHTML('beforeend', `
    <footer class="foot"><div class="wrap">
      <div class="fgrid">
        <div><a href="index.html" class="logo">${archSvg}Azura</a>
          <p style="margin-top:22px;max-width:320px">Villas, penthouses and estates on the world’s best coastlines, sold with total discretion since 2004.</p>
          <div class="soc"><a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a><a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a><a href="#" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a></div></div>
        <div><h4>Explore</h4><ul>${links.map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}</ul></div>
        <div><h4>Visit or call</h4><ul>
          <li><a href="#"><i class="fa-solid fa-location-dot"></i>720 Fifth Avenue, New York</a></li>
          <li><a href="tel:+12125550188"><i class="fa-solid fa-phone"></i>+1 212 555 0188</a></li>
          <li><a href="mailto:hello@azura-estates.com"><i class="fa-solid fa-envelope"></i>hello@azura-estates.com</a></li></ul></div>
        <div><h4>Off-market list</h4><p>New private listings, sent to you before they go public.</p>
          <form class="nl"><input type="email" placeholder="Your email" aria-label="Email" required><button>Join</button></form></div>
      </div>
      <div class="word" aria-hidden="true">Azura</div>
      <div class="copy"><span>© 2026 Azura Estates</span><span>Privacy · Terms · Cookies</span></div>
    </div></footer>`);

  /* ---------- renderers ---------- */
  const specs = p => `<ul class="pspecs"><li><i class="fa-solid fa-bed"></i>${p.beds} beds</li><li><i class="fa-solid fa-bath"></i>${p.baths} baths</li><li><i class="fa-solid fa-vector-square"></i>${p.area.toLocaleString()} sq ft</li></ul>`;
  const card = p => `
    <a class="pcard" href="property-details.html?id=${p.id}" data-cursor="View">
      <div class="pimg"><img src="${p.img}" alt="${p.title}" loading="lazy"><span class="pill-tag ${p.rent ? 'rent' : ''}">${p.status}</span></div>
      <div class="pbody"><div><h3>${p.title}</h3><div class="ploc"><i class="fa-solid fa-location-dot"></i>${p.location}</div></div><div class="pprice">${money(p)}</div></div>
      ${specs(p)}</a>`;
  const panel = p => `
    <a class="hpanel" href="property-details.html?id=${p.id}" data-cursor="View">
      <img src="${p.img}" alt="${p.title}">
      <div class="tx"><h3>${p.title}</h3><p>${p.location}</p><div class="pr">${money(p)}</div></div></a>`;

  $$('[data-properties]').forEach(box => {
    const mode = box.dataset.properties;
    let list = PROPERTIES.slice();
    if (mode === 'all') return;
    if (mode === 'related') { const id = +new URLSearchParams(location.search).get('id') || 1; list = list.filter(p => p.id !== id).slice(0, 3); }
    box.innerHTML = list.map(card).join('');
  });

  const track = $('[data-gallery]');
  if (track) track.insertAdjacentHTML('beforeend', PROPERTIES.filter(p => p.featured).map(panel).join(''));

  const cb = $('[data-cities]');
  if (cb) cb.innerHTML = CITIES.map((c, i) => `<a class="tile t${i + 1}" href="properties.html?q=${encodeURIComponent(c.name)}" data-cursor="Explore"><img src="${c.img}" alt="${c.name}" loading="lazy"><div class="tx"><h3>${c.name}</h3><span>${c.n}</span></div></a>`).join('');

  const allBox = $('[data-properties="all"]');
  if (allBox) {
    const params = new URLSearchParams(location.search);
    const st = { type: params.get('type') || 'All', status: params.get('status') || 'All', q: (params.get('q') || '').toLowerCase(), max: +params.get('max') || 0, sort: 'new' };
    const draw = () => {
      const l = PROPERTIES.filter(p => (st.type === 'All' || p.type === st.type) && (st.status === 'All' || p.status === st.status) &&
        (!st.q || (p.title + p.location).toLowerCase().includes(st.q)) && (!st.max || (p.rent ? p.price * 12 : p.price) <= st.max));
      if (st.sort === 'low') l.sort((a, b) => a.price - b.price);
      if (st.sort === 'high') l.sort((a, b) => b.price - a.price);
      allBox.innerHTML = l.length ? l.map(card).join('') : '<p class="empty">No homes match these filters. Clear the search or pick a different type.</p>';
      $('#count').textContent = l.length + (l.length === 1 ? ' home' : ' homes');
      hasGsap && window.ScrollTrigger && (revealImgs(allBox), ScrollTrigger.refresh());
    };
    const types = ['All', ...new Set(PROPERTIES.map(p => p.type))];
    $('#pills').innerHTML = types.map(t => `<button class="pill ${t === st.type ? 'on' : ''}" data-t="${t}">${t}</button>`).join('');
    $('#pills').addEventListener('click', e => { const b = e.target.closest('.pill'); if (!b) return; $$('.pill').forEach(x => x.classList.remove('on')); b.classList.add('on'); st.type = b.dataset.t; draw(); });
    $('#sort').addEventListener('change', e => { st.sort = e.target.value; draw(); });
    const q = $('#q'); q.value = params.get('q') || ''; q.addEventListener('input', () => { st.q = q.value.toLowerCase(); draw(); });
    draw();
  }

  const ag = $('[data-agents]');
  if (ag) ag.innerHTML = AGENTS.map(a => `
    <div class="agent"><div class="ph"><img src="${a.img}" alt="${a.name}" loading="lazy">
      <div class="soc"><a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a><a href="#" aria-label="Email"><i class="fa-solid fa-envelope"></i></a></div></div>
      <h3>${a.name}</h3><div class="rl">${a.role}</div><div class="dl">${a.deals}</div></div>`).join('');

  const jl = $('[data-journal]');
  if (jl) jl.innerHTML = POSTS.slice(0, 3).map(p => `
    <a href="#" class="jrow" data-cursor="Read"><div class="im"><img src="${p.img}" alt="" loading="lazy"></div>
      <div><h3>${p.title}</h3><div class="m">${p.cat} · ${p.date}</div></div><i class="fa-solid fa-arrow-right"></i></a>`).join('');
  const jg = $('[data-posts]');
  if (jg) jg.innerHTML = POSTS.map(p => `
    <a href="#" class="jc" data-cursor="Read"><div class="im"><img src="${p.img}" alt="" loading="lazy"></div><div class="m">${p.cat} · ${p.date}</div><h3>${p.title}</h3></a>`).join('');

  /* property details */
  const dr = $('#detail-root');
  if (dr) {
    const id = +new URLSearchParams(location.search).get('id') || 1;
    const p = PROPERTIES.find(x => x.id === id) || PROPERTIES[0];
    document.title = p.title + ' – Azura Estates';
    $('#d-title').textContent = p.title; $('#d-crumb').textContent = p.title;
    $('#d-img').src = p.img;
    dr.innerHTML = `
      <div class="mosaic">${p.gallery.slice(0, 5).map(g => `<div><img src="${g}" alt="${p.title}"></div>`).join('')}</div>
      <div class="detail">
        <div>
          <span class="pill-tag" style="position:static;display:inline-block;background:var(--mist)">${p.status} · ${p.type}</span>
          <h2 style="margin-top:20px">${p.title}</h2>
          <p class="ploc" style="margin-top:14px;font-size:1.05rem"><i class="fa-solid fa-location-dot"></i>${p.location}</p>
          <div class="dspecs">
            <div><i class="fa-solid fa-bed"></i><b>${p.beds}</b><span>Bedrooms</span></div>
            <div><i class="fa-solid fa-bath"></i><b>${p.baths}</b><span>Bathrooms</span></div>
            <div><i class="fa-solid fa-vector-square"></i><b>${p.area.toLocaleString()}</b><span>Square feet</span></div>
            <div><i class="fa-solid fa-car"></i><b>${Math.max(2, Math.round(p.beds / 2))}</b><span>Garage spaces</span></div>
          </div>
          <h3>About this home</h3>
          <p style="margin-top:14px;max-width:38em">${p.desc} Materials were sourced from the finest ateliers, and every room is planned around privacy and natural light.</p>
          <h3 style="margin-top:46px">What’s included</h3>
          <ul class="amen">${['Infinity pool', 'Private cinema', 'Wine cellar', 'Smart-home system', 'Spa and sauna', '24/7 security', 'Chef’s kitchen', 'Landscaped gardens'].map(a => `<li><i class="fa-solid fa-circle-check"></i>${a}</li>`).join('')}</ul>
        </div>
        <aside class="side">
          <div class="price">${money(p)}</div>
          <form class="form contact-form">
            <div class="fld"><input required placeholder="Full name" aria-label="Full name"></div>
            <div class="fld"><input type="email" required placeholder="Email" aria-label="Email"></div>
            <div class="fld"><input placeholder="Phone" aria-label="Phone"></div>
            <div class="fld"><textarea placeholder="I’d like a private viewing of ${p.title}." aria-label="Message"></textarea></div>
            <button class="btn" type="submit">Request a viewing</button>
            <div class="ok">Request sent. An advisor will call you today.</div>
          </form>
        </aside>
      </div>`;
    const lb = document.createElement('div'); lb.id = 'lightbox'; lb.innerHTML = '<button aria-label="Close"><i class="fa-solid fa-xmark"></i></button><img alt="">';
    document.body.appendChild(lb);
    dr.addEventListener('click', e => { const d = e.target.closest('.mosaic div'); if (!d) return; $('img', lb).src = $('img', d).src; lb.classList.add('on'); });
    lb.addEventListener('click', () => lb.classList.remove('on'));
  }

  /* forms */
  document.addEventListener('submit', e => {
    const f = e.target;
    if (f.classList.contains('contact-form')) { e.preventDefault(); const ok = $('.ok', f); ok && (ok.style.display = 'block'); f.reset(); }
    if (f.classList.contains('nl')) { e.preventDefault(); f.innerHTML = '<p style="padding:14px 22px;color:#fff">You’re on the list.</p>'; }
  });

  /* testimonials */
  const slides = $$('.qslide');
  if (slides.length) {
    const dots = $('.dots'); let cur = 0;
    dots.innerHTML = slides.map((_, i) => `<button data-i="${i}" aria-label="Quote ${i + 1}"></button>`).join('');
    const show = i => { cur = i; slides.forEach((s, k) => s.classList.toggle('on', k === i)); $$('button', dots).forEach((b, k) => b.classList.toggle('on', k === i));
      hasGsap && !reduce && gsap.fromTo(slides[i], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }); };
    dots.addEventListener('click', e => { const b = e.target.closest('button'); b && show(+b.dataset.i); });
    show(0); setInterval(() => show((cur + 1) % slides.length), 7000);
  }

  /* mobile menu */
  const menu = $('.menu'), burger = $('.burger');
  burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.innerHTML = `<i class="fa-solid fa-${o ? 'xmark' : 'bars'}"></i>`; });

  /* cursor */
  const cur = $('#cursor'); let mx = 0, my = 0, cx = 0, cy = 0;
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() { cx += (mx - cx) * .22; cy += (my - cy) * .22; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  document.addEventListener('mouseover', e => {
    const t = e.target.closest('[data-cursor]');
    cur.classList.toggle('label', !!t); cur.textContent = t ? t.dataset.cursor : '';
  });

  /* ---------- smooth scrollbar + ScrollTrigger ---------- */
  const scrollEl = $('#scroll'); let sb = null;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  if (window.Scrollbar && hasGsap) {
    sb = Scrollbar.init(scrollEl, { damping: 0.08, renderByPixels: true });
    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(v) { if (arguments.length) sb.scrollTop = v; return sb.scrollTop; },
      getBoundingClientRect() { return { top: 0, left: 0, width: innerWidth, height: innerHeight }; }
    });
    sb.addListener(ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: scrollEl });
  } else {
    document.body.classList.add('no-sb');
    scrollEl.style.cssText = 'position:static;overflow:visible';
    document.documentElement.style.overflow = 'auto';
  }
  const header = $('header.nav'), totop = $('#totop'); let lastY = 0;
  const onScroll = () => {
    const y = sb ? sb.scrollTop : scrollY;
    header.classList.toggle('solid', y > 80);
    header.classList.toggle('hide', y > lastY && y > 600);
    totop.classList.toggle('show', y > 900); lastY = y;
  };
  sb ? sb.addListener(onScroll) : addEventListener('scroll', onScroll);
  totop.addEventListener('click', () => sb ? sb.scrollTo(0, 0, 1400) : scrollTo({ top: 0, behavior: 'smooth' }));
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = a.getAttribute('href').length > 1 && $(a.getAttribute('href')); if (!t) return; e.preventDefault(); sb ? sb.scrollIntoView(t, { offsetTop: 80 }) : t.scrollIntoView({ behavior: 'smooth' }); }));
  const getY = () => sb ? sb.scrollTop : scrollY;

  /* ---------- WebGL liquid image (Three.js) ---------- */
  function liquid(box) {
    if (!window.THREE) return;
    const src = box.dataset.src; if (!src) return;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); } catch (e) { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    const canvas = renderer.domElement; box.appendChild(canvas);
    const scene = new THREE.Scene(), cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const U = { uTex: { value: null }, uMouse: { value: new THREE.Vector2(.5, .5) }, uVel: { value: 0 }, uTime: { value: 0 }, uScroll: { value: 0 }, uScale: { value: new THREE.Vector2(1, 1) } };
    const mat = new THREE.ShaderMaterial({
      uniforms: U,
      vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
      fragmentShader: `
        uniform sampler2D uTex;uniform vec2 uMouse;uniform vec2 uScale;uniform float uTime,uVel,uScroll;varying vec2 vUv;
        void main(){
          vec2 uv=(vUv-.5)*uScale*.9+.5;
          uv.y+=(uScroll-.5)*.04;
          vec2 dv=vUv-uMouse;float d=length(dv);vec2 dir=dv/(d+1e-4);
          float r=sin(d*30.-uTime*2.6)*exp(-d*4.5)*(.12+uVel)*.03;
          uv+=dir*r;
          uv+=vec2(sin(vUv.y*6.+uTime*.55),cos(vUv.x*5.+uTime*.45))*.0035;
          float s=uVel*.008+abs(r)*.35;
          vec3 c=vec3(texture2D(uTex,uv+dir*s).r,texture2D(uTex,uv).g,texture2D(uTex,uv-dir*s).b);
          c=mix(c,c*vec3(.94,1.0,1.07),.6);
          gl_FragColor=vec4(c,1.);
        }`
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
    let imgA = 1.5;
    const fit = () => {
      const w = box.clientWidth, h = box.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false);
      const ca = w / h; U.uScale.value.set(ca > imgA ? 1 : ca / imgA, ca > imgA ? imgA / ca : 1);
    };
    const loader = new THREE.TextureLoader(); loader.setCrossOrigin('anonymous');
    loader.load(src, tex => {
      tex.minFilter = THREE.LinearFilter; U.uTex.value = tex; imgA = tex.image.width / tex.image.height; fit(); box.classList.add('live');
    }, undefined, () => {});
    new ResizeObserver(fit).observe(box);
    let tx = .5, ty = .5, vel = 0, on = true, last = [.5, .5];
    const move = e => { const r = box.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width; ty = 1 - (e.clientY - r.top) / r.height; };
    addEventListener('mousemove', move);
    new IntersectionObserver(en => on = en[0].isIntersecting).observe(box);
    const clock = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick); if (!on || !U.uTex.value) return;
      const m = U.uMouse.value; m.x += (tx - m.x) * .08; m.y += (ty - m.y) * .08;
      const sp = Math.hypot(m.x - last[0], m.y - last[1]) * 24; last = [m.x, m.y];
      vel += (Math.min(sp, 1.2) - vel) * .08;
      U.uVel.value = vel; U.uTime.value = clock.getElapsedTime();
      U.uScroll.value = Math.min(1, getY() / innerHeight);
      renderer.render(scene, cam);
    })();
  }
  $$('.media[data-src]').forEach(liquid);

  /* ---------- animation ---------- */
  function revealImgs(root = document) {
    if (!hasGsap || reduce) return;
    $$('.pimg:not(.rv),.jc .im:not(.rv)', root).forEach(el => {
      el.classList.add('rv');
      gsap.fromTo(el, { clipPath: 'inset(12% 8% 0% 8% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
    });
  }

  function intro() {
    if (!hasGsap || reduce) { $('#loader').remove(); return; }
    const hero = $('.hero .media'), phero = $('.phero');
    const tl = gsap.timeline();
    tl.to('#loader span', { y: -30, opacity: 0, duration: .6, delay: .5, ease: 'power2.in' })
      .to('#loader', { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '-=.1')
      .set('#loader', { display: 'none' });
    if (hero) {
      tl.fromTo(hero, { clipPath: 'inset(14% 32% 0% 32% round 999px 999px 0 0)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0 0)', duration: 1.8, ease: 'power4.inOut' }, '-=.5')
        .to('.hl>span', { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: .12 }, '-=.9')
        .from('.hero .hside', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' }, '-=.8')
        .from('.nav .wrap', { y: -50, opacity: 0, duration: .9, ease: 'power3.out' }, '-=1');
    } else if (phero || $('.dhero')) {
      tl.to('.hl>span', { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: .1 }, '-=.4')
        .from('.phero .arch, .phero p, .crumbs, .nav .wrap', { opacity: 0, y: 30, duration: 1, stagger: .08, ease: 'power3.out' }, '-=.9');
    }
  }
  if (hasGsap) {
    // headline lines masked; initial state set here so non-GSAP browsers still see text
    $$('.hl>span').forEach(s => gsap.set(s, { yPercent: 110 }));

    revealImgs();

    // statement: words light up with scroll
    $$('.statement').forEach(el => {
      el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span>${w}</span>`).join(' ');
      gsap.to($$('span', el), { opacity: 1, stagger: .12, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true } });
    });

    // arch images parallax
    $$('.arch img, .jrow .im img').forEach(im => gsap.fromTo(im, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: im.parentElement, scrub: true, start: 'top bottom', end: 'bottom top' } }));
    $$('.cta .media img').forEach(im => gsap.fromTo(im, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.cta', scrub: true, start: 'top bottom', end: 'bottom top' } }));
    $$('.dhero .media img').forEach(im => gsap.to(im, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.dhero', scrub: true, start: 'top top', end: 'bottom top' } }));

    // counters
    $$('[data-count]').forEach(el => {
      const end = +el.dataset.count, suf = el.dataset.suffix || '', o = { v: 0 };
      gsap.to(o, { v: end, duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%' }, onUpdate: () => el.textContent = Math.round(o.v).toLocaleString() + suf });
    });

    // horizontal pinned gallery
    const hg = $('.hgal'), ht = $('.htrack');
    if (hg && ht && innerWidth > 800 && !reduce) {
      const dist = () => ht.scrollWidth - innerWidth;
      gsap.to(ht, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: hg, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: .7, invalidateOnRefresh: true } });
    }
    // process steps
    const st = $$('.step');
    st.length && gsap.from(st, { opacity: 0, y: 40, duration: 1, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: st[0].parentElement, start: 'top 85%' } });
  } else {
    $$('.hl>span').forEach(s => s.style.transform = 'none');
    $$('.statement span').forEach(s => s.style.opacity = 1);
  }
  addEventListener('load', () => { intro(); hasGsap && ScrollTrigger.refresh(); });
  hasGsap || $('#loader').remove();
})();
