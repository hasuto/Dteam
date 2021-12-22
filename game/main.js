init();

function fly() {
    vy = -10;
}

function init() {
    document.getElemtntById("startBtn").style.display = "none";
    bgX = 0;
    maxX = window.innerHeight;
    document.addEventListener("click", fly);
    hasuto = document.getElementById("hasuto");
    maxY = window.innerHeight - hasuto.height;
    ay = 0.4;
    vy = 0;
    y = 0;
    hasuto.style.top = y + "px";
    start();
}

function start() {
    moveHasutoInterval = setInterval(moveHasuto, 20);
    genKabeInterval = setInterval(genKabe, 2000);
    moveKabeInterval = setInterval(moveKabe, 20);
    moveBackgroundInterval = setInterval(moveBackground, 20);
}

function end() {
    document.getElemtntById("startBtn").style.display = "block";
    clearInterval(moveHasutoInterval);
    clearInterval(genKabeInterval);
    clearInterval(moveKabeInterval);
    clearInterval(moveBackgroundInterval);
}

function moveHasuto() {
    vy += ay;
    y += vy;
    if (y < 0) {
        y = 0;
    } else if (y > maxY) {
        end();
    }
    hasuto.style.top = y + "px";
    checkCollision();
}

function genKabe() {
    var pos = 20 + Math.random() * 60;
    var kabeTop = document.createElement("div");
    var kabeBottom = document.createElement("div");
    kabeTop.className = "kabe";
    kabeBottom.className = "kabe";
    kabeTop.style.bottom = pos + 10 + "%";
    kabeBottom.style.top = (100 - pos) + 10 + "%";
    kabeTop.style.left = maxX + "px";
    kabeBottom.style.left = maxX + "px";
    document.body.insertBefore(kabeTop, document.body.firstChild);
    document.body.insertBefore(kabeBottom, document.body.firstChild);
}

function moveKabe() {
    var kabes = document.getElementsByClassName("kabe");
    for (var i = 0; i < kabes.length; i++) {
        var left = parseInt(kabes[i].style.left.replace(/px/, ""));
        left -= 10;
        if (left < -kabes[i].getBoundingClientRect().width) {
            kabes[i].remove();
        } else {
            kabes[i].style.left = left + "px";
        }
    }
}

function moveBackground() {
    bgX -= 10;
    document.body.style.backgroundPosition = bgX + "px";
}

function checkCollision() {
    var kabes = document.getElementsByClassName("kabe");
    var hasutoRect = hasuto.getBoundingClientRect();
    for (var i = 0; i < kabes.length; i++) {
        var kabeRect = kabes[i].getBoundingClientRect();
        if (kabeRect.left < hasutoRect.right && hasutoRect.left < kabeRect.right) {
            if (kabeRect.top < hasutoRect.bottom && hasutoRect.top < kabeRect.bottom) {
                end();
            }
        }
    }
}