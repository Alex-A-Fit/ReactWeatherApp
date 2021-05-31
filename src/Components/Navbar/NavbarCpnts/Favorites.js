import { IoExpandOutline } from 'react-icons/io5';
import './NavCpnts.css';

const FavExpand = (props) => {

    return (
        <div>
        <h1 className="favoritesPosition fontStyling" onClick={props.onClick}><IoExpandOutline className="mt-1"/> Favorites </h1>
        </div>

    )

}

export default FavExpand;