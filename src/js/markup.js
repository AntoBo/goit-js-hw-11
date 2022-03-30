import cardTemplate from '../hbs/card.hbs';

const btnContent = {
  LOAD_MORE: 'Load more!',
  LOADING: 'Loading...',
};

const galleryEl = document.querySelector('.gallery');

export function newDraw(data) {
  const markup = data.hits.map(cardTemplate);
  galleryEl.innerHTML = markup.join('');
}

export function appendDraw(data) {
  const markup = data.hits.map(cardTemplate);
  galleryEl.insertAdjacentHTML('beforeend', markup.join(''));
}

export function toggleOnLoadBtn(button) {
  if (button.disabled) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }

  if (button.textContent === btnContent.LOAD_MORE) {
    button.textContent = btnContent.LOADING;
  } else {
    button.textContent = btnContent.LOAD_MORE;
  }
}

// export function ifAllCardsDisplayed(data) {
//   console.log('data.totalHits is ', data.totalHits);
//   if (cardsCount >= data.totalHits) {
//     endResultsText.classList.toggle('hidden');
//   }
// }
