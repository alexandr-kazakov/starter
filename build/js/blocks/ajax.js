/* -------------------------------------------------------------------------
     begin Ajax
   * ------------------------------------------------------------------------- */
function sendEmail(event) {
  event.preventDefault();
  const formName = $(event.target).find('input[name="contact-name"]');
  const formTel = $(event.target).find('input[name="contact-phone"]');
  const formProduct = $(event.target).find('input[name="contact-product"]');
  const formText = $(event.target).find('input[name="contact-message"]');
  const formAlerts = $(event.target).next('.form-alerts');
  const formData = $(event.target).serialize();
  const request = $.ajax({
    type: 'POST',
    url: $(event.target).attr('action'),
    data: formData,
  });
  request.done((response) => {
    $(formAlerts).removeClass('form-alerts_error');
    $(formAlerts).addClass('form-alerts_success');
    $(formAlerts)
      .children('.form-alerts__message')
      .text(response);

    $(formName)
      .val('')
      .removeClass('parsley-success');
    $(formTel)
      .val('')
      .removeClass('parsley-success');
    $(formProduct)
      .val('')
      .removeClass('parsley-success');
    $(formText)
      .val('')
      .removeClass('parsley-success');

    setTimeout(() => {
      $(formAlerts).removeClass('form-alerts_success');
      if ($(event.target).parents('.modal')) {
        $(event.target)
          .parents('.modal')
          .modal('hide');
      }
    }, 10000);
  });
  request.fail((data) => {
    $(formAlerts).removeClass('form-alerts_success');
    $(formAlerts).addClass('form-alerts_error');
    if (data.responseText !== '' && data.responseText !== undefined) {
      $(formAlerts)
        .children('.form-alerts__message')
        .text(data.responseText);
    } else {
      $(formAlerts)
        .children('.form-alerts__message')
        .text('К сожалению! Произошла ошибка, и ваше сообщение не удалось отправить.');
    }
  });
  $(formAlerts.children('.form-alerts__close')).click((event) => {
    $(formAlerts).removeClass('form-alerts_success form-alerts_error');
  });
}
const formsArray = ['#form-call-request'];
for (let a = 0, length2 = formsArray.length; a < length2; a++) {
  $(formsArray[a]).submit(sendEmail);
}
/* -------------------------------------------------------------------------
     end Ajax
  * ------------------------------------------------------------------------- */
