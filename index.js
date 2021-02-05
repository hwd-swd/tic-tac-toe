//factory function for players

function createPlayer(userName){
    let score=0;
    return {
        userName: userName,
        score :score,
        getUserName(){return userName},
        getScore(){return score},
        increaseScore(){score++}
    }
}

let gameboard  = (function (){
    let gameboard = [['','',''],['','',''],['','','']];  //intialize the board

    let getBoard = function(){return gameboard}; //returns the board

    let piecesPlayed = function(){  //returns the pieces placed
        let count = 0;
        gameboard.forEach(row=>row.forEach(ele=>ele!=''?count++:''));
        return count
    };

    let playPiece = function(x,y){  //plays a piece on the board if it is a valid move
        let piece = piecesPlayed()%2==0 ? 'X' : 'O';
        if (x<0||x>2||y<0||y>2){  
            return false
        }
        else if (gameboard[x][y]==''){  //places a piece
            gameboard[x][y]=piece;
        }
        else{
            return false
        }
    };



    return {
        getBoard,piecesPlayed,playPiece
    }
})();

let displayController = (function(){
    let board = gameboard.getBoard();
    let grid = document.querySelector('#grid');

    let intializeBoard = function(){
        clearBoard()
        for (i=0;i<3;i++){
            for(j=0;j<3;j++){
                let temp = document.createElement('div');
                
                temp.setAttribute('data-key',[i,j])
                temp.classList.add("cell");
                if (gameboard.getBoard()[i][j]!=""){
                    temp.innerHTML=gameboard.getBoard()[i][j];
                }
                else{
                    temp.innerHTML = "";
                }
                grid.appendChild(temp);
            }
        }

        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell=>cell.addEventListener('click',userClick));
    };


    let clearBoard = function(){
        grid.innerHTML = '';
    };

    let userClick = function(e){  //function that adds a piece when a user clicks
        let [x,comma,y] = e.target.getAttribute('data-key');
        gameboard.playPiece(x,y);
        console.table(gameboard.getBoard())
        displayController.intializeBoard()
    }

    return {
        intializeBoard
    }
})();


// //test code for player factory function
let bob = createPlayer("bob");
let bill = createPlayer("bill");
console.log(bob.getScore());
console.log(bob.getUserName());
bill.increaseScore();
console.log(bill.getScore());
console.log(bill.getUserName());

gameboard.playPiece(1,2)
console.log(gameboard.piecesPlayed())
console.log(gameboard.getBoard())

//main code
displayController.intializeBoard()