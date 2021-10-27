'use strict'

var gKeywords = { 'men': 0, 'animal': 0, 'baby': 0, 'toy': 0}

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
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
    }]
}


function getImgs() {
    return gImgs;
}

function getKeyWords() {
    return gKeywords;
}

function selectedImg(imgId){
    setCanvas(gImgs[imgId-1].url);
    renderCanvas();
}
