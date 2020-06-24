import api from "../api"

function createAccount(email: string, ticket_number: string) {
    return api.post(`/users`, {
        mail: email,
        ticket_number
    })
}



function loginAttempt(email: string, ticket_number: string) {
    return api.post(`/sessions`, {
        email,
        ticket_number
    })
}

const User = {
    createAccount,
    loginAttempt
}

export default User;