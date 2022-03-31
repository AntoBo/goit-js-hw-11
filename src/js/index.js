import '../sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyOptions } from './notifyOptions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getPictures from './fetch.js';
import * as Markup from './markup';

//get controls
const formSearch = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');
const endResultsText = document.querySelector('.end-results');

formSearch.addEventListener('submit', onSearchSubmit);
btnLoadMore.addEventListener('click', onLoadMoreClick);

let lightbox = new SimpleLightbox('.gallery a');

//global vars
let query = '';
let page = null;
let cardsCount = 0;

const btnContent = {
  LOAD_MORE: 'Load more!',
  LOADING: 'Loading...',
};

//click handlers
async function onSearchSubmit(event) {
  event.preventDefault();
  query = formSearch.searchQuery.value;

  //async part
  try {
    page = 1;

    //fetch data
    const data = await getPictures(query, page);

    //check if search result is not 0 and notify
    dataFoundAlert(data);

    //update UI controls
    cardsCount = data.hits.length;
    updateControls(data);

    //draw data here
    Markup.newDraw(data);

    //upd lightbox
    lightbox.refresh();
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}
async function onLoadMoreClick(event) {
  //async part
  try {
    toggleLoadBtn(event.target);
    page += 1;

    //fetch more data
    const data = await getPictures(query, page);

    //update UI controls
    cardsCount += data.hits.length;
    updateControls(data);

    //draw data here
    Markup.appendDraw(data);

    //upd lightbox
    lightbox.refresh();
    toggleLoadBtn(event.target);
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}

//other maintaining functions
function updateControls(data) {
  if (cardsCount >= data.totalHits) {
    btnLoadMore.classList.add('hidden');
    endResultsText.classList.remove('hidden');
  } else {
    endResultsText.classList.add('hidden');
    btnLoadMore.classList.remove('hidden');
  }
}
function toggleLoadBtn(button) {
  if (button.disabled) {
    button.disabled = false;
    button.textContent = btnContent.LOAD_MORE;
  } else {
    button.disabled = true;
    button.textContent = btnContent.LOADING;
  }
}
function dataFoundAlert(data) {
  if (data.totalHits === 0) {
    Notify.warning('Давай краще пошукємо щось інше)', notifyOptions);
    throw new Error('data is 0 items');
  } else {
    Notify.success(`Hooray! We found ${data.totalHits} images.`, notifyOptions);
  }
}
