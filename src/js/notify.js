import { Notify } from 'notiflix/build/notiflix-notify-aio';

const notifyOptions = {
  opacity: 0.9,
  clickToClose: true,
  timeout: 2000,
  showOnlyTheLastOne: true,
  position: 'top-right',
  fontSize: '18px',
};

export default function dataFoundAlert(data) {
  if (data.totalHits === 0) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.)',
      notifyOptions,
    );
    throw new Error('data is 0 items');
  } else {
    Notify.success(`Hooray! We found ${data.totalHits} images.`, notifyOptions);
  }
}
