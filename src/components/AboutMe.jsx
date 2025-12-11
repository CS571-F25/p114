import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

export default function AboutMe() {
    return (
        <Container style={{ maxWidth: '1400px' }} className="py-4">
            <Row className="mb-4">
                <Col>
                    <h1>About RentSplit</h1>
                    <p className="lead text-muted">
                        A roommate dashboard for splitting rent, utilities, and chores with zero ambiguity
                    </p>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <h2 className="h5">Project Overview</h2>
                            <p>
                                RentSplit is designed to help roommates manage shared expenses and household 
                                responsibilities efficiently. Users can create a household, invite roommates, 
                                and define custom split rules based on their living arrangements.
                            </p>
                            <p className="mb-0">
                                The platform features a monthly card stack for upcoming bills, guided forms 
                                with inline validation, and dynamic visualizations to track who owes what.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <h2 className="h5">Key Features</h2>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Bill Management</ListGroup.Item>
                                <ListGroup.Item>Roommate Tracking</ListGroup.Item>
                                <ListGroup.Item>Split Calculations</ListGroup.Item>
                                <ListGroup.Item>Payment Tracking</ListGroup.Item>
                                <ListGroup.Item>Data Visualization</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <h2 className="h5">Technology Stack</h2>
                            <p className="mb-0">
                                Built with React, React Router, and React Bootstrap for a modern, 
                                responsive user interface. Features include stateful forms, 
                                interactive components, and local state management for a seamless
                                user experience.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="h5">Design Principles</h2>
                            <ul className="mb-0">
                                <li>Consistent color coding for bill categories</li>
                                <li>Progressive disclosure with expandable forms</li>
                                <li>Visual hierarchy using typography and spacing</li>
                                <li>Responsive grid layout for all screen sizes</li>
                                <li>Clear feedback for user actions</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="h5">Accessibility Features</h2>
                            <ul className="mb-0">
                                <li>Semantic HTML with proper heading hierarchy</li>
                                <li>ARIA labels for interactive elements</li>
                                <li>Keyboard-navigable forms and buttons</li>
                                <li>WCAG AA compliant color contrast</li>
                                <li>Skip navigation link for screen readers</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="bg-primary text-white">
                        <Card.Body>
                            <h2 className="h5">Project Information</h2>
                            <p className="mb-0">
                                <strong>Course:</strong> CS571 - Building User Interfaces<br />
                                <strong>Institution:</strong> University of Wisconsin-Madison<br />
                                <strong>Project:</strong> Web Project - RentSplit
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}