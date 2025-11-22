import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default function Home() {
    return (
        <Container style={{ maxWidth: '1400px' }}>
            <Row className="mb-5">
                <Col>
                    <h1 className="display-4">Welcome to RentSplit</h1>
                    <p className="lead text-muted">
                        Manage your household bills and chores with zero ambiguity
                    </p>
                </Col>
            </Row>

            <Row className="g-4">
                <Col md={4}>
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <div className="fs-1 mb-3">💰</div>
                            <Card.Title>Split Bills</Card.Title>
                            <Card.Text>
                                Divide rent, utilities, and expenses fairly among roommates
                            </Card.Text>
                            <Button as={Link} to="/bills" variant="primary">
                                View Bills
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <div className="fs-1 mb-3">📋</div>
                            <Card.Title>Track Chores</Card.Title>
                            <Card.Text>
                                Organize household tasks with a Kanban-style board
                            </Card.Text>
                            <Button variant="secondary" disabled>
                                Coming Soon
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <div className="fs-1 mb-3">📊</div>
                            <Card.Title>Visualize Splits</Card.Title>
                            <Card.Text>
                                See who owes what with dynamic charts and ledgers
                            </Card.Text>
                            <Button variant="secondary" disabled>
                                Coming Soon
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <Card bg="light">
                        <Card.Body>
                            <h3>Getting Started</h3>
                            <ol>
                                <li>Create a household and invite your roommates</li>
                                <li>Add your bills and set split rules</li>
                                <li>Track payments and settle up easily</li>
                            </ol>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}