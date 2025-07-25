// Popup animation for listing cards on mobile
// Popup animation for listing cards on all devices
function animateCardsOnScroll() {
  const cards = document.querySelectorAll('.listing-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add('animate');
    }
  });
}

window.addEventListener('scroll', animateCardsOnScroll);
window.addEventListener('DOMContentLoaded', animateCardsOnScroll);
