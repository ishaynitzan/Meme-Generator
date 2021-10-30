'use strict'

var gElCanvas;
var gCtx;
var gKeywords = { 'all': 0, 'men': 0, 'animal': 0, 'baby': 0, 'toy': 0 }
var gFilter = 'all'
var gImgs = [
    { id: 1, url: './meme-imgs (square)/1.jpg', keywords: ['all', 'men'] },
    { id: 2, url: './meme-imgs (square)/2.jpg', keywords: ['all', 'animal'] },
    { id: 3, url: './meme-imgs (square)/3.jpg', keywords: ['all', 'animal', 'baby'] },
    { id: 4, url: './meme-imgs (square)/4.jpg', keywords: ['all', 'animal'] },
    { id: 5, url: './meme-imgs (square)/5.jpg', keywords: ['all', 'baby'] },
    { id: 6, url: './meme-imgs (square)/6.jpg', keywords: ['all', 'men'] },
    { id: 7, url: './meme-imgs (square)/7.jpg', keywords: ['all', 'baby'] },
    { id: 8, url: './meme-imgs (square)/8.jpg', keywords: ['all', 'men'] },
    { id: 9, url: './meme-imgs (square)/9.jpg', keywords: ['all', 'baby'] },
    { id: 10, url: './meme-imgs (square)/10.jpg', keywords: ['all', 'men'] },
    { id: 11, url: './meme-imgs (square)/11.jpg', keywords: ['all', 'men'] },
    { id: 12, url: './meme-imgs (square)/12.jpg', keywords: ['all', 'men'] },
    { id: 13, url: './meme-imgs (square)/13.jpg', keywords: ['all', 'men'] },
    { id: 14, url: './meme-imgs (square)/14.jpg', keywords: ['all', 'men'] },
    { id: 15, url: './meme-imgs (square)/15.jpg', keywords: ['all', 'men'] },
    { id: 16, url: './meme-imgs (square)/16.jpg', keywords: ['all', 'men'] },
    { id: 17, url: './meme-imgs (square)/17.jpg', keywords: ['all', 'men'] },
    { id: 18, url: './meme-imgs (square)/18.jpg', keywords: ['all', 'toy'] }
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}

var gSaveMeme = [];

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

function resetGMeme() {
    gMeme.selectedLineIdx = 0;
    gMeme.lines= [];
    
}
function clickImg(imgId) {
    gMeme.selectedImgId = imgId;
    resetGMeme();
    setCanvas();
    resizeCanvas();
    renderCanvas();
}

function setCanvas() {
    gElCanvas = document.querySelector(`canvas`)
    gCtx = gElCanvas.getContext('2d');
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
    const posX = line.posX;
    const posY = line.posY;
    gCtx.lineWidth = 3;
    gCtx.textAlign = `${line.align}`;
    if (line.isStroke) {
        gCtx.strokeStyle = `${line.strokeColor}`;
        gCtx.strokeText(line.txt, line.posX + (canvasWidth / 2), line.posY + (canvasHeight / 2));
    }
    gCtx.fillStyle = `${line.color}`;
    gCtx.fillText(line.txt, line.posX + (canvasWidth / 2), line.posY + (canvasHeight / 2));
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
    if (gMeme.lines.length === 0) {
        newLine.posX = 0;
        newLine.posY = -gElCanvas.height / 3;
    } else if (gMeme.lines.length === 1) {
        newLine.posX = 0;
        newLine.posY = +gElCanvas.height / 3;
    } else if (gMeme.lines.length >= 2) {
        newLine.posX = 0;
        newLine.posY = 0;
    }

    gMeme.lines.push(newLine);
    renderCanvas();
    addRect(newLine.posY + (gElCanvas.height / 2), newLine.size)
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
    addRect(currentLine.posY + (gElCanvas.height / 2), currentLine.size);
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
    addRect(currentLine.posY + (gElCanvas.height / 2), currentLine.size)
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
    gSaveMeme = loadFromStorage("gMyMeme");

}
function getGSaveMeme() {
    return loadFromStorage("gSaveMeme");

}
function saveMeme(){
    gSaveMeme.push(gMeme);
    saveToStorage('gSaveMeme',gSaveMeme);
}


function downloadCanvas(elLink) {
    renderCanvas();
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}
