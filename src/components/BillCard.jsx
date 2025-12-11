import { Card, Badge, Button } from 'react-bootstrap';

export default function BillCard({ bill, onDelete }) {
    const getCategoryColor = (category) => {
        const colors = {
            'Housing': 'primary',
            'Utilities': 'warning',
            'Internet': 'info',
            'Groceries': 'success',
            'Other': 'secondary'
        };
        return colors[category] || 'secondary';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatSplitType = (splitType) => {
        const types = {
            'equal': 'Equal Split',
            'roomSize': 'By Room Size',
            'custom': 'Custom Weights'
        };
        return types[splitType] || splitType;
    };

    return (
        <Card className="h-100 shadow-sm" style={{ minWidth: '280px' }}>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <Card.Title as="h2" className="h5 mb-0">{bill.name}</Card.Title>
                    <Badge bg={getCategoryColor(bill.category)} className="ms-2">
                        {bill.category}
                    </Badge>
                </div>
                <div className="flex-grow-1">
                    <p className="fs-3 fw-bold text-success mb-3" aria-label={`Amount: $${bill.amount.toFixed(2)}`}>
                        ${bill.amount.toFixed(2)}
                    </p>
                    <dl className="text-muted small mb-0">
                        <div className="mb-1">
                            <dt className="d-inline">Due:</dt>
                            <dd className="d-inline ms-1">{formatDate(bill.dueDate)}</dd>
                        </div>
                        <div>
                            <dt className="d-inline">Split:</dt>
                            <dd className="d-inline ms-1">{formatSplitType(bill.splitType)}</dd>
                        </div>
                    </dl>
                </div>
            </Card.Body>
            <Card.Footer className="bg-transparent border-top">
                <div className="d-grid">
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => onDelete(bill.id)}
                        aria-label={`Delete ${bill.name} bill`}
                    >
                        Delete Bill
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
}