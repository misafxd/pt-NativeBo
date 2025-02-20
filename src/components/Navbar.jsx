import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className='logo'>
        <Link to='/'>
          <img src='/pokemon.svg' width={100} alt='Logo pokemon page' />
        </Link>
      </div>
      <Link to='/'>Home</Link>
      <Link to='favorites'>Favoritos</Link>
    </nav>
  )
}

export default Navbar
