import React from 'react'

export const Footer = () => {
    return (
        <div className="container">
        <footer className="py-3 mb-4 mt-5">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#home"  className="nav-link px-2 text-muted">Home</a></li>
            <li className="nav-item"><a href="#home" className="nav-link px-2 text-muted">FAQs</a></li>
            <li className="nav-item"><a href="#home" className="nav-link px-2 text-muted">About</a></li>
          </ul>
          <p className="text-center text-muted">&copy; 2021 Ristorante, Inc</p>
        </footer>
      </div>
    )
}
