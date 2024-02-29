// Select Boxes Container
const container = document.querySelector(".container");

// Select All Boxes
const boxes = Array.from(container.querySelectorAll(".box"));

// Create Array From All Backs
const allBack = Array.from(container.querySelectorAll(".back"));

let countCorrect = 0;
let countWrongs = 0;

const boxesSrcs = [];
const imgsSrcs = [];

// Select Play Again Button
const playAgain = document.querySelector(".play-again");
const correct = document.querySelector(".correct-count");

random();

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.classList.add("flip");

    // Add The Clicked Box to the Array
    boxesSrcs.push(box);

    // Get The Image from Clicked Box & Add it
    imgsSrcs.push(box.querySelector(".back img").src);

    // if a box clicked stop clicking on it
    if (boxesSrcs.length === 1) {
      boxesSrcs[0].classList.add("pointerfreeze");
    }

    // If There's Two Selected Boxes
    else if (boxesSrcs.length === 2) {
      container.classList.add("pointerfreeze");

      // Stop Clicking Function
      removeFreeze();

      // If The Two Images are The Same
      if (imgsSrcs[0] === imgsSrcs[1]) {
        // If The Clicked Boxes Contain flip Class then Stop Clicking on it
        boxesSrcs.forEach((box) =>
          box.classList.contains("flip")
            ? box.classList.add("pointerfreeze")
            : false
        );

        countCorrect++;
        countCorrectFn();
        imgsSrcs.length = 0;
        ifAllCorrect();
      } else {
        boxesSrcs[0].classList.remove("pointerfreeze");
        countWrongs++;
        countWrongsFn();
      }
    }

    boxesSrcs.length === 2 && (boxesSrcs.length = 0);
  });
});

// Stop Clicking Function
function removeFreeze() {
  setTimeout(() => {
    container.classList.remove("pointerfreeze");
  }, 1500);
}

// Remove flip Class
function removeFlip(box) {
  setTimeout(() => {
    box.classList.remove("flip");
  }, 1300);
}

// Count Correct Attempts
function countCorrectFn() {
  setTimeout(() => {
    correct.textContent = `${countCorrect} / ${boxes.length / 2}`;
    success.play();
  }, 1000);
}

// Count Wrong Tries
function countWrongsFn() {
  setTimeout(() => {
    wrongTries.innerText = countWrongs;
  }, 1200);

  boxesSrcs.forEach((box) => {
    setTimeout(() => {
      fail.play();
    }, 1200);

    removeFlip(box);
    imgsSrcs.length = 0;
  });
}

// Ask to Play Again
function playAgainFn() {
  setTimeout(() => {
    playAgain.classList.add("show");
  }, 4500);

  boxes.forEach((box) => {
    box.classList.remove("pointerfreeze");
  });
}

// If Play Again Clicked
playAgain.addEventListener("click", () => {
  playAgain.classList.remove("show");

  boxes.forEach((box) => {
    box.classList.remove("flip");
  });

  countCorrect = 0;
  countWrongs = 0;
  correct.textContent = `${countCorrect} / ${boxes.length / 2}`;
  wrongTries.innerText = countWrongs;
  random();
});

// Generate Random Confetti
const randomConfetti = () => {
  const cont = document.createElement("div");
  congrats.append(cont);
  const createCongrats = setInterval(() => {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.innerHTML = `<img src="imgs/confetti.png">`;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDuration = `${(Math.random() + 0.5) * 1.5}s`;
    cont.append(confetti);
  }, 50);

  setTimeout(() => {
    clearInterval(createCongrats);
  }, 3000);

  setTimeout(() => {
    cont.remove();
  }, 5000);
};

// Check If All Correct
function ifAllCorrect() {
  if (countCorrect === boxes.length / 2) {
    setTimeout(() => {
      randomConfetti();
    }, 1500);
    playAgainFn();
  }
}

// Generate Random Logos
function random() {
  const orderedArr = [];
  for (let i = 1; i <= 10; i++) {
    orderedArr.push(
      `<img src="imgs/${i}.png" alt="Car logo">`,
      `<img src="imgs/${i}.png" alt="Car logo">`
    );
  }

  function rand(max) {
    return Math.floor(Math.random() * max);
  }

  const ranomizedArr = [];
  for (let i = 0; i < 20; i++) {
    const random = rand(orderedArr.length);
    ranomizedArr[i] = orderedArr[random];
    orderedArr.splice(random, 1);
  }

  for (let i = 0; i < allBack.length; i++) {
    allBack[i].innerHTML = ranomizedArr[i];
  }
}
