/* DOM things & others */

let offset = 1;
let limit = 17;
const charaContainer = document.querySelector(".container-character");
const locationContainer = document.querySelector(".container-location");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

/* Character Functions */

function showAllCharacters(offset, limit) {
    for (let x = offset; x <= offset + limit; x++) {
        callCharacter(x);
    }
}

function callCharacter(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(res => printCharacter(res))
        .catch(err => console.log(err))
}

function printCharacter(character) {
    const character_card = viewCharacter(character);
    const character_modal = viewModalCharacter(character);
    const card = document.createRange().createContextualFragment(character_card);
    const modal = document.createRange().createContextualFragment(character_modal)
    const container = document.querySelector('.container-character');
    container.append(card);
    container.append(modal);
}


function viewCharacter(character) {
    return `
    <div class="card" id="${character.id}">
        <div class="img-container">
            <img class="char-img ${character.status}" src="${character.image}" alt="character-img">
        </div>
        <h1>${character.name}</h1>
        <button id="btn-more-info" onclick="showInfo(${character.id})">More info</button>
    </div>
`
}

function viewModalCharacter(character) {
    return `
    <div class="modal-container" id="modal-${character.id}">
    <button onclick="hideInfo(${character.id})">&times;</button>
       <div class="modal-card">
            <div class="img-container">
                <img src="${character.image}" alt="character-img" class="char-img ${character.status} modal-img">
            </div>
            <h1>${character.name}</h1>
            <ul>
                <li>
                    <p class="bold-information">Specie</p>
                    <p>${character.species}</p>
                </li>
                <li>
                    <p class="bold-information">Gender</p>
                    <p>${character.gender}</p>
                </li>
                <li>
                    <p class="bold-information">Origin</p>
                    <p>${character.origin.name}</p>
                </li>
                <li>
                    <p class="bold-information">Location</p>
                    <p>${character.location.name}</p>
                </li>
            </ul>
       </div>
    </div>
`
}

/* Locations Functions */

function showAllLocations(offset, limit) {
    for (let x = offset; x <= offset + limit; x++) {
        callLocation(x);
    }
}

function callLocation(id) {
    fetch(`https://rickandmortyapi.com/api/location/${id}`)
        .then(res => res.json())
        .then(res => printLocation(res))
        .catch(err => console.log(err))
}

function printLocation(location) {
    const location_card = viewLocation(location);
    const location_modal = viewModalLocation(location);
    const card = document.createRange().createContextualFragment(location_card);
    const modal = document.createRange().createContextualFragment(location_modal)
    const container = document.querySelector('.container-location');
    container.append(card);
    container.append(modal);
}


function viewLocation(location) {
    return `
    <div class="card" id="${location.id}">
        <h1 id="location-h1">${location.name}</h1>
        <button id="btn-more-info" onclick="showInfo(${location.id})">More info</button>
    </div>
`
}

function viewModalLocation(location) {
    return `
    <div class="modal-container" id="modal-${location.id}">
    <button onclick="hideInfo(${location.id})">&times;</button>
       <div class="modal-card">
            <h1>${location.name}</h1>
            <ul>
                <li>
                    <p class="bold-information">Type</p>
                    <p>${location.type}</p>
                </li>
                <li>
                    <p class="bold-information">Dimension</p>
                    <p>${location.dimension}</p>
                </li>
                <li>
                <p class="bold-information">Residents</p>
                <p>${location.residents.length}</p>
            </li>
            </ul>
       </div>
    </div>
`
}


/* Modal show/hide Functions */

function showInfo(id) {
    let modal = document.getElementById("modal-" + id);
    modal.style.display = "block";
}

function hideInfo(id) {
    let modal = document.getElementById("modal-" + id);
    modal.style.display = "none";
}

/* Manera re pedorra pero funciona*/

if (window.location.pathname == "/character.html") {
    showAllCharacters(offset, limit);

    previous.addEventListener("click", function() {
        if (offset != 1) {
            offset -= 18;
            removeChildNodes(charaContainer);
            showAllCharacters(offset, limit);
        }
    })
    next.addEventListener("click", function() {
        offset += 18;
        removeChildNodes(charaContainer);
        showAllCharacters(offset, limit);
    })
} else if (window.location.pathname == "/location.html") {
    showAllLocations(offset, limit);
    previous.addEventListener("click", function() {
        if (offset != 1) {
            offset -= 18;
            removeChildNodes(locationContainer);
            showAllLocations(offset, limit);
        }
    })
    next.addEventListener("click", function() {
        offset += 18;
        removeChildNodes(locationContainer);
        showAllLocations(offset, limit);
    })
}

/* Pagination Functions */

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}