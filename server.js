const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

// Set views engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'photos' folder
app.use('/photos', express.static(path.join(__dirname, 'weather', 'photos')));


// Serve the 'public' folder as static files
app.use(express.static(__dirname + "/public")); // Corrected path for serving static files

app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

// Handle the weather route
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = '..................use your api key in here ';

    // Logic to fetch API data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let weather;
    let error = null;

    try {
        const response = await axios.get(apiUrl);
        weather = response.data;
    } catch (err) {
        error = 'Error, please try again';
    }

    res.render("index", { weather, error });
});

// Port environment variable
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
