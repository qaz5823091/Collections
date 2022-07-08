var buttonApply = document.getElementById("button-apply");
var buttonCopy = document.getElementById("button-copy");
var buttonDownload = document.getElementById("button-download");

var selectFont = document.getElementById("select-font");
var selectSize = document.getElementById("select-size");
var selectColor = document.getElementById("input-color");
var selectedFont = selectFont.options[0].value;
var selectedSize = selectSize.options[0].value + "px";
var selectedColor = selectColor.value;

var targetCanvas = null;

var userInput = document.getElementById("user-input");
var targetText = userInput.value;
var imageOutput = document.getElementById("image-output");

apply();
window.onload = function() {
    buttonApply.addEventListener("click", apply);
    buttonCopy.addEventListener("click", copy);
    buttonDownload.addEventListener("click", download);

    userInput.addEventListener("change", (event) => {
        console.log('y');
        targetText = event.target.value;
        apply();
    });
    selectFont.addEventListener("change", (event) => {
        selectedFont = event.target.value;
        apply();
    });
    selectSize.addEventListener("change", (event) => {
        selectedSize = event.target.value + "px";
        apply();
    });
    selectColor.addEventListener("change", (event) => {
        selectedColor = event.target.value;
        apply();
    });
};


function apply() {
    userInput.style['font-family'] = selectedFont;
    userInput.style['font-size'] = selectedSize;

    var ratio = window.devicePixelRatio;
    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 30;

    var context = canvas.getContext("2d");
    context.font = String(selectedSize) + " " + String(selectedFont);


    var metrics = context.measureText(userInput.value);
    var fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    var actualHeight = parseInt(context.font, 10);
    var actualWidth = metrics.width;

    canvas.width = actualWidth * ratio;
    canvas.height = actualHeight * ratio;
    canvas.style.width = actualWidth + "px";
    canvas.style.height = actualHeight + "px";
    canvas.getContext("2d").scale(ratio, ratio);

    context = canvas.getContext("2d");

    context.font = String(selectedSize) + " " + String(selectedFont);
    context.textAlign = "left";
    context.fillStyle = selectedColor;
    context.fillText(userInput.value, 0, actualHeight - 0.75 * ratio);

    targetCanvas = canvas;

    var image = document.createElement("img");
    image.src = canvas.toDataURL();
    imageOutput.src = image.src;
}

function copy() {
    targetCanvas.toBlob(function (blob) {
        var data = [new ClipboardItem({ [blob.type]: blob })];
        if (navigator.clipboard) {
            navigator.clipboard.write(data).then(function () {
                console.log('yes');
            }, function (err) {
                alert("錯誤");
            });
        }
        else {
            alert("瀏覽器不支援複製功能！");
        }
    }, 'image/png');
}

function download() {
    var a = document.createElement("a");
    a.href = imageOutput.src;
    a.download = "output.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
