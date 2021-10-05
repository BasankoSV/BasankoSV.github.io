import { btnSubmit, errorMsgName, errorMsgEmail } from './selectors.js'

const NAMEREGEXP = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
const EMAILREGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
let isValid = false
let nameValid = false
let emailValid = false

function formValidation(event) {
  const validation = (event, regExp, errorMsg) => {
    let target = event.target
    if (!regExp.test(target.value)) {
      errorMsg.style.display = 'block'
      isValid = false
    } else {
      errorMsg.style.display = 'none'
      isValid = true
    }
    if (target.value === '') errorMsg.style.display = 'none'
  }
  switch (event.target.id) {
    case 'name':
      validation(event, NAMEREGEXP, errorMsgName)
      nameValid = isValid
      break
    case 'email':
      validation(event, EMAILREGEXP, errorMsgEmail)
      emailValid = isValid
      break
  }
  nameValid && emailValid
    ? (btnSubmit.disabled = false)
    : (btnSubmit.disabled = true)
}

export default formValidation