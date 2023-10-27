const filterBy = document.querySelector('#table-filter');

filterBy.addEventListener('change', (e) => {
  const selectVaue = e.target.value;

  if (selectVaue === 'on-going') {
    window.location.href =
      '/api/project/projects?status=on-going&page=1&perPage=5';
  } else if (selectVaue === 'completed') {
    window.location.href =
      '/api/project/projects?status=completed&page=1&perPage=5';
  } else if (selectVaue === 'all') {
    window.location.href = '/api/project/projects?status=all&page=1&perPage=5';
  }
});

const paginationPages = document.querySelector('#pages');
const totalPages = paginationPages.textContent;
paginationPages.innerHTML = '';

const projectStatus = filterBy.value;

function getCurrentPage() {
  const queryParams = window.location.href.split('?')[1];
  const pageNumberParam = queryParams.split('&')[1];
  const pageNumber = pageNumberParam.split('=')[1];
  return pageNumber;
}

let currentPage = getCurrentPage();

function createPages(totalPages) {
  paginationPages.innerHTML += `<li class="page-item disabled" id="previous-button"><a class="page-link" href="/api/project/projects?status=${projectStatus}&page=${
    currentPage - 1
  }&perPage=5">Previous</a></li>`;

  for (let i = 1; i <= totalPages; i++) {
    const listElement = document.createElement('li');
    listElement.className = 'page-item';

    const listLink = document.createElement('a');
    listLink.className = 'page-link';
    listLink.href = `/api/project/projects?status=${projectStatus}&page=${i}&perPage=5`;
    listLink.textContent = i;

    listElement.appendChild(listLink);
    paginationPages.appendChild(listElement);
  }

  const nextPage = parseInt(currentPage) + 1;
  paginationPages.innerHTML += `<li class="page-item disabled" id="next-button"><a class="page-link" href="/api/project/projects?status=${projectStatus}&page=${nextPage}&perPage=5">Next</a></li>`;
}

function updatePreviousAndNextButtons() {
  const previousButton = document.querySelector('#previous-button');
  const nextButton = document.querySelector('#next-button');

  if (totalPages > 1) {
    if (currentPage >= 2) {
      previousButton.classList.remove('disabled');
    }
    if (currentPage != totalPages) nextButton.classList.remove('disabled');
  }
}

createPages(totalPages);
updatePreviousAndNextButtons();
