import data from './data.json' assert { type: 'json' }
console.log(data)

var map = L.map('map', {
    closePopupOnClick: false
    }).setView([23.47496,120.45240], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



data.forEach((item) => {
    var image_content = `<img src="./images/${item.imageName}"></img>`
    var all_content = `<img src="./images/${item.imageName}"></img><span class="intro" id="${item.imageName}">${item.intro}</span>`

    var popup = L.popup(item.position, {
    content: image_content,
        closeButton: false, 
        closeOnClick: false,
        className: item.tag
    }).addTo(map);

    L.DomEvent.on(popup._contentNode, 'mousedown', function(event) {
        popup.setContent(all_content)
    });

    L.DomEvent.on(popup._contentNode, 'mouseup', function(event) {
        popup.setContent(image_content)
    });

    L.DomEvent.on(popup._contentNode, 'touchstart', function(event) {
        popup.setContent(all_content)
    });

    L.DomEvent.on(popup._contentNode, 'touchend', function(event) {
        popup.setContent(image_content)
    });
})

var popup_contents = document.getElementsByClassName("leaflet-popup-content")
Array.from(popup_contents).forEach((item) => {
    item.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
})