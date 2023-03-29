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
    getAllAd(nbpage, sort) {
        return fetch(`http://localhost:5000/api/v1/ad?page=${nbpage}&sort=${sort}`, {
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
    getAllFilter(
        category,
        search,
        lat,
        lng,
        page,
        sort,
        univers,
        size,
        type,
        brand,
        material,
        color,
        state,
    ) {
        return fetch(
            `http://localhost:5000/api/v1/ad/getallfilter?category=${category}&search=${search}&lat=${lat}&lng=${lng}&sort=${sort}&page=${page}&univers=${univers}&size=${size}&type=${type}&brand=${brand}&material=${material}&color=${color}&state=${state}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            },
        ).then(res => res.json())
    },
}
