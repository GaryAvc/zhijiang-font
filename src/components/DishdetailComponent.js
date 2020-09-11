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
			<th scope="row">{record.startTime}</th>
			<td>{record.totalScore}</td>
			<td>{record.efficiencyScore}</td>
			<td>{record.safetyScore}</td>
			<td>{record.stabilityScore}</td>
			<td>{record.fitnessScore}</td>
			<td>{record.predictabilityScore}</td>
			<td>{record.economyScore}</td>
			<td>{record.simElapsedTime}</td>
			<td>{record.stopReason}</td>
		</tr>
	);
}

class DishDetail extends Component {
	componentDidMount() {
		console.log('dishdetail component is mounted');
	}

	render() {
		const singleRecord = this.props.records.records.map((record) => {
			return <RenderDish record={record} />;
		});

		if (this.props.isLoading) {
			return (
				<div className="container">
					<div className="row">
						<Loading />
					</div>
				</div>
			);
		} else if (this.props.errMess) {
			return (
				<div className="container">
					<div className="row">
						<h4>{this.props.errMess}</h4>
					</div>
				</div>
			);
		} else if (this.props.dish != null) {
			window.scrollTo(0, 0);
			return (
				<div className="container">
					<div className="row">
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/problems">题目</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>{this.props.dish.caseId}</BreadcrumbItem>
						</Breadcrumb>
						<div className="col-12">
							<h3>{this.props.dish.name}</h3>
							<hr />
						</div>
					</div>

					<div className="row">
						<Table>
							<thead>
								<th>提交时间</th>
								<th>最终得分</th>
								<th>效率性得分</th>
								<th>安全性得分</th>
								<th>稳定性得分</th>
								<th>舒适性得分</th>
								<th>预见性得分</th>
								<th>经济性得分</th>
								<th>持续时间(秒)</th>
								<th>停止原因</th>
							</thead>
							<tbody>{singleRecord}</tbody>
						</Table>
					</div>
				</div>
			);
		} else return <div></div>;
	}
}

export default DishDetail;
