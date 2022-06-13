// Gameboard
let gameBoard = (function(){
    let board = [];
    let boardPlaceholder = "⬜"
    let boardHtml = document.querySelector("#game-board") 
    let resetBoard = function(){
        for (let i = 0; i < 9; i++){
            boardHtml.innerHTML = " "
            board[i] = boardPlaceholder
        }
    }
    // Logs board to console
    let renderBoard = function(){
        for (let i = 0; i < 9; i++){
            boardHtml.innerHTML += `<span style="cursor:pointer" id="${i}">${board[i]}</span>`;
        }
        
    }
    let updateBoard = function(){
        boardHtml.innerHTML = " "
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
        updateBoard:updateBoard,
        placeholder:boardPlaceholder
    }
})();

// Player Factory
let playerFactory = (name, shape, placement) => {
    return {name, shape, placement}
}

// Logic Controller
let game = (function(){
    let player1 = playerFactory();
    let player2 = playerFactory();
    let emojis = ["👹", "😼", "💀", "🤢", "🥵", "🤡", "😈", "🥶", "👽"]
    let container = document.querySelector("#game-container");
    let board = document.querySelector("#game-board");
    let emoji = document.querySelector("#emoji-board");
    let humanButton = document.querySelector("#human"); 
    let robotButton = document.querySelector("#robot"); 
    let buttonArea = document.querySelector("#button-area");
    let pickEmoji = document.createElement("h3");
    let playerNumber = 1;
    let nameForm = document.querySelector("#name-form");
    let turn = 0;
    let renderEmojis = function(){
        for (let i = 0; i < 9; i++){
            emoji.innerHTML += `<span style="cursor:pointer" id="${i}">${emojis[i]}</span>`;
        }
        
    }
    let currentPlayer = function(){
        if (player2.name == "Robot"){
            return player1
        }
        if (playerNumber == 1){    
            playerNumber = 2;
            return player1
        }
        else{
            playerNumber = 1;
            return player2
        }
    };
    let reset = function(){
        playerNumber = 1;
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
    let declareWinner = function(player){
        if (turn >= 2){
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
        turn = 0;
        } else {
            return
        }
    }
    let winner = function(player){
        if (gameBoard.board[0] == gameBoard.board[1] && gameBoard.board[1] == gameBoard.board[2]){
            if (gameBoard.board[0] != gameBoard.placeholder){
                declareWinner(player)
            }
        }
        if (gameBoard.board[3] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[5]){
            if (gameBoard.board[3] != gameBoard.placeholder){
                declareWinner(player)
            }
        }
        if (gameBoard.board[6] == gameBoard.board[7] && gameBoard.board[7] == gameBoard.board[8]){
            if (gameBoard.board[6] != gameBoard.placeholder){
                declareWinner(player)
            }
        }
        if (gameBoard.board[0] == gameBoard.board[3] && gameBoard.board[3] == gameBoard.board[6]){
            if (gameBoard.board[0] != gameBoard.placeholder){
                declareWinner(player)
            }
        }
        if (gameBoard.board[1] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[7]){
            if (gameBoard.board[1] != gameBoard.placeholder){
                declareWinner(player)
            }
        }
        if (gameBoard.board[2] == gameBoard.board[5] && gameBoard.board[5] == gameBoard.board[8]){
            if (gameBoard.board[2] != gameBoard.placeholder){
                declareWinner(player)
            }
        }
        if (gameBoard.board[0] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[8]){
            if (gameBoard.board[0] != gameBoard.placeholder){
                declareWinner(player)
            }
        }
        if (gameBoard.board[2] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[6]){
            if (gameBoard.board[2] != gameBoard.placeholder){
                declareWinner(player)
            }
        }
        turn++
        if (turn == 9){
            pickEmoji.remove();
            board.style.display = "none";
            let winnerTag = document.createElement("h3")
            winnerTag.style.marginTop = "-35px";
            let newGame = document.createElement("button")
            winnerTag.textContent = "☠️ Draw Game ☠️"
            newGame.textContent = "Reset"
            container.append(winnerTag);
            container.append(newGame)
            newGame.addEventListener("click", function(){
                newGame.remove();
                winnerTag.remove();
                buttonArea.style.display = "flex";            
            });
            turn = 0;
        }
        
    }
    
    let checkWinner = function(player){
        if (gameBoard.board[0] == gameBoard.board[1] && gameBoard.board[1] == gameBoard.board[2]){
            if (gameBoard.board[0] == player.shape){
                return true
            }
        }
        if (gameBoard.board[3] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[5]){
            if (gameBoard.board[3] == player.shape){
                return true
            }
        }
        if (gameBoard.board[6] == gameBoard.board[7] && gameBoard.board[7] == gameBoard.board[8]){
            if (gameBoard.board[6] == player.shape){
                return true
            }
        }
        if (gameBoard.board[0] == gameBoard.board[3] && gameBoard.board[3] == gameBoard.board[6]){
            if (gameBoard.board[0] == player.shape){
                return true
            }
        }
        if (gameBoard.board[1] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[7]){
            if (gameBoard.board[1] == player.shape){
                return true
            }
        }
        if (gameBoard.board[2] == gameBoard.board[5] && gameBoard.board[5] == gameBoard.board[8]){
            if (gameBoard.board[2] == player.shape){
                return true
            }
        }
        if (gameBoard.board[0] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[8]){
            if (gameBoard.board[0] == player.shape){
                return true
            }
        }
        if (gameBoard.board[2] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[6]){
            if (gameBoard.board[2] == player.shape){
                return true
            }
        }
        if (turn == 9){
            return "draw"
        }
    }
    // Player Turn
    let playerTurn = function(player, target){
        if (player == player2){
            pickEmoji.textContent = `${player1.name}'s turn ${player1.shape}`
        } else {
            pickEmoji.textContent = `${player2.name}'s turn ${player2.shape}`
        }
        if (player2.name == "Robot"){
            pickEmoji.textContent = `${player1.name}'s turn ${player1.shape}`;
        } 
        
        if (player.shape == " "){
            player.shape = target.innerHTML;
            if (target.innerHTML != gameBoard.placeholder){
                target.innerHTML = gameBoard.placeholder;
                return
            }
            if (player.shape == gameBoard.placeholder){
                player.shape = " ";

            }
        }
        else if (target.innerHTML == gameBoard.placeholder){

            target.innerHTML = player.shape
            gameBoard.board[target.id] = player.shape
            winner(player)
            if (player2.name == "Robot"){
                robotTurn(gameBoard.board);
                player = player2;
                gameBoard.updateBoard();
                winner(player)
            } 
            
        }
        else{

        }
    }
    // Minimax - implemented based on this video: https://www.youtube.com/watch?v=2Tr8LkyU78c

    let minimax = function(board, depth, isMaximizing){
        if (checkWinner(player2)){
            return 1
        } else if (checkWinner(player1)){
            return -1
        } else if (checkWinner(player2) == "draw"){
            return 0
        }

        if (isMaximizing){
            let bestScore = -1;
            let score = 0;
            for (let i = 0; i < 9; i++){
                if (board[i] == gameBoard.placeholder){
                    board[i] = player2.shape;
                    score = minimax(board, 0,false)
                    board[i] = gameBoard.placeholder;
                    if (score > bestScore){
                        bestScore = score;
                    }
                }
            }
            return bestScore  
        } else {
            let bestScore = 1;
            let score = 0;
            for (let i = 0; i < 9; i++){
                if (board[i] == gameBoard.placeholder){
                    board[i] = player1.shape;
                    score = minimax(board, 0,true)
                    board[i] = gameBoard.placeholder;
                    if (score < bestScore){
                        bestScore = score;
                    }
                }
            } 
            return bestScore 
        }
        

    }
    // Minimax - implemented based on this video: https://www.youtube.com/watch?v=2Tr8LkyU78c
    let robotTurn = function(board){
        let bestScore = -1;
        let bestMove = 0;
        let score = 0;
        for (let i = 0; i < 9; i++){
            if (board[i] == gameBoard.placeholder){
                board[i] = player2.shape;
                score = minimax(board, 0,false)
                board[i] = gameBoard.placeholder;
                if (score > bestScore){
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        gameBoard.board[bestMove] = player2.shape;
    }
    // Start Game
    let start = function (){ 
        humanButton.addEventListener("click", function(){
            buttonArea.style.display = "none";
            nameForm.style.display ="flex";
            reset();  
        })
        robotButton.addEventListener("click", function(){
            buttonArea.style.display = "none";
            reset();  
            renderEmojis();
            player2.name = "Robot"
            player1.name = "Player1"
            emoji.style.display = "grid";
            pickEmoji.textContent = "Pick your Emoji!";
            container.append(pickEmoji);
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
            if (player2.name == "Robot"){
                player2.shape = "🤖"
            }
            if (player2.name == "Snake"){
                player2.shape = "🐍"
            }
            if (player1.shape != " " && player2.shape != " "){
                gameBoard.renderBoard();
                emoji.style.display = "none";
                board.style.display = "grid";
                pickEmoji.textContent = `${player1.name}'s turn ${player1.shape}`;
                if (player2.name == "Robot"){
                    robotTurn(gameBoard.board);
                    player = player2;
                    gameBoard.updateBoard();
                    winner(player)
                } 
                return
            }
            pickEmoji.textContent = `${player2.name} pick your Emoji!`;
        })
        
        
    }
    return{
        start:start,
    }
})();

game.start();
