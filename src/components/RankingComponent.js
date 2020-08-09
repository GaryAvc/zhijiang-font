import React, { Component } from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Label,
	Col,
	Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
	/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Ranking extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/home">主页</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>排行榜</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>排行榜</h3>
						<hr />
					</div>
				</div>
				<div className="row row-content">
					<div className="col-12">
						<h3>用户分值排行总榜[复赛]</h3>
					</div>
					<div className="col-7 col-sm-4 offset-1"></div>
				</div>
			</div>
		);
	}
}

export default Ranking;
