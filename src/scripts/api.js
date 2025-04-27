const token = `25d158cd-bb16-40f3-a15e-9350ebd3eac0`;
const base_url = "https://nomoreparties.co/v1/wff-cohort-37"

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
        headers: {
            authorization: token
        }
    })
}