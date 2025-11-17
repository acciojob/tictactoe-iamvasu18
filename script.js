//your JS code here. If required.
const submitBtn = document.getElementById('submit');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const playerForm = document.getElementById('player-form');
    const gameDiv = document.getElementById('game');
    const messageDiv = document.querySelector('.message');
    const boardDiv = document.getElementById('board');

    let player1 = '';
    let player2 = '';
    let currentPlayer = '';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    submitBtn.addEventListener('click', () => {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();

      if (player1 === '' || player2 === '') {
        alert('Please enter names for both players!');
        return;
      }

      currentPlayer = player1;
      playerForm.style.display = 'none';
      gameDiv.style.display = 'block';
      messageDiv.textContent = `${currentPlayer} you're up!`;
      createBoard();
    });

    function createBoard() {
      boardDiv.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i + 1;
        cell.addEventListener('click', handleCellClick);
        boardDiv.appendChild(cell);
      }
    }

    function handleCellClick(e) {
      const index = e.target.id - 1;

      if (board[index] !== '' || gameOver) return;

      board[index] = currentPlayer === player1 ? 'x' : 'o';
      e.target.textContent = board[index];

      if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won! 🎉`;
        gameOver = true;
        return;
      }

      if (board.every(cell => cell !== '')) {
        messageDiv.textContent = `It's a draw! 🤝`;
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;
      messageDiv.textContent = `${currentPlayer}, you're up!`;
    }

    function checkWinner() {
      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
      });
    }