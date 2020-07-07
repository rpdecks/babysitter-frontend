import React from 'react'
import { withRouter } from 'react-router-dom'
import Review from './Review'
import { connect } from 'react-redux'
import { Accordion, Button, Card, Form } from 'react-bootstrap'

class Reviews extends React.Component {
    state = {
        title: '',
        content: '',
        rating: '',
        userId: '',
    }   

    mapUsersToReview = () => {
        if (this.props.userType === 'employer') {
            return this.props.caregivers.map(c => <option value={c.id}>{c.first_name} {c.last_name[0]}.</option>)
        } else return this.props.employers.map(e => <option value={e.id}>{e.first_name} {e.last_name[0]}.</option>)
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.review) {
            this.editReview()
        } else {
            this.createReview(e)
            e.target.reset();
        }
    }

    createReview = (e) => {

        const auth_token = localStorage.getItem('auth_token');
        let reviewObj
        if (this.props.userType === 'employer') {
            reviewObj =  {
                employer_review: {
                    employer_id: this.props.userData.id,
                    caregiver_id: this.state.userId,
                    content: this.state.content,
                    title: this.state.title,
                    rating: this.state.rating,
                }
            }
        } else {
            reviewObj =  {
                caregiver_review: {
                    caregiver_id: this.props.userData.id,
                    employer_id: this.state.userId,
                    content: this.state.content,
                    title: this.state.title,
                    rating: this.state.rating,
                }
            }
        }

        if (!auth_token) {
        return;
        }

        const fetchObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': auth_token
            },
            body: JSON.stringify(reviewObj)
        }

        fetch (`http://localhost:3000/api/v1/${this.props.userType}_reviews`, fetchObj)
        .then(res => res.json())
        .then(review => {
            console.log(review)
            this.props.createReview(review)
            this.props.history.push('/')
        })
        .catch(error => console.log(error))
        e.target.reset();
    }

    handleDelete  = (id) => {
        let result = window.confirm('Are you sure you want to delete this review?')
        if (result) {
            const auth_token = localStorage.getItem('auth_token');
            if (!auth_token) {
            return;
            }
    
            const fetchObj = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': auth_token
                },
            }
    
            fetch(`http://localhost:3000/api/v1/${this.props.userType}_reviews/${id}`, fetchObj)
            .then(res => res.json())
            .then(review => {
                if (review.deleted) {
                    this.props.deleteReview(id)
                    this.props.history.push('/reviews')
                } else {
                    alert(review.msg);
                }
            })
            .catch((errors) => console.log(errors))
        }
    }

    renderReviews(reviews) {
        return reviews.map((review, index) => {
            return <Review key={index} review={review} handleDelete={this.handleDelete}/>
        })
    }

    render(){
        return (
            <>
                <h1>Which would you like to do?</h1>
                <Accordion>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0" id="write-review">
                            Write a review
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="reviewedUser">
                                        <Form.Label>Who would you like to review?</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name='userId'
                                            custom
                                            value={this.state.userId}
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option>Choose...</option>
                                            {this.mapUsersToReview()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="reviewRating">
                                        <Form.Label>Rate:</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            custom
                                            name='rating'
                                            value={this.state.rating}
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option>Choose...</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="reviewTitle">
                                        <Form.Label>Title:</Form.Label>
                                        <Form.Control 
                                            name="title"
                                            type="text" 
                                            defaultValue={this.state.title}
                                            onChange={e => this.handleChange(e)}
                                        />
                                        <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="review-content">
                                        <Form.Label>Review</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows="5"
                                            name="content"
                                            defaultValue={this.state.content}
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                    <Accordion.Toggle as={Button} variant="secondary" eventKey="0">
                                        Cancel
                                    </Accordion.Toggle>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                See reviews you wrote
                            </Accordion.Toggle>
                        </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {this.renderReviews(this.props.authoredReviews)}
                                </Card.Body>
                            </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                See reviews about you
                            </Accordion.Toggle>
                        </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    {this.renderReviews(this.props.reviewsAboutMe)}
                                </Card.Body>
                            </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userType: state.userReducer.userType,
        userData: state.userReducer.userData,
        employers: state.userReducer.employers,
        caregivers: state.userReducer.caregivers,
        authoredReviews: state.reviewsReducer.authoredReviews,
        reviewsAboutMe: state.reviewsReducer.reviewsAboutMe,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createReview: (review) => dispatch({ type: 'ADD_REVIEW', newReview: review}),
        deleteReview: (review) => dispatch({ type: 'DELETE_REVIEW', deletedReview: review}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews))