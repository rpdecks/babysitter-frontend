import React from 'react'
import { connect } from 'react-redux'
import { Accordion, Button, Card } from 'react-bootstrap'
import StarRatings from 'react-star-ratings'

function Review(props) {

    function renderButtons() {
        if (props.userType === 'employer') {
            let filteredReviews = props.authoredReviews.filter( r => r.employer_id === props.review.employer_id)
            if (filteredReviews && filteredReviews.length > 0) {
                return (
                <>
                    <Button variant="primary" >
                        Edit 
                    </Button>
                    <Button variant="secondary" onClick={() =>props.handleDelete(props.review.id)} >
                        Delete 
                    </Button>
                </>
                )
            } else {
                let filteredReviews = props.authoredReviews.filter( r => r.caregiver_id === props.review.caregiver_id)
                if (filteredReviews && filteredReviews.length > 0) {
                    return (
                    <>
                        <Button variant="primary" >
                            Edit 
                        </Button>
                        <Button variant="secondary" delete={props.handleDelete}>
                            Delete 
                        </Button>
                    </>
                    )
                }
            }
        }
    }

    return (
        <Accordion>
            <Card xs={12}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <b>Title:</b> {props.review.title}  |  Rating:  |
                        <StarRatings
                            name='rating'
                            rating={props.review.rating}
                            starRatedColor="red"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="2px"
                        />
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <p>{props.review.content}</p>
                    {renderButtons()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.userData,
        userType: state.userReducer.userType,
        authoredReviews: state.reviewsReducer.authoredReviews,
    }
}

export default connect(mapStateToProps)(Review)