import { useState } from 'react';
import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { useApp } from '../context/AppContext';
import RoommateCard from './RoommateCard';
import RoommateForm from './RoommateForm';
import SettleUpSummary from './SettleUpSummary';

export default function Roommates() {
    const { roommates, addRoommate, deleteRoommate, totalExpenses, getRoommateBalances } = useApp();
    const [showForm, setShowForm] = useState(false);

    const totalShare = roommates.reduce((sum, r) => sum + r.sharePercentage, 0);
    const roommateBalances = getRoommateBalances();

    const handleAddRoommate = (newRoommate) => {
        addRoommate(newRoommate);
        setShowForm(false);
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
                <Col md={3}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title as="h2" className="h6 text-muted">Total Roommates</Card.Title>
                            <p className="display-6 mb-0 text-primary">{roommates.length}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title as="h2" className="h6 text-muted">Share Allocated</Card.Title>
                            <p className="display-6 mb-0 text-info">{totalShare}%</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title as="h2" className="h6 text-muted">Total Bills</Card.Title>
                            <p className="display-6 mb-0 text-success">${totalExpenses.toFixed(2)}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center h-100">
                        <Card.Body>
                            <Card.Title as="h2" className="h6 text-muted">Per Person (Equal)</Card.Title>
                            <p className="display-6 mb-0 text-warning">
                                ${roommates.length > 0 ? (totalExpenses / roommates.length).toFixed(2) : '0.00'}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {totalShare >= 100 && !showForm && (
                <Alert variant="success" className="mb-4">
                    Household shares are fully allocated (100%). Remove a roommate to add someone new.
                </Alert>
            )}

            {totalShare < 100 && totalShare > 0 && (
                <Alert variant="warning" className="mb-4">
                    Shares only add up to {totalShare}%. Consider adjusting percentages to reach 100%.
                </Alert>
            )}

            {showForm && (
                <Row className="mb-4">
                    <Col>
                        <RoommateForm 
                            onSubmit={handleAddRoommate} 
                            onCancel={() => setShowForm(false)}
                            existingShareTotal={totalShare}
                        />
                    </Col>
                </Row>
            )}

            <Row>
                {/* Settle Up Sidebar */}
                <Col lg={4} className="mb-4">
                    <SettleUpSummary 
                        roommates={roommateBalances} 
                        totalExpenses={totalExpenses} 
                    />
                </Col>

                {/* Roommates Grid */}
                <Col lg={8}>
                    <Row className="g-4">
                        {roommates.length === 0 ? (
                            <Col xs={12}>
                                <Card className="text-center p-5">
                                    <Card.Body>
                                        <h2 className="h4">No roommates yet</h2>
                                        <p className="text-muted">Add your first roommate to get started</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ) : (
                            roommateBalances.map(roommate => (
                                <Col xs={12} md={6} key={roommate.id}>
                                    <RoommateCard 
                                        roommate={roommate} 
                                        totalBills={totalExpenses}
                                        onDelete={deleteRoommate} 
                                    />
                                </Col>
                            ))
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}