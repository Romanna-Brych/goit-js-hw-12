import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/iziToast-custom.css';
import spriteUrl from './img/sprite.svg';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  loadBtnEl,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', handleSubmit);
loadBtnEl.addEventListener('click', onLoadMore);

let inputValue = null;
let page = 1;
let loadedImages = 0;

async function handleSubmit(event) {
  event.preventDefault();
  clearGallery(galleryEl);
  hideLoadMoreButton();

  inputValue = inputEl.value.trim();
  if (!inputValue) {
    const iziToastErrorEmpty = { ...iziToastError };
    iziToastErrorEmpty.message = 'Please enter your search query';
    iziToast.error(iziToastErrorEmpty);

    return;
  }
  showLoader();
  galleryEl.style.opacity = '0';

  try {
    page = 1;
    const { hits, totalHits } = await getImagesByQuery(inputValue, page);
    loadedImages = hits.length;
    if (hits.length === 0) {
      iziToast.error(iziToastError);
      return;
    } else {
      createGallery(galleryEl, hits);
      galleryEl.style.opacity = '1';
      if (totalHits > loadedImages) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    iziToastErrorCatch(error);
  } finally {
    hideLoader();
    event.target.reset();
  }
}

async function onLoadMore() {
  loadBtnEl.disabled = true;
  showLoader();
  try {
    page += 1;
    const { hits, totalHits } = await getImagesByQuery(inputValue, page);
    loadedImages += hits.length;
    createGallery(galleryEl, hits);
    scrollGallery();
    if (loadedImages >= totalHits) {
      const iziToastWarning = { ...iziToastError };
      iziToastWarning.message =
        "We're sorry, but you've reached the end of search results.";
      iziToastWarning.backgroundColor = '#859ceeff';
      iziToast.error(iziToastWarning);
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToastErrorCatch(error);
  } finally {
    hideLoader();
    loadBtnEl.disabled = false;
  }
}

function scrollGallery() {
  const cardEl = document.querySelector('.gallery-item');
  const cardHeight = cardEl.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    left: 0,
    behavior: 'smooth',
  });
}

function iziToastErrorCatch(error) {
  const errorCatch = { ...iziToastError };
  errorCatch.message = error.message;
  iziToast.error(errorCatch);
}

const iziToastError = {
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  position: 'topRight',
  backgroundColor: ' #ef4040',
  titleColor: '#fff',
  messageColor: '#fff',
  icon: ' ',
  close: false,
  maxWidth: 435,
  class: 'custom-toast',
  onOpening: function (instance, toast) {
    const iconEl = toast.querySelector('.iziToast-icon');
    if (iconEl) {
      iconEl.innerHTML = `
    <svg class="icon-custom">
      <use href="${spriteUrl}#icon-bi_x-octagon"></use>
    </svg>`;
    }

    const customClose = document.createElement('button');
    customClose.classList.add('iziToast-close-custom');
    customClose.innerHTML = `
    <svg class="icon-custom-close">
      <use href="${spriteUrl}#icon-Vector-3"></use>
    </svg>`;
    customClose.addEventListener('click', () => {
      iziToast.hide({}, toast);
    });
    toast.appendChild(customClose);
  },
};
