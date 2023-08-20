import { Link } from "react-router-dom";

function NavItem(props) {
    const { data } = props;
    const { name, address } = data;
  
    return (
      <Link to={`${address}`} className="menu__item">
        {name}
      </Link>
    );
  }
  
  export default NavItem;