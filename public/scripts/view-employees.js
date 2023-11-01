document.title = 'Project Management Tool | View Employees';

const paginationPages = document.querySelector('#pages');
const totalPages = paginationPages.textContent;
paginationPages.innerHTML = '';

function getCurrentPage() {
  const queryParams = window.location.href.split('?')[1];
  const pageNumberParam = queryParams.split('&')[0];
  const pageNumber = pageNumberParam.split('=')[1];
  return pageNumber;
}

let currentPage = getCurrentPage();

function createPages(totalPages) {
  paginationPages.innerHTML += `<li class="page-item disabled" id="previous-button"><a class="page-link" href="/api/employee/viewAllEmployees?page=${
    currentPage - 1
  }&perPage=8">Previous</a></li>`;

  for (let i = 1; i <= totalPages; i++) {
    const listElement = document.createElement('li');
    listElement.className = 'page-item';

    const listLink = document.createElement('a');
    listLink.className = 'page-link';
    listLink.href = `/api/employee/viewAllEmployees?page=${i}&perPage=8`;
    listLink.textContent = i;

    listElement.appendChild(listLink);
    paginationPages.appendChild(listElement);
  }

  const nextPage = parseInt(currentPage) + 1;
  paginationPages.innerHTML += `<li class="page-item disabled" id="next-button"><a class="page-link" href="/api/employee/viewAllEmployees?page=${nextPage}&perPage=8">Next</a></li>`;
}

function updatePreviousAndNextButtons() {
  const previousButton = document.querySelector('#previous-button');
  const nextButton = document.querySelector('#next-button');

  if (totalPages > 1) {
    if (currentPage >= 2) {
      console.log(currentPage);
      previousButton.classList.remove('disabled');
    }
    if (currentPage != totalPages) nextButton.classList.remove('disabled');
  }
}

createPages(totalPages);
updatePreviousAndNextButtons();
