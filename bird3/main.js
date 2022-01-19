init();


var audioElem;

document.body.onclick = playSound();

function playSound(){ //bgm用関数
  audioElem = new Audio();
  audioElem.src = "bgm.mp3";
  audioElem.play();
  audioElem.loop = true;
}
function StopSound(){
  audioElem.pause();
}


const music = new Audio('jump.mp3');
const play = document.getElementById('play');
play.addEventListener('click', function(){
  if(!music.paused){
    music.pause();
  }else{
    music.play();
  }
});




function init() { //初期化のための関数
   
    bird = document.getElementById("bird");
    maxY = window.innerHeight - bird.height;
    ay = 0.5;
    vy = 0;
    y = 0;
    cnt = 0;
    bgX = 0; //moveBackground関数のための初期化
    bird.style.top = y + "px";
    maxX = window.innerWidth; //画面の幅を保持する変数
    document.getElementById("back").style.display = "none";
    document.addEventListener("click",fly);
    judgement = true;
    start();
  }

  

  function start(){ //ゲーム全体の処理
    scoreInterval = setInterval(score, 900);
    moveBirdInterval = setInterval(moveBird, 20);
    genEnemyInterval = setInterval(genEnemy, 2000); //initをstartで2秒ごとに呼び出すように指定
    moveEnemyInterval = setInterval(moveEnemy, 20); //壁の関数を呼び出す
    moveBackgroundInterval = setInterval(moveBackground, 20); //背景を動かす関数開始
}

  function end(){ //ゲーム全体の処理
    clearInterval(moveBirdInterval);
    clearInterval(genEnemyInterval);  //ストップさせる指定
    clearInterval(moveEnemyInterval); //壁の関数を止める
    clearInterval(moveBackgroundInterval); //背景の動きを止める
    clearInterval(scoreInterval);
    back = document.getElementById("back");
    back.style.display = "block";
}

  function moveBird() { //鳥を動かす関数
    vy += ay;
    y += vy * 0.08;
    if (y < 0) {
      y = 0;
    } else if (y > maxY) {
      end();
    }
    bird.style.top = y + "px";
    checkCollision(); //衝突判定
  }

  function fly() { //飛び上がるための関数
      vy = -15; //ジャンプの高さの調整
      window.onload = () => {
        const se = document.querySelector('#demo_sound');
        document.querySelector("#demo_btn").addEventListener("click", () => {
          se.play();
        })
      }
  }

  function genEnemy() { //壁を生成する関数
    var pos = 100+ Math.random() * 30;  //壁の隙間がランダムに変わるように
    var enemyTop = document.createElement("div");
    var enemyBottom = document.createElement("div");
    enemyTop.className = "enemy";
    enemyBottom.className = "enemy";
    enemyTop.style.bottom = pos  + 10 + "%";
    enemyBottom.style.top = (100 - pos*1.7) + 10 + "%";
    enemyTop.style.left = maxX + "px";
    enemyBottom.style.left = maxY + "px";
    document.body.insertBefore(enemyTop, document.body.firstChild);
    document.body.insertBefore(enemyBottom, document.body.firstChild);
  }

  function moveEnemy() { //壁を動かす関数
    var enemies = document.getElementsByClassName("enemy");
    for (var i = 0; i < enemies.length; i++) {
      var left = parseInt(enemies[i].style.left.replace(/px/, ""));
      left -= 5;
      if (left < -enemies[i].getBoundingClientRect().width) {
        enemies[i].remove();
      } else {
        enemies[i].style.left = left + "px";
      }
    }
  }

  function moveBackground(){ //背景を動かす関数
    bgX -= 10;
    document.body.style.backgroundPosition = bgX + "px";
  }

  function checkCollision() { //衝突判定を行う関数
    var enemies = document.getElementsByClassName("enemy");
    var birdRect = bird.getBoundingClientRect();
    for (var i = 0; i < enemies.length; i++) {
      var enemyRect = enemies[i].getBoundingClientRect();
      if (enemyRect.left < birdRect.right && birdRect.left < enemyRect.right) { //横方向の重なり
        if (enemyRect.top < birdRect.bottom && birdRect.top < enemyRect.bottom) { //縦方向の重なり
          judgement = false;
          end();
        }
      }
    }
  }

  function score() { //scoreカウント用の関数
      if (judgement == false){
        end();
      }
      cnt++;
      var score = cnt;
      document.getElementById("score").innerHTML = score;
    

  }