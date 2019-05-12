
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const request = require('request');
const cors = require('cors');



const app = express();


app.use(bodyParser.json())
app.use(cors())



app.get('/getProducts/:category',(req,resp)=>{

    console.log('getProducts');
    console.log(req.params.category);

    let url = '';

    switch (req.params.category) {
        case 'vacation':
        {
            url='https://www.travelzoo.com/collection/getcollectionitems/?debug=&id=31&previewKey=&typeid=1&isGiftGuideCollection=false';
            break;
        }
        case 'cruise':{
            url='https://www.travelzoo.com/search/GetSearchResult/?siteSearchId=15c2f724-735d-4fe5-9684-ac8edc389dc3&includeStories=true&debug=&keyword=&uokw=false&kwspn=&guests=2&travelers=1&when=Anytime&origin=0&destination=0&locationId=0&ctfId=2&searchGuid=6e1b5249-012b-4df3-b290-2b78e29dec3d&userIpAddress=109.66.99.201&ehe=0&isHotelPlatformSearch=false&storiesSearchAlgorithm=0Cruise '
            break;
        }

        case 'luxury':{
            url='https://www.travelzoo.com/search/GetSearchResult/?siteSearchId=c69f3592-1451-4153-b946-e0486b602fbc&includeStories=true&debug=&keyword=&uokw=false&kwspn=&guests=2&travelers=1&when=Anytime&origin=0&destination=0&locationId=0&ctfId=10&searchGuid=1ff26546-298e-43e7-a012-e2c784acca96&userIpAddress=109.66.99.201&ehe=0&isHotelPlatformSearch=false&storiesSearchAlgorithm=0'
            break;
        }
    }

    request(url,
        { json: true }, (err, res, body) => {
        if (err) { resp.status(400).json('error: '+err); }

        console.log('body')
        console.log(body)
            let dls = [];
            body.searchResponse.dls.map(dl=>{
                if (dl.ima && dl.ima.nam){
                    dls.push(dl)
                }
            })
        resp.json(dls)
    });


    // axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    //     .then(response => {
    //         console.log(response.data.url);
    //         console.log(response.data.explanation);
    //         res.json(response)
    //
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         res.status(400).json('wrong credentials')
    //     });
    //
    })




app.listen(3001, ()=>{
    console.log('app is running on port 3001');
})