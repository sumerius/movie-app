console.log('connected 2.2_loginvalidate.js');

// Log Errors status on button click
loginBtn.addEventListener('click', () => {
  console.log(loginErrors);
  console.log(allFalse(loginErrors));
});

// If errors prevent form submit
loginForm.addEventListener('submit', (e) => {
  if(!allFalse(loginErrors)) {
    e.preventDefault();
    validateEmail(loginEmail);
    return false;
  }
  loginBtn.disabled = true;
  loginBtn.style.pointerEvents = "none"; 
  loginBtn.style.opacity = 0.3;
  regLoader.innerHTML = `
    <?xml version="1.0" encoding="utf-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="60px" height="60px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <path d="M10 50A40 40 0 0 0 90 50A40 43 0 0 1 10 50" fill="#ececec" stroke="none">
      <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.5;360 50 51.5"></animateTransform>
    </path>
    <!-- [ldio] generated by https://loading.io/ --></svg>
  `;
});

// Validate email
loginEmail.addEventListener('focusout', (e) => {
  validateEmail(loginEmail);
});