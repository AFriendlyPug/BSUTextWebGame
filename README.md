# BSUTextWebGame
### Text node template:

```
id: , //Event UID
text: "", //Situation text
options: [ //Max of 4 options
    {
        buttonText: "", //Button text.
        setState: {}, //Unused at the moment
        nextText: //Indicates the next event it links to
    }
]
```
### Variable breakdown
`id:` requires a int is a unquie ID do not overlap IDs.<br/>
`text:` requires a string and is used to show the current situation text.<br/>
`options:` requires an array and contains the buttons current max of 4 buttons.<br/>
`buttonText:` requires a string and is used to display the text for the button of the current situtation.<br/>
`setState:` Current unsued.<br/>
`nextText:` requries an int and is used to point towards the next event ID.<br/>

### Example Text Node:
```
{
    id: 1,
    text:"Hello this is test node 1",
    options: [
    {
        buttonText: '1',
        setState: {},
        nextText: 2
    },
    {
        buttonText: '2',
        setState: {},
        nextText: 2
    }
    ]
},
```