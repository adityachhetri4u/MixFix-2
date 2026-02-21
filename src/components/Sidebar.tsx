import { useNavigate } from 'react-router-dom'
import '../styles/Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate()

  const handleNavClick = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <h3 className="nav-section-title">Navigation</h3>
          <button
            className="nav-item"
            onClick={() => handleNavClick('/app')}
          >
            <span className="nav-icon">⌂</span>
            Home
          </button>
          <button
            className="nav-item"
            onClick={() => handleNavClick('/history')}
          >
            <span className="nav-icon">⏱</span>
            History
          </button>
        </nav>

        <nav className="sidebar-nav">
          <h3 className="nav-section-title">Settings</h3>
          <button className="nav-item">
            <span className="nav-icon">⚙</span>
            Settings
          </button>
          <button className="nav-item">
            <span className="nav-icon">ℹ</span>
            About
          </button>
          <button className="nav-item">
            <span className="nav-icon">?</span>
            Help
          </button>
        </nav>
      </aside>
    </>
  )
}
