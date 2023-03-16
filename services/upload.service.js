export default {
    uploadfile(file) {
        console.log(file)
        return fetch(`http://localhost:5000/api/v1/upload/uploadfile`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(file),
        }).then(res => res.json())
    },
}
