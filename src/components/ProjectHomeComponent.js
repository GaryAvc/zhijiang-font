import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { Link } from 'react-router-dom';

// function RenderCard({ item, isLoading, errMess }) {
// 	if (isLoading) {
// 		return <Loading />;
// 	} else if (errMess) {
// 		return <h4>{errMess}</h4>;
// 	} else
// 		return (
// 			<FadeTransform
// 				in
// 				transformProps={{
// 					exitTransform: 'scale(0.5) translateY(-50%)',
// 				}}
// 			>
// 				<Card>
// 					<CardImg src={item.image} alt={item.name} />
// 					<CardBody>
// 						<CardTitle>{item.name}</CardTitle>
// 						<CardText>{item.description}</CardText>
// 					</CardBody>
// 				</Card>
// 			</FadeTransform>
// 		);
// }

function ProjectHome(props) {
	return (
		<div className="container">
			<div className="row align-items-start">
				<div className="col-12 col-md m-1">
					<FadeTransform
						in
						transformProps={{
							exitTransform: 'scale(0.5) translateY(-50%)',
						}}
					>
						<Card>
							<Link to={'/problems'}>
								<CardImg src={'assets/images/arrange.gif'} alt={'register'} />
								<CardBody>
									<CardTitle>{'查看题目'}</CardTitle>
									<CardText>{'查看题目和相关信息！'}</CardText>
								</CardBody>
							</Link>
						</Card>
					</FadeTransform>
				</div>

				<div className="col-12 col-md m-1">
					<FadeTransform
						in
						transformProps={{
							exitTransform: 'scale(0.5) translateY(-50%)',
						}}
					>
						<Card>
							<Link to={'/rank'}>
								<CardImg
									src={'assets/images/professor.gif'}
									alt={'professor'}
								/>
								<CardBody>
									<CardTitle>{'排行榜'}</CardTitle>
									<CardText>{'查看最新排行'}</CardText>
								</CardBody>
							</Link>
						</Card>
					</FadeTransform>
				</div>
				<div className="col-12 col-md m-1">
					<FadeTransform
						in
						transformProps={{
							exitTransform: 'scale(0.5) translateY(-50%)',
						}}
					>
						<Card>
							<Link to={'/download'}>
								<CardImg src={'assets/images/register.gif'} alt={'arrange'} />
								<CardBody>
									<CardTitle>{'下载页面'}</CardTitle>
									<CardText>{'下载相关题目'}</CardText>
								</CardBody>
							</Link>
						</Card>
					</FadeTransform>
				</div>
			</div>
		</div>
	);
}

export default ProjectHome;
