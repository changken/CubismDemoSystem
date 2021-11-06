// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/
Reveal.initialize({
  hash: true,
  // math plugin
  math: {
    mathjax: 'https://cdn.jsdelivr.net/gh/mathjax/mathjax@2.7.8/MathJax.js',
    config: 'TeX-AMS_HTML-full',
    // pass other options into `MathJax.Hub.Config()`
    TeX: { Macros: { RR: '{\\bf R}' } },
  },
  // Learn about plugins: https://revealjs.com/plugins/
  plugins: [
    RevealMarkdown,
    RevealHighlight,
    RevealNotes,
    RevealMath,
    RevealSearch,
    RevealZoom,
  ],
});

let isLoad = false;
let canvas;
let reveal;

function change(e) {
  if (
    'no' in e.currentSlide.dataset &&
    'positionx' in e.currentSlide.dataset &&
    'positiony' in e.currentSlide.dataset &&
    'scale' in e.currentSlide.dataset &&
    'motionno' in e.currentSlide.dataset
  ) {
    if (canvas.style.display === 'none') {
      canvas.style.display = 'block';
    }

    // 根據dataset設定
    let { no, positionx, positiony, scale, motionno } = e.currentSlide.dataset;
    no = parseInt(no);
    positionx = parseFloat(positionx);
    positiony = parseFloat(positiony);
    scale = parseFloat(scale);
    motionno = parseInt(motionno);
    modelControl(no, positionx, positiony, scale);
    setTimeout(() => {
      startSelectedMotion(motionno);
    }, 2000);
  } else {
    // default
    // modelControl(0, 0.5, -0.1, 1.1);
    canvas.style.display = 'none';
  }

  document.getElementById('pageIndex').innerHTML = e.indexh + '-' + e.indexv;
}

//emba模式
//當reveal ready時
Reveal.on('ready', e => {
  //當window load時
  window.addEventListener('load', () => {
    canvas = document.querySelector('canvas');
    reveal = document.querySelector('.reveal');

    console.log('ready:' + e.indexh);
    console.log('ready:');
    console.log(e.currentSlide.dataset);

    change(e);

    isLoad = true;
  });
});

//切換頁面時
Reveal.on('slidechanged', e => {
  if (isLoad) {
    console.log('slidechanged:' + e.indexh);
    console.log('slidechanged:');
    console.log(e.currentSlide.dataset);

    change(e);
  }
});
