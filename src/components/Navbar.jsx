import React from 'react'
import "./Navbar.css"
import { useNavigate, Link } from 'react-router-dom'

const Navbar = () => {
    let nav = useNavigate()
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black px-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <h1 className='text-light me-5 '>Blog</h1>
                    </Link>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                        <i className="bi bi-list" style={{ fontSize: '1.5rem' }} />
                    </button>
                    <div className="offcanvas offcanvas-end d-lg-flex" tabIndex={-1} id="offcanvasNavbar">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title text-white">Menu</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" />
                        </div>
                        <div className="offcanvas-body justify-content-between w-100">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3 ul">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/who">WHO?</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/updates">UPDATES</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tools">TOOLS</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/best-of">BEST OF</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/blog">THE BLOG</Link>
                                </li>
                            </ul>
                            <button className="btn btn-highlight mt-3 mt-lg-0 hello" onClick={() => nav('/login')}>
                                <i className="bi bi-star-fill" /> STARTING A NEW BLOG?
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
