import { fetchImg } from './js/fetch.js'

const formRef = document.querySelector('#search-form');
formRef.addEventListener('submit', onFormSearch);

function onFormSearch(event) { 
    event.preventDefault();
    const request = event.currentTarget.searchQuery.value;
    fetchImg(request)
        .then(response => creatList(response))
        .catch(err => console.log(err));
        
}

// fetchCountries(event.target.value.trim())
// .then(data => {
//     if (data.length >= 10) {
//             Notify.info('Too many matches found. Please enter a more specific name.');
//     } else if (data.length > 1 && data.length < 10) {
//         countryInfoRef.innerHTML = '';
//         creatList(data);
//     } else if (data.length === 1) { 
//         creatCard(data[0]);
//     }
// })     
// .catch(err => { 
//     if (err.message === '404') { 
//             Notify.failure('Введите правильное название страны');
//     }
// })
// }

function creatList(list) { 
    
    //  for (const el of list) {      
    //     const listItem = document.createElement('li');
    //     countryListRef.append(listItem);
    //     listItem.classList.add('item_sm');
    //     listItem.innerHTML = `<img src='${el.flags.png}' width='50'></img><span>${el.name.official}</span>`;
    // }
}