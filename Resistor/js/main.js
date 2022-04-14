const colors = [
    "#000000",  // black
    "#780000",  // brown
    "#ff0000",  // red
    "#ff8c00",  // orange
    "#ffe100",  // yellow
    "#00ff2f",  // green
    "#002fff",  // blue
    "#ea00ff",  // purple
    "#6b6b6b",  // gray
    "#ffffff",  // white
    "#ffd92e",  // gold
    "#dbdbdb",  // sliver
                // transparent
];

var parts = document.getElementsByClassName("part");
var message = document.getElementById("message");

window.onload = function() {
    Array.prototype.forEach.call(parts, function(part) {
        part.addEventListener("click", click);
    });
}

var click = function () {
    var id = this.id;
    var number;
    var result = 0;

    switch (id) {
        case "1":
        case "2":
            number = (parseInt(this.innerText, 10) + 1) % 10;
            break;
        case "3":
            number = (parseInt(this.innerText, 10) + 1) % 12;
            break;
        case "4":
            number = (parseInt(this.innerText, 10) + 1) % colors.length;
            if (number == 0) {
                number = 1;
            }
            else if (number == 2) {
                number = 5;
            }
            else if (number == 8) {
                number = 10;
            }
            else if (number == 12) {
                number = 0;
            }
            break;
    }

    this.style["background-color"] = colors[number];
    this.innerText = number;
    result = parseInt((parts[0].innerText + parts[1].innerText), 10) * Math.pow(10, parseInt(parts[2].innerText, 10));
    message.innerText = result + " Ω";
    message.style["font-size"] = "100px";
    message.style["color"] = "black";
}
