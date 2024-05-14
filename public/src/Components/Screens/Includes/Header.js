import React, { useContext } from 'react'
import { styled } from 'styled-components'
import { UserContext } from '../../../App'
import { Link } from 'react-router-dom'

function Header() {
  const {userData, UpdateUserData} = useContext(UserContext)
  //Using useContext to pass token>>>>> Logout function....
  
  const handleLogout = () =>{
    UpdateUserData({type: "LOGOUT"})
  }
  //Logout Functionality>>>>>>>>>

  return (
    <>
      <HeaderContainer>
        <LeftContainer>
            <LogoImage src={require("../../../assets/images/logo.svg").default} alt='logo'></LogoImage>
        </LeftContainer>
        <RightContainer>
          {userData ? (<Button onClick={() =>handleLogout()}>Logout</Button>) : (<Button to='/auth/create'>Login</Button>)}
        </RightContainer>
      </HeaderContainer>
    </>
  )
}

const HeaderContainer = styled.section`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 20px;
`
const LeftContainer = styled.div``

const LogoImage = styled.img`
  width: 100px;
  display: block;
`
const RightContainer = styled.div`
`

const Button = styled(Link)`
  padding: 10px 15px;
  color: white;
  background: blue;
  border: none;
  width: 100px;
  border-radius: 6px;
  display: inline-block;
  text-align: center;
`


export default Header;