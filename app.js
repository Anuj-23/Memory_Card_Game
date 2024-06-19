document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const scoreDisplay = document.getElementById('score');
    const shuffleButton = document.getElementById('shuffleButton');
    const restartButton = document.getElementById('restartButton');
    let score = 0;
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.getAttribute('data-card-value');

        if (!hasFlippedCard) {
            // first click
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // second click
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        updateScore();
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 16);
            card.style.order = randomPos;
        });
    }

    function restartGame() {
        cards.forEach(card => {
            card.classList.remove('flipped');
            card.textContent = '';
            card.addEventListener('click', flipCard);
        });
        score = 0;
        updateScore();
        shuffle();
        resetBoard();
    }

    function updateScore() {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    shuffleButton.addEventListener('click', shuffle);
    restartButton.addEventListener('click', restartGame);

    cards.forEach(card => card.addEventListener('click', flipCard));

    // Initial setup
    score = 0;
    updateScore();
    shuffle();
});
