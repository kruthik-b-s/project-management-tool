const homeAnchor = document.querySelector('#home');

homeAnchor.addEventListener('click', () => {
  window.location.href = '/api/auth/homePage';
});
