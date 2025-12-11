import { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Form, ListGroup, Alert } from 'react-bootstrap';
import { useApp } from '../context/AppContext';
import TransferModal from './TransferModal';

export default function Payments() {
    const { 
        bills, 
        roommates, 
        transfers,
        assignBillPayer, 
        clearBillPayer,
        addTransfer,
        deleteTransfer,
        getRoommateBalances,
        calculateDebts,
        totalExpenses
    } = useApp();

    const [showTransferModal, setShowTransferModal] = useState(false);
    const [suggestedTransfer, setSuggestedTransfer] = useState(null);

    const balances = getRoommateBalances();
    const debts = calculateDebts();
    const paidBills = bills.filter(b => b.paidBy !== null);
    const unpaidBills = bills.filter(b => b.paidBy === null);

    const getRoommateName = (id) => {
        const roommate = roommates.find(r => r.id === id);
        return roommate?.name || 'Unknown';
    };

    const handlePayBill = (billId, roommateId) => {
        if (roommateId) {
            assignBillPayer(billId, parseInt(roommateId));
        } else {
            clearBillPayer(billId);
        }
    };

    const handleQuickTransfer = (debt) => {
        setSuggestedTransfer({
            fromId: debt.fromId,
            toId: debt.toId,
            amount: debt.amount
        });
        setShowTransferModal(true);
    };

    const handleNewTransfer = () => {
        setSuggestedTransfer(null);
        setShowTransferModal(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    return (
        <Container style={{ maxWidth: '1400px' }} className="py-5">
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1 className="display-4 mb-2">Payments</h1>
                    <p className="lead text-muted mb-0">Track bill payments and settle up with roommates</p>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="success"
                        size="lg"
                        onClick={handleNewTransfer}
                        disabled={roommates.length < 2}
                    >
                        + Record Transfer
                    </Button>
                </Col>
            </Row>

            {/* Balance Summary Cards */}
            <Row className="mb-4 g-3">
                {balances.map(person => (
                    <Col xs={12} sm={6} lg={4} key={person.id}>
                        <Card className={`h-100 ${person.balance >= 0 ? 'border-success' : 'border-danger'}`} style={{ minWidth: '200px' }}>
                            <Card.Body className="text-center py-3">
                                <Card.Title as="h2" className="h6 mb-2">{person.name}</Card.Title>
                                <p className={`fs-3 fw-bold mb-2 ${person.balance >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {person.balance >= 0 ? '+' : '-'}${Math.abs(person.balance).toFixed(2)}
                                </p>
                                <div className="small text-muted">
                                    <span>Paid: ${person.paidAmount.toFixed(2)}</span>
                                    <span className="mx-1">|</span>
                                    <span>Owes: ${person.owes.toFixed(2)}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row>
                {/* Left Column - Bill Payments */}
                <Col xl={8} className="mb-4">
                    {/* Unpaid Bills */}
                    <Card className="shadow-sm mb-4">
                        <Card.Body>
                            <Card.Title as="h2" className="h4 mb-3">
                                Assign Bill Payments
                                {unpaidBills.length > 0 && (
                                    <Badge bg="warning" className="ms-2">{unpaidBills.length} unpaid</Badge>
                                )}
                            </Card.Title>
                            
                            {bills.length === 0 ? (
                                <p className="text-muted text-center py-3">No bills to track. Add bills first.</p>
                            ) : (
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th scope="col">Bill</th>
                                            <th scope="col" className="text-end">Amount</th>
                                            <th scope="col">Paid By</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bills.map(bill => (
                                            <tr key={bill.id}>
                                                <td>
                                                    <strong>{bill.name}</strong>
                                                    <br />
                                                    <small className="text-muted">{bill.category}</small>
                                                </td>
                                                <td className="text-end fw-bold" style={{ whiteSpace: 'nowrap' }}>
                                                    ${bill.amount.toFixed(2)}
                                                </td>
                                                <td style={{ minWidth: '180px' }}>
                                                    <Form.Select
                                                        size="sm"
                                                        value={bill.paidBy || ''}
                                                        onChange={(e) => handlePayBill(bill.id, e.target.value)}
                                                        aria-label={`Select who paid ${bill.name}`}
                                                    >
                                                        <option value="">Select payer...</option>
                                                        {roommates.map(r => (
                                                            <option key={r.id} value={r.id}>{r.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    {bill.paidBy ? (
                                                        <Badge bg="success">Paid</Badge>
                                                    ) : (
                                                        <Badge bg="secondary">Unpaid</Badge>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>

                    {/* Transfer History */}
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title as="h2" className="h4 mb-3">Transfer History</Card.Title>
                            
                            {transfers.length === 0 ? (
                                <p className="text-muted text-center py-3">No transfers recorded yet.</p>
                            ) : (
                                <ListGroup variant="flush">
                                    {[...transfers].reverse().map(transfer => (
                                        <ListGroup.Item key={transfer.id} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{transfer.fromName}</strong>
                                                <span className="text-muted mx-2">→</span>
                                                <strong>{transfer.toName}</strong>
                                                <br />
                                                <small className="text-muted">{formatDate(transfer.date)}</small>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <Badge bg="success" className="fs-6">${transfer.amount.toFixed(2)}</Badge>
                                                <Button 
                                                    variant="outline-danger" 
                                                    size="sm"
                                                    onClick={() => deleteTransfer(transfer.id)}
                                                    aria-label={`Delete transfer from ${transfer.fromName} to ${transfer.toName}`}
                                                >
                                                    ✕
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right Column - Settle Up */}
                <Col xl={4}>
                    <Card className="shadow-sm" style={{ minWidth: '280px' }}>
                        <Card.Body>
                            <Card.Title as="h2" className="h4 mb-3">Settle Up</Card.Title>

                            {/* Summary */}
                            <div className="text-center mb-4 p-3 bg-light rounded">
                                <p className="text-muted mb-1 small">Total Bills</p>
                                <p className="fs-3 fw-bold mb-0 text-primary">
                                    ${totalExpenses.toFixed(2)}
                                </p>
                                <small className="text-muted">
                                    {paidBills.length} of {bills.length} bills paid
                                </small>
                            </div>

                            {/* Suggested Transfers */}
                            {debts.length > 0 ? (
                                <>
                                    <p className="text-muted small mb-2">Suggested Transfers</p>
                                    <ListGroup variant="flush" className="mb-3">
                                        {debts.map((debt, index) => (
                                            <ListGroup.Item key={index} className="px-0">
                                                <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-1">
                                                    <div className="text-truncate" style={{ maxWidth: '60%' }}>
                                                        <strong>{debt.fromName.split(' ')[0]}</strong>
                                                        <span className="text-muted mx-1">→</span>
                                                        <strong>{debt.toName.split(' ')[0]}</strong>
                                                    </div>
                                                    <Badge bg="primary">
                                                        ${debt.amount.toFixed(2)}
                                                    </Badge>
                                                </div>
                                                <Button 
                                                    variant="outline-success" 
                                                    size="sm" 
                                                    className="w-100"
                                                    onClick={() => handleQuickTransfer(debt)}
                                                >
                                                    Record This Transfer
                                                </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </>
                            ) : (
                                <Alert variant="success" className="text-center">
                                    <span aria-hidden="true">✓</span> All settled up!
                                    <br />
                                    <small>No outstanding balances between roommates.</small>
                                </Alert>
                            )}

                            {/* How it works */}
                            <div className="mt-4 pt-3 border-top">
                                <p className="text-muted small mb-2">How it works:</p>
                                <ol className="small text-muted ps-3 mb-0">
                                    <li className="mb-1">Assign who paid each bill above</li>
                                    <li className="mb-1">We calculate each person's share</li>
                                    <li className="mb-1">Record transfers to settle balances</li>
                                </ol>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Transfer Modal */}
            <TransferModal
                show={showTransferModal}
                onHide={() => setShowTransferModal(false)}
                roommates={roommates}
                onTransfer={addTransfer}
                suggestedTransfer={suggestedTransfer}
            />
        </Container>
    );
}