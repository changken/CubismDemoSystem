// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/
Reveal.initialize({
  hash: true,

  // Learn about plugins: https://revealjs.com/plugins/
  // plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
});

//展示模式
// Reveal.on('ready', e => {
//   console.log('ready: ' + e.indexh);
//   modelControl(e.indexh, 0.5, -0.1, 1.1);
// });

Reveal.on('ready', e => {
  document.getElementById('pageIndex').innerHTML = e.indexh + 1 + '';
});

Reveal.on('slidechanged', e => {
  console.log(e.indexh);
  // modelControl(e.indexh, 0.5, -0.1, 1.1);
  document.getElementById('pageIndex').innerHTML = e.indexh + 1 + '';
});
