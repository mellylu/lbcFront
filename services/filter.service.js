export default {
    getElement(element) {
        console.log("11")
        console.log(element)
        console.log("11")
        return fetch(`http://localhost:5000/api/v1/filter?category=${element}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }).then(res => res.json())
    },
}
