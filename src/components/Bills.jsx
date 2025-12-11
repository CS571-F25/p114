import { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useApp } from '../context/AppContext';
import BillCard from './BillCard';
import BillForm from './BillForm';
import BillSummary from './BillSummary';

export default function Bills() {
    const { bills, addBill, deleteBill } = useApp();
    const [showForm, setShowForm] = useState(false);

    const handleAddBill = (newBill) => {
        addBill(newBill);
        setShowForm(false);
    };

    return (
        <Container style={{ maxWidth: '1400px' }} className="py-5">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1 className="display-4 mb-2">Bills Dashboard</h1>
                    <p className="lead text-muted mb-0">Manage your household bills and track payments</p>
                </Col>
                <Col xs="auto">
                    <Button
                        variant={showForm ? 'outline-secondary' : 'primary'}
                        size="lg"
                        onClick={() => setShowForm(!showForm)}
                        aria-expanded={showForm}
                        aria-controls="bill-form-section"
                    >
                        {showForm ? 'Cancel' : '+ Add Bill'}
                    </Button>
                </Col>
            </Row>

            {showForm && (
                <Row className="mb-4" id="bill-form-section">
                    <Col>
                        <BillForm onSubmit={handleAddBill} onCancel={() => setShowForm(false)} />
                    </Col>
                </Row>
            )}

            <Row>
                {/* Bills Grid - shown first, takes full width on smaller screens */}
                <Col xl={8} className="order-xl-1 order-2">
                    <Row className="g-4">
                        {bills.length === 0 ? (
                            <Col xs={12}>
                                <Card className="text-center p-5">
                                    <Card.Body>
                                        <h2 className="h4">No bills yet</h2>
                                        <p className="text-muted">Add your first bill to get started</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ) : (
                            bills.map(bill => (
                                <Col xs={12} sm={6} xl={6} key={bill.id}>
                                    <BillCard bill={bill} onDelete={deleteBill} />
                                </Col>
                            ))
                        )}
                    </Row>
                </Col>

                {/* Summary Sidebar - shown on right at xl, on top at smaller */}
                <Col xl={4} className="mb-4 order-xl-2 order-1">
                    <BillSummary bills={bills} />
                </Col>
            </Row>
        </Container>
    );
}