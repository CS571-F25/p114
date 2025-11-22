import { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

export default function BillForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: 'Housing',
        dueDate: '',
        splitType: 'equal'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            amount: parseFloat(formData.amount)
        });
        setFormData({
            name: '',
            amount: '',
            category: 'Housing',
            dueDate: '',
            splitType: 'equal'
        });
    };

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title className="mb-4">Add New Bill</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Bill Name *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Rent, Electric, Internet"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Amount *</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0.01"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Category *</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Housing">Housing</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Internet">Internet</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Due Date *</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Split Type *</Form.Label>
                                <Form.Select
                                    name="splitType"
                                    value={formData.splitType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="equal">Equal Split</option>
                                    <option value="roomSize">By Room Size</option>
                                    <option value="custom">Custom Weights</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex gap-2 mt-4">
                        <Button variant="primary" type="submit">
                            Add Bill
                        </Button>
                        <Button variant="outline-secondary" type="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}