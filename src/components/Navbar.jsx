import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    let nav =useNavigate()
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black px-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                       <h1 className='text-light me-5 mt-2'>Blog</h1>
                    </a>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                        <i className="bi bi-list" style={{ fontSize: '1.5rem' }} />
                    </button>
                    {/* Offcanvas works on all screens now */}
                    <div className="offcanvas offcanvas-end d-lg-flex" tabIndex={-1} id="offcanvasNavbar">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title text-white">Menu</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" />
                        </div>
                        <div className="offcanvas-body justify-content-between w-100">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                                <li className="nav-item"><a className="nav-link" href="#">WHO?</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">UPDATES</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">TOOLS</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">BEST OF</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">THE BLOG</a></li>
                            </ul>
                            <a className="btn btn-highlight mt-3 mt-lg-0 hello" onClick={()=> nav('/adminpage')}><i className="bi bi-star-fill" /> STARTING A NEW BLOG?</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
