let canvas = document.getElementById('canvas');

let width = 600;
let height = 600;

canvas.width = width;
canvas.height = height;

let ctx = canvas.getContext("2d");
let blockSize = 30;
let board = [
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
[1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
[1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
[1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
[1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
[1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
[1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
[1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
[1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
[1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
[1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let wall = new Image();
wall.src = "images/zed.png";

let house = new Image();
house.src = "images/chaloupka.png"

let playerImg = new Image(blockSize,blockSize);
playerImg.src = "images/pernicek_doprava.png";

let player = {
  x: 1,
  y: 1,
  img: playerImg
};

let gift1Img = new Image(blockSize,blockSize);
gift1Img.src = "images/darek2.png";
let gift1 = {
  img:gift1Img
};

let gift2Img = new Image(blockSize,blockSize);
gift2Img.src = "images/darek3.png";
let gift2 = {img: gift2Img};

let carpImg = new Image(blockSize,blockSize);
carpImg.src = "images/kapr.png";
let carp = {img: carpImg};

let sockImg = new Image(blockSize,blockSize);
sockImg.src = "images/ponozky.png";
let sock = {img: sockImg};

let glowsImg = new Image(blockSize,blockSize);
glowsImg.src = "images/rukavice.png";
let glows = {img: glowsImg};

let starImg = new Image(blockSize,blockSize);
starImg.src = "images/hvezda.png";
let star = {img: starImg};

let giftList = [gift1,gift2,carp,sock,glows,star];
let scoreCounter = 0;
let maxscore = 6;
let seconds = 60;
let timer;

function generateBoard() {
  let y = 0;
  while (y < board.length) {
    let x = 0;
    while (x < board[y].length) {
      if (board[y][x] === 1) {
        ctx.drawImage(wall,x*blockSize,y*blockSize,blockSize,blockSize)
      }
      x++
    }
    y++
  }
  ctx.drawImage(house,18*blockSize,17*blockSize,blockSize,blockSize);
}

function move(key) {
  ctx.clearRect(player.x*blockSize,player.y*blockSize,blockSize,blockSize)
  switch(key) {
    case "ArrowDown":
      playerImg.src = "images/pernicek_dolu.png";
      if (board[player.y + 1][player.x] != 1) {
        player.y++
      }
      break;
    case "ArrowUp":
      playerImg.src = "images/pernicek_nahoru.png";
      if (board[player.y - 1][player.x] != 1) {
      player.y--
      }
      break;
    case "ArrowLeft":
      playerImg.src = "images/pernicek_doleva.png";
      if (board[player.y][player.x - 1] != 1) {
      player.x--
      }
      break;
    case "ArrowRight":
      playerImg.src = "images/pernicek_doprava.png";
      if (board[player.y][player.x + 1] != 1) {
      player.x++
      }
      break;
    default:
      break;
  }
  ctx.drawImage(player.img,player.x*blockSize,player.y*blockSize,blockSize,blockSize)
}

window.addEventListener('load',prepareBoard);
document.body.addEventListener('keydown', event => {
  draw()
});

function prepareBoard() {
  generateBoard();
  hideGifts();
  ctx.drawImage(player.img,player.x*blockSize,player.y*blockSize,blockSize,blockSize);
}

function draw() {
  move(event.key);
  getScore();
  if (player.x === 18 && player.y === 17) {
    if (scoreCounter === maxscore) {
      endVictory();
    } else {
      endDefeat();
    }
  }
}

function hideGifts() {
  let g = 0;
  while (g < 6) {
    let random = {
      x: Math.ceil(Math.random()*18 + 1),
      y: Math.ceil(Math.random()*18 + 1)
    }
    if (!board[random.y][random.x]) {
      ctx.drawImage(giftList[g].img,random.x*blockSize,random.y*blockSize,blockSize,blockSize);
      giftList[g].y = random.y
      giftList[g].x = random.x;
      g++;
    } 
  }
}

function getScore() {
 giftList.forEach((arr,ind) => {
   console.log(arr.y + " " + arr.x)
    if(arr.y == player.y && arr.x == player.x) {
      scoreCounter++;
      document.getElementById("score").textContent = `${scoreCounter}/6`;
      giftList.splice(ind,1)
    }
  })
}

function startGame() {
  let welcomeScreen = document.getElementById("start");
  welcomeScreen.style.display = "none";
  timer = setInterval(function(){
    seconds--;
    document.getElementById('time').innerHTML = "0:" + seconds;
    if (seconds == 0) {
      endDefeat();
      clearInterval(timer);
    }
  },1000)
}

function endDefeat() {
  var video = document.getElementById('video');
  document.getElementById("video-source").setAttribute('src', 'animations/codemas prohra.mp4');
  video.load();
  let defeatScreen = document.getElementById("end");
  defeatScreen.style.display = "block";
}

function endVictory() {   
  document.getElementById("end").style.display = "block";
  clearInterval(timer);
}


/*document.body.addEventListener('keyup', event => {
  event.key = ""
  draw()
})*/