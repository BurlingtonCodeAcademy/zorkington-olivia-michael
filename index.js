const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}


/******* Class Constructors************************************************************ */

class Room {
    constructor(name, description, inventory) {
        this.name = name
        this.description = description
        this.inventory = inventory
    }

    describe() {
        console.log(this.description)
    }
}

class Thing {
    constructor(name, description, takeable, location) {
        this.name = name
        this.description = description
        this.takeable = takeable
        this.location = location
    }

    describe() {
        console.log(this.description)
    }
}

class Player {
    constructor(description, inventory, state) {
        this.description = description
        this.inventory = inventory
        this.state = state
    }

    describe() {
        console.log(this.description)
    }
}

/********* Objects ***************************************************************** */

//  Rooms ***************
let Street = new Room(             //(our sentence describing the street, [our array of inventory])
    "street",
    "You notice a wallet, rocks, sticks, a toy boat, and a partially torn newspaper lying about",
    ['toyBoat', 'wallet']
)

let Deck = new Room(
    'Deck',
    'A weathered deck. You notice a cabin door at the fore, a bucket of fish at the aft, and water all around. An island is off in the near distance.',
    []
)

let Island = new Room(
    'Island',
    'A sandy beach that stretches to the east and west. Palm trees bend in the breeze.',
    []
)

let Cabin = new Room(
    'Cabin',
    'A small room filled with odd items. You see a radio and books.',
    []
)

let Cave = new Room(
    'cave',
    'A dark entrance lies before you. You see a glint of light inside.',
    []
)

// Things *****************

let ToyBoat = new Thing(
    'toyBoat',
    "A toy sailboat with a blue hull. It is very detailed with a nautical wheel and a place for a captain, a mast, and a boom.  On the side of the bow are registration numbers BH-1138",
    true,
    Street
)

let wallet = new Thing(
    'wallet',
    "A crocodile-leather wallet that is battered, scuffed, and worn",
    false,
    Street
)



/**   Global Functions  **************** */
function showVars() {
    console.log('action is ' + action + ' ' + typeof (action))
    console.log('target is ' + target + ' ' + typeof (target))
    console.log('cleanString is ' + cleanString + ' ' + typeof (cleanString))
    console.log('cleanArray is ' + cleanArray + ' ' + typeof (cleanArray))
    console.log('commandArray is ' + commandArray + ' ' + typeof (commandArray))
}

function commandList() {
    console.log(`Please use the following commands:\n
    i - Check personal inventory
    r - Check room inventory
    Look - look at surroundings or items
    Take - add item to inventory
    Drop - remove item from inventory
    Go Right  - move right 
    Go Left - move left
    `)
}


function sanitizeInput(stringIn) {
    let cleanString = stringIn.trim().toLowerCase()
    let cleanArray = cleanString.split(' ')
    let action = cleanArray.shift() // action being verb
    let target = cleanArray.pop() // target being noun

    let exportArray = [action, target]
    return exportArray
    // console.log('exportArray is ' + exportArray + ' ' + typeof(exportArray))
}

// function checkTarget(action, target) {  // check the noun's status
//     let availableTarget = ['wallet', 'toy boat',]

//     if (availableTarget.includes(target)) {
//         if (target === 'wallet') {

//         }
//     }
// }

// *************** logic ********************


async function start() {
    while (true) {

        let firstQ = await ask('What would you like to do?\n>_') // ask opening question
        // break firstQ into an array and compare.. a separate function? SANITIZE!
        let commandArray = sanitizeInput(firstQ)

        console.log('commandArray is ' + commandArray + ' ' + typeof (commandArray))

        if (commandArray[0] === 'go left') {
            console.log('see description of what is to left - blocked street')
        } else if (commandArray[0] === 'go right') {
            console.log('see description of what is to right - blocked street')
        } else if (commandArray[0] === 'look') {
            console.log('look')
        } else if (commandArray[0] === 'i') {
            console.log('i')
        } else if (commandArray[0] === 'r') {
            console.log('r')
        } else {
            console.log('Please enter a valid command.')
        }
    }
    process.exit()
}


// ******************* flow **************************

console.log('Welcome to our game!')
console.log('You are on deserted city street with no one around.')
commandList()
start();

//