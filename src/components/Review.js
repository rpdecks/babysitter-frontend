import React from 'react'
import {Accordion, Button, Card } from 'react-bootstrap'
import StarRatings from 'react-star-ratings'

function Review(props) {

    return (
        <Accordion>
            <Card xs={12}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <b>{props.review.title}</b>
                        Rating: <StarRatings
                            name='rating'
                            rating={props.review.rating}
                            starRatedColor="red"
                            numberOfStars={5}
                            starDimension="30px"
                            starSpacing="2px"
                        />
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <p>{props.review.content}</p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Review