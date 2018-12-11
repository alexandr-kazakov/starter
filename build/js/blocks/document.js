import { switchDropdown, switchToggleBtn } from './select-box';

/* -------------------------------------------------------------------------
  begin Document
* ------------------------------------------------------------------------- */
function isClickInside(target, elem) {
  const checkResult = elem.contains(target);
  return checkResult;
}

document.addEventListener('click', (event) => {
  const { target } = event;

  if (document.querySelector('.select-box__dropdown.show')) {
    const openSelectDropdowns = document.querySelectorAll('.select-box__dropdown.show');

    openSelectDropdowns.forEach((elem) => {
      let selectBox = elem;
      const selectToggleBtn = elem.previousElementSibling;

      while (true) {
        if (selectBox.classList.contains('select-box')) {
          break;
        }
        selectBox = selectBox.parentElement;
      }

      const result = isClickInside(target, selectBox);

      if (!result) {
        switchDropdown(elem);
        switchToggleBtn(selectToggleBtn);
      }
    });
  }
});
/* -------------------------------------------------------------------------
    end Document
  * ------------------------------------------------------------------------- */
