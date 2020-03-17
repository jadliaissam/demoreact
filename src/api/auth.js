

export async function fetchTokens(username, password) {
    return fetch('https://reactbackendapi.herokuapp.com/api/token/', {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({username, password})
    })

    
}

