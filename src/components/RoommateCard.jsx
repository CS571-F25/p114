import { Card, Badge, Button, ProgressBar } from 'react-bootstrap';

export default function RoommateCard({ roommate, totalBills, onDelete }) {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getColorFromName = (name) => {
        const colors = ['primary', 'success', 'info', 'warning', 'danger'];
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    // Calculate amount owed based on share percentage
    const amountOwed = (roommate.sharePercentage / 100) * totalBills;

    return (
        <Card className="h-100 shadow-sm" style={{ minWidth: '280px' }}>
            <Card.Body>
                <div className="d-flex align-items-center mb-3">
                    <div 
                        className={`rounded-circle bg-${getColorFromName(roommate.name)} d-flex align-items-center justify-content-center me-3`}
                        style={{ width: '50px', height: '50px', minWidth: '50px' }}
                        aria-hidden="true"
                    >
                        <span className="text-white fw-bold">{getInitials(roommate.name)}</span>
                    </div>
                    <div className="flex-grow-1">
                        <h2 className="h5 mb-0">{roommate.name}</h2>
                        <small className="text-muted">{roommate.email}</small>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small text-muted">Room Share</span>
                        <Badge bg="secondary">{roommate.sharePercentage}%</Badge>
                    </div>
                    <ProgressBar 
                        now={roommate.sharePercentage} 
                        variant={getColorFromName(roommate.name)}
                        aria-label={`${roommate.name}'s room share: ${roommate.sharePercentage}%`}
                    />
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Share of Bills:</span>
                    <span className="fw-bold text-primary">${amountOwed.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Based on:</span>
                    <span className="text-muted">{roommate.sharePercentage}% of ${totalBills.toFixed(2)}</span>
                </div>
            </Card.Body>
            <Card.Footer className="bg-transparent">
                <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="w-100"
                    onClick={() => onDelete(roommate.id)}
                    aria-label={`Remove ${roommate.name} from household`}
                >
                    Remove Roommate
                </Button>
            </Card.Footer>
        </Card>
    );
}