const token = `25d158cd-bb16-40f3-a15e-9350ebd3eac0`;
const base_url = "https://nomoreparties.co/v1/wff-cohort-37"
const headers = {
    authorization: token,
    'Content-Type': 'application/json'
}


function getResponse(res) {
    if (res.ok)
        return res.json()
    else
        return Promise.reject(res.status)
}


export function getUser() {
    return fetch(`${base_url}/users/me`,
        {
            headers: {
                authorization: token
            }
        }
    )
}

export function getCards() {
    return fetch(`${base_url}/cards`, {
        headers: headers
    }).then(getResponse)
}

export function editProfile(name, description) {
    return fetch(`${base_url}/users/me`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    }).then(getResponse)
}

export function newCard(name, link) {
    return fetch(`${base_url}/cards`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(getResponse)
}

export function addLike(cardId){
    return fetch(`${base_url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: headers
    }).then(getResponse)
}


export function removeLike(cardId){
    return fetch(`${base_url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: headers
    }).then(getResponse)
}


export function deleteCardPromise(cardId){
    return fetch(`${base_url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: headers
    }).then(getResponse)
}

export function updateAvatar(avatarUrl) {
    return fetch(`${base_url}/users/me/avatar`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    }).then(getResponse)
}