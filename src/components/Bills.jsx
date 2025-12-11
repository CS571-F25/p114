import { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import BillCard from './BillCard';
import BillForm from './BillForm';
import BillSummary from './BillSummary';

export default function Bills() {
    const [bills, setBills] = useState([
        {
            id: 1,
            name: "Rent",
            amount: 1500.00,
            category: "Housing",
            dueDate: "2024-12-01",
            splitType: "equal"
        },
        {
            id: 2,
            name: "Electric",
            amount: 120.00,
            category: "Utilities",
            dueDate: "2024-12-05",
            splitType: "equal"
        },
        {
            id: 3,
            name: "Internet",
            amount: 80.00,
            category: "Internet",
            dueDate: "2024-12-10",
            splitType: "equal"
        }
    ]);
    const [showForm, setShowForm] = useState(false);

    const addBill = (newBill) => {
        setBills([...bills, { ...newBill, id: Date.now() }]);
        setShowForm(false);
    };

    const deleteBill = (id) => {
        setBills(bills.filter(bill => bill.id !== id));
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
                        <BillForm onSubmit={addBill} onCancel={() => setShowForm(false)} />
                    </Col>
                </Row>
            )}

            <Row>
                {/* Summary Sidebar */}
                <Col lg={4} className="mb-4">
                    <BillSummary bills={bills} />
                </Col>

                {/* Bills Grid */}
                <Col lg={8}>
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
                                <Col xs={12} md={6} key={bill.id}>
                                    <BillCard bill={bill} onDelete={deleteBill} />
                                </Col>
                            ))
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}