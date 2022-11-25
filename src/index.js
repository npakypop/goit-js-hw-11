import { PixabayApi } from './js/fetch.js'
import createGalleryItem from './templates/gallery_item.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-more');

const pixabayApi = new PixabayApi();

formRef.addEventListener('submit', onFormSearch);
loadMoreBtn.addEventListener('click', onLoadBtn);


function onFormSearch(event) { 
    event.preventDefault();
    pixabayApi.page = 1;
    pixabayApi.request = event.target.elements.searchQuery.value;

    pixabayApi.fetchImg()
        .then(response => {
            if (response.hits.length === 0) { 
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                return;
            }

            galleryRef.innerHTML = createGalleryItem(response.hits);
            
            if (Math.ceil(response.totalHits / 40) === 1) { 
                Notify.info("We're sorry, but you've reached the end of search results.")
                loadMoreBtn.classList.add('is-hidden');
                return;
            }

            loadMoreBtn.classList.remove('is-hidden');
        })
        .catch(err => console.log(err));
}

function onLoadBtn() { 
    pixabayApi.page += 1;
    
    pixabayApi.fetchImg()
        .then(response => {
            galleryRef.insertAdjacentHTML('beforeend', createGalleryItem(response.hits));
            
            if (pixabayApi.page === Math.round(response.totalHits / 40)) { 
                Notify.info("We're sorry, but you've reached the end of search results.")
                loadMoreBtn.classList.add('is-hidden');
                return;
            }
        })
        .catch(err => console.log(err));
}