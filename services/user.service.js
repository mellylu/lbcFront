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
}
