const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currPlayer;
let gameGrid;
const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//lets create a function to initialize the game
function initGame(){
    currPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerHTML="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`
    })
    newGameBtn.classList.remove("active");
    gameinfo.innerText=`Current Player - ${currPlayer}`;
}
initGame();

function swapTurn(){
    if(currPlayer=="X")
    {
        currPlayer="O";
    }
    else{
        currPlayer="X";
    }
    gameinfo.innerText=`Current Player - ${currPlayer}`
}

function checkGameOver(){
    let answer="";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]]!="" || gameGrid[position[1]] !="" ||gameGrid[position[2]]!="")
        &&(gameGrid[position[0]]==gameGrid[position[1]]) && gameGrid[position[2]]==gameGrid[position[1]] 
        )
        {
            if(gameGrid[position[0]]=="X")
            {
                answer="X";
            }
            else{
                answer="O";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    }) ;
    if(answer!="")
    {
        gameinfo.innerText=`Winner Player - ${answer}`
        newGameBtn.classList.add("active");
        return ;
    }
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!="")
        {
            fillCount++;
        }
    });
    if(fillCount==9)
    {
        gameinfo.innerText=`Game Tied`;
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index]=="")
    {
        boxes[index].innerHTML=currPlayer;
        gameGrid[index]=currPlayer;
        boxes[index].style.pointerEvents="none";
        //swapped turn
        swapTurn();
        checkGameOver();
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);