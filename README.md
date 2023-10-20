# BSUTextWebGame

## Content

- [GitHub Page](#github-page)<br/>
- [Features](#features)<br/>
    - [Implemented Features](#implemented-features)<br/>
    - [Missing Features](#missing-features)<br/>
- [Text Node](#text-node)<br/>
    - [Variable Breakdown](#variable-breakdown)<br/>
    - [Template](#template)<br/>
    - [Example Text Node](#example-text-node)
- [Skill Points](#skill-points)

## GitHub Page

<https://afriendlypug.github.io/BSUTextWebGame/>

## Features

### Implemented Features
- Allocate points to skills
- Choose between different actions as the game progresses
- Add/remove skill points based on decisions
- Present results at the end of the game
- Branching paths based on the user’s decisions 
- Basic support for video and audio clips

### Missing Features
- Dice
- Limited-time decisions

## Text Node

### Variable Breakdown:
`id:` requires a int is a unquie ID do not overlap IDs.<br/>
`text:` requires a string and is used to show the current situation text.<br/>
`endGame:` requires a bool that requires true or false, used to end the game on this node, will display results.<br/>
`options:` requires an array and contains the buttons current max of 4 buttons.<br/>
`buttonText:` requires a string and is used to display the text for the button of the current situtation.<br/>
`setState:` used to add points to the four atributes `generalITKnowledge`, `cybersecurityKnowledge`, `codingSkills`, and `reputation`, the int after the skill name is the amount of points added.<br/>
`requiredSkills:` requires all three skills `generalITKnowledge`, `cybersecurityKnowledge`, and `codingSkills` each must have an int. Used to restrict certain choices by hiding the button if user doesn't meet required stats. <br/>
`nextText:` requries an int and is used to point towards the next event ID.<br/>

###  Template:
```
{
    id: ,
    text:"",
    endGame: ,
    options: [
        {
            buttonText: '',
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
            nextText: 
        },
    ]
}
```

### Example Text Node:
```
{
    id: 1,
    text:"Hello this is test node 1",
    endGame: false,
    options: [
        {
            buttonText: '1',
            setState: {
                generalITKnowledge: 1,
                cybersecurityKnowledge: 1,
                codingSkills: 1,
                reputation: 0
            }, 
            requiredSkills: {
                generalITKnowledge: 1,
                cybersecurityKnowledge: 1,
                codingSkills: 2, 
            },
            nextText: 2
        },
    ]
}
```

## Skill Points
```
let skillPoints = {
    generalITKnowledge: 0,
    cybersecurityKnowledge: 0,
    codingSkills: 0,
    reputation: -1,
}
```
Names and values can be adjusted however need to be they need to match the names in the text node `setState:` and `requiredSkills:` to function correctly.
