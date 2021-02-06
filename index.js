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

    let clearBoard = function(){gameboard=[['','',''],['','',''],['','','']];};

    let piecesPlayed = function(){  //returns the pieces placed
        let count = 0;
        gameboard.forEach(row=>row.forEach(ele=>ele!=''?count++:''));
        return count
    };

    let playPiece = function(x,y){  //plays a piece on the board if it is a valid move
        let piece = piecesPlayed()%2==0 ? 'X' : 'O';
        if (gameboard[x][y]==''){  //places a piece
            gameboard[x][y]=piece;
        }
    };

    let gameOver = function(){  //function that checks if there is a tie game
        if(piecesPlayed()==9){
            return true
        }
        else{
            return false
        }
    }

    let wonGame = function(){  //function that returns the piece if there is a winner, else returns false for a lost game or '' for no progress
        let ans = '';
        if(gameOver()){  //first checks if game is over
            ans = false;
        }
        gameboard.forEach(row=>  //check each row for a win
            {if(row.every(ele=>ele==row[0]&&ele!='')&&row.length==3){
                ans = row[0];
            }}
            );
        
        for (i=0;i<3;i++){  //check each column
            let column = [...gameboard[0][i],gameboard[1][i],gameboard[2][i]];
            if(column.every(ele=>ele==column[0]&&ele!='')&&column.length==3){
                ans = column[0];
            };
        };

        if((gameboard[0][0]==gameboard[1][1]&&gameboard[1][1]==gameboard[2][2]&&gameboard[0][0]!=''&&gameboard[1][1]!=''&&gameboard[2][2]!='')||(gameboard[0][2]==gameboard[1][1]&&gameboard[1][1]==gameboard[2][0]&&gameboard[2][0]!=''&&gameboard[1][1]!=''&&gameboard[0][2]!='')){
            ans = gameboard[1][1];  //check diagonal
        }
        
        return ans
    };

    return {
        getBoard,playPiece,wonGame,clearBoard
    }
})();

let displayController = (function(){
    let grid = document.querySelector('#grid');

    let intializeGame = function(){
        intializeBoard();
    }
    

    let intializeBoard = function(){ //function that updates the display to match the game board
        grid.innerHTML = '';
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

    let userClick = function(e){  //function that adds a piece when a user clicks
        let [x,comma,y] = e.target.getAttribute('data-key');
        if(gameboard.wonGame()==''&&gameboard.getBoard()[x][y]==''){
            gameboard.playPiece(x,y);
            console.table(gameboard.getBoard()); //display boardstae
            intializeBoard();
            userWon();}
    };

    let userWon = function(){
        switch (gameboard.wonGame()){
            case 'X':
                alert('x won');
                break;
            case 'O':
                alert('o won');
                break;
            case false:
                alert('tie game')
        };
    };

    let newGame = function(){ //new game button
        gameboard.clearBoard()
        intializeBoard()
    }
    let restartButton = document.querySelector('#restart');
    restartButton.addEventListener('click',newGame);

    return {
        intializeGame
    }
})();


// //test code for player factory function
let player1 = createPlayer("player1");
let player2 = createPlayer("player2");
console.log(player1.getScore());
console.log(player1.getUserName());
player2.increaseScore();
console.log(player2.getScore());
console.log(player2.getUserName());

// gameboard.playPiece(0,0)
// gameboard.playPiece(1,2)
// gameboard.playPiece(0,1)
// gameboard.playPiece(2,2)
// gameboard.playPiece(0,2)



//main code
displayController.intializeGame()