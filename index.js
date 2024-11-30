const boxes = document.querySelectorAll(".box");
const gameInfo =document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
init();
function init(){
    currentPlayer="X"
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.textContent="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index}`;
    })
    newgamebtn.classList.remove("active");
    gameInfo.textContent=`Current Player - ${currentPlayer}`;
}

function swapturn(){
    if(currentPlayer === "X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.textContent=`Current Player - ${currentPlayer}`;
}

function checkgameover(){
    let ans=""
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[0]] === gameGrid[position[2]])){
            ans=gameGrid[position[0]];
            
            boxes.forEach((box)=>{
                box.style.pointerEvents="none"
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })
    if(ans!=""){
        gameInfo.textContent=`Winner Player - ${ans}`;
        newgamebtn.classList.add("active");
        return;
    }
    let count=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            count++;
        }
    })
    if(count===9){
        gameInfo.textContent="Game Tied !";
        newgamebtn.classList.add("active");
    }

}
function handleclick(index){
    if(gameGrid[index]===""){
        boxes[index].textContent=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapturn();
        checkgameover();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index)
    })
})
newgamebtn.addEventListener("click",init);