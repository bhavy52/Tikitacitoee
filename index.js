document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const resetButton = document.getElementById('reset');
    let turn = "X";
    let isgameover = false;

    // Function to change the turn
    const changeTurn = () => {
        return turn === "X" ? "O" : "X";
    };

    // Function to check for a win
    const checkWin = () => {
        let boxtext = document.getElementsByClassName('boxtext');
        let wins = [
            [0, 1, 2, 5, 5, 0],
            [3, 4, 5, 5, 15, 0],
            [6, 7, 8, 5, 25, 0],
            [0, 3, 6, -5, 15, 90],
            [1, 4, 7, 5, 15, 90],
            [2, 5, 8, 15, 15, 90],
            [0, 4, 8, 5, 15, 45],
            [2, 4, 6, 5, 15, 135],
        ];
        wins.forEach(e => {
            if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
                document.querySelector('.info').innerText = "The Winner Is: " + boxtext[e[0]].innerText;
                isgameover = true;
                gameover.play();
                document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            }
        });
    };

    // Function to send game state data to the server
    const sendGameStateToServer = () => {
        const player_name = "Anonymous"; // Default player name
        const turns = getGameState();
        const winner = ""; // You need to set this based on your game logic
        fetch('process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `player_name=${player_name}&turns=${turns}&winner=${winner}`,
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    };

    // Function to get the current game state
    const getGameState = () => {
        const boxtexts = document.querySelectorAll('.boxtext');
        let gameState = '';
        boxtexts.forEach(boxtext => {
            gameState += boxtext.innerText;
        });
        return gameState;
    };

    // Game Logic
    let audioTurn = new Audio("fartwithreverb.mp3");
    let gameover = new Audio("drumsrolls.mp3");

    Array.from(boxes).forEach(box => {
        box.addEventListener('click', () => {
            const boxtext = box.querySelector('.boxtext');
            if (boxtext.innerText === '') {
                boxtext.innerText = turn;
                turn = changeTurn();
                audioTurn.play();
                checkWin();
                if (!isgameover) {
                    document.querySelector('.info').innerText = "Turn for " + turn;
                }
                // Send game state data to the server after each move
                sendGameStateToServer();
            }
        });
    });

    // Add onclick listener to reset button
    resetButton.addEventListener('click', () => {
        const boxtexts = document.querySelectorAll('.boxtext');
        Array.from(boxtexts).forEach(boxtext => {
            boxtext.innerText = "";
        });
        turn = "X";
        isgameover = false;
        document.querySelector('.info').innerText = "Turn for " + turn;
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    });
});
