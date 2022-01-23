const https = require("https");
const express = require('express')
const router = express.Router()
const {token} = require('../config')

getStationsByCity = async (req, res) => {
    const { city } = req.params;
    data = await new Promise((resolve, reject) => {
        try {
            https.get(`https://api.waqi.info/search/?token=${token}&keyword=${city}`, (res) => {
                res.on("data", (chunk) => {
                    const dataJSON = JSON.parse(chunk)
                    const stations = []
                    dataJSON.data.forEach(element => {
                        stations.push({
                            name: element.station.name,
                            uid: element.uid,
                            aqi: element.aqi,
                            time: element.time
                        })
                    });
                    resolve(stations);
                });
            })
        } catch (err){
            reject({msg: 'Ocurrió error en la obtención del body', error: err})
        }
    })
    res.json({ data: data, status: true })
}

router.get('/search-city/:city',getStationsByCity);

module.exports = router