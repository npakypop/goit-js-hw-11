const BASE_URL = 'https://pixabay.com/api';

export function fetchImg(request) {   
    return fetch(`${BASE_URL}/?key=31540043-77ba2a95f38c13f834341b2a6&q=${request}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
}