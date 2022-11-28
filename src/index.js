import { PixabayApi } from './js/fetch.js'
import createGalleryItem from './templates/gallery_item.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-more');

const pixabayApi = new PixabayApi();


formRef.addEventListener('submit', onSearchBtn);

const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    enableKeyboard: true,
});

loadMoreBtn.addEventListener('click', onLoadBtn);


async function onSearchBtn(event) { 
    event.preventDefault();
    pixabayApi.page = 1;
    pixabayApi.request = event.target.elements.searchQuery.value.trim();

    if (pixabayApi.request === '') { 
        galleryRef.innerHTML = '';
        loadMoreBtn.classList.add('is-hidden');
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }

    try {
        const response = await pixabayApi.fetchImg();
        const { data } = response;

        // if (pixabayApi.request === '') {
        //     galleryRef.innerHTML = '';
        //     return;
        //  }

        if (data.hits.length === 0) { 
            galleryRef.innerHTML = '';
            loadMoreBtn.classList.add('is-hidden');
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

        galleryRef.innerHTML = createGalleryItem(data.hits);
        
        if (Math.ceil(data.totalHits / pixabayApi.per_page) === 1) { 
            Notify.info("We're sorry, but you've reached the end of search results.")
            loadMoreBtn.classList.add('is-hidden');
            return;
        }

        Notify.info(`Hooray! We found ${data.totalHits} images.`);

        loadMoreBtn.classList.remove('is-hidden');
    } catch (err) { 
        console.log(err);
    }
}

async function onLoadBtn() { 
    pixabayApi.page += 1;
    
    try {
        const response = await pixabayApi.fetchImg();
        const { data } = response;

        galleryRef.insertAdjacentHTML('beforeend', createGalleryItem(data.hits));
        
        if (pixabayApi.page === Math.round(data.totalHits / pixabayApi.per_page)) { 
            Notify.info("We're sorry, but you've reached the end of search results.")
            loadMoreBtn.classList.add('is-hidden');
            return;
        }
    } catch (err) {
        console.log(err)
    }
    
}
//======================================================Using .then().Catch()===============================================================================
// function onSearchBtn(event) { 
//     event.preventDefault();
//     pixabayApi.page = 1;
//     pixabayApi.request = event.target.elements.searchQuery.value;

//     pixabayApi.fetchImg()
//         .then(response => {
//             const { data } = response;

//             if (data.hits.length === 0) { 
//                 Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//                 return;
//             }

//             galleryRef.innerHTML = createGalleryItem(data.hits);
            
//             if (Math.ceil(data.totalHits / 40) === 1) { 
//                 Notify.info("We're sorry, but you've reached the end of search results.")
//                 loadMoreBtn.classList.add('is-hidden');
//                 return;
//             }

//             loadMoreBtn.classList.remove('is-hidden');
//         })
//         .catch(err => console.log(err));
// }
// 
// function onLoadBtn() { 
//     pixabayApi.page += 1;
    
//     pixabayApi.fetchImg()
//         .then(response => {
//             const { data } = response;

//             galleryRef.insertAdjacentHTML('beforeend', createGalleryItem(data.hits));
            
//             if (pixabayApi.page === Math.round(data.totalHits / 40)) { 
//                 Notify.info("We're sorry, but you've reached the end of search results.")
//                 loadMoreBtn.classList.add('is-hidden');
//                 return;
//             }
//         })
//         .catch(err => console.log(err));
// }