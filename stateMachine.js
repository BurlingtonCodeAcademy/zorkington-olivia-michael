let localeState = {
    street: ['sailboat'],
    sailboat: ['street', 'cabin', 'island'],
    cabin: ['sailboat'],
    island: ['cave','sailboat'],
    cave: ['island']
}

function move(nextLocale) {
  
    if (locationLocale[currentLocale].includes(nextLocale)) {
        Player.location = nextLocale
    } else {
        console.log(`invalid transition: ${currentLocale} to ${nextLocale} `)
    }
}

console.log



"There is a FLASH if light!  You are now back on the street where you started.  In your right hand is the treasure map, and in your left hand are 5 gold coins.  Congratulations!  You solved the game!\n(Later this month you go on Antiques Roadshow and learn that the map and coins together are part of BlackBeard's missing treasure and are worth $1.5M)" 