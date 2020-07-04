import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function UserCard(props) {
    return (
        <Link to={`/${props.userType}s/${props.user.id}`}>
            <Col xs={3}>
                <Card className='m-3'>
                    <Card.Img variant="top" src={props.user.image} />
                    <Card.Body>
                        <Card.Title>{props.user.first_name} {props.user.last_name[0]}.</Card.Title>
                        <Card.Text>
                            Experience: {props.user.jobs} completed<br />
                            ${props.user.pay_rate}/hour<br />
                            {props.user.rating}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Link>
    )
}

export default UserCard