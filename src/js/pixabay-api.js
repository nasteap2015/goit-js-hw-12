'use strict';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  gallery,
  input,
  loader,
  pages,
  requestedValue,
  loadButton,
} from '../main.js';

let limitOfPages = 0;

export async function fetchImg() {
  loadButton.hidden = true;
  loader.hidden = false;
  gallery.innerHTML = '';
  const options = new URLSearchParams({
    key: '43152818-b9b3fa9adc16b8bb91486a66f',
    q: requestedValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: '15',
    page: pages,
  });
  const response = await axios.get(`https://pixabay.com/api/?${options}`);
  limitOfPages = response.data.totalHits % options.get('per_page');
  console.log(limitOfPages);
  return response.data;
}

export async function fetchMoreImg() {
  const options = new URLSearchParams({
    key: '43152818-b9b3fa9adc16b8bb91486a66f',
    q: requestedValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: '15',
    page: pages,
  });
  if (pages > limitOfPages) {
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      backgroundColor: '#ef4040',
      progressBar: false,
      messageColor: '#fafafb',
    });
    loadButton.hidden = true;
    return;
  } else {
    const response = await axios.get(`https://pixabay.com/api/?${options}`);
    return response.data;
  }
}