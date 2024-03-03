import icons from '../../img/icons/sprite.svg';

// --------------------------------------------------------------
// DOM Elements
const form = document.querySelector('[data-js="contact-form"]');
const inputs = form.querySelectorAll('[data-js="contact-form__input"]');
const submitBtn = document.querySelector(
  '[data-js="contact-form__submit-btn"]',
);
// -------------------------------------------------------------
const emailURL = '/'; // "/" - url for netlify forms

const ErrorMsg = {
  fullname: 'The Full name should contain at least 3 characters.',
  email: 'Please enter a correct email address.',
  message: 'The message should contain at least 10 characters.',
};

// --------------------------------------------------------------

// disable default html validation
form.setAttribute('novalidate', true);

/**
 * Renders 'error' under the specified DOM Element with specified message.
 * @param {object} element - Input DOM Element
 * @param {string} msg - Text string to be displayed
 */
const renderInputErrorMsg = function (element, msg) {
  const parent = element.closest('.form__row');
  const html = `                
    <p class="error-msg">
    ${msg}
     </p>`;
  parent.insertAdjacentHTML('beforeend', html);
};

/**
 * Remove error message under the specified DOM Element.
 * @param {object} element - Input DOM Element
 */
const removeInputErrorMsg = function (element) {
  const parent = element.closest('.form__row');
  const errorMsg = parent.querySelector('.error-msg');
  if (errorMsg) errorMsg.remove();
};

// Adding or removing loading state from FORM depends on passed parameter
/**
 * Render or remove loading spinner depends on state
 * @param {boolean} addState - true = add loading spinner; false = remove loading spinner
 */
const loadingState = function (addState) {
  form.classList[addState === true ? 'add' : 'remove']('loading');
  submitBtn.disabled = addState;
};

/**
 * Render Success message or Error Message for entire form.
 * @param {string} msgType - accepts two strings: 'success' or 'error'
 */
const renderFormMessage = function (msgType) {
  const className = msgType;
  const title = msgType === 'success' ? 'Thank you' : 'Error';
  const msg =
    msgType === 'success'
      ? 'Your message has been delivered.'
      : 'Sorry, something went wrong. Please try again later.';
  const icon = msgType === 'success' ? 'checked' : 'error';

  const html = `              
    <div class="message--${className}">
      <p class="title">${title}</p>
      <p class="desc">${msg}</p>
      <svg class="icon">
        <use
          xlink:href="${icons}#icon-mail-${icon}"
        ></use>
      </svg>
    </div>`;

  form.classList.add('form-message');
  form.insertAdjacentHTML('beforeend', html);
};

const checkRequiredFields = function () {
  let isError = false;

  inputs.forEach((el) => {
    removeInputErrorMsg(el);

    if (!el.checkValidity()) {
      isError = true;
      renderInputErrorMsg(el, ErrorMsg[el.name]);
    }
  });

  return !isError;
};

const makeRequest = async function (data) {
  const res = await fetch(emailURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  });
  if (res.ok) return res;
  throw new Error(`${res.status}: ${res.statusText}`);
};

const submitForm = async function () {
  let isFormValid = checkRequiredFields();

  if (isFormValid) {
    const formData = new FormData(form);

    loadingState(true);

    try {
      await makeRequest(formData);
      renderFormMessage('success');
      loadingState(false);
    } catch (error) {
      renderFormMessage('error');
    }
  }
};

export const formHandler = function () {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });
};
