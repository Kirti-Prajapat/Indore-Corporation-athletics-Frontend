const events = []

const Reducers = (state = { events, cart:[]}, Action) => {
    switch (Action.type) {
        case "success":
            return { events: Action.payload }
        case "fail":
            return { events: Action.payload }
        
        default:
            return state
    }
}

export default Reducers;