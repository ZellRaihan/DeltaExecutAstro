function setupMobileMenu() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const panel = document.getElementById('mobile-nav-panel');
  const iconOpen = document.getElementById('mobile-nav-icon-open');
  const iconClose = document.getElementById('mobile-nav-icon-close');
  if (!toggle || !panel || !iconOpen || !iconClose) return;

  function closeMenu() {
    panel!.classList.add('hidden');
    panel!.classList.remove('flex');
    iconOpen!.classList.remove('hidden');
    iconClose!.classList.add('hidden');
    toggle!.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    panel!.classList.remove('hidden');
    panel!.classList.add('flex');
    iconOpen!.classList.add('hidden');
    iconClose!.classList.remove('hidden');
    toggle!.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Click outside closes the menu, matching the original site's behavior
  document.addEventListener('click', (e) => {
    if (
      toggle.getAttribute('aria-expanded') === 'true' &&
      !panel.contains(e.target as Node) &&
      !toggle.contains(e.target as Node)
    ) {
      closeMenu();
    }
  });

  // Clicking a link inside the menu should close it too, since it's
  // navigating away (and on same-page anchors, it should still tidy up)
  panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

setupMobileMenu();
// Astro view transitions (if ever enabled) swap content without a full
// reload, so re-run setup after navigation just in case.
document.addEventListener('astro:page-load', setupMobileMenu);
