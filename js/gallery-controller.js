'use strict'

function onInit() {
    renderGallery();
    renderKeyWords();
}

function renderGallery() {

    const imgs = getImgs();
    if (imgs.length === 0) return;
    var strHtml = '';
    var elImgs = imgs.map(img => {
        strHtml += `<div><img src="./imgs/meme-imgs (square)/${img.id}.jpg" class="meme-img" data-id="${img.id}" alt="" onclick="onClickImg(this)"></div>`
    });

    strHtml += elImgs.join('');

    document.querySelector(`.gallery`).innerHTML = strHtml;
}

function renderKeyWords() {

    const words = getKeyWords();
    var strHtml = '';
    for (const key in words) {
        const size = words[key] % 5;
        strHtml += `<li class="flex size${size}" onclick="onKeyWord(this)">${key}</li>`;
    }
    document.querySelector(`.key-words`).innerHTML = strHtml;
}


function renderMyMeme() {
    const myMeme = getGSaveMeme();
    if (myMeme === null || !myMeme.length) return;
    var strHtml = '';
    var elImgs = myMeme.map((img, idx) => {
        strHtml += `<div><img src=${img.saveMemeUrl}" class="meme-img" data-id="${idx}" alt="img" onclick="onClickImg(this, true, ${idx})"></div>`
    });

    strHtml += elImgs.join('');

    document.querySelector(`.my-gallery`).innerHTML = strHtml;
}


function onClickImg(elImg, isMyMeme = 0, idx = 0) {
    document.querySelector(`main`).classList.add("hidden");
    document.querySelector(`.my-meme`).classList.add("hidden");
    document.querySelector(`.about`).classList.add("hidden");
    document.querySelector(`.meme-editor`).classList.remove("hidden");
    clickImg(elImg.dataset.id, isMyMeme, idx);
}

function onClickGallery() {
    document.querySelector(`main`).classList.remove("hidden");
    document.querySelector(`.meme-editor`).classList.add("hidden");
    document.querySelector(`.my-meme`).classList.add("hidden");
    document.querySelector(`.about`).classList.add("hidden");
}
function onClickMyMeme() {
    document.querySelector(`.my-meme`).classList.remove("hidden");
    document.querySelector(`main`).classList.add("hidden");
    document.querySelector(`.meme-editor`).classList.add("hidden");
    document.querySelector(`.about`).classList.add("hidden");
    renderMyMeme();
}
function onClickAbout() {
    document.querySelector(`.about`).classList.remove("hidden");
    document.querySelector(`main`).classList.add("hidden");
    document.querySelector(`.meme-editor`).classList.add("hidden");
    document.querySelector(`.my-meme`).classList.add("hidden");
}
function onSearchMeme() {
    console.log('onSearchMeme');
    const value = document.querySelector(`.search-input`).value;
    console.log(value);
    if (value !== '') setKeyWord(value);
    document.querySelector(`.search-input`).value = '';
    renderGallery();
}

function onAddLine() {
    const value = document.querySelector(`.txt-input`).value;
    if (value !== '') addLine(value);
    document.querySelector(`.txt-input`).value = '';
}


function onHandleLine(keyword) {
    handleLine(keyword);
}
function onSwitchLine() {
    switchLine();
}
function onAlignLine(value) {
    handleLine('align', value)
}

function onColor(value) {
    handleLine('color', value)
}
function onStrokeColor(value) {
    handleLine('strokeColor', value)
}
function onDeleteLine() {
    deleteLine();
}

function onFontChange(value) {
    handleLine('font', value);
}

function onSaveMeme() {
    saveMeme();
    renderMyMeme();
    document.querySelector(`.btn-my-meme`).click();
}

function onKeyWord(elWord) {
    setKeyWord(elWord.innerText);
    renderGallery();
}

function onDownloadCanvas() {
    downloadCanvas();
}

function onShearMeme() {
    uploadImg()
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// grad and drop

function onMove(ev) {
    const canvasObject = geCanvasObject();
    const pos = getEvPos(ev);
    checkHoverObject(pos);
    if (canvasObject.isDrag) {
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        gStartPos = pos;
        moveObject(dx, dy);
        renderCanvas();
    }
}

function onDown(ev) {
    console.log('onDown');
    const pos = getEvPos(ev)
    if (!isObjectClicked(pos)) return
    setObjectDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing'
}

function onUp() {
    console.log('onUp');
    setObjectDrag(false);
}

function checkHoverObject(pos) {
    const currentObject = isHoverObject(pos);
    if (currentObject.isOn) {
        document.body.style.cursor = 'grab';
    } else {
        document.body.style.cursor = 'auto'
    }
}