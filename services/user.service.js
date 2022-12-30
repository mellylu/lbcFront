export default {
    login(user) {
        return fetch(`http://localhost:5000/api/v1/users/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        }).then(res => res.json())
    },
    register(user) {
        return fetch(`http://localhost:5000/api/v1/users/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        }).then(res => res.json())
    },
    emailexist(email) {
        return fetch(`http://localhost:5000/api/v1/users/emailexist`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(email),
        }).then(res => res.json())
    },
    verifyemail(email) {
        return fetch(`http://localhost:5000/api/v1/users/verifyemail`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(email),
        }).then(res => res.json())
    },
    sendEmailToResetPassword(email) {
        return fetch(`http://localhost:5000/api/v1/token/sendEmailToResetPassword`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(email),
        }).then(res => res.json())
    },
    formResetPassword(token) {
        const body = { token: token }
        return fetch(`http://localhost:5000/api/v1/token/formResetPassword`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(res => res.json())
    },
    updateuser(userId, user) {
        return fetch("http://localhost:5000/api/v1/users/" + userId, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        }).then(res => res.json())
    },
    getuser(id) {
        return fetch("http://localhost:5000/api/v1/users/" + id, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }).then(res => res.json())
    },
}
