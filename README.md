# BSUTextWebGame
## Text node:

### Variable breakdown:
`id:` requires a int is a unquie ID do not overlap IDs.<br/>
`text:` requires a string and is used to show the current situation text.<br/>
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

## Skill points
```
let skillPoints = {
    generalITKnowledge: 0,
    cybersecurityKnowledge: 0,
    codingSkills: 0,
    reputation: -1,
}
```
Names and values can be adjusted however need to be they need to match the names in the text node `setState:` and `requiredSkills:` to function correctly.