import React from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

// todo - Start to modify the code to updated to ip server
//[{"caseScore":[{"caseId":"milestone2_demo/AITownReconstructed_V0103_200518/apollo_add_basic/case.json","caseScore":100.0}],
// "rank":1,"totalScore":100.0,"username":"test"}]
function RenderRank({ rank }) {
	const singleCase = rank.caseScore.map((oneCaseScore) => {
		return <QuestionDetail oneCaseScore={oneCaseScore} />;
	});

	return (
		<tr>
			<th scope="row">{rank.username}</th>
			<td>{rank.rank}</td>
			<td>{rank.totalScore}</td>
			{singleCase}
		</tr>
	);
}

function QuestionDetail({ oneCaseScore }) {
	return (
		<tr>
			<td>
				{oneCaseScore.caseId} <br />
				得分: {oneCaseScore.caseScore}
			</td>
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
						<th>题1</th>
						<th>题2</th>
						<th>题3</th>
						<th>题4</th>
						<th>题5</th>
						<th>题6</th>
					</thead>
					<tbody>{singleRank}</tbody>
				</Table>
			</div>
		</div>
	);
};

export default Ranking;
