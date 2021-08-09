import {errorMsgEmail, errorMsgPhone, btnSubmit} from './elements.js';

const EMAILREGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
const PHONEREGEXP = /^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/

let isValid = false
let phoneValid = false
let emailValid = false

function formHandler(event) {
  const validation = (event, regExp, errorMsg) => {
    let target = event.target
    if (!regExp.test(target.value)) {
      errorMsg.style.display = "block"
      isValid = false
    } else {
      errorMsg.style.display = "none"
      isValid = true
    }
    if (target.value === '') errorMsg.style.display = "none"
  }
  switch (event.target.id) {
    case 'email':
      validation(event, EMAILREGEXP, errorMsgEmail)
      emailValid = isValid
      break
    case 'phone':
      validation(event, PHONEREGEXP, errorMsgPhone)
      phoneValid = isValid
      break
  }
  emailValid && phoneValid
    ? (btnSubmit.disabled = false)
    : (btnSubmit.disabled = true)
}
export default formHandler