// Smooth close of other FAQ items when one opens (accordion behavior)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// Subtle header shadow on scroll
const header = document.querySelector('.site-header');
const updateHeader = () => {
  if (window.scrollY > 20) header.style.boxShadow = '0 1px 0 rgba(201, 169, 97, 0.15)';
  else header.style.boxShadow = 'none';
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Reveal sections on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.section-head, .problem-card, .step, .feature, .collection, .founding-list li, .faq-item').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .8s ease, transform .8s ease';
  io.observe(el);
});
// Add class that applies the visible state
const style = document.createElement('style');
style.textContent = '.in-view { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
