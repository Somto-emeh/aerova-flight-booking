
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.innerHTML = open ? '&times;' : '&#9776;';
  });
}
document.querySelectorAll('[data-trip]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-trip]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const returnField = document.querySelector('#return-date');
    if (returnField) {
      returnField.disabled = tab.dataset.trip === 'oneway';
      if (returnField.disabled) returnField.value = '';
    }
  });
});
const searchForm = document.querySelector('#flight-search');
if (searchForm) searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const from = document.querySelector('#from')?.value || '';
  const to = document.querySelector('#to')?.value || '';
  const date = document.querySelector('#depart-date')?.value || '';
  if (!from || !to || !date) { alert('Please enter your departure city, destination and travel date.'); return; }
  const params = new URLSearchParams({from,to,date});
  window.location.href = `flights.html?${params.toString()}`;
});
const query = new URLSearchParams(location.search);
['from','to','date'].forEach(key => {
  const el = document.querySelector(`#${key}`);
  if (el && query.get(key)) el.value = query.get(key);
});
const filterInput = document.querySelector('#flight-filter');
if (filterInput) filterInput.addEventListener('input', () => {
  const value = filterInput.value.toLowerCase();
  document.querySelectorAll('[data-flight-card]').forEach(card => {
    card.hidden = !card.innerText.toLowerCase().includes(value);
  });
});
const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 350));
}
document.querySelectorAll('form[data-demo-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    location.href = 'success.html';
  });
});
