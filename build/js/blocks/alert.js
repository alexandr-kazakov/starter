/* -------------------------------------------------------------------------
  begin Alert
* ------------------------------------------------------------------------- */

function closeAlert(target) {
  target.parentElement.classList.add('fade-out');
  setTimeout(() => {
    target.parentElement.classList.add('hidden');
  }, 200);
}

export default function alertInit() {
  const alertsCloseButtons = document.querySelectorAll('.alert__close-btn');

  alertsCloseButtons.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      const { target } = event;
      closeAlert(target);
    });
  });
}

/* -------------------------------------------------------------------------
      end Alert
    * ------------------------------------------------------------------------- */
