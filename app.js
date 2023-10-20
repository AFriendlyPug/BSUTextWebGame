const textElement = document.getElementById('text')
const optionButtons = document.getElementById('option-buttons')
const pointContainer = document.getElementById('point-container')
const restartButton = document.getElementById('restart-btn')

let state = {}

let skillPoints = {
  generalITKnowledge: 0,
  cybersecurityKnowledge: 0,
  codingSkills: 0,
  reputation: 0,
}

function startGame() {
  // Reset the game state to an empty object.
  state = {}
  // Show the initial text node to start the game.
  showText(1)
}

function randomDice() {
  // Generate a random number between 1 and 6.
  return Math.floor(Math.random() * 6) + 1;
}

function updateSkillPointsDisplay() {
  
  // Clear the content of the div.
  pointContainer.innerHTML = '';

  // Iterate through the skill points object and display them.
  for (const skill in skillPoints) {
    if (skillPoints.hasOwnProperty(skill)) {
      const skillElement = document.createElement('div');
      skillElement.classList.add('skill');
      skillElement.innerText = `${skill}: ${skillPoints[skill]}`;
      pointContainer.appendChild(skillElement);
    }
  }
}

function showText(textNodeIndex) {
  // Find the text node with the given index.
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);

  if (textNode.endGame) {
    // Display the player's final skill points.
    textElement.innerHTML = `Congrats, you finished the game!<br><br>Your final skill points:<br>`;
    for (const skill in skillPoints) {
      textElement.innerHTML += `${skill}: ${skillPoints[skill]}<br>`;
    }
    pointContainer.style.display = "none";
    optionButtons.style.display = "none";
    restartButton.style.display = "block";
  } else {
    // Update the game's main text with the text from the selected node.
    textElement.innerHTML = textNode.text;

    const diceNumber = randomDice();
    console.log(diceNumber);
    // Clear previously displayed buttons.
    while (optionButtons.firstChild) {
      optionButtons.removeChild(optionButtons.firstChild);
    }

    // Create buttons for available options in the text node.
    textNode.options.forEach((option) => {
      if (showOption(option)) {
        const button = document.createElement('button');
        button.innerText = option.buttonText;
        button.classList.add('btn');
        button.addEventListener('click', () => selectOption(option));
        optionButtons.appendChild(button);
      }
    });

    // Update the skill points display when showing a new text node.
    updateSkillPointsDisplay();
  }
}

function showOption(option) {
  // Check if the option should be displayed.
  // If there's no requiredSkills or the requiredSkills condition is met, the option is shown.
  return (
    option.requiredSkills == null || 
    checkSkillRequirements(option.requiredSkills)
  );
}

function selectOption(option) {
  // Get the ID of the next text node.
  const nextTextId = option.nextText
  
  // If the ID is less than or equal to 0, start a new game.
  if (nextTextId <= 0) {
    return startGame()
  }
  
  // Update the game state based on the selected option.
  state = Object.assign(state, option.setState)
  
  // Update the skill points based on the selected option.
  for (const skill in option.setState) {
    if (option.setState.hasOwnProperty(skill)) {
      skillPoints[skill] += option.setState[skill];
    }
  }
  
  // Show the next text node in the game.
  showText(nextTextId)
}

function checkSkillRequirements(requiredSkills) {
  for (const skill in requiredSkills) {
    if (requiredSkills.hasOwnProperty(skill)) {
      if (skillPoints[skill] < requiredSkills[skill]) {
        return false; // You don't meet the required skill points for this option.
      }
    }
  }
  return true; // You meet all the required skill points.
}

restartButton.addEventListener('click', () => {
  location.reload();
});

const textNodes = [
  {
    id: 1,
    text:"this is text node 1",
    endGame: false,
    options: [
        {
            buttonText: 'button 1',
            setState: {
                generalITKnowledge: 0,
                cybersecurityKnowledge: 0,
                codingSkills: 0,
                reputation: 0
            }, 
            requiredSkills: {
                generalITKnowledge: 0,
                cybersecurityKnowledge: 0,
                codingSkills: 0, 
            },
            nextText: 2
        },

        {
          buttonText: 'button 2',
          setState: {
              generalITKnowledge: 1,
              cybersecurityKnowledge: 1,
              codingSkills: 1,
              reputation: 1
          }, 
          requiredSkills: {
              generalITKnowledge: 0,
              cybersecurityKnowledge: 0,
              codingSkills: 0, 
          },
          nextText: 2
      },

      {
        buttonText: 'button 3',
        endGame: false,
        setState: {
            generalITKnowledge: 2,
            cybersecurityKnowledge: 2,
            codingSkills: 2,
            reputation: 2
        }, 
        requiredSkills: {
            generalITKnowledge: 0,
            cybersecurityKnowledge: 0,
            codingSkills: 0, 
        },
        nextText: 2
    },
    ]
  },
  {
    id: 2,
    text:"this is text node 3",
    endGame: false,
    options: [
        {
            buttonText: 'button 1',
            setState: {
                generalITKnowledge: 0,
                cybersecurityKnowledge: 0,
                codingSkills: 0,
                reputation: 0
            }, 
            requiredSkills: {
                generalITKnowledge: 1,
                cybersecurityKnowledge: 1,
                codingSkills: 1, 
            },
            nextText: 3
        },

        {
          buttonText: 'button 2',
          setState: {
              generalITKnowledge: 1,
              cybersecurityKnowledge: 1,
              codingSkills: 1,
              reputation: 1
          }, 
          requiredSkills: {
              generalITKnowledge: 0,
              cybersecurityKnowledge: 0,
              codingSkills: 0, 
          },
          nextText: 3
      },
    ]
  },
  {
    id: 3,
    text:"this is text node 3",
    endGame: false,
    options: [
        {
            buttonText: 'this is a button',
            diceRequired: false,
            setState: {
                generalITKnowledge: 0,
                cybersecurityKnowledge: 0,
                codingSkills: 0,
                reputation: 0
            }, 
            requiredSkills: {
                generalITKnowledge: 1,
                cybersecurityKnowledge: 1,
                codingSkills: 1, 
            },
            nextText: 4
        },
    ]
  },
  {
    id: 4,
    text: "",
    endGame: true,
    options: [
      {
          buttonText: 'Restart',
          diceRequired: false,
          setState: {
              generalITKnowledge: 0,
              cybersecurityKnowledge: 0,
              codingSkills: 0,
              reputation: 0
          }, 
          requiredSkills: {
              generalITKnowledge: 0,
              cybersecurityKnowledge: 0,
              codingSkills: 0, 
          },
          nextText: -1
      },
  ]
  },
]

startGame()