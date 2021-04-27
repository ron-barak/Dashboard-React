import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top shadow-sm">
      <div className="container-fluid">
        <Link
          to="/home"
          className="text-dark text-decoration-none"
          style={{ fontSize: "26px", marginLeft: "260px" }}
        >
          <i className="fas fa-bars py-3" style={{ color: "#003047" }}></i>
          <span className="font-weight-bold" style={{ color: "#003047" }}>
            {" "}
            Dashborad
          </span>
        </Link>

        <div className="btn-group mr-3">
          <button
            type="button"
            className="btn text-white"
            style={{ background: "#003047" }}
          >
            Action
          </button>
          <button
            type="button"
            className="btn  text-white dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ background: "#003047" }}
          >
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu text-center">
            <Link className="dropdown-item" to="/home">
              Action
            </Link>
            <Link className="dropdown-item" to="/home">
              Another action
            </Link>
            <div className="dropdown-divider"></div>
            <NavLink className="dropdown-item" to="/logout">
              sign out
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
