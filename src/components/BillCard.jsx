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
        <Card className="h-100">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0">{bill.name}</Card.Title>
                    <Badge bg={getCategoryColor(bill.category)}>
                        {bill.category}
                    </Badge>
                </div>
                <Card.Text>
                    <div className="fs-3 fw-bold text-success mb-2">
                        ${bill.amount.toFixed(2)}
                    </div>
                    <div className="text-muted small">
                        <div>Due: {formatDate(bill.dueDate)}</div>
                        <div className="text-capitalize">Split: {bill.splitType}</div>
                    </div>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-transparent">
                <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => onDelete(bill.id)}
                >
                    Delete
                </Button>
            </Card.Footer>
        </Card>
    );
}