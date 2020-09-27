const { Console } = require('console');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}

/******* Class Constructors************************************************************ */

class Room {
    constructor(name, description, inventory, lockable) {
        this.name = name
        this.description = description
        this.inventory = inventory
        this.lockable = lockable
    }

    drop() { }

    look() {
        console.log(this.description)
    }

    go() { }
}

class Thing {
    constructor(name, description, takeable, location, message) {
        this.name = name
        this.description = description
        this.takeable = takeable
        this.location = location
        this.message = message
    }

    look() {
        console.log(this.description)
    }

    take() {
        if (this.takeable === true) {
            Player.inventory.push(this.name)
            console.log(`You now have the ${this.name}.`)
            //  console.log('You are in', Player.location, 'and have', Player.inventory)
            let startIndex = (lookUpRooms[Player.location].inventory).indexOf(this.name)
            lookUpRooms[Player.location].inventory.splice(startIndex, 1)
            // console.log('location Inventory is now', lookUpRooms[Player.location].inventory)
        } else {
            console.log(this.message)
        }
    }

    drop() {
        lookUpRooms[Player.location].inventory.push(this.name)
        let startIndex = (Player.inventory).indexOf(this.name)
        Player.inventory.splice(startIndex, 1)
        console.log(`You just left the ${this.name} in the ${Player.location}.`)
        console.log(lookUpRooms[Player.location].inventory)
    }
}

/* Global Variables ***************************************************/
let currentLocale = 'street'
/********* Objects ***************************************************** */

let Player = {
    name: 'Bob',
    description: 'A scruffy looking coding instructor.',
    inventory: [],
    location: currentLocale,
    literate: false,
    move: function() {
    }
}

//  Rooms ***************

let Street = new Room(    //(our sentence describing the street, [our array of inventory])
    "street",
    "You are on a city street, as you look around you notice a wallet in the middle of the sidewalk, and a toy boat near the curb.",
    ['boat', 'wallet'],
    true
)

let Sailboat = new Room(
    'sailboat',
    'You are on the deck of a weathered sailboat. You notice a cabin door, a battered metal bucket on the port side, and water all around. An island is off in the near distance.',
    ['bucket', 'door', 'keypad'],
    true
)

let Island = new Room(
    'Island',
    'A sandy beach that stretches to the east and west. Palm trees bend in the breeze.',
    ['bottle', 'map'],
    true
)

let Cabin = new Room(
    'Cabin',
    'A small room filled with odd items. You see a radio and books.',
    ['book'],
    false
)

let Cave = new Room(
    'cave',
    'A dark entrance lies before you. You see a glint of light inside.',
    ['captain'],
    true
)

// Things *****************

let toyBoat = new Thing(
    'boat',
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
    'bucket',
    "A bucket of red herring.",
    true,
    Sailboat,
    'message'
)

let mapBook = new Thing(
    'mapbook',
    "Maps for Dummies. Reading this could come in handy.",
    true,
    Cabin,
    'message'
)

let seaCaptain = new Thing(
    'seacaptain',
    "A weathered figurine of a ship's captain. I wonder what this could be for?",
    true,
    Cave,
    'message'
)

let bottle = new Thing(
    'bottle',
    "A glass bottle. It's hard to see, but there may be something inside.",
    true,
    Island,
    'message'
)

let map = new Thing(
    'map',
    "A parchment map that is covered in strange glyphs and symbols.",
    false,
    Island,
    'message'
)

let rocks = new Thing(
    'rocks',
    "You see large rocks against a cliff face. A glint catches the sun.",
    true,
    Island,
    'message'
)

let cabinDoor = new Thing(
    'door',
    "You see a closed door with a handle and keypad",
    false,
    Sailboat,
    'Are you nuts? It\'s a door! Try unlocking it'
)

let keypad = new Thing(
    'keypad',
    "A standard 9-button numeric keypad. To use punch in 4 digit code",
    false,
    Sailboat,
    'You can\'t take this!'
)

// ******************* state machines *********************

let localState = {
    street: ['sailboat'],
    sailboat: ['street', 'cabin', 'island'],
    cabin: ['sailboat'],
    island: ['cave', 'sailboat'],
    cave: ['island']
}

function move(nextLocale) {

    if (localState[currentLocale].includes(nextLocale)) {
        Player.location = nextLocale
        console.log(lookUpRooms[Player.location].description)
    } else {
        console.log(`invalid transition: ${currentLocale} to ${nextLocale} `)
    }
}

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
    List - display command list
    Look at - look at surroundings or items 
    Take - add item to inventory
    Drop - remove item from inventory
    Go to - Move in target direction
    Enter - Enter a location
    Punch in - Enter a code
    Read - Read something
    Swim - You swim across a body of water
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

// function takeable(item) {
//     // if item is takeable  - add to player inventory - delete from room inventory
//     console.log('takeable function fired')
//     if (item.takeable === true) {
//         Player.inventory.push(item.name)
//         console.log(Player.inventory)
//         if (Room.inventory.includes(item)) 
//         }
//         console.log(Player.location)
//     } else {
//         console.log(item.message)
//     }


function checkTarget(action, target) {  // check the noun's status
    if (action === 'take') {
        console.log('your location is', lookUpRooms[Player.location].name, ' location inventory is ', lookUpRooms[Player.location].inventory)
        console.log(Player.inventory)
        let availableTarget = lookUpRooms[Player.location].inventory
        console.log('available targets are', availableTarget)
        // console.log(Player.inventory)
        if (availableTarget.includes(target)) {
            lookUpThings[target].take() // using lookuptable to access actual thing
        } else {
            console.log('You already have', target)
        }
    } else if (action === 'drop') {
        if (Player.inventory.includes(target)) {
            //console.log('246 - target =', target, 'player has', Player.inventory)
            lookUpThings[target].drop()
        } else {
            console.log(`You don't have the ${target}.`)
        } // else if {}
    } else if (action === 'look') {
        console.log(lookUpThings[target].description)
    } else if (action === 'i') {
        console.log(Player.inventory)
    } else if (action === 'r') {
        console.log(lookUpRooms[Player.location].inventory)
    } else if (action === 'punch') {
        if (target === '1138') {
            // change door from falsy to truthy
            console.log('The door clicks open')
        } else {
            console.log('Nothing happens')
            start()
        }
    }
}


// ******************* lookup table
let lookUpThings = {
    'wallet': wallet,
    'bucket': fishBucket,
    'captain': seaCaptain,
    'book': mapBook,
    'bottle': bottle,
    'map': map,
    'boat': toyBoat,
    'door': cabinDoor,
    'keypad': keypad
}

let lookUpRooms = {
    'street': Street,
    'sailboat': Sailboat,
    'island': Island,
    'cabin': Cabin,
    'cave': Cave
}
// inventory subroutine

// takeable function-- if true, add to inventory. if falsy print message


// *************** logic ********************


async function start() {
    while (true) {
        let firstQ = await ask('What would you like to do?\n>_') // ask opening question
        // break firstQ into an array and compare.. a separate function? SANITIZE!
        let commandArray = sanitizeInput(firstQ)

        if (commandArray[0] === 'take') {
            checkTarget(commandArray[0], commandArray[1])
            if (commandArray[1] === 'boat' && Player.location === 'street') {
                console.log('Suddenly there is a flash of light!')
                move('sailboat')
                console.log('player location is now', Player.location)
            }
        } else if (commandArray[0] === 'drop') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'look') {
            checkTarget(commandArray[0], commandArray[1])



            // } else if (commandArray[0] === 'go') {
            //     checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'r') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'i') {
            checkTarget(commandArray[0], commandArray[1])
            // } else if (commandArray[0] === 'list') {
            //     checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'punch') {
            checkTarget(commandArray[0], commandArray[1])
            // } else if (commandArray[0] === 'enter' || (commandArray[0] === 'swim')) {
            //     checkTarget(commandArray[0], commandArray[1])
            // } else if (commandArray[0] === 'read') {
            //     checkTarget(commandArray[0], commandArray[1])
            // }

        } else {
            console.log('Please enter a valid command.')
        }
    }
    process.exit()
}


// ******************* flow **************************


console.log(lookUpRooms[Player.location].description)
commandList()
start();
