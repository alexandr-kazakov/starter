/* -------------------------------------------------------------------------
      begin Mask Phone
    * ------------------------------------------------------------------------- */
const inputsTel = document.querySelectorAll('input[type="tel"]');
Inputmask({
  mask: '+7(999) 999-99-99',
  showMaskOnHover: false,
  // placeholder: ' ',
  // showMaskOnFocus: false,
}).mask(inputsTel);
/* -------------------------------------------------------------------------
     end Mask Phone
* ------------------------------------------------------------------------- */
