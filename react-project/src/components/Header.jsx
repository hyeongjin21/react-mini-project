import React,{useRef} from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link,useNavigation } from 'react-router-dom'

const Header = () => {

  const nav = useNavigation();
  const searchRef = useRef();
  // console.log('asd')
  const SearchData = (e) =>{
    e.preventDefault();
    console.log('search',searchRef.current.value)
    nav('/search')
  }

  return (
    <Navbar bg='dark' data-bs-theme="dark" expand="sm" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' width='100px'>

          </img>
        </Navbar.Brand>
        <Nav
          className="me-auto"
        // style={{ maxHeight: '100px' }}
        // navbarScroll my-2 my-lg-0
        >
          <Link to="/" className='link-item'>Home</Link>
          <Link to="/" className='link-item'>Movies</Link>
        </Nav>
        <Form className="d-flex" onSubmit={SearchData}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            ref={searchRef}
          />
          <Button variant="outline-danger" type='submit'>Search</Button>
        </Form>
      </Container>
    </Navbar>
  )
}

export default Header