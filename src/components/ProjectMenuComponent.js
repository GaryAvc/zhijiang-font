import React from 'react';
import {
	Card,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	CardText,
	Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

// todo: start to match to server interface
function RenderMenuItem({ dish }) {
	return (
		<Card>
			<CardBody>
				<CardTitle>{dish.caseId}</CardTitle>
				<CardText>简介 : {dish.description}</CardText>
				<CardText>标签 : {dish.caseLabels}</CardText>
				<CardText>类型 : {dish.examType}</CardText>

				<Button
					color="primary"
					size="md"
					className=" col-md-5 m-2"
					href="/assets/images/bird.jpg"
					download
				>
					下载题目
				</Button>
				<Link to={`/menu/${dish._id}`}>
					<Button
						color="primary"
						size="md"
						className="col-md-5 m-2"
						href="/assets/images/bird.jpg"
						download
					>
						提交记录
					</Button>
				</Link>
			</CardBody>
		</Card>
	);
}

const ProjectMenu = (props) => {
	const menuA = props.dishes.dishes.map((dish) => {
		if (dish.examType == 'A') {
			return (
				<div key={dish._id} className="col-12 col-md-12 m-2">
					<RenderMenuItem dish={dish} />
				</div>
			);
		}
	});

	const menuB = props.dishes.dishes.map((dish) => {
		if (dish.examType == 'B') {
			return (
				<div key={dish._id} className="col-12 col-md-12 m-2">
					<RenderMenuItem dish={dish} />
				</div>
			);
		}
	});

	const menu = props.dishes.dishes.map((dish) => {
		return (
			<div key={dish._id} className="col-12 col-md-12 m-2">
				<RenderMenuItem dish={dish} />
			</div>
		);
	});

	if (props.dishes.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.dishes.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.dishes.errMess}</h4>
				</div>
			</div>
		);
	} else
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/home">主页</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>题目列表</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>题目列表[初赛/决赛]</h3>
						<hr />
					</div>
				</div>
				<div className="col-12">
					<h3>初赛</h3>
					<hr />
				</div>
				<div className="col-12">
					<h3>A卷</h3>
					<hr />
				</div>
				<div className="row">{menuA}</div>
				<div className="col-12">
					<h3>B卷</h3>
					<hr />
				</div>
				<div className="row">{menuB}</div>
				<div className="col-12">
					<h3>决赛</h3>
					<hr />
				</div>
				<div className="row">{menu}</div>
			</div>
		);
};

export default ProjectMenu;
