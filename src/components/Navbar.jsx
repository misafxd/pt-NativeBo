import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className='logo'>
        <a href='/'>
          <img src='../../public/pokemon.svg' width={100} alt='Logo pokemon page' />
        </a>
      </div>
      <a href='#'>Home</a>
      <a href='#'>Favoritos</a>
    </nav>
  )
}

export default Navbar
