const cookies = document.cookie;
let accessToken;

// let role;
// let userPages = ['home-user.html'];
// let adminPages = ['home-admin.html'];
// let superAdminPages = ['home-sa.html'];

// if (userPages.includes(window.location.href.split('/')[-1])) {
//   role = 'user';
// } else if (adminPages.includes(window.location.href.split('/')[-1])) {
//   role = 'admin';
// } else if (superAdminPages.includes(window.location.href.split('/')[-1])) {
//   role = 'superadmin';
// }

if (cookies) {
  const accessTokenCookie = cookies
    .split('; ')
    .filter((cookie) => cookie.startsWith('accessToken'))[0];

  if (accessTokenCookie) {
    accessToken = accessTokenCookie.split('=')[1];

    fetch(`/api/auth/verify/${accessToken}`)
      .then((response) => {
        return response.json();
        // console.log(response.json());
      })
      .then((data) => {
        console.log(data);
        // console.log(data.role, role);
        // if (data.role !== role) {
        //   window.history.back();
        // }
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
