const express = require('express');
const https = require('https');
const app = express();
app.get('/getTimeStories', (req, res) => {
    const uri = 'https://time.com';
    
    var respond='';
    https.get(uri, (response) => {
        response.setEncoding('utf-8');
        response.on('data', (value)=>{
            // console.log(value);
            // console.log(value.length);
            if(value){
                respond+=value;
            }   
        })
        response.on('end', () => {
            console.log('the valu e of the respond.length is: ', respond.length);
            const stories = [];
            const regex = /<li class="latest-stories__item">.*?<a href="(.*?)">.*?<h3 class="latest-stories__item-headline">(.*?)<\/h3>/gs;
            let match;
            while ((match = regex.exec(respond)) !== null && stories.length < 6) {
                stories.push({
                    title: match[2].trim(),
                    link: `https://time.com${match[1]}`
                });
            }
            res.json(stories);
        });
        
    }).on('error', (err) => {
        res.status(500).send("Error fetching the data from the server.");
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
