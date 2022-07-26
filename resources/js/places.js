import debounce from 'lodash.debounce';

const placeInput = document.querySelector('#place-input');
const placeCodeHidden = document.querySelector('#place-code');
const placeSuggestions = document.querySelector('#place-suggestions');

placeInput.addEventListener('input', debounce(function() {
    if (this.value!== '') {
        fetch(`weatherapi/find/${this.value}`)
        .then(res => res.json())
        .then(places => {
            placeSuggestions.innerHTML = '';

            for (let place of places) {
                let link = document.createElement('a');
                link.style.cursor = 'pointer';
                

                link.classList.add('list-group-item', 'list-group-item-action', 'fs-nav-item');
                link.innerText = `${place.name} (${place.administrativeDivision})`;
                placeSuggestions.appendChild(link);
                link.addEventListener('click', () => {
                    window.location = `/weatherapi/forecast/${place.code}`;
                });
            }
        }); 
    }
    else {
        placeSuggestions.innerHTML = '';   
    }
}, 500));