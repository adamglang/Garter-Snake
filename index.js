const express = require("express");
const fetch = require("node-fetch");
const fs = require("nano-fs");
const querystring = require("querystring");
const  app = express();

app.use('/', async (req, res) => {
    try {
        const passBuffer = await fs.readFile("../assets/garterSnakePass.txt");
        const encodedPass = passBuffer.toString("base64");
        const baseHref = "http://api.websites.prod-las.cobaltgroup.com/api/mvs/v2/vehicles/search?";
        const reqObj = {
            "search": "new,used,certified",
            "limit": 100,
            "updateCountTwoWays": true,
            "showCountPrimaryFilters": true,
            "originalDomain": "http://www.lexusofbellevue.com/",
            "webId": "lex-bellevue",
            "locale": "en_US"
        };
        const query = querystring.stringify(reqObj);
        const options = {
            "headers": {
                "Authorization": `Basic ${encodedPass}`
            }
        };
        const body = await fetch((baseHref + query), options);
        const payload = await body.json();

        res.json(payload);
    }
    catch(e) {
        console.error(e.stack);
    }
});

app.listen(process.env.PORT || 3000);