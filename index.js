const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}

start();

async function start() {
    
    const welcomeMessage = `Welcome to our game.  Please use the following commands:\n
    i - Check personal inventory\n
  	r - Check room inventory\n
    Look at - investigate surroundings or items\n
    Take - add item to inventory\n
    Drop - remove item from inventory\n
    Go R/L  - move right or left\n
    \n
    You are on deserted city street with no one around.   `;
    let answer = await ask(welcomeMessage);
    console.log('Now write your code to make this work!');
    process.exit();
}



/******* Class Constructors************************************************************ */

class Room {
    constructor(description, inventory) {
        this.description = description
        this.inventory = inventory
    }

    describe() {
        console.log(this.description)
    }

}

class Thing {
    constructor(description, takeable, location) {
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
    "You notice a wallet, rocks, sticks, a toy boat, and a partially torn newspaper lying about", []
)

let Deck = new Room(
  'A weathered deck. You notice a cabin door at the fore, a bucket of fish at the aft, and water all around. An island is off in the near distance.', []
)

let Island = new Room(
  'A sandy beach that stretches to the east and west. Palm trees bend in the breeze.', []
)

let Cabin = new Room(
  'A small room filled with odd items. You see a radio and books.', []
)

let Cave = new Room(
  'description', []
)

// Things *****************

let toyBoat = new Thing(
    "A toy sailboat with a blue hull. It is very detailed with a nautical wheel and a place for a captain, a mast, and a boom.  On the side of the bow are registration numbers BH-1138", true, Street
)

let wallet = new Thing (
    "A crocodile-leather wallet that is battered, scuffed, and worn", false, Street
)

