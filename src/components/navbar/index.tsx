import './index.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* checkbox controller */}
      <input type="checkbox" id="nav-toggle" className="nav-toggle" />

      {/* hamburger */}
      <label htmlFor="nav-toggle" className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </label>

      {/* menu */}
      <div className="menu-container">
        <a href="/carousel" className="menu-item">Carousel</a>
        <a href="/pagination/1" className="menu-item">Pagination</a>
      </div>
    </nav>
  )
}
