import { PixabayApi } from './js/fetch.js'

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');

const pixabayApi = new PixabayApi();

formRef.addEventListener('submit', onFormSearch);

function onFormSearch(event) { 
    event.preventDefault();
    pixabayApi.request = event.target.elements.searchQuery.value;
    pixabayApi.fetchImg()
        .then(response => {
            console.log(response);
            // galleryRef.innerHTML = '';

        }).catch(err => console.log(err));
}
