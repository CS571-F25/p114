import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <Container>
                <Row className="align-items-center">
                    <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
                        <h2 className="h5 mb-1">RentSplit</h2>
                        <p className="mb-0 small text-secondary">
                            Fair splits, happy roommates
                        </p>
                    </Col>
                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <nav aria-label="Footer navigation">
                            <Link to="/" className="text-light text-decoration-none mx-2">Home</Link>
                            <Link to="/bills" className="text-light text-decoration-none mx-2">Bills</Link>
                            <Link to="/roommates" className="text-light text-decoration-none mx-2">Roommates</Link>
                            <Link to="/about" className="text-light text-decoration-none mx-2">About</Link>
                        </nav>
                    </Col>
                    <Col md={4} className="text-center text-md-end">
                        <p className="mb-0 small text-secondary">
                            CS571 Web Project &copy; {currentYear}
                        </p>
                        <p className="mb-0 small text-secondary">
                            University of Wisconsin-Madison
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}