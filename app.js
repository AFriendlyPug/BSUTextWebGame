const textElement = document.getElementById('text')
const optionButtons = document.getElementById('option-buttons')

let state = {}

function startGame() {
  // Reset the game state to an empty object.
  state = {}
  // Show the initial text node to start the game.
  showText(1)
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
}

function showOption(option) {
  // Check if the option should be displayed.
  // If there's no requiredState or the requiredState condition is met, the option is shown.
  return option.requiredState == null || option.requiredState(state)
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
  // Show the next text node in the game.
  showText(nextTextId)
}

const textNodes = [
  {
    id: 1, //Event ID
    text:"Hello this is test node 1", //Situation text
    options: [ //Max of 4 options
      {
        buttonText: '1', //Button text
        setState: {}, //Skill check or items
        nextText: 2 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: '2', //Button text
        setState: {}, //Skill check or items
        nextText: 2 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: '3', //Button text
        setState: {}, //Skill check or items
        nextText: 2 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: '4', //Button text
        setState: {}, //Skill check or items
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
        setState: {}, //Skill check or items
        nextText: 3 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: '2', //Button text
        setState: {}, //Skill check or items
        nextText: 3 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: '3', //Button text
        setState: {}, //Skill check or items
        nextText: 3 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: '4', //Button text
        setState: {}, //Skill check or items
        nextText: 3 //Increment ID by 1 each time -1 will restart game
      },
    ]
  },
  {
    id: 3, //Event ID
    text:"Hello this is test node 3", //Situation text
    options: [ //Max of 4 options
      {
        buttonText: '1', //Button text
        setState: {}, //Skill check or items
        nextText: 4 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: '2', //Button text
        setState: {}, //Skill check or items
        nextText: 4 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: '3', //Button text
        setState: {}, //Skill check or items
        nextText: 4 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: 'this button restarts you', //Button text
        setState: {}, //Skill check or items
        nextText: -1 //Increment ID by 1 each time -1 will restart game
      },
    ]
  }, 
]

startGame()