// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/
Reveal.initialize({
  hash: true,

  // Learn about plugins: https://revealjs.com/plugins/
  // plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
});

//emba模式
//當reveal ready時
Reveal.on('ready', e => {
  //當window load時
  window.addEventListener('load', () => {
    console.log('ready:' + e.indexh);
    console.log('ready:');
    console.log(e.currentSlide.dataset);
    if (
      'no' in e.currentSlide.dataset &&
      'positionx' in e.currentSlide.dataset &&
      'positiony' in e.currentSlide.dataset &&
      'scale' in e.currentSlide.dataset &&
      'motionno' in e.currentSlide.dataset
    ) {
      // 根據dataset設定
      let {
        no,
        positionx,
        positiony,
        scale,
        motionno,
      } = e.currentSlide.dataset;
      no = parseInt(no);
      positionx = parseFloat(positionx);
      positiony = parseFloat(positiony);
      scale = parseFloat(scale);
      motionno = parseInt(motionno);
      modelControl(no, positionx, positiony, scale);
      startSelectedMotion(no, motionno);
    } else {
      // default
      modelControl(0, 0.5, -0.1, 1.1);
    }
  });
});

//切換頁面時
Reveal.on('slidechanged', e => {
  console.log('slidechanged:' + e.indexh);
  console.log('slidechanged:');
  console.log(e.currentSlide.dataset);
  if (
    'no' in e.currentSlide.dataset &&
    'positionx' in e.currentSlide.dataset &&
    'positiony' in e.currentSlide.dataset &&
    'scale' in e.currentSlide.dataset &&
    'motionno' in e.currentSlide.dataset
  ) {
    // 根據dataset設定
    let { no, positionx, positiony, scale, motionno } = e.currentSlide.dataset;
    no = parseInt(no);
    positionx = parseFloat(positionx);
    positiony = parseFloat(positiony);
    scale = parseFloat(scale);
    motionno = parseInt(motionno);
    modelControl(no, positionx, positiony, scale);
    startSelectedMotion(no, motionno);
  } else {
    // default
    modelControl(0, 0.5, -0.1, 1.1);
  }
});
