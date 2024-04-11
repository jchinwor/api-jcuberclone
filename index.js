const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


axios.defaults.baseURL = process.env.GOOGLE_MAPS_API_URL

app.use(bodyParser.json())
app.use(cors({
    origin:[`${process.env.FRONTEND_URL}`,"http://localhost:5173"]
}))

//Address
app.get('/api/address/:address', async(req, res)=>{
    try {

        if(req.params.address === null || req.params.address === '' || req.params.address === 'null'){

            return ''
        }

        let data = await axios.get('place/autocomplete/json'+
        '?input=' + req.params.address + '&types=address' + '&key=' + process.env.GOOGLE_MAPS_API_KEY)
        
        res.status(200).json(data.data.predictions)

    } catch (error) {
        
        console.log(error)
    }
})

//Distance
app.get('/api/distance/:pickup/:destination', async(req, res)=>{
    try {

        let data = await axios.get('distancematrix/json'+
        '?origins=' + req.params.pickup +  '&destinations=' + req.params.destination + '&units=imperial' + '&key=' + process.env.GOOGLE_MAPS_API_KEY)
        
        res.status(200).json(data.data)

    } catch (error) {
        
        console.log(error)
    }
})

app.listen(process.env.PORT, () =>{
    console.log(`App listening at http://localhost:${process.env.PORT}`)
})