import { PixabayApi } from './js/fetch.js'
import createGalleryItem from './templates/gallery_item.hbs';

// console.log("template", template());



const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');

const pixabayApi = new PixabayApi();

formRef.addEventListener('submit', onFormSearch);

function onFormSearch(event) { 
    event.preventDefault();
    pixabayApi.request = event.target.elements.searchQuery.value;
    pixabayApi.fetchImg()
        .then(response => {
            // console.log(createGalleryItem(response.hits));
            galleryRef.innerHTML = createGalleryItem(response.hits);
        }).catch(err => console.log(err));
}

