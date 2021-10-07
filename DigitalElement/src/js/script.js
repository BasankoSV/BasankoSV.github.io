import { 
  bodyElement,
  overlayElement,
  modalElement,
  popupElement,
  formElement,
  btnModal,
  btnSubmit,
  buttonsCloseWindow
   } from './selectors.js'
import sendData from './sendData.js'
import formValidation from './formValidation.js'

const openModal = () => {
  bodyElement.style.overflow = 'hidden'
  overlayElement.classList.remove('hide')
  modalElement.classList.remove('hide')
  btnSubmit.disabled = true
}

const closeWindow = () => {
  bodyElement.style.overflow = 'auto'
  overlayElement.classList.add('hide')
  !modalElement.classList.contains('hide') && modalElement.classList.add('hide')
  !popupElement.classList.contains('hide') && popupElement.classList.add('hide')
}

const formSubmit = event => {
  event.preventDefault()
  closeWindow()
  sendData(formElement)
}

btnModal.addEventListener('click', openModal)
overlayElement.addEventListener('click', closeWindow)
formElement.addEventListener('input', formValidation)
formElement.addEventListener('submit', formSubmit)
buttonsCloseWindow.forEach(button => button.addEventListener('click', closeWindow))
