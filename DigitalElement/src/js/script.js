// import validateForm from './validateForm.js'
// не смог использовать script type="module", 
// т.к., gulp не копирует validateForm.js в build.
// Некогда, потом разобраться! Изменить настройки gulp под модули.

@@include('_selectors.js')
@@include('_sendDataURL.js')
@@include('_formValidation.js')
@@include('_sendData.js')

const openModal = () => {
  bodyElement.style.overflow = 'hidden'
  overlayElement.classList.remove('hide')
  modalElement.classList.remove('hide')
  btnSubmit.disabled = true
};

const closeWindow = () => {
  bodyElement.style.overflow = 'auto'
  overlayElement.classList.add('hide')
  !modalElement.classList.contains('hide') && modalElement.classList.add('hide')
  !popupElement.classList.contains('hide') && popupElement.classList.add('hide')
};

const showPopup = (message) => {
  bodyElement.style.overflow = 'hidden'
  overlayElement.classList.remove('hide')
  popupElement.children[1].textContent = message
  popupElement.classList.remove('hide')
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
