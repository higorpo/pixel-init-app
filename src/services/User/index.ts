import api from "../api"

function createAccount(email: string, password: string, ticket_number: string) {
    return api.post(`/users`, {
        mail: email,
        password,
        ticket_number
    })
}



function loginAttempt(email: string, password: string) {
    return api.post(`/sessions`, {
        email,
        password,
    })
}

const User = {
    createAccount,
    loginAttempt
}

export default User;