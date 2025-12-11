import { Container, Row, Col, Card } from 'react-bootstrap';
import FeatureCard from './Featurecard';

export default function Home() {
    const features = [
        {
            icon: "💰",
            title: "Split Bills",
            description: "Divide rent, utilities, and expenses fairly among roommates",
            linkTo: "/bills",
            linkText: "View Bills",
            disabled: false
        },
        {
            icon: "👥",
            title: "Manage Roommates",
            description: "Track household members and their share percentages",
            linkTo: "/roommates",
            linkText: "View Roommates",
            disabled: false
        },
        {
            icon: "💳",
            title: "Track Payments",
            description: "Record who paid bills and transfer money between roommates",
            linkTo: "/payments",
            linkText: "View Payments",
            disabled: false
        },
        {
            icon: "📊",
            title: "Settle Up",
            description: "See who owes what and settle balances with one click",
            linkTo: "/payments",
            linkText: "Settle Now",
            disabled: false
        }
    ];

    return (
        <Container style={{ maxWidth: '1400px' }} className="py-4">
            <Row className="mb-5">
                <Col>
                    <h1 className="display-4">Welcome to RentSplit</h1>
                    <p className="lead text-muted">
                        Manage your household bills and chores with zero ambiguity
                    </p>
                </Col>
            </Row>

            <Row className="g-4 mb-5">
                {features.map((feature, index) => (
                    <Col sm={6} lg={3} key={index}>
                        <FeatureCard 
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            linkTo={feature.linkTo}
                            linkText={feature.linkText}
                            disabled={feature.disabled}
                        />
                    </Col>
                ))}
            </Row>

            <Row>
                <Col>
                    <Card bg="light">
                        <Card.Body>
                            <h2 className="h4">Getting Started</h2>
                            <ol className="mb-0">
                                <li className="mb-2">Add your roommates and set their share percentages</li>
                                <li className="mb-2">Create bills and choose how to split them</li>
                                <li>Track payments and settle up easily</li>
                            </ol>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}