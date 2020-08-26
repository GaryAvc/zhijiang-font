import React from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

// todo - Start to modify the code to updated to ip server

function RenderRank({ rank }) {
	// Outputs the date and time in Mon dd, YYYY, H:MM:SS AM/PM format
	return (
		<tr>
			<th scope="row">{rank.user}</th>
			<td>{rank.rank}</td>
			<td>{rank.totalScore}</td>
			<td>{rank.case1Score}</td>
			<td>{rank.case2Score}</td>
			<td>{rank.case3Score}</td>
		</tr>
	);
}

const Ranking = (props) => {
	const singleRank = props.ranks.ranks.map((rank) => {
		return <RenderRank rank={rank} />;
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
						<th>用户</th>
						<th>排名</th>
						<th>总得分</th>
						<th>题1得分</th>
						<th>题2得分</th>
						<th>题3得分</th>
					</thead>
					<tbody>{singleRank}</tbody>
				</Table>
			</div>
		</div>
	);
};

export default Ranking;
