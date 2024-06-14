import axios from "axios"
import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const apiKey = "61069938df2e3da7cca2a04116716c31"

app.get("/", (req, res) => {
    res.render('index.ejs')
})

app.post("/search", async (req, res) => {
    const city = req.body.city
    try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        const temp = Math.round(result.data.main.temp)
        const country = result.data.sys.country.replace('"', '')
        const weather = result.data.weather[0].main

        console.log(weather)

        res.render('index.ejs', { 
            city,
            temp,
            country,
            weather,
        })
    } catch (error) {
        res.render('index.ejs', { content: JSON.stringify(error.response.data) });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});