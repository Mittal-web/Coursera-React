import React from 'react'
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'


function RenderDish({ dish }) {
  console.log(dish)
  if (dish != null) {
    console.log('renderDish Component')
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    )
  } else {
    return (
      <div></div>
    )
  }
}
function RenderComments({ comments }) {
  console.log(comments)
  if (comments == null) {
    return (<div></div>);
  }
  const showcomments = comments.map((cmnt) => {
    return (
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
    );
  });

  return (
    <div className='col-12 col-md-5 m-1'>
      <h4> Comments </h4>
      <ul className='list-unstyled'>
        {showcomments}
      </ul>
    </div>
  );
}
const DishDetail = (props) => {
  if (props.dish != null) {
    console.log(props)
    return (
      <div className="container" >
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
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
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    )
  }
}

export default DishDetail

