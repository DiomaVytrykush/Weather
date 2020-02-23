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
                            <option className="choise" select='true'>Choose the country . . .</option>
                            <option value="UA">Ukraine</option>
                            <option value="JP">Japanese</option>
                            <option value="RU">Russia</option>
                            <option value="PL">Poland</option>
                            <option value="IR">Iran</option>
                            <option value="IQ">Iraq</option>
                            <option value="CY">Cyprus</option>
                            <option value="YE">Yemen</option>
                            <option value="LY">Libya</option>
                            <option value="SA">South Africa</option>
                            <option value="EE">Estonia</option>
                            <option value="EG">Egypt</option>
                            <option value="TR">Turkey</option>
                            <option value="IN">India</option>
                            <option value="CN">China</option>
                            <option value="AU">Australia</option>
                            <option value="SE">Sweden</option>
                            <option value="DE">Germany</option>
                            <option value="FR">France</option>
                        </select>
                    </div>
                    <div className="mainbox">
                        <label htmlFor=""><span>City :</span></label>
                        <div className="citybox" id="city">
                        </div>
                    </div>
                </form>
                <div id="weather"></div>
            </main>
        );
    }
}

export default Main;

$(document).ready(function () {
    $('select').on('change', function () {
        var cities = '';
        for (var key in data) {
            if (data[key].country == $('select option:selected').val()) {
                cities += `<p value="${data[key].id}">${data[key]["name"]}</p>`;
            }
        }
        $("#city").html(cities);
        $("#city p").on('click', function () {
            $.get('https://api.openweathermap.org/data/2.5/weather', {
                "id": $(this).attr('value'),
                "appid": "70e1ed322b02acbc57d443dd91065f3e"
            },
                function (data) {
                    let out = `
                    <div><img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></div>
                    <div>
                        <div>Weather : ${data.weather[0].main}</div>
                        <div>${data.name}</div>
                        <div>Wet : ${data.main.humidity}%</div>
                        <div>Visibility : ${data.visibility / 1000} km</div>
                        <div>Temperature : ${Math.round(data.main.temp - 273)}<span>°C</span></div>
                        <div>Pressure : ${Math.round(data.main.pressure + 0.00750063755419211 + 100)} Pa</div>
                    </div>
                `
                    $('#weather').html(out)
                })
        })
        $(".custom-select").on('click', function () {
            $(".citybox").css({ 'display': 'block' });
        })
        // $(".custom-select").on('click', function () {
        // console.log("ssa")
        // $(".citybox").css({ 'display': 'none' });
        // })
    })
});



