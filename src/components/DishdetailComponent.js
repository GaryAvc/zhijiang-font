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
				</div>
			</div>
		);
	else return <div></div>;
};

export default DishDetail;
