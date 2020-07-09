import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import styled from 'styled-components'
import { MdSmokeFree, MdSmokingRooms, MdPets } from 'react-icons/md'
import { GiHealthNormal } from "react-icons/gi"

const Styles = styled.div ` 
    font-family: 'Roboto', sans-serif;
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
        font-family: 'Roboto', sans-serif;
        color: #212121;
    }
    .card {
        margin-bottom: 10px !important;
        margin-top: 10px !important;
        font-size: x-small;
    }
    .card-text {
        font-family: 'Roboto', sans-serif;
        color: #757575;
    }
    .smoking-icon {
        font-size: 30px;
        color: #0097A7;
    }
    .pets-icon {
        font-size: 30px;
        color: #0097A7;
    }
    .first-aid-icon {
        font-size: 30px;
        color: #0097A7;
    }
    .star-column {
        text-align: right;
        color: #0097A7;
    }
    .icons-row {
        text-align: center;
    }
`  

function UserCard(props) {
    
    function renderSmokingIcon() {
        if (props.user.smoker) return <MdSmokingRooms className='smoking-icon'/>
        else return <MdSmokeFree className='smoking-icon'/>
    }
    function renderPetsIcon() {
        if (props.user.has_pets) return <MdPets className='pets-icon'/>
    }
    function renderFirstAidIcon() {
        if (props.user.first_aid_cert) return <GiHealthNormal className='first-aid-icon'/>
    }

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
                    {props.user.job_count} jobs completed<br />
                    {props.userType === 'employer' ? null: `$${props.user.pay_rate} /hour`}
                </Card.Text>
            </Card.Body>    
            <Card.Footer style={{ background: '#B2EBF2' }}>
                <small className="text-muted">
                <Row>
                <Col className='icons-row'>
                {renderSmokingIcon()}
                {renderFirstAidIcon()}
                {renderPetsIcon()}
                </Col>
                <Col className='star-column'>
                    {props.user.rating}
                    <StarRatings
                            name='rating'
                            rating={props.user.rating}
                            starRatedColor="#FFC107"
                            numberOfStars={1}
                            starDimension="30px"
                            starSpacing="2px"
                    />
                </Col>
                </Row>
                </small>
            </Card.Footer>
        </Card>
        </Styles>
    )
}

export default UserCard