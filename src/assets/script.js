// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
});

// En-tête qui change d'aspect au défilement
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Filtres des pièces
const posters = document.getElementById('posters');
document.querySelectorAll('.filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((b) => b.classList.toggle('is-active', b === btn));
    const f = btn.dataset.filter;
    posters.querySelectorAll('.poster').forEach((li) => {
      const y = Number(li.dataset.year);
      li.hidden = f === '2020' ? y < 2020 : f === '2010' ? y >= 2020 : false;
    });
  });
});

// Calendrier
(function () {
  const root = document.getElementById('calendar');
  if (!root) return;
  const events = (window.EVENEMENTS || []).map((e) => ({ ...e, d: new Date(e.debut) }));
  const parisDay = (d) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Paris' }).format(d);
  const byDay = {};
  events.forEach((e) => { (byDay[parisDay(e.d)] ||= []).push(e); });

  const today = new Date();
  const upcoming = events.filter((e) => e.d >= new Date(today.getTime() - 864e5)).sort((a, b) => a.d - b.d);
  const start = upcoming[0] ? upcoming[0].d : today;
  let year = Number(parisDay(start).slice(0, 4));
  let month = Number(parisDay(start).slice(5, 7)) - 1;

  const title = root.querySelector('.cal-title');
  const grid = root.querySelector('.cal-days');
  const pad = (n) => String(n).padStart(2, '0');
  const todayKey = parisDay(today);

  function render() {
    title.textContent = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' })
      .format(new Date(year, month, 1));
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7; // lundi = 0
    const days = new Date(year, month + 1, 0).getDate();
    let html = '';
    for (let i = 0; i < offset; i++) html += '<span class="cal-empty"></span>';
    for (let day = 1; day <= days; day++) {
      const key = `${year}-${pad(month + 1)}-${pad(day)}`;
      const evs = byDay[key];
      const cls = ['cal-day', evs ? 'has-event' : '', key === todayKey ? 'is-today' : ''].join(' ');
      if (evs) {
        const label = evs.map((e) => e.titre).join(', ');
        html += `<button class="${cls}" data-day="${key}" aria-label="${day} : ${label}"><span>${day}</span><i aria-hidden="true">${evs.length > 1 ? evs.length : ''}</i></button>`;
      } else {
        html += `<span class="${cls}"><span>${day}</span></span>`;
      }
    }
    grid.innerHTML = html;
  }

  root.querySelectorAll('.cal-nav').forEach((b) => b.addEventListener('click', () => {
    month += Number(b.dataset.dir);
    if (month < 0) { month = 11; year--; }
    if (month > 11) { month = 0; year++; }
    render();
  }));

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.has-event');
    if (!btn) return;
    const cards = document.querySelectorAll(`.date-card[data-day="${btn.dataset.day}"]`);
    if (cards.length) {
      cards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      cards.forEach((c) => { c.classList.remove('flash'); void c.offsetWidth; c.classList.add('flash'); });
    } else {
      const ev = byDay[btn.dataset.day][0];
      window.open(ev.reservation, '_blank', 'noopener');
    }
  });

  render();
})();
