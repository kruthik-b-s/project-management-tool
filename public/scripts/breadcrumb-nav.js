const cookies = document.cookie;
let accessToken;

const homeAnchor = document.querySelector('#home');

function redirectBreadcrumb(role) {
  if (role === 'user') {
    window.location.href = '/public/pages/home-user.html';
  } else if (role === 'admin') {
    window.location.href = '/public/pages/home-admin.html';
  } else if (role === 'superadmin') {
    window.location.href = '/public/pages/home-sa.html';
  }
}

if (cookies) {
  const accessTokenCookie = cookies
    .split('; ')
    .filter((cookie) => cookie.startsWith('accessToken'))[0];

  if (accessTokenCookie) {
    accessToken = accessTokenCookie.split('=')[1];

    fetch(`/api/auth/verify/${accessToken}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        homeAnchor.addEventListener('click', () => {
          redirectBreadcrumb(data.role);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    window.location.href = '/';
  }
} else {
  window.location.href = '/';
}
