

export async function fetchTokens(username, password) {
    let res = await fetch('http://localhost:8000/api/token/', {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({username, password})
    })
    
    if(res.status === 200){
        let data = await res.json()
        localStorage.setItem('tokena', data.access)
        localStorage.setItem('tokenr', data.refresh)
        return {'result': data};
    } else
        if(res.status === 401)
            return {'error': 'Authentication Failed for user '+username}
        else
            return {'error': 'Erreur '+res.status}
}

