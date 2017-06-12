// CHARACTER OBJECTS

var characters = {
  dr10: {
    idName: "dr10",
    name: "the Tenth Doctor",
    maxHealth: 80,
    currentHealth: 80,
    baseAttack: 5,
    currentAttack: 5,
    attacks: [
      "sonic screwdriver",
      "Plimsolls",
      "spiky hair",
      "Run!"
    ],
    phrases: [
      "Allons-y!",
      "Run!",
      "I'm sorry. I'm so sorry."
    ]
  },
  dalek: {
    idName: "dalek",
    name: "a Dalek",
    maxHealth: 30,
    currentHealth: 30,
    baseAttack: 10,
    currentAttack: 10,
    attacks: [
      "scream",
      "plunger",
      "death ray"
    ],
    phrases: [
      "Exterminate! EXTERMINATE!",
      "You are a good Dalek!"
    ]
  },
  cyberman: {
    idName: "cyberman",
    name: "a Cyberman",
    maxHealth: 50,
    currentHealth: 50,
    baseAttack: 8,
    currentAttack: 8,
    attacks: [
      "wrist missiles",
      "fly"
    ],
    phrases: [
      "Delete!",
      "Upgrade!"
    ]
  },
  angel: {
    idName: "angel",
    name: "a Weeping Angel",
    maxHealth: 40,
    currentHealth: 40,
    baseAttack: 5,
    currentAttack: 5,
    attacks: [
      "touch",
      "move really really fast"
    ]
  },
  silence: {
    idName: "silence",
    name: "the Silence",
    maxHealth: 60,
    currentHealth: 6.,
    baseAttack: 7,
    currentAttack: 7,
    attacks: [
      "wait",
      "tell off"
    ]
  }
}

// OTHER VARIABLES

// play starts when user chooses a character (by clicking)
// start with a tutorial-style modal instructing that
var userChar, userCharDiv, opponent, opponentDiv;
var winCounter = 0;

// FUNCTIONS

function writeStats(div) {
  var objectName = div.id;
  console.log(objectName);
  $(div).html(`
    <p class="stat">Health: ${characters[objectName].currentHealth}</p>
  `);
}

function chooseChar() {
  alert("Choose a character to play as!"); // replace with proper, non-blocking, bootstrap alerts or modals
  $(".character").on("click", function() {
    userChar=this.id;
    userCharDiv = this;
    $("#fight-container").append(this); // move to #fight-container
    $(this).css("border-color", "rgba(0, 191, 255, 0.5)");
    $(".character").off();
    chooseOpponent();
  });
}

function chooseOpponent() {
  alert("Now choose a character to fight!"); // replace with proper, non-blocking, bootstrap alerts or modals
  $(".character").on("click", function() {
    opponent=this.id;
    opponentDiv = this;
    $("#fight-container").append(this); // move to #fight-container
    $(this).css("border-color", "rgba(255, 0, 0, 0.5)");    
    $(".character").off();
  });
}

function loseGame() {
  // inform user of loss
  reset();
}

// hard-code the number of antagonists (5), keep track of defeats with a counter, and determine win when counter === 5

function winGame() {
  // inform user of win
  reset();
}

function reset() {
  // reset .currentHealth amounts to .maxHealth
  for (var char in characters) {
    console.log(char);
    console.log(characters[char].currentHealth);
    characters[char].currentHealth = characters[char].maxHealth;
  }
  // reset protagonist character attack to original level
  // --or better yet "dismount" character
  // set userChar to undefined?
  // can all these changes to character objects be accomplished by
  // keeping the objects in another file, unmutated, "copy" them into this file,
  // mutate them, and then "reload" the originals?
}

$("#fight").click(function() {
  if (!userChar) {
    alert("First you must choose a character. \nClick on any character to play as him or her.");
    return;
  } else if (!opponent) {
    alert("First you must choose an opponent. \nClick on any character to fight him or her.");
    return;
  } 
  characters[opponent].currentHealth -= characters[userChar].currentAttack;
  characters[userChar].currentHealth -= characters[opponent].baseAttack;
  // popover speech balloons with random phrase for both
  writeStats(userCharDiv);
  writeStats(opponentDiv);
  if (characters[userChar].currentHealth < 1) {
    loseGame();
  } else if (characters[opponent].currentHealth < 1) {
    winCounter++;
    // "remove" opponent from the DOM--hide? or actually delete?
    if (winCounter === 5) {
      winGame();
    }
  } else {
  }
});

$(document).ready(function() {
  $(".character").each(function (index) {
    console.log(this);
    writeStats(this);
  });
  chooseChar();
});