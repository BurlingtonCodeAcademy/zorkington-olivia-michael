let locationState = {
    street: ['deck'],
    deck: ['street', 'cabin'],
    cabin: ['island', 'street'],
    island: ['deck']
}

function move(nextState) {
    let currentState = light

    if (locationState[currentState].includes(nextState)) {
        Player.location = nextState
    } else {
        console.log(`invalid transition: ${currentState} to ${nextState} `)
    }
}