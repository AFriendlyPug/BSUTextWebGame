const textElement = document.getElementById('text')
const optionButtons = document.getElementById('option-buttons')
const pointContainer = document.getElementById('point-container')

let state = {}

let skillPoints = {
  generalITKnowledge: 0,
  cybersecurityKnowledge: 0,
  codingSkills: 0,
  reputation: -1,
}

function startGame() {
  // Reset the game state to an empty object.
  state = {}
  // Show the initial text node to start the game.
  showText(1)
}

function updateSkillPointsDisplay() {
  const pointContainer = document.getElementById('point-container');
  
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
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  // Update the game's main text with the text from the selected node.
  textElement.innerHTML = textNode.text
  
  // Clear previously displayed buttons.
  while (optionButtons.firstChild) {
    optionButtons.removeChild(optionButtons.firstChild)
  }

  // Create buttons for available options in the text node.
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.buttonText
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtons.appendChild(button)
    }
  })

  // Update the skill points display when showing a new text node.
  updateSkillPointsDisplay();
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

const textNodes = [
  {
    id: 1, //Event ID
    text:"Hello this is test node 1", //Situation text
    options: [ //Max of 4 options
      {
        buttonText: '1', //Button text
        setState: { //Skill check or items
          generalITKnowledge: 1,
          cybersecurityKnowledge: 1,
          codingSkills: 2,
          reputation: 0,
        }, 
        requiredSkills: { // Require 2 Coding skills to choose this option
          generalITKnowledge: 0,
          cybersecurityKnowledge: 0,
          codingSkills: 0,
        },
        nextText: 2 //Increment ID by 1 each time -1 will restart game
      },
    ]
  },
  {
    id: 2, //Event ID
    text:"Hello this is test node 2", //Situation text
    options: [ //Max of 4 options
      {
        buttonText: '1', //Button text
        setState: { //Skill check or items
          generalITKnowledge: 0,
          cybersecurityKnowledge: 0,
          codingSkills: 0,
          reputation: 0,
        }, 
        requiredSkills: { // Require 2 Coding skills to choose this option
          generalITKnowledge: 1,
          cybersecurityKnowledge: 1,
          codingSkills: 2, 
        },
        nextText: 3 //Increment ID by 1 each time -1 will restart game
      },
    ]
  }, 
]

startGame()