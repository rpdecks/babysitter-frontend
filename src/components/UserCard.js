import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import styled from 'styled-components'

const Styles = styled.div ` 
    .user-card {
        margin-bottom: 10px !important;
        margin-top: 10px !important;
    }
    .card-img-top {
        width: 100%;
        height: 15vh;
        object-fit: cover;
    }
    .card-title {
        font-size: small;
        margin-bottom: 5px;
        font-weight: bold;
    }
    .card {
        margin-bottom: 10px !important;
        margin-top: 10px !important;
        font-size: x-small;
        // height: 10vh;
    }
`  

function UserCard(props) {

    return (
        <Styles>
        <Card className='user-card'>
            <Link to={`/${props.userType}s/${props.user.id}`}>
                <Card.Img variant="top" src={props.user.image} />
            </Link>
            <Card.Body>
                <Card.Title>{props.user.first_name} {props.user.last_name[0]}.</Card.Title>
                <Card.Text>
                    Age: {props.user.age}<br /> 
                    {props.userType === 'caregiver' ? `${props.user.job_count}  jobs completed` : null }
                    {props.userType === 'caregiver' ? <br /> : null }
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
        </Styles>
    )
}

export default UserCard