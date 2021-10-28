'use strict'

function onInit() {
    renderGallery();
    renderKeyWords();
}

function renderGallery() {

    const imgs = getImgs();
    var strHtml = '';
    var elImgs = imgs.map(img => {
        strHtml += `<div><img src="./meme-imgs (square)/${img.id}.jpg" class="memeImg" data-id="${img.id}" alt="" onclick="onClickImg(this)"></div>`
    });

    strHtml += elImgs.join('');

    document.querySelector(`.gallery`).innerHTML = strHtml;
}

function renderKeyWords() {

    const words = getKeyWords();
    var strHtml = '';
    for (const key in words) {
        const size = words[key] % 5;
        strHtml += `<li class="flex size${size}">${key}</li>`;
    }
    document.querySelector(`.key-words`).innerHTML = strHtml;
}


function onClickImg(elImg) {
    document.querySelector(`main`).classList.toggle("hidden");
    document.querySelector(`.meme-editor`).classList.toggle("hidden");
    clickImg(elImg.dataset.id);
}

function onClickGallery() {
    document.querySelector(`main`).classList.remove("hidden");
    document.querySelector(`.meme-editor`).classList.add("hidden");
}


function onAddLine(input) {
    addLine(input.value);
    document.querySelector(`.txt-input`).value = '';

}
function onMoveUp() {
    handleLine('up');
    // moveUp();
}
function onMovedDown() {
    handleLine('down');
    // movedDown();
}
function onFontGrow() {
    handleLine('grow');
    // fontGrow();
}
function onFontShrink() {
    handleLine('shrink');
    // fontShrink();
}
function onSwitchLine() {
    // switchLine();
}
