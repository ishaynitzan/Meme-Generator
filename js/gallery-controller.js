'use strict'

function onInit() {
    renderGallery();
    renderKeyWords() 
}

function renderGallery() {

    const imgs = getImgs();
    var strHtml = '';
    var elImgs = imgs.map(img => {
        strHtml += `<div><img src="./meme-imgs (square)/${img.id}.jpg" class="memeImg" data-id="${img.id}" alt="" onclick="onSelectedImg(this)"></div>`
    });

    strHtml += elImgs.join('');

    document.querySelector(`.gallery`).innerHTML = strHtml;
}

function renderKeyWords() {

    const words = getKeyWords();
    var strHtml = '';
    for (const key in words) {
        const size = words[key]%5;
        strHtml += `<li class="flex size${size}">${key}</li>`;
    }

    document.querySelector(`.key-words`).innerHTML = strHtml;
}


function onSelectedImg(elImg){
    selectedImg(elImg.dataset.id);
}