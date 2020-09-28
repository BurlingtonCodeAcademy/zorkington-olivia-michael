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
    constructor(name, description, inventory, locked, message) {
        this.name = name
        this.description = description
        this.inventory = inventory
        this.locked = locked
        this.message = message
    }
    look() {
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

    look() {
        console.log(this.description)
    }

    take() {
        if (this.takeable === true) {
            Player.inventory.push(this.name)
            console.log(`You now have the ${this.name}.`)
            let startIndex = (lookUpRooms[Player.location].inventory).indexOf(this.name)
            lookUpRooms[Player.location].inventory.splice(startIndex, 1)
        } else {
            console.log(this.message)
        }
    }

    drop() {
        lookUpRooms[Player.location].inventory.push(this.name)
        let startIndex = (Player.inventory).indexOf(this.name)
        Player.inventory.splice(startIndex, 1)
        console.log(`You just left the ${this.name} in the ${Player.location}.`)
    }
}

/* Global Variables ***************************************************************************/


/********* Objects ************************************************************************** */

let Player = {
    name: 'Bob',
    description: 'A scruffy looking coding instructor.',
    inventory: [],
    location: 'street',
    literate: false,
}

//  Rooms ****************************************************************************************

let Street = new Room(    //(our sentence describing the street, [our array of inventory])
    "street",
    "You are on a city street, as you look around you notice a wallet in the middle of the sidewalk, and a toy boat near the curb.",
    ['boat', 'wallet'],
    true,
    'message'
)

let Sailboat = new Room(
    'sailboat',
    'You are on the deck of a weathered sailboat. You notice a cabin door, a battered metal bucket on the port side. An island is off in the near distance.',
    ['bucket', 'door', 'keypad'],
    true,
    'message'
)

let Island = new Room(
    'island',
    'You dive overboard and swim to the island.  You arrive on a sandy beach that stretches to the east and west. Palm trees bend in the breeze. To the east is a jumbled pile of rocks. You notice something sparkling in the rocks.  To the west the beach appears to end against an impenetrable cliff',
    ['bottle', 'map', 'rocks'],
    true,
    'You exit the cave onto the sandy beach. Palm trees bend in the breeze. The sailboat remains anchored in the distance.'
)

let Cabin = new Room(
    'cabin',
    'You are in a small room.  On a side table you see a radio and a book.',
    ['book', 'radio'],
    false,
    'message'
)

let Cave = new Room(
    'cave',
    'You enter a dark cave.  A shaft of light from an opening above illuminates a craven Tiki-style altar.  In the center of the altar, centered on a great seashell, is a figurine of a sea captain.',
    ['captain'],
    true,
    'message'
)

// Things *********************************************************************************************

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
    'book',
    "Treasure Maps for Dummies. Reading this could come in handy.",
    true,
    Cabin,
    'message'
)

let seaCaptain = new Thing(
    'captain',
    "A weathered figurine of a ship's captain. (Like the captain on the Gorton's frozen fish-sticks box) I wonder what this could be for?",
    true,
    Cave,
    'message'
)

let bottle = new Thing(
    'bottle',
    "A glass bottle with a map inside.",
    true,
    Island,
    'message'
)

let map = new Thing(
    'map',
    "A parchment map that is covered in strange glyphs and symbols.",
    true,
    Island,
    'You now can understand the symbols and follow the map to a secret cave at the west end of the beach.'
)

let rocks = new Thing(
    'rocks',
    "You see many rocks tumbled together.  As you look more closely, you notice a bottle with a cork among the rocks.",
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

let radio = new Thing(
    'radio',
    "A hand held marine radio. Buttons and knobs appear inoperative.",
    true,
    Cabin,
    'You can\'t take this!'
)


/**   Global Functions  ********************************************************************** */
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
    r - check location inventory
    List - display command list
    Look at - look at surroundings or items 
    Take - add item to inventory
    Drop - remove item from inventory
    Go to - Move in target direction
    Enter - Enter a location
    Exit - Exit a location
    Punch in - Enter a code
    Read - Read something
    Swim - You swim across a body of water
     `)
}

function sanitizeInput(stringIn) {  // this function takes user input and sanitizes it 
    let cleanString = stringIn.trim().toLowerCase()
    let cleanArray = cleanString.split(' ')
    let action = cleanArray.shift() // action being verb
    let target = cleanArray.pop() // target being noun
    let exportArray = [action, target]
    return exportArray
}


function checkTarget(action, target) {  //this function evaluates and executes user input
    if (action === 'take') {
        let availableTarget = lookUpRooms[Player.location].inventory
        if (availableTarget.includes(target) && target != 'bottle') {
            lookUpThings[target].take() // using lookuptable to access item
        } else if (availableTarget.includes(target) && target === 'bottle') {
            console.log(`You pick up the bottle and smash it on the rocks to get the map`)
            lookUpThings['map'].take()
            let startIndex = (lookUpRooms[Player.location].inventory).indexOf('bottle')
            Player.inventory.splice(startIndex, 1)
            lookUpRooms[Player.location].inventory.splice(startIndex, 1)
        } else {
            console.log('You already have', target)
        }
    } else if (action === 'drop') {
        if (Player.inventory.includes(target)) {
            lookUpThings[target].drop()
        } else {
            console.log(`You don't have the ${target}.`)
        }
    } else if (action === 'look') {
        if (lookUpRooms[Player.location].inventory.includes(target) || Player.inventory) {
            if (target === map) {
                if (Player.literate === true) {
                    console.log(map.message)
                } else {
                    console.log(map.description)
                }
            }
            console.log(lookUpThings[target].description)
        } else {
            console.log(`There is no ${target} here.`)
        }
    } else if (action === 'i') {
        console.log('You are holding', Player.inventory)
    } else if (action === 'r') {
        console.log(lookUpRooms[Player.location].inventory)
    } else if (action === 'punch') {
        if (target === '1138') {
            console.log('The door clicks open')
            Cabin.locked = true
        } else {
            console.log('Nothing happens')
            start()
        }
    } else if (action === 'enter') {
        if (target === 'cabin') {
            if (Cabin.locked === true) {
                move('cabin')
            } else {
                console.log('The cabin door is locked, try the keypad...')
            }
        } else if (target === 'cave') {
            move('cave')
        } else {
            console.log('You can\'t get there from here.')
        }
    }
    else if (action === 'exit') {
        if (target === 'cabin') {
            move('sailboat')
        } else if (target === 'cave') {
            move('island')
            console.log(Island.message)
        }
    } else if (action === 'swim') {
        if (target === 'island') {
            move('island')
        } else if (target === 'sailboat') {
            move('sailboat')
            if (Player.inventory.includes('captain')) {
                console.log('You fucking WIN!')
                process.exit()
            }
        }
    } else if (action === 'list') {
        commandList()
    } else if (action === 'read') {
        if (target === 'book') {
            console.log('Your brain grows in size. You\'re a genius!')
            Player.literate = true
        } else if (target === 'map' && Player.literate === true) {
            console.log(lookUpThings['map'].message)
        } else {
            console.log(lookUpThings['map'].description)
        }
    }
}


// ******************* lookup table  **************************************************************
let lookUpThings = {
    'wallet': wallet,
    'bucket': fishBucket,
    'captain': seaCaptain,
    'book': mapBook,
    'bottle': bottle,
    'map': map,
    'boat': toyBoat,
    'door': cabinDoor,
    'keypad': keypad,
    'radio': radio,
    'rocks': rocks
}

let lookUpRooms = {
    'street': Street,
    'sailboat': Sailboat,
    'island': Island,
    'cabin': Cabin,
    'cave': Cave
}


// ******************* state machines **************************************************************

let localState = {
    street: ['sailboat'],
    sailboat: ['street', 'cabin', 'island'],
    cabin: ['sailboat'],
    island: ['cave', 'sailboat'],
    cave: ['island']
}

function move(nextLocale) { // this function moves our Player from one room to another
    if (localState[Player.location].includes(nextLocale)) {
        Player.location = nextLocale
        console.log(lookUpRooms[Player.location].description)
    } else {
        console.log(`invalid transition: ${Player.location} to ${nextLocale} `)
    }
}


// *************** logic **************************************************************************


async function start() {
    while (true) {
        let firstQ = await ask('What would you like to do?\n>_') // ask opening question

        let commandArray = sanitizeInput(firstQ)
        //console.log(commandArray[0], commandArray[1])  /// remove this for production version

        if (commandArray[0] === 'take') {
            checkTarget(commandArray[0], commandArray[1])
            if (commandArray[1] === 'boat' && Player.location === 'street') {
                console.log('Suddenly there is a flash of light!')
                move('sailboat')
                console.log('Player location is now', Player.location)
            }
        } else if (commandArray[0] === 'drop') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'look') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'r') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'i') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'punch') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'swim') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'enter') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0], 'exit') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'read') {
            checkTarget(commandArray[0], commandArray[1])
        } else if (commandArray[0] === 'list') {
            checkTarget(commandArray[0], commandArray[1])
        } else {
            console.log('Please enter a valid command.')
        }
    }
    process.exit()
}


// ******************* flow ***************************************************************************


console.log(lookUpRooms[Player.location].description)
commandList()
start();
