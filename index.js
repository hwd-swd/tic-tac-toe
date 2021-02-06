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

    let wonGame = function(){
        let ans = false;
        gameboard.forEach(row=>  //check each row for a win
            {if(row.every(ele=>ele==row[0]&&ele!='')){
                ans = row[0];
            }}
            );
        
        for (i=0;i<3;i++){
            let column = [...gameboard[0][i],gameboard[1][i],gameboard[2][i]];
            if(column.every(ele=>ele==column[0]&&ele!='')){
                ans = column[0];
            };
        };

        if((gameboard[0][0]==gameboard[1][1]&&gameboard[1][1]==gameboard[2][2]&&gameboard[1][1]!='')||(gameboard[0][2]==gameboard[1][1]&&gameboard[1][1]==gameboard[2][0]&&gameboard[1][1]!='')){
            ans = gameboard[1][1];
        }
        return ans
    };

    return {
        getBoard,playPiece,wonGame
    }
})();

let displayController = (function(){
    let board = gameboard.getBoard();
    let grid = document.querySelector('#grid');

    let intializeBoard = function(){ //function that updates the display to match the game board
        clearBoard();
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
        console.table(gameboard.getBoard());
        displayController.intializeBoard();
        userWon();
    };

    let userWon = function(){
        if(gameboard.wonGame()!=false){
            console.log(gameboard.wonGame())
            console.log(gameboard.getBoard())
            alert('won')
        }
    };

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

// gameboard.playPiece(0,0)
// gameboard.playPiece(1,2)
// gameboard.playPiece(0,1)
// gameboard.playPiece(2,2)
// gameboard.playPiece(0,2)

console.log(gameboard.wonGame())
console.log(gameboard.getBoard())

//main code
displayController.intializeBoard()