// Gameboard
let gameBoard = (function(){
    
    let n = 1;
    let board = [];
    let boardPlaceholder = "⬜"
    let boardHtml = document.querySelector("#game-board") 
    let resetBoard = function(){
        for (let i = 0; i < 9; i++){
            boardHtml.innerHTML = " "
            board[i] = boardPlaceholder
        }
        n = 1;
    }
    // Logs board to console
    let renderBoard = function(){
        for (let i = 0; i < 9; i++){
            boardHtml.innerHTML += `<span style="cursor:pointer" id="${i}">${board[i]}</span>`;
        }
        
    }
    // Checks if an entry is valid
    let valid = function(entry){
        if (board[entry] == boardPlaceholder){
            return true;
        }
        else{
            return false;
        }
    }
    return{
        board:board,
        renderBoard: renderBoard,
        valid:valid,
        resetBoard: resetBoard,
        placeholder:boardPlaceholder
    }
})();

// Player 1
let player1 = {
    name:" ",
    score:0,
    shape:" ",
    placement:0
}

// Player 2
let player2 = {
    name:" ",
    score:0,
    shape:" ",
    placement:0
}


// Logic Controller
let game = (function(){
    let emojis = ["👹", "😼", "🐍", "👽", "🥵", "🤡", "😈", "🥶", "🤢"]
    let container = document.querySelector("#game-container");
    let board = document.querySelector("#game-board");
    let emoji = document.querySelector("#emoji-board");
    let humanButton = document.querySelector("#human"); 
    let buttonArea = document.querySelector("#button-area");
    let pickEmoji = document.createElement("h3");
    let round = 0;
    let playerNumber = 2;
    let nameForm = document.querySelector("#name-form");
    let renderEmojis = function(){
        for (let i = 0; i < 9; i++){
            emoji.innerHTML += `<span style="cursor:pointer" id="${i}">${emojis[i]}</span>`;
        }
        
    }
    let currentPlayer = function(){
        if (playerNumber == 2){
            playerNumber = 1;
            return player1
        }
        else{
            playerNumber = 2;
            return player2
        }
    };
    let reset = function(){
        playerNumber = 2;
        gameBoard.resetBoard();
        emoji.innerHTML = " ";
        player2.placement = -1;
        player1.placement = -1;
        player2.name = " ";
        player1.name = " ";
        player1.shape = " ";
        player2.shape = " ";
    }
    // Determines winner
    let winner = function(player){
        if (gameBoard.board[0] == gameBoard.board[1] && gameBoard.board[1] == gameBoard.board[2]){
            if (gameBoard.board[0] != gameBoard.placeholder){
                return true
            }
        }
        if (gameBoard.board[3] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[5]){
            if (gameBoard.board[3] != gameBoard.placeholder){
                return true
            }
        }
        if (gameBoard.board[6] == gameBoard.board[7] && gameBoard.board[7] == gameBoard.board[8]){
            if (gameBoard.board[6] != gameBoard.placeholder){
                return true
            }
        }
        if (gameBoard.board[0] == gameBoard.board[3] && gameBoard.board[3] == gameBoard.board[6]){
            if (gameBoard.board[0] != gameBoard.placeholder){
                return true
            }
        }
        if (gameBoard.board[1] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[7]){
            if (gameBoard.board[1] != gameBoard.placeholder){
                return true
            }
        }
        if (gameBoard.board[2] == gameBoard.board[5] && gameBoard.board[5] == gameBoard.board[8]){
            if (gameBoard.board[2] != gameBoard.placeholder){
                return true
            }
        }
        if (gameBoard.board[0] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[8]){
            if (gameBoard.board[0] != gameBoard.placeholder){
                return true
            }
        }
        if (gameBoard.board[2] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[6]){
            if (gameBoard.board[2] != gameBoard.placeholder){
                return true
            }
        }
        
    }
    // Player Turn
    let playerTurn = function(player, target){
        if (player == player2){
            pickEmoji.textContent = `${player1.name}'s turn`
        } else {
            pickEmoji.textContent = `${player2.name}'s turn`
        }
        
        if (player.shape == " "){
            player.shape = target.innerHTML;
            if (target.innerHTML != gameBoard.placeholder){
                target.innerHTML = gameBoard.placeholder;
            }
            if (player.shape == gameBoard.placeholder){
                player.shape = " ";
                currentPlayer();
            }
        }
        else if (target.innerHTML == gameBoard.placeholder){

            target.innerHTML = player.shape
            gameBoard.board[target.id] = player.shape 
            if (winner(player)){
                pickEmoji.remove();
                board.style.display = "none";
                let winnerTag = document.createElement("h3")
                winnerTag.style.marginTop = "-35px";
                let newGame = document.createElement("button")
                winnerTag.textContent = `${player.name}${player.shape} Wins!`
                newGame.textContent = "Reset"
                container.append(winnerTag);
                container.append(newGame)
                newGame.addEventListener("click", function(){
                    newGame.remove();
                    winnerTag.remove();
                    buttonArea.style.display = "flex";            
                });

            }
        }
        else{
            currentPlayer()
        }
    }
    // Start Game
    let start = function(){
        reset()
        for (let i = 0; i < 9; i++){
            playerTurn(player1);
            playerTurn(player2);
        }
        console.log("Game Over!")
        round = 0;
    }

    let eventListener = function (){ 
        humanButton.addEventListener("click", function(){
            buttonArea.style.display = "none";
            nameForm.style.display ="flex";
            reset();

            
            
        })
        nameForm.addEventListener("submit", function(e){
            e.preventDefault();
            nameForm.style.display ="none";
            player1.name = document.querySelector("#p1-name").value;
            player2.name = document.querySelector("#p2-name").value;
            renderEmojis();
            emoji.style.display = "grid";
            pickEmoji.textContent = `${player1.name} pick your Emoji!`;
            container.append(pickEmoji);
            
        })
        board.addEventListener("click", function(e){
            playerTurn(currentPlayer(), e.target);
        })
        emoji.addEventListener("click", function(e){
            playerTurn(currentPlayer(), e.target);
            pickEmoji.textContent = `${player2.name} pick your Emoji!`;
            if (player1.shape != " " && player2.shape != " "){
                gameBoard.renderBoard();
                emoji.style.display = "none";
                board.style.display = "grid";
                pickEmoji.textContent = `${player1.name}'s turn`;
            }
        })
        
        
    }
    return{
        start:start,
        eventListener:eventListener
    }
})();

game.eventListener();
