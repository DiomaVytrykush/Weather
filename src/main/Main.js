import React from 'react';
import './Main.css';
import $ from 'jquery';
import data from './current.city.list.json';

class Main extends React.Component {
    render() {
        return (
            <main>
                <form>
                    <div className="input-group">
                        <select className="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                            <option select='true'>Вибрати країну . . .</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Вибрати</button>
                        </div>
                    </div>
                    <div className="input-group">
                        <select className="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                            <option select='true'>Вибрати місто . . .</option>
                            <option id="city"></option>
                        </select>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Вибрати</button>
                        </div>
                    </div>
                </form>
                <div id="weather"></div>
                <button type="button" className="btn btn-secondary btn-lg">Переслати погоду на пошту</button>
            </main>
        );
    }
}

export default Main;


$(document).ready(function () {
    let showCity = "";
    console.log(data[0].name)
    showCity += `${data[8906].name}`;
    $("#city").html(showCity);

    for (var key in data) {
        // console.log(data[0].name[0])

    }
});

let response = fetch('https://api.openweathermap.org/data/2.5/weather?id=707471&appid=70e1ed322b02acbc57d443dd91065f3e')
    .then(response => response.json())
    .then(function (data) {
        console.log(data)

        let out = `
            <div>
                <div><img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></div>
                <div>Погода: ${data.weather[0].main}</div>
                <div>${data.name}</div>
                <div>Волога: ${data.main.humidity}%</div>
                <div>Видимість: ${data.visibility / 1000} км</div>
                <div>Температура: ${Math.round(data.main.temp - 273)}<span>°C</span></div>
                <div>Тиск: ${Math.round(data.main.pressure + 0.00750063755419211 + 100)} Па</div>
            </div>
        `

        $('#weather').html(out)
    })
    .catch(function () {
        // any err
    })
