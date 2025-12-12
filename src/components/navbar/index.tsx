import './index.css'

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="menu-container">
        <a href="/carousel" className="menu-item">Carousel</a>
        <a href="/pagination" className="menu-item">Pagination</a>
        <a href="/decounce" className="menu-item">Debounce Input</a>
      </div>
    </div>
  )
}