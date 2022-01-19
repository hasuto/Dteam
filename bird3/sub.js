var audioElem;
// var music = Audio();
document.body.onclick = playSound();

function playSound(){
  audioElem = new Audio();
  audioElem.src = "topbgm.mp3";
  audioElem.play();
  audioElem.loop = true;
}
function StopSound(){
  audioElem.pause();
}