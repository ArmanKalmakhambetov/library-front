import logo from '../logo.svg'
import React from "react";
import {Link, Outlet} from "react-router-dom";
import '../App.css'

export default function Layout() {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light border-bottom">
                <Link className="navbar-brand mx-4" to="/">
                    <img src={logo} className="App-logo me-3" style={{height: '50px'}} alt=""/>
                    Личная библиотека
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Главная
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/allBooks">
                                Все книги
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addBooks">
                                Добавить книгу
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/statistic">
                                Статистика
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}
