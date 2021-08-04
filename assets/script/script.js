const cards = document.querySelectorAll(".game-cards__container");
const timer = document.querySelector(".initial-time");
const startButton = document.querySelector(".start-btn");
const resetButton = document.querySelector(".reset-btn");
const clickCountText = document.querySelector(".game-stats__click-count");
const title = document.querySelector(".header__title");
let firstClick = false;
let firstCard = null;
let matchedCardTotal = 0;
let clickCount = 0;
let gameOn;

function playGame(event) {
  if (!firstClick) {
    window.alert(
      `Well... Maybe you should have clicked 'start' to start? Maybe? Just sayin' 🤓`
    );
  } else {
    const audio = event.currentTarget.querySelector("audio");
    playSound(audio);
    clickCount++;
    clickCountText.innerHTML = `Clicks: ${clickCount}`;
    const currentCard = event.currentTarget.dataset.cardnumber;
    if (firstCard == null) {
      firstCard = currentCard;
    } else if (firstCard == currentCard) {
      firstCard = null;

      const matchedCards = document.querySelectorAll(
        `[data-cardNumber="${currentCard}"]`
      );

      matchedCards.forEach((card) => card.classList.add("matched"));
      matchedCardTotal++;

      if (matchedCardTotal == 8) {
        //stop timer
        clearInterval(gameOn);
        title.innerHTML = ` Yey! You finished it! 😍`;
        title.classList.add("header__finished-title");
        //prevent click events
        function handler(e) {
          e.stopPropagation();
          e.preventDefault();
        }
        cards.forEach((card) => {
          card.addEventListener("click", handler, true);
        });
      }
    } else {
      firstCard = null;
    }
  }
}

function playSound(audio) {
  audio.play();
}

function startTimer() {
  firstClick = true;
  let time = 0;
  function incrementTime() {
    timer.innerHTML = ++time;
  }
  gameOn = setInterval(incrementTime, 1000);

  startButton.removeEventListener("click", startTimer);
}

function resetGame() {
  location.reload();
}

cards.forEach((card) => card.addEventListener("click", playGame, false));
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetGame);
