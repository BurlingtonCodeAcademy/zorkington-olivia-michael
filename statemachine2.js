// ***************************** constructor
class Room {
    constructor(name, description, inventory, lockable) {
        this.name = name
        this.description = description
        this.inventory = inventory
        this.lockable = lockable
    }
}

// ***************************** rooms

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
    'You enter adark cave.  A shaft of light from an opening above illuminates a Tiki altar.  In the center of the altar, on a great seashell is a figurine of a sea captain',
    ['captain'],
    true
)
//********************************** state machine ***************************************************

// let localeState = {
//     "street": {canChangeTo: ['sailboat']},
//     "sailboat": {canChangeTo: ['street', 'cabin', 'island']},
//     "cabin": {canChangeTo: ['sailboat']},
//     "island": {canChangeTo: ['cave','sailboat']},
//     "cave": {canChangeTo: ['island']}
// }
let currentLocale = 'street'
// ************ new state machine
let localState = {
    "street": { canChangeTo: ['sailboat'] },
    "sailboat": { canChangeTo: ['street', 'cabin', 'island'] },
    "cabin": { canChangeTo: ['sailboat'] },
    "island": { canChangeTo: ['cave', 'sailboat'] },
    "cave": { canChangeTo: ['island'] }
}

//********** template state machine */
// let altForms = {
//     "megatron": { canChangeTo: ["t-rex", 'tank', 'jet', 'robot', 'toaster'] },
//     "optimus": { canChangeTo: ["truck", 'lamborghini', 'robot'] },
//     "mark": { canChangeTo: ["shia"] }
  
// ******** original state machine
// let localState = {
//     street: ['sailboat'],
//     sailboat: ['street', 'cabin', 'island'],
//     cabin: ['sailboat'],
//     island: ['cave', 'sailboat'],
//     cave: ['island']
// }

// **************function?

function changeTo(nextLocale) {
    if (this.localState.includes(nextLocale)) {
        Player.location = nextLocale
        console.log(`your new location is ${nextLocale}`)
    } else {
        console.log(`invalid transition: ${currentLocale} to ${nextLocale} `)
    }
}

// ********** print statements

Street.changeTo('sailboat')
console.log(Street.name)
console.log('\n')

Street.move('island')
console.log(Street.name)
console.log('\n')

console.log('\n')

console.log('\n')

console.log('\n')

console.log('\n')