import { Card, ListGroup, Badge, Table } from 'react-bootstrap';

export default function SettleUpSummary({ roommates = [], totalExpenses = 0 }) {
    if (roommates.length === 0) {
        return (
            <Card className="shadow-sm" style={{ minWidth: '280px' }}>
                <Card.Body>
                    <Card.Title as="h2" className="h5 mb-3">Settle Up</Card.Title>
                    <p className="text-muted text-center mb-0">Add roommates to see bill splits</p>
                </Card.Body>
            </Card>
        );
    }

    // Calculate what each person owes
    const splits = roommates.map(roommate => ({
        ...roommate,
        amountOwed: (roommate.sharePercentage / 100) * totalExpenses
    }));

    // Calculate equal split for comparison
    const equalSplit = totalExpenses / roommates.length;

    return (
        <Card className="shadow-sm" style={{ minWidth: '280px' }}>
            <Card.Body>
                <Card.Title as="h2" className="h5 mb-3">Bill Breakdown</Card.Title>
                
                {/* Total */}
                <div className="text-center mb-4 p-3 bg-light rounded">
                    <p className="text-muted mb-1 small">Total Monthly Bills</p>
                    <p className="fs-3 fw-bold mb-0 text-primary">${totalExpenses.toFixed(2)}</p>
                </div>

                {/* By Share Percentage */}
                <p className="text-muted small mb-2">By Share Percentage</p>
                <ListGroup variant="flush" className="mb-4">
                    {splits.map(person => (
                        <ListGroup.Item 
                            key={person.id} 
                            className="d-flex justify-content-between align-items-center px-0"
                        >
                            <div>
                                <span className="fw-medium">{person.name}</span>
                                <Badge bg="secondary" className="ms-2 small">{person.sharePercentage}%</Badge>
                            </div>
                            <span className="fw-bold text-primary">
                                ${person.amountOwed.toFixed(2)}
                            </span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {/* Equal Split Comparison */}
                <p className="text-muted small mb-2">Equal Split Comparison</p>
                <Table size="sm" className="mb-0">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col" className="text-end">Equal</th>
                            <th scope="col" className="text-end">By Share</th>
                        </tr>
                    </thead>
                    <tbody>
                        {splits.map(person => {
                            const diff = person.amountOwed - equalSplit;
                            return (
                                <tr key={person.id}>
                                    <td>{person.name}</td>
                                    <td className="text-end">${equalSplit.toFixed(2)}</td>
                                    <td className="text-end">
                                        ${person.amountOwed.toFixed(2)}
                                        {diff !== 0 && (
                                            <small className={diff > 0 ? 'text-danger ms-1' : 'text-success ms-1'}>
                                                ({diff > 0 ? '+' : ''}{diff.toFixed(2)})
                                            </small>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}