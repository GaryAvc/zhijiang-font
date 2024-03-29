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
// todo - change fetchRecords to onClick in Menu
function RenderMenuItem({ dish, fetchRecords }) {
	// function handleClick() {
	// 	fetchRecords(dish.caseId);
	// }

	return (
		<Card>
			<CardBody>
				<CardTitle>{dish.caseId}</CardTitle>
				<CardText>简介 : {dish.caseDescription}</CardText>
				<CardText>标签 : {dish.caseLabels}</CardText>

				<Link to={`/problems/${dish.caseId}`}>
					<Button
						// onClick={handleClick}
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
		if (dish.paperType === 'A') {
			return (
				<div key={dish._id} className="col-12 col-md-12 m-2">
					<RenderMenuItem dish={dish} fetchRecords={props.fetchRecords} />
				</div>
			);
		}
	});

	const menuB = props.dishes.dishes.map((dish) => {
		if (dish.paperType == 'B') {
			return (
				<div key={dish._id} className="col-12 col-md-12 m-2">
					<RenderMenuItem dish={dish} fetchRecords={props.fetchRecords} />
				</div>
			);
		}
	});

	const finalShow = props.finalTests.finalTests.map((finalTest) => {
		return (
			<div key={finalTest._id} className="col-12 col-md-12 m-2">
				<RenderMenuItem dish={finalTest} fetchRecords={props.fetchRecords} />
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
				<div className="col-12 ml-3">
					<h3>A卷</h3>
					<hr />
				</div>
				<div className="row  ml-3">{menuA}</div>
				<div className="col-12 ml-3">
					<h3>B卷</h3>
					<hr />
				</div>
				<div className="row  ml-3">{menuB}</div>
				<div className="col-12">
					<h3>决赛</h3>
					<hr />
				</div>
				<div className="row  ml-3">{finalShow}</div>
			</div>
		);
};

export default ProjectMenu;
