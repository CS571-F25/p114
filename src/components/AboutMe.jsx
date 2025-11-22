import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

export default function AboutMe() {
    return (
        <Container style={{ maxWidth: '1400px' }}>
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
                            <Card.Title>Project Overview</Card.Title>
                            <Card.Text>
                                RentSplit is designed to help roommates manage shared expenses and household 
                                responsibilities efficiently. Users can create a household, invite roommates, 
                                and define custom split rules based on their living arrangements.
                            </Card.Text>
                            <Card.Text>
                                The platform features a monthly card stack for upcoming bills, guided forms 
                                with inline validation, and dynamic visualizations to track who owes what.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card bg="light">
                        <Card.Body>
                            <Card.Title>Key Features</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Bill Management</ListGroup.Item>
                                <ListGroup.Item>Split Calculations</ListGroup.Item>
                                <ListGroup.Item>Payment Tracking</ListGroup.Item>
                                <ListGroup.Item>Chore Organization</ListGroup.Item>
                                <ListGroup.Item>Data Visualization</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Technology Stack</Card.Title>
                            <Card.Text>
                                Built with React, React Router, and React Bootstrap for a modern, 
                                responsive user interface. Features include stateful forms, 
                                drag-and-drop interactions, and local persistence using 
                                localStorage or IndexedDB.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <Card bg="info" text="white">
                        <Card.Body>
                            <Card.Title>Project Information</Card.Title>
                            <Card.Text>
                                <strong>Course:</strong> CS571 - Building User Interfaces<br />
                                <strong>Institution:</strong> University of Wisconsin-Madison<br />
                                <strong>Project:</strong> Web Project - RentSplit
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}