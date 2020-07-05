import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

function UserCard(props) {
    return (
        <Card>
            <Link to={`/${props.userType}s/${props.user.id}`}>
                <Card.Img variant="top" src={props.user.image} />
            </Link>
            <Card.Body>
                <Card.Title>{props.user.first_name} {props.user.last_name[0]}.</Card.Title>
                <Card.Text>
                    {props.user.age} years old<br /> 
                    {props.user.job_count} jobs experience<br />
                    {props.userType === 'employer' ? null: `$${props.user.pay_rate} /hour`}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">
                <StarRatings
                        name='rating'
                        rating={props.user.rating}
                        starRatedColor="red"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                />
                </small>
            </Card.Footer>
        </Card>
    )
}

export default UserCard