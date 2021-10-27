'use strict'

var gElCanvas;
var gCtx;
var gCurrImgUrl;

function setCanvas() {
    console.log('setCanvas')
    gElCanvas = document.querySelector(`canvas`)
    gCtx = gElCanvas.getContext('2d');
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    });
}

function renderCanvas(imgUrl) {
    console.log('renderCanvas');
    gCurrImgUrl = imgUrl;
    var img = new Image();
    img.src = gCurrImgUrl;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    }
}

function resizeCanvas() {
    console.log('resizeCanvas');
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = 300;
    gElCanvas.height = 300;
}
//     gElCanvas.width = elContainer.clientWidth;
//     gElCanvas.height = elContainer.clientHeight;
// }


function draw(ev) {
    // const offsetX = ev.offsetX;
    // const offsetY = ev.offsetY;

    const { offsetX, offsetY } = ev
}

