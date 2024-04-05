/**
 * Main function
 */
window.onload = function() {
    initialComponents()

    fetchData().then(async function(data) {
        await setList(data);
        apply()
        Array.from(elements).forEach((item) => {
            item.addEventListener('change', apply);
        });
    });

    buttonApply.addEventListener("click", apply);
    buttonCopy.addEventListener("click", copy);
    buttonDownload.addEventListener("click", download);
}

function initialComponents() {
    // input & output
    userInput = document.getElementById("user-input");
    imageOutput = document.getElementById("image-output");
    fontSizeType = "px";
    targetCanvas = null;
    // custom font 
    selectFont = document.getElementById("select-font");
    selectSize = document.getElementById("select-size");
    selectColor = document.getElementById("input-color");
    selectAlign = document.getElementsByClassName("text-align")
    // custom style
    elements = document.getElementsByClassName("user-control-elements")
    // custom button
    buttonApply = document.getElementById("button-apply");
    buttonCopy = document.getElementById("button-copy");
    buttonDownload = document.getElementById("button-download");
}

/**
 * Get font information
 */
async function fetchData() {
    return await fetch('./data.json')
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error));
}

function setList(data) {
    Object.keys(data).forEach(function(title) {
        var fontTitle = title;
        var optGroup = document.createElement('OPTGROUP');
        optGroup.setAttribute('label', fontTitle);
        optGroup.setAttribute('type', data[fontTitle]['type']);
        Object.keys(data[title]['items']).forEach(function(item) {
            var fontName = data[title]['items'][item];
            var opt = document.createElement('OPTION');
            opt.setAttribute('value', fontName);
            opt.setAttribute('class', fontName);
            opt.innerHTML = fontName;
            optGroup.appendChild(opt);
        });
        selectFont.appendChild(optGroup);
    });
}

/**
 * Handle text 2 image (the core of the program)
 */
function setStyle() {
    selectedFont = selectFont.value;
    selectedSize = selectSize.value + fontSizeType;
    selectedColor = selectColor.value
    selectedAlign = document.querySelector('input[name="select-align"]:checked').value
    Array.from(selectAlign).forEach((item) => {
        item.style.visibility = "hidden"
    });
}

function makeImage() {
    var canvas = document.createElement("canvas");
    drawImage(canvas)
    targetCanvas = canvas;
}

function drawImage(canvas, isPreview = false) {
    // handle user don't enter anything
    var userInputRows = (userInput.value != "") ? userInput.value.split(/\r?\n/): ["預覽文字"]
    var longestRow = userInputRows.reduce(
        (acc, word) => (word.length > acc.length ? word : acc), ""
    );

    var ratio = window.devicePixelRatio;
    // set style before getting metrics
    var context = canvas.getContext("2d");
    setContextStyle(context, isPreview)
    var metrics = context.measureText(longestRow);
    var actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    var actualWidth = metrics.width;
    canvas.width = actualWidth * ratio;
    canvas.height = Math.ceil(actualHeight * ratio) * userInputRows.length;
    canvas.getContext("2d").scale(ratio, ratio);

    // set style again before executing fillText
    setContextStyle(context, isPreview)
    userInputRows.forEach((value, index) => {
        let x = getCoordinateX(actualWidth)
        let y = actualHeight * index
        context.fillText(
            userInputRows[index], x, y
        );
    });
}

function setContextStyle(context, isPreview) {
    if (isPreview) {
        context.font = "24px " + String(selectedFont);
    } else {
        context.font = String(selectedSize) + " " + String(selectedFont);
    }
    context.textBaseline = "top"
    context.textAlign = selectedAlign
    context.fillStyle = selectedColor
}

function getCoordinateX(width) {
    var x = 0;
    if (selectedAlign == "left") {
        x = 0
    } else if (selectedAlign == "center") {
        x = width / 2
    } else if (selectedAlign == "right") {
        x = width
    }
    return x
}


/**
 * Buttons handling (apply, copy, download) 
 */
function apply() {
    setStyle()
    makeImage()
    var image = document.createElement("img");
    let previewCanvas = targetCanvas.cloneNode(true)
    drawImage(previewCanvas, true)
    image.src = previewCanvas.toDataURL();
    imageOutput.src = image.src;
}

async function copy() {
    targetCanvas.toBlob(async function(blob) {
        var data = [new ClipboardItem({
            [blob.type]: blob
        })];
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.write(data)
                window.open("https://instagram.com")
            } catch (error) {
                alert("發生未知錯誤")
            }
        } else {
            alert("瀏覽器不支援複製功能！");
        }
    }, 'image/png');
}

function download() {
    var a = document.createElement("a");
    var image = document.createElement("img");
    image.src = targetCanvas.toDataURL();
    a.href = image.src;
    a.download = "output.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}