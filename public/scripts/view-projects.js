const filterBy = document.querySelector('#table-filter');
const tableBody = document.querySelector('#table-body');

const rowArray = tableBody.innerHTML.split('</tr>');

window.onload = () => {
  tableBody.innerHTML = rowArray
    .filter((row) => {
      if (new RegExp('on-going').test(row)) {
        return row;
      }
    })
    .join('</tr>');
};

filterBy.addEventListener('change', (e) => {
  if (e.target.value !== 'all') {
    tableBody.innerHTML = rowArray
      .filter((row) => {
        if (new RegExp(e.target.value).test(row)) {
          return row;
        }
      })
      .join('</tr>');
  } else {
    tableBody.innerHTML = rowArray.join('</tr>');
  }
});
