import { useState } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import RoommateCard from './RoommateCard';
import RoommateForm from './RoommateForm';

export default function Roommates() {
    const [roommates, setRoommates] = useState([
        {
            id: 1,
            name: "Alex Johnson",
            email: "alex@example.com",
            sharePercentage: 40,
            owes: 250.00,
            paidAmount: 500.00
        },
        {
            id: 2,
            name: "Sam Williams",
            email: "sam@example.com",
            sharePercentage: 35,
            owes: 180.00,
            paidAmount: 420.00
        },
        {
            id: 3,
            name: "Jordan Lee",
            email: "jordan@example.com",
            sharePercentage: 25,
            owes: 120.00,
            paidAmount: 300.00
        }
    ]);
    const [showForm, setShowForm] = useState(false);

    const totalShare = roommates.reduce((sum, r) => sum + r.sharePercentage, 0);
    const totalOwed = roommates.reduce((sum, r) => sum + r.owes, 0);
    const totalPaid = roommates.reduce((sum, r) => sum + r.paidAmount, 0);

    const addRoommate = (newRoommate) => {
        setRoommates([...roommates, { ...newRoommate, id: Date.now() }]);
        setShowForm(false);
    };

    const deleteRoommate = (id) => {
        setRoommates(roommates.filter(r => r.id !== id));
    };

    return (
        <Container style={{ maxWidth: '1400px' }} className="py-5">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1 className="display-4 mb-2">Roommates</h1>
                    <p className="lead text-muted mb-0">Manage your household members and their shares</p>
                </Col>
                <Col xs="auto">
                    <Button
                        variant={showForm ? 'outline-secondary' : 'primary'}
                        size="lg"
                        onClick={() => setShowForm(!showForm)}
                        disabled={totalShare >= 100}
                        aria-expanded={showForm}
                    >
                        {showForm ? 'Cancel' : '+ Add Roommate'}
                    </Button>
                </Col>
            </Row>

            {/* Summary Stats */}
            <Row className="mb-4 g-3">
                <Col md={4}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title as="h2" className="h6 text-muted">Total Roommates</Card.Title>
                            <p className="display-6 mb-0 text-primary">{roommates.length}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title as="h2" className="h6 text-muted">Share Allocated</Card.Title>
                            <p className="display-6 mb-0 text-info">{totalShare}%</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title as="h2" className="h6 text-muted">Outstanding Balance</Card.Title>
                            <p className="display-6 mb-0 text-danger">${totalOwed.toFixed(2)}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {totalShare >= 100 && !showForm && (
                <Alert variant="success" className="mb-4">
                    Household shares are fully allocated (100%). Remove a roommate to add someone new.
                </Alert>
            )}

            {showForm && (
                <Row className="mb-4">
                    <Col>
                        <RoommateForm 
                            onSubmit={addRoommate} 
                            onCancel={() => setShowForm(false)}
                            existingShareTotal={totalShare}
                        />
                    </Col>
                </Row>
            )}

            <Row className="g-4">
                {roommates.length === 0 ? (
                    <Col md={8} className="mx-auto">
                        <Card className="text-center p-5">
                            <Card.Body>
                                <h2 className="h4">No roommates yet</h2>
                                <p className="text-muted">Add your first roommate to get started</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ) : (
                    roommates.map(roommate => (
                        <Col xs={12} md={6} lg={4} key={roommate.id}>
                            <RoommateCard 
                                roommate={roommate} 
                                totalBills={totalPaid + totalOwed}
                                onDelete={deleteRoommate} 
                            />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}