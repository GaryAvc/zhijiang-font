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
	Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish, favorite, postFavorite }) {
	return (
		<div className="col-12 col-md-5 m-1">
			<tbody>
				<tr>
					<th scope="row">3</th>
					<td>Larry</td>
					<td>the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</div>
	);
}

const DishDetail = (props) => {
	const record = props.dishes.dishes.map((dish) => {
		return (
			<div key={dish._id} className="col-12 col-md-12 m-1">
				<RenderDish dish={dish} />
			</div>
		);
	});

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
				<div className="row">{record}</div>
			</div>
		);
	else return <div></div>;
};

export default DishDetail;
