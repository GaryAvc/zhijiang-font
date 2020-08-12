import React from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ record }) {
	// Outputs the date and time in Mon dd, YYYY, H:MM:SS AM/PM format
	return (
		<tr>
			<th scope="row">{record.user}</th>
			<td>{record.rank}</td>
			<td>{record.score}</td>
			<td>{record.totalScore}</td>
		</tr>
	);
}

const Ranking = (props) => {
	const singleRecord = props.records.records.map((record) => {
		return <RenderDish record={record} />;
	});

	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/">主页</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>排行榜</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>排行榜</h3>
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
};

export default Ranking;
