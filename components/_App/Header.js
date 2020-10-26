import {Menu, Container, Image, Icon} from 'semantic-ui-react'
import Link from 'next/link'
import Router, {useRouter} from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouterChangeError = () => NProgress.done();


function Header({user}) {
  console.log(user);

  const router = useRouter();

  function isActive(route) {
    console.log(route);
    return route === router.pathname;
  }

  return <Menu stackable fluid id="menu" inverted>
    <Container text>
      <Link href="/">
        <Menu.Item header active={isActive('/')}>
          <Image 
            size="mini" 
            src="static/logo.svg" 
            style={{marginRight:'1em'}}>
          </Image>
          My Shop
        </Menu.Item>
      </Link>

      <Link href="/cart">
        <Menu.Item header active={isActive('/cart')}>
          <Icon 
            size="large" 
            name="cart">
          </Icon>
          Cart
          </Menu.Item>
      </Link>

      {user && <Link href="/create">
        <Menu.Item header active={isActive('/create')}>
          <Icon 
            size="large" 
            name="add square">
          </Icon>
          Create
          </Menu.Item>
      </Link>}

      {user ? (<>
        <Link href="/account">
          <Menu.Item header active={isActive('/account')}>
            <Icon 
              size="large" 
              name="user">
            </Icon>
            Account
            </Menu.Item>
        </Link>

        <Menu.Item header>
            <Icon 
              size="large" 
              name="sign out">
            </Icon>
            Logout
        </Menu.Item>
      </> )
      : (<>
        <Link href="/login" active={isActive('/login')}>
          <Menu.Item header>
            <Icon 
              size="large" 
              name="sign in">
            </Icon>
            Login
            </Menu.Item>
        </Link>     

        <Link href="/signup" active={isActive('/signup')}>
          <Menu.Item header>
            <Icon 
              size="large" 
              name="signup">
            </Icon>
            Signup
            </Menu.Item>
        </Link>
      </>)}
    </Container>
  </Menu>;
}

export default Header;
