'use strict';

export class PixabayApi { 
    #BASE_URL = 'https://pixabay.com/api';
    #API_KEY = '31540043-77ba2a95f38c13f834341b2a6';

    constructor() {
        this.page = null;
        this.request = null;
    }
    
    fetchImg() {
        const searchParams = new URLSearchParams ({
            q: this.request,
            page: this.page,
            per_page: 40,
            orientation: 'horizontal',
            image_type: 'photo',
            safesearch: true,
            key: this.#API_KEY,
        });

        return fetch(`${this.#BASE_URL}/?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
    }
}