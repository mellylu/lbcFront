export default {
    createCheckoutSession(token, body) {
        return fetch(`http://localhost:5000/api/v1/stripe/createSession`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: token,
            },
            body: JSON.stringify(body),
        }).then(res => res.json())
    },
}
