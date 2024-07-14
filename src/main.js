import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchData } from "./js/pixabay-api.js";
import { renderCard } from "./js/render-functions.js";

const refs = {
  form: document.querySelector(".form_for_image"),
  inp: document.querySelector(".input"),
  button: document.querySelector(".button"),
  list: document.querySelector(".gallery"),
  loader: document.querySelector(".loader"),
  loadButton: document.querySelector(".load-button"),
  loadingText: document.querySelector(".loading-text"),
};

const params = {
  q: "",
  page: 1,
  pageSize: 15,
  maxPage: 0,
};

const hiddenClass = "is-hidden";

function hide(element) {
  element.classList.add(hiddenClass);
}

function show(element) {
  element.classList.remove(hiddenClass);
}

function disable(button) {
  button.disabled = true;
}

function enable(button) {
  button.disabled = false;
}

hide(refs.loadButton);
refs.loader.style.display = "none";

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener("submit", handler);

function handler(event) {
  event.preventDefault();
  params.page = 1;
  refs.list.innerHTML = "";
  const inputValue = refs.inp.value.trim().toLowerCase();
  if (inputValue === "") {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!'
    });
    return;
  }

  params.q = inputValue;
  fetchImages();
}

async function fetchImages() {
  showLoader();
  try {
    const data = await fetchData(params);
    hideLoader();
    if (data.hits.length > 0) {
      const markup = renderCard(data.hits);
      refs.list.innerHTML += markup;
      gallery.refresh();
      logGalleryItemDimensions(0.3);
      show(refs.loadButton);
      enable(refs.loadButton);
      refs.loadButton.addEventListener("click", handleLoad);
    } else {
      hide(refs.loadButton);
      iziToast.error({
        title: '',
        message: 'Sorry, there are no images matching your search query. Please try again!'
      });
    }
  } catch (error) {
    hideLoader();
    onFetchError(error);
  }
}

async function handleLoad() {
  params.page += 1;
  hide(refs.loadButton);
  showLoader();
  try {
    const data = await fetchData(params);
    const markup = renderCard(data.hits);
    refs.list.innerHTML += markup;
    gallery.refresh();
    logGalleryItemDimensions(3.4);
    show(refs.loadButton);
    hideLoader();
    params.maxPage = Math.ceil(data.totalHits / params.pageSize);
    if (params.page === params.maxPage) {
      hide(refs.loadButton);
      refs.loadButton.removeEventListener("click", handleLoad);
      iziToast.error({
        title: 'End of results',
        message: `We're sorry, but you've reached the end of search results.`
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Error during request: ${error}`
    });
  }
}

function logGalleryItemDimensions(quantity) {
  const galleryItem = document.querySelector(".gallery-item");
  if (galleryItem) {
    const rect = galleryItem.getBoundingClientRect();
    window.scrollBy(0, rect.height * quantity);
  }
}

function onFetchError(error) {
  console.error('Error fetching data:', error);
}

function showLoader() {
  refs.loader.style.display = "block";
}

function hideLoader() {
  refs.loader.style.display = "none";
}
