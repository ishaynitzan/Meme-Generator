'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStartPos;

var gElCanvas;
var gCtx;
var gKeywords = { 'all': 0, 'men': 0, 'animal': 0, 'baby': 0, 'toy': 0 }
var gFilter = 'all'
var gImgs = [
    { id: 1, url: './imgs/meme-imgs (square)/1.jpg', keywords: ['all', 'men'] },
    { id: 2, url: './imgs/meme-imgs (square)/2.jpg', keywords: ['all', 'animal'] },
    { id: 3, url: './imgs/meme-imgs (square)/3.jpg', keywords: ['all', 'animal', 'baby'] },
    { id: 4, url: './imgs/meme-imgs (square)/4.jpg', keywords: ['all', 'animal'] },
    { id: 5, url: './imgs/meme-imgs (square)/5.jpg', keywords: ['all', 'baby'] },
    { id: 6, url: './imgs/meme-imgs (square)/6.jpg', keywords: ['all', 'men'] },
    { id: 7, url: './imgs/meme-imgs (square)/7.jpg', keywords: ['all', 'baby'] },
    { id: 8, url: './imgs/meme-imgs (square)/8.jpg', keywords: ['all', 'men'] },
    { id: 9, url: './imgs/meme-imgs (square)/9.jpg', keywords: ['all', 'baby'] },
    { id: 10, url: './imgs/meme-imgs (square)/10.jpg', keywords: ['all', 'men'] },
    { id: 11, url: './imgs/meme-imgs (square)/11.jpg', keywords: ['all', 'men'] },
    { id: 12, url: './imgs/meme-imgs (square)/12.jpg', keywords: ['all', 'men'] },
    { id: 13, url: './imgs/meme-imgs (square)/13.jpg', keywords: ['all', 'men'] },
    { id: 14, url: './imgs/meme-imgs (square)/14.jpg', keywords: ['all', 'men'] },
    { id: 15, url: './imgs/meme-imgs (square)/15.jpg', keywords: ['all', 'men'] },
    { id: 16, url: './imgs/meme-imgs (square)/16.jpg', keywords: ['all', 'men'] },
    { id: 17, url: './imgs/meme-imgs (square)/17.jpg', keywords: ['all', 'men'] },
    { id: 18, url: './imgs/meme-imgs (square)/18.jpg', keywords: ['all', 'toy'] }
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    saveMemeUrl: null,
    lines: []
}

var gSaveMeme = [];

var gCurrentObject = {
    lineNum: 0,
    isDrag: 0
}

function getImgs() {
    const imgs = gImgs.filter((img) => {
        var isFound = img.keywords.some(key => key === gFilter);

        if (isFound) return img;
        return null;
    });

    return imgs;
}

function getKeyWords() {
    return gKeywords;
}
function setKeyWord(keyWord) {
    gFilter = keyWord;
}

function resetMeme() {
    gMeme.selectedLineIdx = 0;
    gMeme.saveMemeUrl = null;
    gMeme.lines = [];
}

function clickImg(imgId, isMyMeme, idx) {
    gMeme.selectedImgId = +imgId;
    if (isMyMeme) {
        setGSaveMeme();
        gMeme = gSaveMeme[idx];
    }
    else { resetMeme(); }
    setCanvas();
    resizeCanvas();
}

function setCanvas() {
    gElCanvas = document.querySelector(`canvas`)
    gCtx = gElCanvas.getContext('2d');
    addListeners();
    window.addEventListener('resize', () => {
        resizeCanvas()
    });
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.scrollWidth;
    gElCanvas.height = elContainer.scrollHeight;
    renderCanvas()
}

function renderCanvas() {
    var img = new Image();
    img.src = gImgs[gMeme.selectedImgId - 1].url;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    if (gMeme.lines !== 0) {
        gMeme.lines.map((line, idx) => {
            renderLine(line)
        });
    }
}

function renderLine(line) {
    gCtx.font = `${line.size}px ${line.font}`;
    const canvasHeight = gElCanvas.height;
    const canvasWidth = gElCanvas.width;
    gCtx.lineWidth = 3;
    gCtx.textAlign = `${line.align}`;
    if (line.isStroke) {
        gCtx.strokeStyle = `${line.strokeColor}`;
        gCtx.strokeText(line.txt, line.posX, line.posY);
    }
    gCtx.fillStyle = `${line.color}`;
    gCtx.fillText(line.txt, line.posX, line.posY);
}

function addLine(line) {
    if (gMeme.lines.length) gMeme.selectedLineIdx++;
    var newLine = {
        txt: line,
        size: 40,
        align: 'center',
        color: '#fff',
        font: 'Impact',
        isStroke: true,
        strokeColor: 'black',
        posX: 0,
        posY: 0
    }
    newLine.posX = gElCanvas.width / 2;

    if (gMeme.lines.length === 0) {
        newLine.posY = gElCanvas.height / 4;
    } else if (gMeme.lines.length === 1) {
        newLine.posY = 3 * gElCanvas.height / 4;
    } else if (gMeme.lines.length >= 2) {
        newLine.posY = gElCanvas.height / 2;
    }
    gMeme.lines.push(newLine);
    renderCanvas();
    addRect(newLine.posY, newLine.size)
}

function handleLine(key, value) {
    if (!gMeme.lines.length) return;
    var currentLine = gMeme.lines[gMeme.selectedLineIdx];
    switch (key) {
        case 'up':
            currentLine.posY -= 10;
            break;
        case 'down':
            currentLine.posY += 10;
            break;
        case 'grow':
            currentLine.size += 5;
            break;
        case 'shrink':
            currentLine.size -= 5;
            break;
        case 'color':
            currentLine.color = value;
            break;
        case 'strokeColor':
            currentLine.strokeColor = value;
            break;
        case 'shrink':
            currentLine.strokeColor = value;
            break;
        case 'align':
            currentLine.align = value;
            break;
        case 'font':
            currentLine.font = value;
            break;

    }
    renderCanvas()
    addRect(currentLine.posY, currentLine.size);
}


function switchLine() {
    if (!gMeme.lines.length) return;
    renderCanvas();
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx++;
    } else {
        gMeme.selectedLineIdx = 0;
    }
    var currentLine = gMeme.lines[gMeme.selectedLineIdx];
    addRect(currentLine.posY, currentLine.size)
}

function addRect(posY, size) {
    gCtx.beginPath();
    gCtx.strokeStyle = 'tomato';
    gCtx.rect(0, posY - size, gElCanvas.width, size + 10);
    gCtx.stroke();
    gCtx.closePath();
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx--;
    renderCanvas()
}

function setGSaveMeme() {
    gSaveMeme = getGSaveMeme();

}

function getGSaveMeme() {
    return loadFromStorage("gSaveMeme") ? loadFromStorage("gSaveMeme") : [];

}

function saveMeme() {
    var img = new Image();
    img = gElCanvas.toDataURL()
    gMeme.saveMemeUrl = img;
    gSaveMeme.push(gMeme);
    saveToStorage('gSaveMeme', gSaveMeme);

}

function downloadCanvas(elLink) {
    renderCanvas();
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

// grad and drop


function moveObject(dx, dy) {
    gMeme.lines[gCurrentObject.lineNum].posX += dx;
    gMeme.lines[gCurrentObject.lineNum].posY += dy;
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isHoverObject(objectPos) {
    var lineIdx = null;
    var isOn = gMeme.lines.some((line, idx) => {
        const { posY, posX } = line
        const lineStartX = posX - line.size * line.txt.length / 2;
        const lineEndX = posX + line.size * line.txt.length / 2;
        const lineStartY = posY - line.size / 2;
        const lineEndY = posY + line.size / 2;
        if (objectPos.x > lineStartX && objectPos.x < lineEndX &&
            objectPos.y > lineStartY && objectPos.y < lineEndY) {
            lineIdx = idx;
            return true
        }
        return false;
    });
    return { isOn, lineIdx };
}

function isObjectClicked(objectPos) {
    const HoverObject = isHoverObject(objectPos);
    var isOn = HoverObject.isOn;
    var lineIdx = HoverObject.lineIdx;
    if (isOn) {
        gCurrentObject.lineNum = lineIdx;

    }

    return isOn;
}

function setObjectDrag(isDrag) {
    gCurrentObject.isDrag = isDrag;
}

function geCanvasObject() {
    return gCurrentObject;
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

