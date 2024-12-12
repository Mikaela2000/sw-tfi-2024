import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import * as actions from "../../redux/actions";
import perfilUsuario from '../../assets/user3.png';
import { ImExit } from "react-icons/im";
const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token) || localStorage.getItem("token");
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(actions.logoutUser());
        navigate("/");
    };

    return (
        <div >
            <nav className="navbar fixed top-0 w-screen bg-blue-900 shadow-lg z-50">
            <div className="w-full flex items-center justify-between p-4">
                    <div className="flex">
                        <a className="text-2xl font-bold text-blue-400" href="#">CentroMedico</a>

                        {/* Botón hamburguesa */}
                        <button className="lg:hidden text-white focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="material-icons">menu</span>
                        </button>

                        {/* Links */}
                        <div className="hidden lg:flex items-center space-x-6 ml-16" id="navbarNavAltMarkup">
                            <Link className="text-white hover:text-blue-600" to="/menu">Inicio</Link>

                        </div>

                    </div>

                    <div>
                        <button className="bg-purple-600 bg-opacity-0" onClick={handleLogout}>
                        <ImExit className="text-2xl text-white"></ImExit>
                        </button>
                        
                    
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
