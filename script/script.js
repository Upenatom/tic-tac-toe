//-----TIC TAC TOE BOARD CREATION-----
const mainDivEle = document.createElement("div");
mainDivEle.classList.add("board");
document.querySelector("body").append(mainDivEle);
mainDivEle.style.backgroundColor = "black";
mainDivEle.style.height = "900px";
mainDivEle.style.width = "900px";
const bodyEl = document.querySelector("body");
bodyEl.style.backgroundColor = "yellow";
let insideDiv = [];
let playerX = 1;

//create 9 sub divs of 290px x 290px
for (let x = 0; x < 9; x++) {
  insideDiv[x] = document.createElement("div");
  insideDiv[x].classList.add("blank");
  insideDiv[x].id = [x];
  mainDivEle.append(insideDiv[x]);
}
const playersTurnEl = document.createElement("h1");
playersTurnEl.classList.add("notification");
playersTurnEl.innerText = "GO PLAYER 'X'!!";
document.querySelector("body").append(playersTurnEl);

let gridArr = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

//---------MAIN EVENT LISTENER AND GAME---------
mainDivEle.addEventListener("click", function (e) {
  assignAndPrompt(e.target, playersTurnEl);
  buildPositionArray(e.target);
  winlogic(playerXWin, playerOWin);
});

//----------FUNCTIONS-----------

//Update the DOM with an X or O where players have clicked and prompt for next player
function assignAndPrompt(targ, prompterEl) {
  if (playerX === 1 && targ.classList.value === "blank") {
    targ.classList.remove("blank");
    targ.classList.add("xclass");
    targ.textContent = "X";
    //switch player
    playerX = playerX * -1;
    prompterEl.innerText = "GO PLAYER 'O'!!";
  } else if (playerX === -1 && targ.classList.value === "blank") {
    targ.classList.remove("blank");
    targ.classList.add("oclass");
    targ.textContent = "O";
    //switchplayer
    playerX = playerX * -1;
    prompterEl.innerText = "GO PLAYER 'X'!!";
  } else if (targ.classList.value !== "blank") {
    return;
  }
}

//assign player spots to gridArr as 1 or -1 to keep track of state in javascript
function buildPositionArray(targ) {
  let counter = 0;
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (parseInt(targ.id) === counter) {
        gridArr[x][y] = playerX * -1;
      }
      counter = counter + 1;
    }
  }
}

function winlogic(cbX, cbO) {
  //check if there is a win in the vertical lines
  let sumVert = 0;
  let sumVertArr = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      sumVert = gridArr[y][x] + sumVert;
    }
    sumVertArr[x] = sumVert;
    sumVert = 0;
  }
  sumVertArr.forEach(function (ele) {
    if (ele === 3) {
      cbX();
    } else if (ele === -3) {
      cbO();
    }
  });

  //check diagonal for win
  let sumDiag1 = 0;
  let sumDiag2 = 0;
  let revcount = 2;
  for (let x = 0; x < 3; x++) {
    sumDiag1 = sumDiag1 + gridArr[x][x];
  }
  for (let x = 0; x < 3; x++) {
    sumDiag2 = sumDiag2 + gridArr[x][revcount];
    revcount = revcount - 1;
  }
  if (sumDiag1 === 3 || sumDiag2 === 3) {
    cbX();
  } else if (sumDiag1 === -3 || sumDiag2 === -3) {
    cbO();
  }
  //check for horizontal win
  let horArr = [];
  let horSum = 0;
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      horSum = horSum + gridArr[x][y];
    }
    horArr[x] = horSum;
    horSum = 0;
  }
  for (let x = 0; x < 3; x++) {
    if (horArr[x] === 3) {
      cbX();
    } else if (horArr[x] === -3) {
      cbO();
    }
  }
}

// win message for player X
function playerXWin() {
  playersTurnEl.innerText = "PLAYER 'X' WINS!!!!";
  // for (let x = 0; x < 10; x++) {
  //   let y = insideDiv[x].classList.value;
  //   insideDiv[x].classList.remove(y);
  //   insideDiv[x].classList.add("win");
  // }
}

//win message for player O
function playerOWin() {
  playersTurnEl.innerText = "PLAYER 'O' WINS!!!!";
  // for (let x = 0; x < 10; x++) {
  //   let y = insideDiv[x].classList.value;
  //   insideDiv[x].classList.remove(y);
  //   insideDiv[x].classList.add("win");
  // }
}
