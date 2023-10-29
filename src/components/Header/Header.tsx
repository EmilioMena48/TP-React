import {Navbar, Container, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';


const Header = () => {

  const navigate = useNavigate();

    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => navigate ('/')}>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate ('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate ('/componentes')}>Componentes</Nav.Link>
            <Nav.Link onClick={() => navigate ('/administracion')}>Administración</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    )

}

export default Header;