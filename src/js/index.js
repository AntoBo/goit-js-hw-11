import '../sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyOptions } from './notifyOptions.js';
import getPictures from './fetch.js';
import * as Markup from './markup';

//get controls
const formSearch = document.querySelector('#search-form');
formSearch.addEventListener('submit', onSearchSubmit);

const btnLoadMore = document.querySelector('.load-more');
btnLoadMore.addEventListener('click', onLoadMoreClick);
const endResultsText = document.querySelector('.end-results');

//global vars
let query = '';
let page = 1;
let cardsCount = 0;

async function onSearchSubmit(event) {
  event.preventDefault();
  query = formSearch.searchQuery.value;

  //async part
  try {
    const data = await getPictures(query, 1);
    if (data.totalHits === 0) {
      Notify.warning('Давай краще пошукємо щось інше)', notifyOptions);
      throw new Error('data is 0 items');
    }

    cardsCount = data.hits.length;
    console.log('cardsCount is: ', cardsCount);
    // ifAllCardsDisplayed(data);
    if (cardsCount >= data.totalHits) {
      btnLoadMore.classList.add('hidden');
      endResultsText.classList.remove('hidden');
    } else {
      endResultsText.classList.add('hidden');
      btnLoadMore.classList.remove('hidden');
    }
    Notify.success(`Hooray! We found ${data.totalHits} images.`, notifyOptions);

    //draw data here
    Markup.newDraw(data);
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}

async function onLoadMoreClick(event) {
  page += 1;
  Markup.toggleOnLoadBtn(event.target);

  //async part
  try {
    const data = await getPictures(query, page);
    cardsCount += data.hits.length;
    console.log('cardsCount is: ', cardsCount);

    // ifAllCardsDisplayed(data);
    if (cardsCount >= data.totalHits) {
      btnLoadMore.classList.add('hidden');
      endResultsText.classList.remove('hidden');
    } else {
      endResultsText.classList.add('hidden');
    }

    //draw data here
    Markup.appendDraw(data);
    Markup.toggleOnLoadBtn(event.target);
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}

// function ifAllCardsDisplayed(data) {
//   console.log('data.totalHits is ', data.totalHits);
//   return cardsCount >= data.totalHits;
// }
