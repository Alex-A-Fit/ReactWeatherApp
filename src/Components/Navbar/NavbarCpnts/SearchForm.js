import { TiArrowSortedDown } from 'react-icons/ti';
import { Form, Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavCpnts.css';



const countryArray = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "The Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Cote d’Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Democratic People's Republic of Korea", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "The Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "The Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of Korea", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "The Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "St. Vincent & Grenadines", "State of Palestine", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "The United Arab Emirates", "The United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

const countryCodes = ["AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT", "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CR", "CI", "HR", "CU", "CY", "CZ", "CD", "KP", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FJ", "FI", "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "VA", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "JM", "JP", "JE", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "MK", "NO", "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "QA", "KR", "RO", "RU", "RW", "KN", "LC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "SS", "ES", "LK", "SD", "VC", "PS", "SR", "SE", "CH", "SY", "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VE", "VN", "YE", "ZM", "ZW"];
let selectedCountry = "";
let selectedCountryCode = "";
let cityState = "";

function GetCountryCode() {
    let pos = countryArray.indexOf(selectedCountry);
    selectedCountryCode = countryCodes[pos];
}


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
        className="dropdownSize"
        ref={ref}
        id="countriesDropdown"
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
            //console.log(e);
        }}
    >
        {children}
        <TiArrowSortedDown />


    </button>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}

            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}

                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value) || child.props.children.toUpperCase().startsWith(value) || child.props.children.startsWith(value)
                    )}
                </ul>
            </div>
        );
    }

);

class SearchArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            countrychoice: "Choose a Country",
        }
        
    }
    setCountryName() {
        this.setState({ countrychoice: selectedCountry })
    }

    render() {
        return (
            <>
                <div className="removeAllSpacing">
                    <Form.Control className="formSize form " type="text" placeholder="  Enter &quot;City,State&quot;" id="form"
                        onChange={(e) => {
                            e.preventDefault();
                            cityState = e.target.value;
                        }} />
                </div>
                <div className="removeAllSpacing">
                    <Dropdown id="dropdown" className="dropdownFont2">
                        <Dropdown.Toggle as={CustomToggle} >
                            {this.state.countrychoice}
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu} className="dropdown-menu ">

                            {countryArray.map((countries) => {
                                return <Dropdown.Item
                                    key={countries}
                                    className="dropdownFont"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        selectedCountry = e.target.innerText;
                                        this.setCountryName();
                                        GetCountryCode();
                                    }}
                                >
                                    {countries}
                                </Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </>
        )
    }


}

export { SearchArea, selectedCountryCode, cityState };