import {btn, overlay, btnClose, form, btnSubmit} from './elements.js';
import formHandler from './formHandler.js'
import sendData from './sendData.js';

const btnOpenModal = ()  => {
  overlay.style.display = "block"
  btnSubmit.disabled = true
}
const modalClose = event => {
  const target = event.target.classList
   if (target.contains('overlay') ||
        target.contains('btn-close') ||
        event.type === 'submit')
     overlay.style.display = 'none'
}

const formSubmit = event => {
  event.preventDefault()
  modalClose(event)
  sendData(form)
  form.reset()
}

btn.addEventListener('click', btnOpenModal)
btnClose.addEventListener('click', modalClose)
overlay.addEventListener('click', modalClose)
form.addEventListener('input', formHandler);
form.addEventListener('submit', formSubmit)

