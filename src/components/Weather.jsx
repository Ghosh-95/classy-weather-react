import React from "react";

class Weather extends React.Component {
    render() {
        const { temperature_2m_max: max, temperature_2m_min: min, time: dates, weathercode: codes } = this.props.weather;

        return (
            <div>
                <h2>{this.props.location}</h2>

                <ul className="weather">
                    {dates.map((date, i) => (
                        <Day date={date} max={max.at(i)} min={min.at(i)} code={codes.at(i)} key={date} isToday={i === 0} />
                    ))}
                </ul>
            </div>
        )
    };
};

class Day extends React.Component {
    constructor() {
        super();
    };

    formatDay(dateStr) {
        return new Intl.DateTimeFormat("en", {
            weekday: "short",
        }).format(new Date(dateStr));
    };

    getWeatherIcon(wmoCode) {
        const icons = new Map([
            [[0], "☀️"],
            [[1], "🌤"],
            [[2], "⛅️"],
            [[3], "☁️"],
            [[45, 48], "🌫"],
            [[51, 56, 61, 66, 80], "🌦"],
            [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
            [[71, 73, 75, 77, 85, 86], "🌨"],
            [[95], "🌩"],
            [[96, 99], "⛈"],
        ]);
        const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
        if (!arr) return "NOT FOUND";
        return icons.get(arr);
    }

    render() {
        const { date, max, min, code, isToday } = this.props;

        return (
            <li className="day">
                <span>{this.getWeatherIcon(code)}</span>
                <p>{isToday ? "Today" : this.formatDay(date)}</p>
                <p>{Math.floor(min)} &deg; &mdash; {Math.ceil(max)}</p>
            </li>
        )
    }
};


export default Weather;

