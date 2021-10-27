'use strict'

var gElCanvas;
var gCtx;

function setCanvas() {
    gElCanvas = document.querySelector(`canvas`)
    gCtx = gElCanvas.getContext('2d');
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth - 20;
    // Unless needed, better keep height fixed.
    //   gCanvas.height = elContainer.offsetHeight
}


function draw(ev) {
    // const offsetX = ev.offsetX;
    // const offsetY = ev.offsetY;

    const { offsetX, offsetY } = ev
}

function renderImg(imgUrl) {
    console.log('imgUrl',imgUrl);
    var img = new Image();
    img.src = imgUrl;

    img.onload = function () {
        // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height, 0, 0, gElCanvas.width, gElCanvas.height);

    }
}