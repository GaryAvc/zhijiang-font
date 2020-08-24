import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

// todo - modify to fetch info from ip server

function RenderDish({ record }) {
	const timestamp = record.time;

	var formattedTimestamp = Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
	}).format(timestamp);
	// Outputs the date and time in Mon dd, YYYY, H:MM:SS AM/PM format
	return (
		<tr>
			<th scope="row">{record.id}</th>
			<td>{record.name}</td>
			<td>{record.score}</td>
			<td>{formattedTimestamp}</td>
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
							<th>名称</th>
							<th>得分</th>
							<th>时间</th>
						</thead>
						<tbody>{singleRecord}</tbody>
					</Table>
				</div>
			</div>
		);
	else return <div></div>;
};

export default DishDetail;
