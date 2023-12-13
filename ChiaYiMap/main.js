import data from './data.json' assert { type: 'json' }

var map = L.map('map').setView([23.4790,120.4278], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const TAG_LIST = ["freshman", "sophomore", "junior", "senior", "sp", "easter"]
data.forEach((item) => {
    var image_content = `<img src="./images/${item.imageName}"></img>`
    var all_content = `<img src="./images/${item.imageName}"></img><span class="intro">${item.intro}</span>`

    /* set popup up without close function */
    var popup = L.popup(item.position, {
    content: image_content,
        closeButton: false, 
        closeOnClick: false,
        className: TAG_LIST[item.grade - 1]
    }).addTo(map)

    /* control content show or not with mouse */
    L.DomEvent.on(popup._contentNode, 'mousedown', function(event) {
        popup.setContent(all_content)
    })

    L.DomEvent.on(popup._contentNode, 'mouseup', function(event) {
        popup.setContent(image_content)
    })

    /* control content show or not in mobile */
    L.DomEvent.on(popup._contentNode, 'touchstart', function(event) {
        popup.setContent(all_content)
    })
    L.DomEvent.on(popup._contentNode, 'touchend', function(event) {
        popup.setContent(image_content)
    })
})

/* prevent long press to show context menu in mobile */
var popup_contents = document.getElementsByClassName("leaflet-popup-content")
Array.from(popup_contents).forEach((item) => {
    item.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
})
