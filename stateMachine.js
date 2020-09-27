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

c