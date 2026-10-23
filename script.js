const scrollLine = document.querySelector('.scroll-line span');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const filterStatus = document.querySelector('.filter-status');

const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollLine.style.height = `${Math.min(progress * 100, 100)}%`;
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

const closeMenu = () => {
  mobileNav.classList.remove('is-open');
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '打开导航');
};

menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.hidden;
  mobileNav.hidden = !isOpen;
  mobileNav.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '关闭导航' : '打开导航');
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!mobileNav.hidden && !mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle('is-active', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));
    });
    projectCards.forEach((card) => {
      const isVisible = filter === 'all' || card.dataset.type === filter;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });
    filterStatus.textContent = filter === 'all'
      ? `共 ${visibleCount} 个代表项目；量化成果沿用简历口径。`
      : `${button.textContent}：${visibleCount} 个项目；量化成果沿用简历口径。`;
    updateScrollProgress();
  });
});
document.documentElement.classList.add('has-js');

