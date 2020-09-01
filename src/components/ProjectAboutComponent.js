import React from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	Card,
	CardBody,
	CardHeader,
	Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Fade, Stagger } from 'react-animation-components';

function RenderLeader({ leader }) {
	return (
		<Media className="media-professor" tag="li">
			<Media left middle>
				<Media
					className="media-image"
					object
					src={leader.image}
					alt={leader.name}
				/>
			</Media>
			<Media body className="ml-5">
				<Media heading>{leader.name}</Media>
				<p>{leader.designation}</p>
				<p>{leader.description}</p>
			</Media>
		</Media>
	);
}

function LeaderList(props) {
	const leaders = props.leaders.leaders.map((leader) => {
		return (
			<Fade in key={leader._id}>
				<div className="col-12 mt-2">
					<RenderLeader leader={leader} />
				</div>
			</Fade>
		);
	});

	if (props.leaders.isLoading) {
		return <Loading />;
	} else if (props.leaders.errMess) {
		return (
			<div className="col-12">
				<h4>{props.leaders.errMess}</h4>
			</div>
		);
	} else {
		return (
			<Media list>
				<Stagger in>{leaders}</Stagger>
			</Media>
		);
	}
}

function ProjectAbout(props) {
	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/home">主页</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>关于我们</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>关于我们</h3>
					<hr />
				</div>
			</div>

			{/* <div className="row row-content">
				<div className="col-12">
					<h2>科研人员</h2>
				</div>
				<LeaderList leaders={props.leaders} />
			</div> */}

			<div className="row row-content">
				<div className="col-12 col-md-6">
					<h2>我们的历史</h2>
					<p>
						<em>
							为认真贯彻落实习近平总书记科技创新思想，深入实施创新驱动发展战略{' '}
						</em>
					</p>
					<p>
						之江实验室是由余杭区重点打造的科研机构 [1]
						，位于余杭未来科技城的中国（杭州）人工智能小镇。于2017年9月6日上午正式揭牌成立。
						2018年9月27日获悉，之江实验室的组织架构、建章立制及三年发展规划的编制已完成，
						首批5个重大攻关项目启动。
					</p>
				</div>
				<div className="col-12 col-md-5">
					<Card>
						<CardHeader className="bg-primary text-white">简介</CardHeader>
						<CardBody>
							<dl className="row p-1">
								<dt className="col-6">开始于</dt>
								<dd className="col-6">2017/9/6</dd>
								<dt className="col-6">重大攻关项目</dt>
								<dd className="col-6">5个</dd>
								<dt className="col-6">研究人员</dt>
								<dd className="col-6">1,029人</dd>
							</dl>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default ProjectAbout;
