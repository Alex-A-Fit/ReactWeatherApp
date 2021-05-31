import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { selectedCountryCode, cityState } from '../../../Navbar/NavbarCpnts/SearchForm'
import { jsonFormat2 } from '../../../Navbar/Navbar'
import { highLow } from '../CitySearched'
import { Link } from "react-router-dom";
import '../Searched.css'


function MoreInfo(props) {

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${month} ${date}, ${year}`
    }

    function DayBuilder(d, dayOf) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let chosenDate = days[(d.getDay() + dayOf) % 7]
        return chosenDate
    }

    return (
        <Container fluid className="pt-3 moreInfoSpacing">
            <Row>
                <Col xs={12} className="d-flex justify-content-center mb-3">
                    <h2 className="moreInfoForecastFont mb-3">Forecast for {DayBuilder(new Date(), props)} </h2>
                </Col>
                <Col xs={4} classNamed="d-flex justify-content-end ">
                    <h3 className="moreInfoFontStyle">Morning Temp</h3>
                </Col>
                <Col xs={4}>
                    <h3 className="moreInfoFontStyle d-flex justify-content-center">Noon Temp</h3>
                </Col>
                <Col xs={4}>
                    <h3 className="moreInfoFontStyle d-flex justify-content-center">Evening Temp</h3>
                </Col>
                <Col xs={4} classNamed="d-flex justify-content-center ">
                    <h3 className="moreInfoFontStyle">{Math.round(jsonFormat2.daily[props].temp.morn)}°F</h3>
                </Col>
                <Col xs={4}>
                    <h3 className="moreInfoFontStyle d-flex justify-content-center">{Math.round(jsonFormat2.daily[props].temp.day)}°F</h3>
                </Col>
                <Col xs={4}>
                    <h3 className="moreInfoFontStyle d-flex justify-content-center">{Math.round(jsonFormat2.daily[props].temp.night)}°F</h3>
                </Col>
            </Row>
            <Row className="mt-5">

                <Col xs={6} className="d-flex justify-content-center mb-3 ">
                    <h2 className="moreInfoFontStyle">General Weather Forecast: {jsonFormat2.daily[props].weather[0].description.toUpperCase()} </h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-center mb-3 ">
                    <h2 className="moreInfoFontStyle">The Highs and Lows: {highLow[props]} </h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-center ">
                    <h2 className="moreInfoFontStyle">Humidity: {jsonFormat2.daily[props].humidity}% </h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-center ">
                    <h2 className="moreInfoFontStyle">Wind Speed: {Math.round(jsonFormat2.daily[props].wind_speed)} mph</h2>
                </Col>
            </Row>
        </Container>

    )

}

export default MoreInfo;