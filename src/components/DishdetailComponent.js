import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardImgOverlay,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Label,
	Modal,
	ModalHeader,
	ModalBody,
	Button,
	Row,
	Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish, favorite, postFavorite }) {
	return (
		<div className="col-12 col-md-5 m-1">
			<FadeTransform
				in
				transformProps={{
					exitTransform: 'scale(0.5) translateY(-50%)',
				}}
			>
				<Card>
					<Button
						outline
						color="primary"
						onClick={() =>
							favorite
								? console.log('Already favorite')
								: postFavorite(dish._id)
						}
					>
						{favorite ? (
							<span className="fa fa-heart"></span>
						) : (
							<span className="fa fa-heart-o"></span>
						)}
					</Button>

					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
						<CardText>{dish.content}</CardText>
					</CardBody>
				</Card>
			</FadeTransform>
		</div>
	);
}

function RenderComments({ comments, postComment, dishId }) {
	if (comments != null)
		return (
			<div className="col-12 col-md-5 m-1">
				<h4>评论</h4>
				<ul className="list-unstyled">
					<Stagger in>
						{comments.map((comment) => {
							return (
								<Fade in key={comment._id}>
									<li>
										<p>{comment.comment}</p>
										<p>{comment.rating} 分</p>
										<p>
											-- {comment.author.firstname} {comment.author.lastname} ,{' '}
											{new Intl.DateTimeFormat('en-US', {
												year: 'numeric',
												month: 'short',
												day: '2-digit',
											}).format(
												new Date(Date.parse(comment.updatedAt.toDate()))
											)}
										</p>
									</li>
								</Fade>
							);
						})}
					</Stagger>
				</ul>
				<CommentForm dishId={dishId} postComment={postComment} />
			</div>
		);
	else return <div></div>;
}

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			isNavOpen: false,
			isModalOpen: false,
		};
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleSubmit(values) {
		this.toggleModal();
		this.props.postComment(this.props.dishId, values.rating, values.comment);
	}

	render() {
		return (
			<div>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg"></span> 提交评论
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>提交评论</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Col>
									<Label htmlFor="rating">评分</Label>
									<Control.select
										model=".rating"
										id="rating"
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
								<Col>
									<Label htmlFor="comment">评论</Label>
									<Control.textarea
										model=".comment"
										id="comment"
										rows="6"
										className="form-control"
									/>
								</Col>
							</Row>
							<Button type="submit" className="bg-primary">
								提交
							</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const DishDetail = (props) => {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else if (props.dish != null)
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">题目</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderDish
						dish={props.dish}
						favorite={props.favorite}
						postFavorite={props.postFavorite}
					/>
					<RenderComments
						comments={props.comments}
						postComment={props.postComment}
						dishId={props.dish._id}
					/>
				</div>
			</div>
		);
	else return <div></div>;
};

export default DishDetail;
