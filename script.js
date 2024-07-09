const COUNTRIES = [
  {
    alt: "France",
    hint: "Révolution de 1789",
    image: "imgs/country1.avif"
  },
  {
    alt: "Japon",
    hint: "Cerisiers en fleur",
    image: "imgs/country2.avif"
  },
  {
    alt: "États-Unis",
    hint: "Premier atterrissage sur la lune",
    image: "imgs/country3.avif"
  },
  {
    alt: "Brésil",
    hint: "Samba et Carnaval",
    image: "imgs/country4.avif"
  },
  {
    alt: "Inde",
    hint: "Épices et curry",
    image: "imgs/country5.avif"
  },
  {
    alt: "Égypte",
    hint: "Pharaons et momies",
    image: "imgs/country6.avif"
  },
  {
    alt: "Australie",
    hint: "Kangourous et koalas",
    image: "imgs/country7.avif"
  },
  {
    alt: "Chine",
    hint: "Porcelaine et soie",
    image: "imgs/country8.avif"
  },
  {
    alt: "Italie",
    hint: "Cuisine méditerranéenne",
    image: "imgs/country9.avif"
  },
  {
    alt: "Grèce",
    hint: "Mythologie antique",
    image: "imgs/country10.avif"
  },
  {
    alt: "Mexique",
    hint: "Civilisation aztèque",
    image: "imgs/country11.avif"
  },
  {
    alt: "Russie",
    hint: "Ballet et théâtre",
    image: "imgs/country12.avif"
  },
  {
    alt: "Royaume-Uni",
    hint: "Monuments royaux",
    image: "imgs/country13.avif"
  },
  {
    alt: "Espagne",
    hint: "Flamenco",
    image: "imgs/country14.avif"
  },
  {
    alt: "Canada",
    hint: "Sirop d'érable",
    image: "imgs/country15.avif"
  },
  {
    alt: "Argentine",
    hint: "Tango",
    image: "imgs/country16.avif"
  },
  {
    alt: "Thaïlande",
    hint: "Plages exotiques",
    image: "imgs/country17.avif"
  },
  {
    alt: "Allemagne",
    hint: "Voitures de luxe",
    image: "imgs/country18.avif"
  },
  {
    alt: "Afrique du Sud",
    hint: "Nelson Mandela",
    image: "imgs/country19.avif"
  },
  {
    alt: "Kenya",
    hint: "Safaris",
    image: "imgs/country20.avif"
  }
];

let currentCountryIndex = 0;
let score = 0;
let attempts = 3;
let hintUsed = false;
let isAnswerValid = false;

const COUNTRY_IMAGE = document.getElementById("question_image");
const ANSWER_INPUT = document.getElementById("responseInput");
const VALIDATION_BUTTON = document.getElementById("responseSubmit");
const HINT_BUTTON = document.getElementById("hint");
const HINT_DISPLAY = document.getElementById("hint_display");
const RESPONSES_DISPLAY = document.querySelector("#responses_container") 
const SCORE_DISPLAY = document.getElementById("display_points");
const SCORE_DISPLAY_END = document.getElementById("display_points_end");
const ATTEMPTS_DISPLAY = document.getElementById("attempts");
// const RESTART_BUTTON = document.getElementById("restart_button");

const FULL_POINTS = 10;
const HINT_POINTS = 5;

let lastRandomNumber = null;
let playedRound = 0;

document.addEventListener("DOMContentLoaded", function() {
  SCORE_DISPLAY.innerText = `${score}/50`;
  ATTEMPTS_DISPLAY.innerText = `${attempts}`;

  HINT_BUTTON.addEventListener("click", function() {
    hintClaim();
  })

  VALIDATION_BUTTON.addEventListener("click", function() {
    validateAnswer();
  })

  ANSWER_INPUT.addEventListener("input", function() {
    enableSubmitButton()
  })

  // RESTART_BUTTON.addEventListener("click", function() {
  //   startGame();
  //   document.getElementById("game").classList.remove("hiden");
  //   document.getElementById("end_game").classList.remove("show");
  //   currentCountryIndex = 0;
  //   score = 0;
  //   attempts = 3;
  //   playedRound = 0;
  //   hintUsed = false;
  //   isAnswerValid = false;
  // })

  function enableSubmitButton() {
    if (ANSWER_INPUT.value.trim().length !== 0) {
      VALIDATION_BUTTON.disabled = false;
    } else {
      VALIDATION_BUTTON.disabled = true;
    }
  };

  function startGame() {
    currentCountryIndex = 0;
    score = 0;
    attempts = 3;
    hintUsed = false;
    isAnswerValid = false;
    showNextCountry();
    updatePointsDisplay();
    updateAttemptsDisplay();
    clearResponses();
  };

  function showNextCountry() {
    let newRandomNumber = entierAleatoire(0, COUNTRIES.length - 1);
    isAnswerValid = false;
    enableSubmitButton()
    while (newRandomNumber === lastRandomNumber) {
      newRandomNumber = entierAleatoire(0, COUNTRIES.length - 1);
    }
    lastRandomNumber = newRandomNumber;
    COUNTRY_IMAGE.src = COUNTRIES[newRandomNumber].image;
    currentCountryIndex = newRandomNumber;
    hintUsed = false;
    HINT_DISPLAY.innerText = `Aucun indice demandé`;
  }

  function hintClaim() {
    if (hintUsed === true) {
      alert("Votre indice est déjà affiché");
    } else {
      HINT_DISPLAY.innerText = `${COUNTRIES[currentCountryIndex].hint}`;
      hintUsed = true;
    }
  }

  function validateAnswer() {
    const USER_ANSWER = ANSWER_INPUT.value.trim();
    const CORRECT_ANSWER = COUNTRIES[currentCountryIndex].alt;

    if (USER_ANSWER === CORRECT_ANSWER) {
      if (hintUsed === true) {
        score += HINT_POINTS;
        playedRound ++
      } else {
        score += FULL_POINTS;
        playedRound ++
      }
      SCORE_DISPLAY.innerText = `${score}/50`;
      ANSWER_INPUT.value = "";
      RESPONSES_DISPLAY.innerHTML += `<p> ✅ | ${USER_ANSWER} </p>`;
    } else {
      attempts--;
      if (attempts > 0) {
        ATTEMPTS_DISPLAY.innerText = `${attempts}`;
        ANSWER_INPUT.value = "";
        RESPONSES_DISPLAY.innerHTML += `<p> ❌ | ${USER_ANSWER} </p>`;
      } else {
        SCORE_DISPLAY.innerText = `${score}/50`;
        ANSWER_INPUT.value = "";
        RESPONSES_DISPLAY.innerHTML += `<p> ❌ | ${USER_ANSWER} </p>`;
        playedRound ++
        ATTEMPTS_DISPLAY.innerText = `${attempts}`;
      }
    }

    if (playedRound === 5) {
      // document.getElementById("game").classList.add("hiden");
      // document.getElementById("end_game").classList.add("show");
      window.location.replace("endGame.html");
      localStorage.setItem('score', score);
      SCORE_DISPLAY_END.innerText = `Votre score : ${score}/50`;
    } else if (attempts === 0) {
      // document.getElementById("game").classList.add("hiden");
      // document.getElementById("end_game").classList.add("show");
      window.location.replace("endGame.html");
      localStorage.setItem('score', score);
      SCORE_DISPLAY_END.innerText = `Votre score : ${score}/50`;
    } else if (score >= 50) {
      // document.getElementById("game").classList.add("hiden");
      // document.getElementById("end_game").classList.add("show");
      window.location.replace("endGame.html");
      localStorage.setItem('score', score);
      SCORE_DISPLAY_END.innerText = `Votre score : ${score}/50`;
    } else {
      showNextCountry();
    }
  }
  

  function updatePointsDisplay() {
    SCORE_DISPLAY.textContent = `${score} points`;
  }

  function updateAttemptsDisplay() {
    ATTEMPTS_DISPLAY.textContent = `${attempts}`;
  }
  
  function clearResponses() {
    RESPONSES_DISPLAY.innerHTML = "";
  }

  function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  startGame();
})
