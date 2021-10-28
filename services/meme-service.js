'use strict'

var gElCanvas;
var gCtx;
var gKeywords = { 'men': 0, 'animal': 0, 'baby': 0, 'toy': 0 }

var gImgs = [
    { id: 1, url: './meme-imgs (square)/1.jpg', keywords: ['men'] },
    { id: 2, url: './meme-imgs (square)/2.jpg', keywords: ['animal'] },
    { id: 3, url: './meme-imgs (square)/3.jpg', keywords: ['animal baby'] },
    { id: 4, url: './meme-imgs (square)/4.jpg', keywords: ['animal'] },
    { id: 5, url: './meme-imgs (square)/5.jpg', keywords: ['baby'] },
    { id: 6, url: './meme-imgs (square)/6.jpg', keywords: ['men'] },
    { id: 7, url: './meme-imgs (square)/7.jpg', keywords: ['baby'] },
    { id: 8, url: './meme-imgs (square)/8.jpg', keywords: ['men'] },
    { id: 9, url: './meme-imgs (square)/9.jpg', keywords: ['baby'] },
    { id: 10, url: './meme-imgs (square)/10.jpg', keywords: ['men'] },
    { id: 11, url: './meme-imgs (square)/11.jpg', keywords: ['men'] },
    { id: 12, url: './meme-imgs (square)/12.jpg', keywords: ['men'] },
    { id: 13, url: './meme-imgs (square)/13.jpg', keywords: ['men'] },
    { id: 14, url: './meme-imgs (square)/14.jpg', keywords: ['men'] },
    { id: 15, url: './meme-imgs (square)/15.jpg', keywords: ['men'] },
    { id: 16, url: './meme-imgs (square)/16.jpg', keywords: ['men'] },
    { id: 17, url: './meme-imgs (square)/17.jpg', keywords: ['men'] },
    { id: 18, url: './meme-imgs (square)/18.jpg', keywords: ['toy'] }
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}

function getImgs() {
    return gImgs;
}

function getKeyWords() {
    return gKeywords;
}

function clickImg(imgId) {
    gMeme.selectedImgId = imgId;
    setCanvas();
    resizeCanvas();
}

function setCanvas() {
    console.log('setCanvas')
    gElCanvas = document.querySelector(`canvas`)
    gCtx = gElCanvas.getContext('2d');
    window.addEventListener('resize', () => {
        resizeCanvas()
    });
}

function resizeCanvas() {
    console.log('resizeCanvas');
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.scrollWidth;
    gElCanvas.height = elContainer.scrollHeight;
    renderCanvas()
}

function renderCanvas() {
    console.log('renderCanvas');
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
    gCtx.lineWidth = 6;
    gCtx.textAlign = `${line.align}`;
    if (line.isStroke) {
        gCtx.strokeStyle = `${line.strokeColor}`;
        gCtx.strokeText(line.txt, line.posX + (canvasWidth / 2), line.posY + (canvasHeight / 2));
    }
    gCtx.fillStyle = `${line.color}`;
    gCtx.fillText(line.txt, line.posX + (canvasWidth / 2), line.posY + (canvasHeight / 2));
}

function addLine(line) {
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

function handleLine(value) {
    var currentLine = gMeme.lines[gMeme.selectedLineIdx];
    switch (value) {
        case 'up':
            currentLine.posY -= 10;
            break;
        case 'down':
            currentLine.posY += 10;
            break;
        case 'grow':
            currentLine.size += 10;
            break;
        case 'shrink':
            currentLine.size -= 10;
            break;
    }

    renderCanvas()
    addRect(currentLine.posY + (gElCanvas.height / 2), currentLine.size);


}



function moveUp() {
    console.log('moveUp');
    var currentLine = gMeme.lines[gMeme.selectedLineIdx];
    currentLine.posY -= 10;
    renderCanvas()
    addRect(currentLine.posY + (gElCanvas.height / 2), currentLine.size)
}

function movedDown() {
    console.log('movedDown');
    var currentLine = gMeme.lines[gMeme.selectedLineIdx];
    currentLine.posY += 10;
    renderCanvas()
    addRect(currentLine.posY + (gElCanvas.height / 2), currentLine.size)
}

function fontGrow() {
    console.log('fontGrow');
    var currentLine = gMeme.lines[gMeme.selectedLineIdx];
    currentLine.size += 10;
    renderCanvas()
}

function fontShrink() {
    console.log('fontShrink');
    var currentLine = gMeme.lines[gMeme.selectedLineIdx];
    currentLine.size -= 10;
    renderCanvas()
}

function switchLine() {
    console.log('switch');
    renderCanvas();
    console.log(gMeme.selectedLineIdx);
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
    gCtx.rect(0, posY - size, gElCanvas.width, size + 10);
    gCtx.stroke();
    gCtx.closePath();
}