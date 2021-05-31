import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import { selectedCountryCode, cityState } from '../../Navbar/NavbarCpnts/SearchForm';
import { jsonFormat, jsonFormat2, currentFavs } from '../../Navbar/Navbar';
import {setToLS} from '../../LocalStorage/LocalStorage'
import { ImPlus } from 'react-icons/im';
import MoreInfo from './MoreInfo/MoreInfo'
import './Searched.css'
let highLow = [];

function SearchedBody() {
    const [todayPressed, setTodayPressed] = useState(false);
    const [day1Pressed, setDay1Pressed] = useState(false);
    const [day2Pressed, setDay2Pressed] = useState(false);
    const [day3Pressed, setDay3Pressed] = useState(false);
    const [day4Pressed, setDay4Pressed] = useState(false);
    const [day5Pressed, setDay5Pressed] = useState(false);
    const [addToFav, setAddToFav] = useState(false);
    const [favClickable, setFavClickable] = useState(false);
    const [favoritesArr, setFavoritesArr] = useState(currentFavs);

    

    const weatherImgPt1 = "http://openweathermap.org/img/wn/";
    let weatherImgPt2 = [];
    const weatherImgPt3 = "@2x.png";
    let weatherImgDesc = [];
    let sixDays = [];
    let favoritedCity = `${cityState.trim()} ${selectedCountryCode}`

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${month} ${date}, ${year}`
    }

    function DayBuilder(d) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        sixDays =
            [days[d.getDay()],
            days[(d.getDay() + 1) % 7],
            days[(d.getDay() + 2) % 7],
            days[(d.getDay() + 3) % 7],
            days[(d.getDay() + 4) % 7],
            days[(d.getDay() + 5) % 7]]

    }

    function ImgBuilder() {
        weatherImgPt2 =
            [jsonFormat2.daily[0].weather[0].icon,
            jsonFormat2.daily[1].weather[0].icon,
            jsonFormat2.daily[2].weather[0].icon,
            jsonFormat2.daily[3].weather[0].icon,
            jsonFormat2.daily[4].weather[0].icon,
            jsonFormat2.daily[5].weather[0].icon]

    }

    function ImgDescription() {
        weatherImgDesc =
            [`An image of ${jsonFormat2.daily[0].weather[0].description}`,
            `An image of ${jsonFormat2.daily[1].weather[0].description}`,
            `An image of ${jsonFormat2.daily[2].weather[0].description}`,
            `An image of ${jsonFormat2.daily[3].weather[0].description}`,
            `An image of ${jsonFormat2.daily[4].weather[0].description}`,
            `An image of ${jsonFormat2.daily[5].weather[0].description}`]
    }
    function HighLowBuilder() {
        highLow =
            [`${Math.round(jsonFormat2.daily[0].temp.day)}°F/${Math.round(jsonFormat2.daily[0].temp.night)}°F`,
            `${Math.round(jsonFormat2.daily[1].temp.day)}°F/${Math.round(jsonFormat2.daily[1].temp.night)}°F`,
            `${Math.round(jsonFormat2.daily[2].temp.day)}°F/${Math.round(jsonFormat2.daily[2].temp.night)}°F`,
            `${Math.round(jsonFormat2.daily[3].temp.day)}°F/${Math.round(jsonFormat2.daily[3].temp.night)}°F`,
            `${Math.round(jsonFormat2.daily[4].temp.day)}°F/${Math.round(jsonFormat2.daily[4].temp.night)}°F`,
            `${Math.round(jsonFormat2.daily[5].temp.day)}°F/${Math.round(jsonFormat2.daily[5].temp.night)}°F`]
    }

    const getData = () => {
        DayBuilder(new Date());
        ImgBuilder();
        ImgDescription();
        HighLowBuilder();
    }

    const WeatherCard = (date, img, highLowTemp, imgDesc, onClickFunction) => {
        return (
            <Card className="mr-3 cardSize cardBG " onClick={onClickFunction}>
                <Card.Header as="h5" className="dayFont d-flex justify-content-center">{date}</Card.Header>
                <Card.Body>
                    <img
                        className=" whiteImg "
                        src={img}
                        alt={imgDesc}
                    />
                    <Card.Text className="tempFont ml-2 d-flex justify-content-center mt-3">
                        {highLowTemp}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
    
    getData();

    function todayClick() {
        setTodayPressed(!todayPressed)
        setDay1Pressed(false)
        setDay2Pressed(false)
        setDay3Pressed(false)
        setDay4Pressed(false)
        setDay5Pressed(false)
    }
    function day1Click() {
        setDay1Pressed(!day1Pressed)
        setTodayPressed(false)
        setDay2Pressed(false)
        setDay3Pressed(false)
        setDay4Pressed(false)
        setDay5Pressed(false)
    }
    function day2Click() {
        setDay2Pressed(!day2Pressed)
        setTodayPressed(false)
        setDay1Pressed(false)
        setDay3Pressed(false)
        setDay4Pressed(false)
        setDay5Pressed(false)
    }
    function day3Click() {
        setDay3Pressed(!day3Pressed)
        setTodayPressed(false)
        setDay1Pressed(false)
        setDay2Pressed(false)
        setDay4Pressed(false)
        setDay5Pressed(false)
    }
    function day4Click() {
        setDay4Pressed(!day4Pressed)
        setTodayPressed(false)
        setDay1Pressed(false)
        setDay2Pressed(false)
        setDay3Pressed(false)
        setDay5Pressed(false)
    }
    function day5Click() {
        setDay5Pressed(!day5Pressed)
        setTodayPressed(false)
        setDay1Pressed(false)
        setDay2Pressed(false)
        setDay3Pressed(false)
        setDay4Pressed(false)
    }

    const addingCity = () => {
        setFavoritesArr(favoritesArr => [...favoritesArr, favoritedCity ]);
        setFavClickable(false)
        setAddToFav(true)
    }

    useEffect(() => {
        if (favoritesArr.includes(favoritedCity)) {
            setFavClickable(false)
        } else {
            setFavClickable(true)
        }

        if (addToFav) {
            setToLS(favoritesArr);
            setAddToFav(false);
        }
    })

    return (
        <Container fluid className="pt-5 backgroundLayer">
            <Row>
                <Col xs={2} className="d-flex justify-content-end ">
                    <h3 className="TempSize"> {Math.round(jsonFormat.main.temp)}°F </h3>
                </Col>

                <Col xs={7} className="d-flex justify-content-end white CityTitle">
                    <h2 className="ml-5 stateFont align-content-start"> {cityState} {selectedCountryCode}</h2>
                    {favClickable ?
                        <Button className="ml-3 buttonPad "
                            onClick={() => { addingCity() }}
                        >
                            <ImPlus /> Add to Favorites
                        </Button>
                        :
                        <Button className="ml-5 buttonPad" disabled>
                            Added!
                        </Button>
                    }
                </Col>

                <Col xs={3} className="d-flex justify-content-start white ">
                    <h3 className="date"> {dateBuilder(new Date())} </h3>
                </Col>
            </Row>
            <Container className="mt-5">
                <Row>

                    <Col xs={12} className="d-flex justify-content-center ">
                        <h3 className="descriptionSize "> Current weather: {jsonFormat.weather[0].description.toUpperCase()} </h3>
                    </Col>
                </Row>
            </Container>

            {todayPressed ? MoreInfo(0) : ""}
            {day1Pressed ? MoreInfo(1) : ""}
            {day2Pressed ? MoreInfo(2) : ""}
            {day3Pressed ? MoreInfo(3) : ""}
            {day4Pressed ? MoreInfo(4) : ""}
            {day5Pressed ? MoreInfo(5) : ""}
            <Row className="cardPositionInfo">
                <Col className="d-flex justify-content-center mb-2">
                    <h4 className="cardPositionInfoTxt">Click on a card for more info</h4>
                </Col>
            </Row>
            <Row >
                <Col md={6} lg={4} xl={2} >

                    {WeatherCard(sixDays[0], weatherImgPt1 + weatherImgPt2[0] + weatherImgPt3, highLow[0], weatherImgDesc[0], todayClick)}

                </Col>
                <Col md={6} lg={4} xl={2}>

                    {WeatherCard(sixDays[1], weatherImgPt1 + weatherImgPt2[1] + weatherImgPt3, highLow[1], weatherImgDesc[1], day1Click)}

                </Col>
                <Col md={6} lg={4} xl={2}>

                    {WeatherCard(sixDays[2], weatherImgPt1 + weatherImgPt2[2] + weatherImgPt3, highLow[2], weatherImgDesc[2], day2Click)}

                </Col>
                <Col md={6} lg={4} xl={2}>

                    {WeatherCard(sixDays[3], weatherImgPt1 + weatherImgPt2[3] + weatherImgPt3, highLow[3], weatherImgDesc[3], day3Click)}

                </Col>
                <Col md={6} lg={4} xl={2}>

                    {WeatherCard(sixDays[4], weatherImgPt1 + weatherImgPt2[4] + weatherImgPt3, highLow[4], weatherImgDesc[4], day4Click)}

                </Col>
                <Col md={6} lg={4} xl={2}>

                    {WeatherCard(sixDays[5], weatherImgPt1 + weatherImgPt2[5] + weatherImgPt3, highLow[5], weatherImgDesc[5], day5Click)}

                </Col>
            </Row>
        </Container >
    )

}

export { SearchedBody, highLow };