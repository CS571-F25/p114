import { Card, Table, Badge, ProgressBar } from 'react-bootstrap';

export default function BillSummary({ bills }) {
    const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
    
    const categoryTotals = bills.reduce((acc, bill) => {
        acc[bill.category] = (acc[bill.category] || 0) + bill.amount;
        return acc;
    }, {});

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

    const upcomingBills = bills
        .filter(bill => new Date(bill.dueDate) >= new Date())
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 3);

    if (bills.length === 0) {
        return null;
    }

    return (
        <Card className="shadow-sm mb-4" style={{ minWidth: '280px' }}>
            <Card.Body>
                <Card.Title as="h2" className="h4 mb-4">Expense Summary</Card.Title>
                
                {/* Total Overview */}
                <div className="text-center mb-4 p-3 bg-light rounded">
                    <p className="text-muted mb-1">Total Monthly Expenses</p>
                    <p className="fs-3 fw-bold mb-0 text-primary">${totalAmount.toFixed(2)}</p>
                </div>

                {/* Category Breakdown */}
                <h3 className="h6 text-muted mb-3">By Category</h3>
                <div className="mb-4">
                    {Object.entries(categoryTotals).map(([category, amount]) => {
                        const percentage = Math.round((amount / totalAmount) * 100);
                        return (
                            <div key={category} className="mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span>
                                        <Badge bg={getCategoryColor(category)} className="me-2">
                                            {category}
                                        </Badge>
                                    </span>
                                    <span className="fw-bold">${amount.toFixed(2)}</span>
                                </div>
                                <ProgressBar 
                                    now={percentage} 
                                    variant={getCategoryColor(category)}
                                    aria-label={`${category}: ${percentage}% of total expenses`}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Upcoming Bills */}
                {upcomingBills.length > 0 && (
                    <>
                        <h3 className="h6 text-muted mb-3">Upcoming Due Dates</h3>
                        <Table size="sm" className="mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Bill</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col" className="text-end">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingBills.map(bill => (
                                    <tr key={bill.id}>
                                        <td>{bill.name}</td>
                                        <td>{new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                        <td className="text-end fw-bold">${bill.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}