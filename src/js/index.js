import '../sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import dataFoundAlert from './notify.js';
import getPictures from './fetch.js';
import * as Markup from './markup';

//get controls
const el = {
  formSearch: document.querySelector('#search-form'),
  endResultsText: document.querySelector('.end-results'),
  newSearchLink: document.querySelector('.new-search'),
};
const loadMoreEl = {
  btn: document.querySelector('.load-more'),
  content: {
    LOAD_MORE: 'Load more!',
    LOADING: 'Loading...',
  },
  toggle() {
    if (this.btn.disabled) {
      this.btn.disabled = false;
      this.btn.textContent = this.content.LOAD_MORE;
    } else {
      this.btn.disabled = true;
      this.btn.textContent = this.content.LOADING;
    }
  },
};
let lightbox = new SimpleLightbox('.gallery a');

//listeners
el.formSearch.addEventListener('submit', onSearchSubmit);
el.newSearchLink.addEventListener('click', onNewSearchLinkClick);
loadMoreEl.btn.addEventListener('click', onLoadMoreClick);

//search vars
const search = {
  query: '',
  page: null,
  cardsCount: 0,
};

//click handlers
//search
async function onSearchSubmit(event) {
  event.preventDefault();
  search.query = el.formSearch.searchQuery.value;

  //async part
  try {
    search.page = 1;

    //fetch data
    const data = await getPictures(search.query, search.page);

    //check if search result is not 0 and notify
    dataFoundAlert(data);

    //update UI controls
    search.cardsCount = data.hits.length;
    updateControls(data);

    //draw data here
    Markup.newDraw(data);

    //upd lightbox
    lightbox.refresh();
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}
//load more
async function onLoadMoreClick(event) {
  // window.scrollBy(0, -window.innerHeight);

  //async part
  try {
    loadMoreEl.toggle();
    search.page += 1;

    //fetch more data
    const data = await getPictures(search.query, search.page);

    //update UI controls
    search.cardsCount += data.hits.length;
    updateControls(data);

    //draw data here
    Markup.appendDraw(data);

    //upd lightbox
    lightbox.refresh();
    loadMoreEl.toggle();
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}
//scroll up and focus on input
function onNewSearchLinkClick(event) {
  event.preventDefault();
  el.formSearch.searchQuery.focus({ preventScroll: true });
  el.formSearch.reset();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

//other maintaining functions
function updateControls(data) {
  if (search.cardsCount >= data.totalHits) {
    loadMoreEl.btn.classList.add('hidden');
    el.endResultsText.classList.remove('hidden');
  } else {
    el.endResultsText.classList.add('hidden');
    loadMoreEl.btn.classList.remove('hidden');
  }
}
