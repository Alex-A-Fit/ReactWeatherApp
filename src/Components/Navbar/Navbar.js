import { FaSearchLocation } from 'react-icons/fa'
import { Col, Container, Row, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Navbar.css'
import React, { useEffect, useState } from 'react'
import Favs from './NavbarCpnts/Favorites'
import { SearchArea, selectedCountryCode, cityState } from './NavbarCpnts/SearchForm'
import { FetchJson } from '../Fetch/Fetch';
import HomePage from '../Body/HomePage'
import { SearchedBody } from '../Body/Search/CitySearched'

let jsonFormat;
let jsonFormat2;
let response = null;
let currentFavs = [];


const Navbar = () => {
    if (localStorage.getItem('SavedCities')) {
        currentFavs = JSON.parse(localStorage.getItem('SavedCities'))
    } else {
        currentFavs = [];
    }

    let lat;
    let lon;
    const [clicked, setClicked] = useState(false);
    const [response, setResponse] = useState(false);
    const [error, setError] = useState(false);
    const [background, setBackground] = useState("starterBG")
    const [lgShow, setLgShow] = useState(false);



    const FirstAPI = async () => {
        jsonFormat = await FetchJson(`https://api.openweathermap.org/data/2.5/weather?q=${cityState},${selectedCountryCode}&units=imperial&appid=64c32382d7f20134fba026b769bba586`);
        if (jsonFormat.cod === "404" || cityState == "") {
            setResponse(false);

            setError(true);
        } else {

            console.log(jsonFormat);
            lat = jsonFormat.coord.lat;
            lon = jsonFormat.coord.lon;
            SecondAPI();
            setTimeout(() => {
                setBackground(jsonFormat.weather[0].main)
                if (background === "Drizle") {
                    background = "Rain"
                }
                setResponse(true)
            }, 1300)
        }
    }

    function CreateModalFavLi() {
        return (
            <>
                {currentFavs.map(favorites =>
                (
                    <li key={favorites} className="listStyling" >
                        {favorites}
                    </li>
                )
                )}
            </>
        )

    }

    function CreateModalFavs() {
        return (
            <ul className="removeDot">
                {CreateModalFavLi()}
            </ul>
        )
    }

    const SecondAPI = async () => {
        jsonFormat2 = await FetchJson(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=imperial&appid=64c32382d7f20134fba026b769bba586`);
        console.log(jsonFormat2)
    }

    useEffect(() => {
        if (clicked === true) {
            setResponse(false);
            FirstAPI();
            setClicked(false);
            if (error === true) {
                setError(false);
            }
        }
    })

    return (
        <>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"

            >
                <Modal.Header className="d-flex justify-content-center favoriteModalTitle">
                    <Modal.Title id="example-modal-sizes-title-lg" >
                        Your List of Favorited Cities:
          </Modal.Title>
                </Modal.Header>
                <Modal.Body className="favoriteModalBody">
                    <Row>
                        <Col>
                            {CreateModalFavs()}
                        </Col>

                    </Row>
                </Modal.Body>
            </Modal>
            <Container fluid className={`${background} removeAllSpacing`}>
                <Row className="navBG">
                    <Col xs={2} className="d-flex justify-content-center align-items-center">
                        <Favs onClick={() => setLgShow(true)} />
                    </Col>

                    <Col xs={7} className="d-flex justify-content-center align-items-center title ">
                        <h1>React Weather App</h1>
                    </Col>
                    <Col xs={3} className=" d-flex justify-content-end align-items-center" >
                        <button className="searchIconBG buttonSize" onClick={() => { setClicked(true) }}>
                            <FaSearchLocation className="searchIconSize" />
                        </button>
                        <SearchArea />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={error ? "d-flex justify-content-center " : "d-none"}>
                        <h2 className="d-flex justify-content-center white"> The city you searched for was not found</h2>
                    </Col>
                </Row>
                {response ? <SearchedBody /> : <HomePage />}
            </Container>
        </>
    )
}

export { Navbar, jsonFormat, jsonFormat2, response, currentFavs }