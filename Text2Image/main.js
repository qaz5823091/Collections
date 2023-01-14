var buttonApply = document.getElementById("button-apply");
var buttonCopy = document.getElementById("button-copy");
var buttonDownload = document.getElementById("button-download");

var selectFont;
var selectSize;
var selectColor;
var selectedFont;
var selectedSize;
var selectedColor;

var targetCanvas = null;

var userInput = document.getElementById("user-input");
var targetText = userInput.value;
var imageOutput = document.getElementById("image-output");

var elements;

async function fetchData() {
    return await fetch('./data.json')
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((error) => console.log(error));
}


function setList(data) {
    Object.keys(data).forEach(function(title) {
        var font_title = title;
        var optgroup = document.createElement('OPTGROUP');
        optgroup.setAttribute('label', font_title);
        optgroup.setAttribute('type', data[font_title]['type']);
        Object.keys(data[title]['items']).forEach(function(item) {
            var font_name = data[title]['items'][item];
            var opt = document.createElement('OPTION');
            opt.setAttribute('value', font_name);
            opt.setAttribute('class', font_name);
            opt.innerHTML = font_name;
            optgroup.appendChild(opt);
        });
        selectFont.appendChild(optgroup);
    });
}

async function setFont(title, name, type) {
    const font = new FontFace(name, `url('./fonts/${title}/${name}.${type}')`);
    await font.load();
    document.fonts.add(font);
    userInput.style['font-family'] = name;
}

function setStyle() {
    selectedFont = selectFont.value;
    selectedSize = selectSize.value + "px";
    selectedColor = selectColor.value;

    var title = document.querySelector('select[name="select-font"] option:checked').parentElement.label;
    var name = selectedFont;
    var type = document.querySelector('select[name="select-font"] option:checked').parentElement.getAttribute('type');
    setFont(title, name, type);

    userInput.style['font-size'] = selectedSize;
    userInput.style['color'] = selectedColor;

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
    context.fillText(userInput.value, 0, actualHeight - ratio - 1.5);

    targetCanvas = canvas;

    var image = document.createElement("img");
    image.src = canvas.toDataURL();
    imageOutput.src = image.src;
}

window.onload = function() {
    selectFont = document.getElementById("select-font");
    selectSize = document.getElementById("select-size");
    selectColor = document.getElementById("input-color");

    fetchData().then(async function(data) {
        await setList(data);

        elements = [
            userInput,
            selectFont,
            selectSize,
            selectColor
        ];

        elements.forEach((item) => {
            item.addEventListener('change', setStyle);
        });
    });

    buttonApply.addEventListener("click", setStyle);
    buttonCopy.addEventListener("click", copy);
    buttonDownload.addEventListener("click", download);
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