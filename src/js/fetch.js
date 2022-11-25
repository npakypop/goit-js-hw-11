'use strict';

export class PixabayApi { 

    #BASE_URL = 'https://pixabay.com/api';
    #API_KEY = '31540043-77ba2a95f38c13f834341b2a6';

    constructor() {
        this.page = 1;
    }
    
    fetchImg() {
        const searchParams = new URLSearchParams ({
            q: 'cats',
            page: 1,
            per_page: 40,
            orientation: 'horizontal',
            image_type: 'photo',
            safesearch: true,
            key: this.#API_KEY,
        });

        fetch(`${this.#BASE_URL}/?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
    }
}