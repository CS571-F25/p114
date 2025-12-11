import { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function TransferModal({ show, onHide, roommates, onTransfer, suggestedTransfer = null }) {
    const [fromId, setFromId] = useState(suggestedTransfer?.fromId || '');
    const [toId, setToId] = useState(suggestedTransfer?.toId || '');
    const [amount, setAmount] = useState(suggestedTransfer?.amount?.toFixed(2) || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!fromId || !toId) {
            setError('Please select both sender and recipient');
            return;
        }

        if (fromId === toId) {
            setError('Sender and recipient cannot be the same person');
            return;
        }

        const transferAmount = parseFloat(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            setError('Please enter a valid amount greater than 0');
            return;
        }

        onTransfer(parseInt(fromId), parseInt(toId), transferAmount);
        setSuccess(true);
        
        // Reset form after short delay
        setTimeout(() => {
            setFromId('');
            setToId('');
            setAmount('');
            setSuccess(false);
            onHide();
        }, 1500);
    };

    const handleClose = () => {
        setFromId('');
        setToId('');
        setAmount('');
        setError('');
        setSuccess(false);
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title as="h2" className="h4">Transfer Money</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {success ? (
                    <Alert variant="success" className="text-center mb-0">
                        <span aria-hidden="true">✓</span> Transfer recorded successfully!
                    </Alert>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        
                        <Form.Group className="mb-3" controlId="transferFrom">
                            <Form.Label>From</Form.Label>
                            <Form.Select
                                value={fromId}
                                onChange={(e) => setFromId(e.target.value)}
                                required
                            >
                                <option value="">Select who is paying...</option>
                                {roommates.map(r => (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="transferTo">
                            <Form.Label>To</Form.Label>
                            <Form.Select
                                value={toId}
                                onChange={(e) => setToId(e.target.value)}
                                required
                            >
                                <option value="">Select who is receiving...</option>
                                {roommates.map(r => (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="transferAmount">
                            <Form.Label>Amount ($)</Form.Label>
                            <Form.Control
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                step="0.01"
                                min="0.01"
                                required
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit" size="lg">
                                Complete Transfer
                            </Button>
                            <Button variant="outline-secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
}