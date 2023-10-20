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
    id: 1, //Event ID
    text:`Big Grid is responsible for the section of the grid that supplies power to Gloucestershire, UK<br/><br/>

    You are a student on work placement with cyber security team for Big Grid<br/><br/>
    
    During your computer degree you have learnt a lot. Divide 4 skill points between the following:<br/>
      General IT knowledge: starts at 1<br/>
      Cyber Security knowledge: starts at 1<br/>
      Coding skills: starts at 1<br/><br/>
    
    Your reputation starts at -1 (you are an intern student)<br/><br/>
    
    You need a 6 sided dice`, //Situation text
    options: [ //Max of 4 options
      {
        buttonText: 'Next', //Button text
        setState: { //Skill check or items
        }, 
        requiredSkills: { // Require 2 Coding skills to choose this option
        },
        nextText: 2 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: 'Test', //Button text
        setState: { //Skill check or items
        }, 
        requiredSkills: { // Require 2 Coding skills to choose this option
        },
        nextText: 7 //Increment ID by 1 each time -1 will restart game
      },
    ]
  },
  {
    id: 2, //Event ID
    text:`Empty, due to a Covid outbreak most of the office team are self isolating, however you are alright as the experience team leader Sam is in the office, along with several other older IT staff<br/><br/>
    
    Phone rings<br/><br/>

    Sam takes the call.<br/><br/>

    He looks very worried and walks across to you<br/><br/>

    His cat is ill and he needs to take it to the vet<br/><br/>

    He reassures you that the other two staff in the office will be able to help you<br/><br/>
    
    `, //Situation text
    options: [ //Max of 4 options
      {
        buttonText: "Do you call Sam on his work mobile to let him know and ask for advice?", //Button text
        setState: { //Skill check or items
          reputation: -1,
        }, 
        requiredSkills: { // Require 2 Coding skills to choose this option
        },
        nextText: 3 //Increment ID by 1 each time -1 will restart game
      },
      {
        buttonText: "Or do you wait for more information?", //Button text
        setState: { //Skill check or items
          reputation: 0,
        }, 
        requiredSkills: { // Require 2 Coding skills to choose this option
        },
        nextText: 4 //Increment ID by 1 each time -1 will restart game
      },
    ]
  },
  {
    id: 3,
    text:`you attempt to call Sam, his phone goes to voicemail<br/><br/>
    
    The other two staff in office snigger at your over reaction and your reputation falls.<br/><br/>

    -1 on reputation.`,
    options: [
        {
            buttonText: 'Next',
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
            nextText: 4
        },
    ]
  },
  {
    id: 4,
    text:`Ransomware attack in progress!<br/><br/>
    
    System admin call you back- identified spike in traffic = ransomware attack in progress. Malware encrypting officer servers. System admin working frantically<br/><br/>
    
    Turn to 2 other staff in office and ask for advice. “experienced staff on placement”, accounting and other debt recovery team. (cross training practise of Big Grid). “know nothing about cyber”<br/><br/>
    
    Ring HR and ask contact Sam on personal mobile number, help!.<br/><br/>
    
    Ring back in 5 mins and cannot get him on phone, but received an email to say he has contacted an outside consultant to come and assist you.`,
    options: [
        {
            buttonText: 'Next',
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
            nextText: 5
        },
    ]
  },
  {
    id: 5,
    text:`Security ring 15 minutes later - consultant is at reception. They say he is very anxious to get started as time is critical.`,
    options: [
        {
            buttonText: 'Do you tell security to let him in?',
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
            nextText: 5.1
        },
        {
          buttonText: 'Do you tell security to check his id?',
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
          nextText: 5.1
      },
      {
        buttonText: 'Do you consult the security policy to see what you should do next?',
        setState: {
            cybersecurityKnowledge: 1,
        }, 
        requiredSkills: {
        },
        nextText: 5.1
    },
    ]
  },
  {
    id: 5.1,
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
  {
    id: 6,
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
            nextText: 7
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
          nextText: 7
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
        nextText: 7
    },
    ]
  },
  {
    id: 7,
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
            nextText: 8
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
          nextText: 8
      },
    ]
  },
  {
    id: 8,
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
            nextText: 9
        },
    ]
  },
  {
    id: 9,
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