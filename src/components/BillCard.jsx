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

    return (
        <Card className="h-100 shadow-sm" style={{ minWidth: '250px' }}>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <Card.Title className="mb-0 fs-5">{bill.name}</Card.Title>
                    <Badge bg={getCategoryColor(bill.category)} className="ms-2">
                        {bill.category}
                    </Badge>
                </div>
                <div className="flex-grow-1">
                    <div className="fs-2 fw-bold text-success mb-3" style={{ whiteSpace: 'nowrap' }}>
                        ${bill.amount.toFixed(2)}
                    </div>
                    <div className="text-muted small">
                        <div className="mb-1">
                            <strong>Due:</strong> {formatDate(bill.dueDate)}
                        </div>
                        <div className="text-capitalize">
                            <strong>Split:</strong> {bill.splitType.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="bg-transparent border-top">
                <div className="d-grid">
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => onDelete(bill.id)}
                    >
                        Delete Bill
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
}