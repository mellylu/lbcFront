export default {
    postAd(ad) {
        return fetch(`http://localhost:5000/api/v1/ad`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(ad),
        }).then(res => res.json())
    },
    updateAd(adId, ad) {
        return fetch("http://localhost:5000/api/v1/ad/" + adId, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(ad),
        }).then(res => res.json())
    },
    getAd(adId) {
        return fetch("http://localhost:5000/api/v1/ad/" + adId, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }).then(res => res.json())
    },
    getAllAd() {
        return fetch("http://localhost:5000/api/v1/ad", {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }).then(res => res.json())
    },
    deleteAd(adId) {
        return fetch("http://localhost:5000/api/v1/ad/" + adId, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(res => res.json())
    },
}
