export default {
    getElement(element) {
        return fetch(`http://localhost:5000/api/v1/filter?category=${element}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }).then(res => res.json())
    },
}
