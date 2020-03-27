

export function fetchTokens(username, password) {
    let serverAddr = localStorage.getItem('server')
    return fetch(`${serverAddr}/api/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    }).then(res => {
        switch (res.status) {
            case 200:
                return res.json().then(data => {
                    return { status: 200, error: '', data }
                });
            case 401:
                return { status: 401, error: 'Authentication Error' };
            default:
                return { status: res.status, error: 'An Error has occured' };
        }
    }).catch(err => { return { status: 0, error: 'Authentication Error' }; })
}

export function registerUser(params) {
    let serverAddr = localStorage.getItem('server')
    return fetch(`${serverAddr}/api/v1/user/`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "Content-Type": 'application/json'
        }
    }).then(res => {
        let status = res.status
        return res.json().then(data => {
            switch (status) {
                case 201:
                    return { status: 201, error: '', data }
                default:
                    return { status: status, error: 'An Error has Occured ! ' };
            }
        })
    }).catch(err => { return { status: 100, error: 'An Error has Occured ! ' + JSON.stringify(err) }; })
}

export function getProducts(){
    let serverAddr = localStorage.getItem('server')
    return fetch(`${serverAddr}/api/v1/product/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        switch (res.status) {
            case 200:
                return res.json().then(data => {
                    return { status: 200, error: '', data }
                });
            case 401:
                return { status: 401, error: 'Authentication Error' };
            default:
                return { status: res.status, error: 'An Error has occured' };
        }
    }).catch(err => { return { status: 0, error: 'Authentication Error' }; })
}
