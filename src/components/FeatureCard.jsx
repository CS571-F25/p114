import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default function FeatureCard({ icon, title, description, linkTo, linkText, disabled = false }) {
    return (
        <Card className="h-100 text-center shadow-sm">
            <Card.Body className="d-flex flex-column">
                <div className="fs-1 mb-3" aria-hidden="true">{icon}</div>
                <Card.Title as="h2" className="h5">{title}</Card.Title>
                <Card.Text className="flex-grow-1">
                    {description}
                </Card.Text>
                {disabled ? (
                    <Button variant="secondary" disabled aria-disabled="true">
                        {linkText}
                    </Button>
                ) : (
                    <Button as={Link} to={linkTo} variant="primary">
                        {linkText}
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}