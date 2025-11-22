import { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import BillCard from './BillCard';
import BillForm from './BillForm';

export default function Bills() {
    const [bills, setBills] = useState([
        {
            id: 1,
            name: "Rent",
            amount: 1500,
            category: "Housing",
            dueDate: "2024-12-01",
            splitType: "equal"
        },
        {
            id: 2,
            name: "Electric",
            amount: 120,
            category: "Utilities",
            dueDate: "2024-12-05",
            splitType: "equal"
        }
    ]);
    const [showForm, setShowForm] = useState(false);

    const addBill = (newBill) => {
        setBills([...bills, { ...newBill, id: bills.length + 1 }]);
        setShowForm(false);
    };

    const deleteBill = (id) => {
        setBills(bills.filter(bill => bill.id !== id));
    };

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h1>Bills Dashboard</h1>
                    <p className="text-muted">Manage your household bills and track payments</p>
                </Col>
                <Col xs="auto">
                    <Button 
                        variant="primary" 
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : 'Add Bill'}
                    </Button>
                </Col>
            </Row>

            {showForm && (
                <Row className="mb-4">
                    <Col>
                        <BillForm onSubmit={addBill} onCancel={() => setShowForm(false)} />
                    </Col>
                </Row>
            )}

            <Row>
                {bills.length === 0 ? (
                    <Col>
                        <Card className="text-center p-5">
                            <Card.Body>
                                <h3>No bills yet</h3>
                                <p className="text-muted">Add your first bill to get started</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ) : (
                    bills.map(bill => (
                        <Col md={6} lg={4} key={bill.id} className="mb-3">
                            <BillCard bill={bill} onDelete={deleteBill} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}