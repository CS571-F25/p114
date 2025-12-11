import { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

export default function RoommateForm({ onSubmit, onCancel, existingShareTotal = 0 }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        sharePercentage: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const share = parseFloat(formData.sharePercentage);
        if (existingShareTotal + share > 100) {
            setError(`Cannot add ${share}%. Current total is ${existingShareTotal}%, max remaining is ${100 - existingShareTotal}%.`);
            return;
        }

        onSubmit({
            ...formData,
            sharePercentage: share,
            owes: 0,
            paidAmount: 0
        });
        
        setFormData({
            name: '',
            email: '',
            sharePercentage: ''
        });
    };

    const maxShare = 100 - existingShareTotal;

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title as="h2" className="h4 mb-4">Add New Roommate</Card.Title>
                
                {error && (
                    <Alert variant="danger" role="alert">
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Col md={6}>
                            <Form.Group controlId="roommateName">
                                <Form.Label>Full Name <span aria-hidden="true">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., John Smith"
                                    required
                                    aria-required="true"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="roommateEmail">
                                <Form.Label>Email Address <span aria-hidden="true">*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                    aria-required="true"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="roommateShare">
                                <Form.Label>
                                    Room Share Percentage <span aria-hidden="true">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="sharePercentage"
                                    value={formData.sharePercentage}
                                    onChange={handleChange}
                                    placeholder={`1-${maxShare}`}
                                    min="1"
                                    max={maxShare}
                                    required
                                    aria-required="true"
                                    aria-describedby="shareHelp"
                                />
                                <Form.Text id="shareHelp" className="text-muted">
                                    Current household total: {existingShareTotal}%. Maximum you can add: {maxShare}%
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex gap-2 mt-4">
                        <Button variant="primary" type="submit">
                            Add Roommate
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