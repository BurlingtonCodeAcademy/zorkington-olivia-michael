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
    constructor(name, description, takeable, location, message) {
        this.name = name
        this.description = description
        this.takeable = takeable
        this.location = location
        this.message = message
    }

    describe() {
        console.log(this.description)
    }
}

class Player {
    constructor(description, inventory, location, literate) {
        this.description = description
        this.inventory = inventory
        this.location = location
        this.literate = literate
    }

    describe() {
        console.log(this.description)
    }
}

/********* Objects ***************************************************** */

let user = new Player(
    'A scruffy looking coding instructor.',
    [],
    'street',
    false     // player starts game unable to read the map
)

//  Rooms ***************
let Street = new Room(    //(our sentence describing the street, [our array of inventory])
    "street",
    "You notice a wallet, rocks, sticks, a toy boat, and a partially torn newspaper lying about",
    ['toyBoat', 'wallet']
)

let Deck = new Room(
    'Deck',
    'A weathered deck. You notice a cabin door at the fore, a bucket of fish at the aft, and water all around. An island is off in the near distance.',
    ['fishBucket', 'cabin door', 'keypad']
)

let Island = new Room(
    'Island',
    'A sandy beach that stretches to the east and west. Palm trees bend in the breeze.',
    ['bottle', 'map']
)

let Cabin = new Room(
    'Cabin',
    'A small room filled with odd items. You see a radio and books.',
    ['Maps for Dummies']
)

let Cave = new Room(
    'cave',
    'A dark entrance lies before you. You see a glint of light inside.',
    ['sea captain figurine']
)

// Things *****************

let toyBoat = new Thing(
    'toyboat',
    "A toy sailboat with a blue hull. It is very detailed with a nautical wheel and a place for a captain, a mast, and a boom.  On the side of the bow are registration numbers BH-1138",
    true,
    Street,
    'message'
)

let wallet = new Thing(
    'wallet',
    "A crocodile-leather wallet that is battered, scuffed, and worn",
    false,
    Street,
    'Trying to take something that isn\'t yours?'
)

let fishBucket = new Thing(
    'fishbucket',
    "description",
    true,
    Deck,
    'message'
)

let mapBook = new Thing(
    'mapbook',
    "description",
    true,
    Cabin,
    'message'
)

let seaCaptain = new Thing(
    'seacaptain',
    "description",
    true,
    Cave,
    'message'
)

let bottle = new Thing(
    'bottle',
    "description",
    true,
    Island,
    'message'
)

let map = new Thing(
    'map',
    "description",
    false,
    Island,
    'message'
)

// // ****door******
// let cabinDoor = new Thing(
//     'cabin door',
//     "description",
//     false,
//     Deck
// )

// let keypad = new Thing(
//     'keypad',
//     "description",
//     true,
//     Deck
// )


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
    console.log(exportArray)
    return exportArray
    // console.log('exportArray is ' + exportArray + ' ' + typeof(exportArray))
}

function takeable(item) {
    console.log('takeable function fired')
    if (item.takeable === true) {
        Player.inventory.push(item)
        Player.location.inventory.pop(item)
        console.log(Player.inventory)
        console.log(Player.location.inventory)
    } else {
        console.log(item.message)
    }
}

function checkTarget(action, target) {  // check the noun's status

    let availableTarget = ['wallet', 'toyboat', 'map', 'bottle', 'mapbook', 'seacaptain', 'fishbucket']

    if (availableTarget.includes(target)) {
        takeable(lookUp[target])
    } 
    
}

// ******************* lookup table
let lookUp = {
    'wallet': wallet,
    'fishbucket': fishBucket,
    'seacaptain': seaCaptain,
    'mapbook': mapBook,
    'bottle': bottle,
    'map': map,
    'toyboat': toyBoat
}

// inventory subroutine

// takeable function-- if true, add to inventory. if falsy print message


// *************** logic ********************


async function start() {
    while (true) {

        let firstQ = await ask('What would you like to do?\n>_') // ask opening question
        // break firstQ into an array and compare.. a separate function? SANITIZE!
        let commandArray = sanitizeInput(firstQ)
        console.log(commandArray)
        console.log('commandArray is ', commandArray, typeof (commandArray))

        if (commandArray[0] === 'go') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'look') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'i') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'r') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'take') {
            checkTarget(commandArray[0], commandArray[1])
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