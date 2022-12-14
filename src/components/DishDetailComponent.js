import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'
import { baseURL } from '../shared/baseURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }
  handleSubmit(values) {
    this.toggleModal();
    // alert("The current state is: " + JSON.stringify(value))
    // console.log(JSON.stringify(value));
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
  }
  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className='fa fa-solid fa-pencil fa-lg'></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <ModalBody>
              <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={4}>Rating</Label>
                  <Col md={12}>
                    <Control.select model=".rating" id="rating" name="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author" md={4}>Your Name</Label>
                  <Col md={12}>
                    <Control.text model=".author" id="author" name="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        minLength: minLength(3), maxLength: maxLength(15)
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={4}>Comment</Label>
                  <Col md={12}>
                    <Control.textarea model=".comment" id="comment" name="comment"
                      className="form-control"
                      validators={{
                        required
                      }}
                      rows="6"
                    />
                    <Errors
                      className="text-danger"
                      model=".comment"
                      show="touched"
                      messages={{
                        required: 'Comment Required'
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col className="mt-2">
                    <Button type="submit" color="primary" >Submit</Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </ModalHeader>
        </Modal>
      </>

    )
  }
}

function RenderDish({ dish }) {

  if (dish != null) {
    console.log('renderDish Component')
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>

        <Card>
          <CardImg width="100%" src={baseURL + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    )
  } else {
    return (
      <div></div>
    )
  }
}
function RenderComments({ comments, postComment, dishId }) {
  console.log(comments)
  if (comments == null) {
    return (<div></div>);
  }
  const showcomments = comments.map((cmnt) => {
    return (
      <Fade in>
        <li key={cmnt.id}>
          <p>{cmnt.comment}</p>
          <p>--{cmnt.author},
            &nbsp;
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit'
            }).format(new Date(cmnt.date))}
          </p>
        </li>
      </Fade>
    );
  }
  );

  return (
    <div className='col-12 col-md-5 m-1'>
      <h4> Comments </h4>
      <ul className='list-unstyled'>
        <Stagger in>
          {showcomments}
        </Stagger>
      </ul>
      <ul className='list-unstyled'>
        <CommentForm dishId={dishId} postComment={postComment} />
      </ul>
    </div>
  );
}
const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  }
  else if (props.dish != null) {
    console.log(props)
    return (
      <div className="container" >
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
            </BreadcrumbItem>
            <Link to='/menu'>Menu</Link>
            <BreadcrumbItem active>
              {props.dish.name}
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className=" col-12 col-md-5">
            <RenderDish dish={props.dish} />
          </div>
          <div className=" col-12 col-md-7">
            <h2>HiComments</h2>
            <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
          </div>
        </div>
      </div>
    )
  }
}

export default DishDetail

