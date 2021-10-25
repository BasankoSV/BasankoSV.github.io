(function (factory) {
  typeof define === 'function' && define.amd ? define('script', factory) :
  factory();
}((function () { 'use strict';

  const bodyElement = document.querySelector('body');
  const btnModal = document.querySelector('[data-open-modal]');
  const buttonsCloseWindow = document.querySelectorAll('[data-close-window]');
  const modalElement = document.querySelector('.modal');
  const overlayElement = document.querySelector('.overlay');
  const popupElement = document.querySelector('.popup');
  const formElement = document.querySelector('.form');
  const errorMsgName = formElement.querySelector('.name-error');
  const errorMsgEmail = formElement.querySelector('.email-error');
  const btnSubmit = formElement.querySelector('[data-button-submit]');

  const URL = 'https://jsonplaceholder.typicode.com/posts';

  async function sendData(formElement) {
    try {
      await fetch(URL, {
        method: 'POST',
        body: new FormData(formElement)
      });
      showPopup('Your message successfully sent');
      formElement.reset();
    } catch (e) {
      showPopup(e);
    }
  }

  function showPopup(message) {
    bodyElement.style.overflow = 'hidden';
    overlayElement.classList.remove('hide');
    popupElement.children[1].textContent = message;
    popupElement.classList.remove('hide');
  }

  const NAMEREGEXP = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
  const EMAILREGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  let isValid = false;
  let nameValid = false;
  let emailValid = false;

  function formValidation(event) {
    const validation = (event, regExp, errorMsg) => {
      let target = event.target;

      if (!regExp.test(target.value)) {
        errorMsg.style.display = 'block';
        isValid = false;
      } else {
        errorMsg.style.display = 'none';
        isValid = true;
      }

      if (target.value === '') errorMsg.style.display = 'none';
    };

    switch (event.target.id) {
      case 'name':
        validation(event, NAMEREGEXP, errorMsgName);
        nameValid = isValid;
        break;

      case 'email':
        validation(event, EMAILREGEXP, errorMsgEmail);
        emailValid = isValid;
        break;
    }

    nameValid && emailValid ? btnSubmit.disabled = false : btnSubmit.disabled = true;
  }

  const openModal = () => {
    bodyElement.style.overflow = 'hidden';
    overlayElement.classList.remove('hide');
    modalElement.classList.remove('hide');
    btnSubmit.disabled = true;
  };

  const closeWindow = () => {
    bodyElement.style.overflow = 'auto';
    overlayElement.classList.add('hide');
    !modalElement.classList.contains('hide') && modalElement.classList.add('hide');
    !popupElement.classList.contains('hide') && popupElement.classList.add('hide');
  };

  const formSubmit = event => {
    event.preventDefault();
    closeWindow();
    sendData(formElement);
  };

  btnModal.addEventListener('click', openModal);
  overlayElement.addEventListener('click', closeWindow);
  formElement.addEventListener('input', formValidation);
  formElement.addEventListener('submit', formSubmit);
  buttonsCloseWindow.forEach(button => button.addEventListener('click', closeWindow));

})));
