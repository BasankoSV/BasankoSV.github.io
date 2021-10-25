import { bodyElement, overlayElement, popupElement } from './selectors.js'
import URL from './sendDataURL.js'

async function sendData(formElement) {
  try {
    await fetch(URL, {
      method: 'POST',
      body: new FormData(formElement),
    })
    showPopup('Your message successfully sent')
    formElement.reset()
  } catch (e) {
    showPopup(e)
  }
}

function showPopup(message) {
  bodyElement.style.overflow = 'hidden'
  overlayElement.classList.remove('hide')
  popupElement.children[1].textContent = message
  popupElement.classList.remove('hide')
}

export default sendData