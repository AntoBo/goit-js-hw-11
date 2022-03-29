import getPictures from './fetch.js';

//get controls
const formSearch = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');

formSearch.addEventListener('submit', onSearchSubmit);
btnLoadMore.addEventListener('click', onLoadMoreClick);

async function onSearchSubmit(event) {
  event.preventDefault();
  const query = formSearch.searchQuery.value;
  console.log('query is: ', query);

  //async part
  try {
    const data = await getPictures(query);
    console.log('data is: ', data);
    //draw data here!
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}
function onLoadMoreClick(event) {}
