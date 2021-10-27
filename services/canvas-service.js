'use strict'

var gElCanvas;
var gCtx;
var gCurrImgUrl;
var gTexts = [];

function setCanvas(imgUrl) {
    gCurrImgUrl = imgUrl;
    console.log('setCanvas')
    gElCanvas = document.querySelector(`canvas`)
    gCtx = gElCanvas.getContext('2d');
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    });
}

function renderCanvas() {
    console.log('renderCanvas');
    var img = new Image();
    img.src = gCurrImgUrl;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    if (gTexts.length !== 0) {
        gTexts.map((text, idx) => {
            if (idx < gTexts.length - 1) renderText(text)
        });
    }
}

function renderText(text) {
    gCtx.font = `${text.size}px ${text.font}`;
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 6;
    var rectHeight = gElCanvas.width;
    var rectWidth = gElCanvas.width;
    var posX = text.posX;
    var posY = text.posY;
    gCtx.textAlign = "center";
    gCtx.strokeText(text.txt, text.posX + (rectWidth / 2), text.posY + (rectHeight / 2));
    gCtx.fillStyle = 'white';
    gCtx.fillText(text.txt, text.posX + (rectWidth / 2), text.posY + (rectHeight / 2));
}

function resizeCanvas() {
    console.log('resizeCanvas');
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.scrollWidth;
    gElCanvas.height = elContainer.scrollHeight;
}

function addText(txt, posX = 0, posY = -180, font = 'Impact', size = 50) {
    gCtx.font = `${size}px ${font}`;
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 6;
    var rectHeight = gElCanvas.width;
    var rectWidth = gElCanvas.width;
    var posX = posX;
    var posY = posY;
    gCtx.textAlign = "center";
    gCtx.strokeText(txt, posX + (rectWidth / 2), posY + (rectHeight / 2));
    gCtx.fillStyle = 'white';
    gCtx.fillText(txt, posX + (rectWidth / 2), posY + (rectHeight / 2));
    gTexts.push({ txt, posX, posY, font, size });
}


function moveUp() {
    console.log('moveUp');
    renderCanvas();
    var text = gTexts.pop();
    addText(text.txt, text.posX, text.posY - 10, text.font, text.size);
}

function movedDown() {
    console.log('movedDown');
    renderCanvas();
    var text = gTexts.pop();
    addText(text.txt, text.posX, text.posY + 10, text.font, text.size);
}

function fontGrow() {
    console.log('fontGrow');
    renderCanvas();
    var text = gTexts.pop();
    addText(text.txt, text.posX, text.posY, text.font, text.size + 5);

}

function fontShrink() {
    console.log('fontShrink');
    renderCanvas();
    var text = gTexts.pop();
    addText(text.txt, text.posX, text.posY, text.font, text.size - 5);

}