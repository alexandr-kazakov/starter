/* -------------------------------------------------------------------------
     begin Back to Top Button
   * ------------------------------------------------------------------------- */
function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    goTopBtn.classList.add('back-to-top_show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('back-to-top_show');
  }
}
function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}
var goTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);
/* -------------------------------------------------------------------------
     end Back to Top Button
   * ------------------------------------------------------------------------- */
