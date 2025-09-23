import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom' // another one is useNavigation

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const authdata = useSelector((state) => state.auth.userData)
  const navigate = useNavigate();

  const navItems = [ // it's array then looped on array. It contains object
    {
      name: 'Home',
      slug: '/', // where url is going can named as "url"
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500 '>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width="100%" />
            </Link>
          </div>
          <ul className='flex ml-auto'>

            {/* // Instead of {} used () then no need to write return statement */}
            {navItems.map((item) =>
              item.active ? (

                // keys on html elements that are repeating
                <li key={item.name}>

                  {/* useNavigate (pass url to navigate) works same as Link both are from react router */}
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer'
                  >{item.name}</button>
                </li>
              ) : null

            )}

            {/* Syntax --> If authStatus is true then only display logout btn */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header