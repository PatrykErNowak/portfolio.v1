// --------------------------------------------------------------
// DOM Elements
const form = document.querySelector('[data-js="contact-form"]');
const name = document.querySelector('[data-js="contact-form__name"]');
const email = document.querySelector('[data-js="contact-form__email"]');
const message = document.querySelector('[data-js="contact-form__message"]');
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

const successMsg = `              <div class="success-msg">
<p class="title">Thank you</p>
<p class="desc">Your message has been delivered.</p>
<svg class="icon">
  <use
    xlink:href="./img/icons/sprite.svg#icon-mail-checked"
  ></use>
</svg>
</div>`;

// disable default html validation
form.setAttribute('novalidate', true);

const renderErrorMsg = function (element, msg) {
  const parent = element.closest('.form__row');
  const html = `                
    <p class="error-msg">
    ${msg}
     </p>`;
  parent.insertAdjacentHTML('beforeend', html);
};

const removeErrorMsg = function (element) {
  const parent = element.closest('.form__row');
  const errorMsg = parent.querySelector('.error-msg');
  if (errorMsg) errorMsg.remove();
};

const LoadingState = function (addState) {
  form.classList[addState === true ? 'add' : 'remove']('loading');
  submitBtn.disabled = addState;
};

const renderSuccessMessage = function () {
  const html = `              
    <div class="success-msg">
      <p class="title">Thank you</p>
      <p class="desc">Your message has been delivered.</p>
      <svg class="icon">
        <use
          xlink:href="./img/icons/sprite.svg#icon-mail-checked"
        ></use>
      </svg>
    </div>`;

  form.classList.add('success');
  form.insertAdjacentHTML('beforeend', html);
};

const checkRequiredFields = function () {
  let isError = false;

  if (!name.checkValidity()) {
    isError = true;
    renderErrorMsg(name, ErrorMsg.fullname);
  } else {
    removeErrorMsg(name);
  }
  if (!email.checkValidity()) {
    isError = true;
    renderErrorMsg(email, ErrorMsg.email);
  } else {
    removeErrorMsg(email);
  }
  if (!message.checkValidity()) {
    isError = true;
    renderErrorMsg(message, ErrorMsg.message);
  } else {
    removeErrorMsg(message);
  }

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

    LoadingState(true);

    try {
      const res = await makeRequest(formData);
      LoadingState(false);
      renderSuccessMessage();
    } catch (error) {
      console.error(error);
    }
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm();
});
