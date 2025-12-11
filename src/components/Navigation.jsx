import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router';

export default function Navigation() {
    return (
        <>
            {/* Skip link for keyboard accessibility */}
            <a 
                href="#main-content" 
                className="visually-hidden-focusable bg-primary text-white p-2 position-absolute"
                style={{ zIndex: 9999 }}
            >
                Skip to main content
            </a>
            
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="mb-3">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">RentSplit</Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar-nav" aria-label="Toggle navigation menu" />
                    <Navbar.Collapse id="main-navbar-nav">
                        <Nav className="ms-auto" role="navigation" aria-label="Main navigation">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/bills">Bills</Nav.Link>
                            <Nav.Link as={Link} to="/roommates">Roommates</Nav.Link>
                            <Nav.Link as={Link} to="/payments">Payments</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}