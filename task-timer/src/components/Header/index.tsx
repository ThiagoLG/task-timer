import { HeaderContainer } from './styles'
import logo from '../../assets/Logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="Site logo" />
      <nav>
        <NavLink to="/" title="home">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
