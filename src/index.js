import './styles.css';
import PixabayService from './js/apiService';
import hitsTpl from './templates/templates.hbs'
import { onOpenModal } from './js/modal';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const pixService = new PixabayService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onOpenModal);

function onSearch(e) {
    e.preventDefault();

    pixService.query = e.currentTarget.elements.query.value;
    refs.loadMoreBtn.classList.add('is-hidden');
    pixService.resetPage();
    clearHits();
    pixService.fetchHits().then(hits => {
        if (hits.length > 0) {
        appendHitsMarkup(hits);
        refs.loadMoreBtn.classList.remove('is-hidden');
    }
    });
}

async function onLoadMore() {
    try {
        const response = await pixService.fetchHits();
        console.log(response);

        appendHitsMarkup(response);
        scrollElements()
    } catch (error) {
        console.log('Error');
       }
   }

//    
// function onLoadMore() {
//     pixService.fetchHits().then(appendHitsMarkup).then(scrollElements);
// }

function appendHitsMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));
}

function clearHits(){
    refs.gallery.innerHTML = '';
}

function scrollElements() {
    window.scrollTo({
  top: 1000,
  behavior: 'smooth'
});
}


