import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');
const loaderEl = document.querySelector('.loader');
export const loadBtnEl = document.querySelector('.load-btn');

export function createGallery(container, images) {
  const markup = [...images]
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" /></a>
    <ul class="content-list">
    <li class="content-item">
    <h3 class="content-header">Likes</h3>
    <p class="content-value">${likes}</p> 
    </li>
    <li class="content-item">
    <h3 class="content-header">Views</h3>
    <p class="content-value">${views}</p>
    </li>
    <li class="content-item">
    <h3 class="content-header">Comments</h3>
    <p class="content-value">${comments}</p>
    </li>
    <li class="content-item">
    <h3 class="content-header">Downloads</h3>
    <p class="content-value">${downloads}</p>
    </li>
    </ul>
    </li>
`
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery(container) {
  container.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadBtnEl.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadBtnEl.classList.add('is-hidden');
}
