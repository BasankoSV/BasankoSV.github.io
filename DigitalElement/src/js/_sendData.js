async function sendData(formElement) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: new FormData(formElement),
    })
    const data = await response
    showPopup('Your message successfully sent')
    formElement.reset()
  } catch (e) {
    showPopup(e)
  }
}
