import React from "react";
import Weather from "./components/Weather";

function convertToFlag(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            location: "Kolkata",
            isLoading: false,
            displayLocation: "",
            weather: {}
        };

        this.fetchWeather = this.fetchWeather.bind(this);
    };

    async fetchWeather(e) {
        e.preventDefault();
        try {
            this.setState({ isLoading: true });

            // 1) Getting location (geocoding)
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
            );
            const geoData = await geoRes.json();
            console.log(geoData);

            if (!geoData.results) throw new Error("Location not found");

            const { latitude, longitude, timezone, name, country_code } =
                geoData.results.at(0);
            this.setState({ displayLocation: `${name} ${convertToFlag(country_code)}` });

            // 2) Getting actual weather
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
            );
            const weatherData = await weatherRes.json();
            this.setState({ weather: weatherData.daily });

        } catch (err) {
            console.error(err);
        } finally {
            this.setState({ isLoading: false });
        }

    }

    render() {
        return (
            <div className="app">
                <h1>Classy Weather</h1>

                <form action="" id="search-weather">
                    <label htmlFor="search-input"></label>
                    <input type="text" id="search-input" placeholder="search with location..." value={this.state.location} onChange={e => this.setState({ location: e.target.value }
                    )} />

                    <button onClick={this.fetchWeather}>Get Weather</button>
                </form>

                {this.state.isLoading && <p className="loader">loading...</p>}

                {this.state.weather.weathercode && <Weather weather={this.state.weather} location={this.state.location} />}
            </div>
        )
    }
};

export default App;