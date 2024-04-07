'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImg, fetchMoreImg, limitOfPages } from './js/pixabay-api.js';
import { renderImg } from './js/render-functions.js';

const form = document.querySelector('form');
export const input = document.querySelector('input');
export const gallery = document.querySelector('.gallery');
export const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionsDelay: 250,
});
export const loader = document.querySelector('.loader');
export let pages = 1;
export let requestedValue = '';
export const loadButton = document.querySelector('.load-more-btn');
const element = document.querySelector('.gallery');
loadButton.setAttribute('hidden', true);
loader.setAttribute('hidden', true);

form.addEventListener('submit', async event => {
  event.preventDefault();
  pages = 1;
  requestedValue = input.value;
  if (event.target.elements.keyword.value === '') {
    iziToast.error({
      message: 'Please enter key word',
      position: 'topRight',
      backgroundColor: '#ef4040',
      progressBar: false,
      messageColor: '#fafafb',
    });
    return;
  }
  const img = await fetchImg();
  renderImg(img);
  ScrollBy();
  form.reset();
  if (pages >= limitOfPages) {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      progressBar: false,
    });
    loadButton.hidden = true;
  } else {
    loadButton.hidden = false;
  }
  pages += 1;
});

loadButton.addEventListener('click', async event => {
  event.preventDefault();
  const img = await fetchMoreImg();
  renderImg(img);
  ScrollBy();
  pages += 1;
});

function ScrollBy() {
  const elementHeight = element.firstChild.getBoundingClientRect().height;
  scrollBy({
    top: elementHeight * 2,
    behavior: 'smooth',
  });
}
