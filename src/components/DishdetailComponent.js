import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

// todo - modify to fetch info from ip server
//todo - modify the dispatch in this Component instead of Main

function RenderDish({ record }) {
	// Outputs the date and time in Mon dd, YYYY, H:MM:SS AM/PM format
	return (
		<tr>
			<th scope="row">{record.submitTime}</th>
			<td>{record.score}</td>
			<td>{record.duration}</td>
			<td>{record.stopReason}</td>
		</tr>
	);
}

const DishDetail = (props) => {
	const singleRecord = props.records.records.map((record) => {
		return <RenderDish record={record} />;
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
				<div className="row">
					<Table>
						<thead>
							<th>#</th>
							<th>提交时间</th>
							<th>最终得分</th>
							<th>持续时间</th>
							<th>停止原因</th>
						</thead>
						<tbody>{singleRecord}</tbody>
					</Table>
				</div>
			</div>
		);
	else return <div></div>;
};

export default DishDetail;
