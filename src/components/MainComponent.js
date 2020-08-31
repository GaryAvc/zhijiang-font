import React, { Component } from 'react';
import DishDetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	fetchDishes,
	loginUser,
	logoutUser,
	fetchRecords,
	fetchRanks,
	fetchFinalTests,
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ProjectHome from './ProjectHomeComponent';
import ProjectMenu from './ProjectMenuComponent';
import ProjectAbout from './ProjectAboutComponent';
import Ranking from './RankingComponent';
import { Card, CardTitle, CardBody, CardImg } from 'reactstrap';

const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,

		auth: state.auth,
		records: state.records,
		ranks: state.ranks,
		finalTests: state.finalTests,
	};
};

// todo - change fetchRecords to onClick in Menu
const mapDispatchToProps = (dispatch) => ({
	fetchRecords: (questionId) => {
		dispatch(fetchRecords(questionId));
	},
	fetchRanks: () => {
		dispatch(fetchRanks());
	},
	fetchFinalTests: () => {
		dispatch(fetchFinalTests());
	},
	fetchDishes: () => {
		dispatch(fetchDishes());
	},
	loginUser: (creds) => dispatch(loginUser(creds)),
	logoutUser: () => dispatch(logoutUser()),
});

class Main extends Component {
	// todo - change fetchRecords to onClick in Menu
	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchFinalTests();
		// this.props.fetchRecords();
		this.props.fetchRanks();
	}

	componentWillUnmount() {
		this.props.logoutUser();
	}

	render() {
		const HomePage = () => {
			return (
				<ProjectHome
					dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
					dishesLoading={this.props.dishes.isLoading}
					dishesErrMess={this.props.dishes.errMess}
				/>
			);
		};

		const DishWithId = ({ match }) => {
			const caseId =
				match.params.dishId1 +
				'/' +
				match.params.dishId2 +
				'/' +
				match.params.dishId3;
			//  todo - when here the records didn't get fetch, so the isLoading is still
			// 		is true, so that cause the problem
			return this.props.auth.isAuthenticated ? (
				<DishDetail
					dish={
						this.props.dishes.dishes.filter((dish) => dish.caseId === caseId)[0]
					}
					records={this.props.records}
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
				/>
			) : (
				<DishDetail
					dish={
						this.props.dishes.dishes.filter(
							(dish) => dish.caseId === match.params.dishId
						)[0]
					}
					records={this.props.records}
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
				/>
			);
		};

		const PrivateRoute = ({ component: Component, ...rest }) => (
			<Route
				{...rest}
				render={(props) =>
					this.props.auth.isAuthenticated ? (
						<Component {...props} />
					) : (
						<Card>
							<CardBody>
								<CardTitle>请先登录，以此查看更多信息。</CardTitle>
							</CardBody>
						</Card>
					)
				}
			/>
		);

		return (
			<div>
				<Header
					auth={this.props.auth}
					loginUser={this.props.loginUser}
					logoutUser={this.props.logoutUser}
					googleLogin={this.props.googleLogin}
				/>

				{/* todo - change the url to correct zj url */}
				<TransitionGroup className="bodyGroup">
					<CSSTransition
						key={this.props.location.key}
						classNames="page"
						timeout={300}
					>
						<Switch>
							<Route path="/home" component={HomePage} />
							<Route
								exact
								path="/aboutus"
								component={() => <ProjectAbout leaders={this.props.leaders} />}
							/>
							<Route
								path="/problems/:dishId1/:dishId2/:dishId3"
								component={DishWithId}
							/>
							// todo - change fetchRecords to onClick in Menu
							<PrivateRoute
								exact
								path="/problems"
								component={() => (
									<ProjectMenu
										dishes={this.props.dishes}
										finalTests={this.props.finalTests}
										fetchRecords={this.props.fetchRecords}
									/>
								)}
							/>
							{/* todo: delete later */}
							{/* <Route
								exact
								path="/menu"
								component={() => <ProjectMenu dishes={this.props.dishes} />}
							/> */}
							<PrivateRoute
								exact
								path="/favorites"
								component={() => (
									<Favorites
										favorites={this.props.favorites}
										dishes={this.props.dishes}
										deleteFavorite={this.props.deleteFavorite}
									/>
								)}
							/>
							<Route
								exact
								path="/rank"
								component={() => <Ranking ranks={this.props.ranks} />}
							/>
							<Redirect to="/home" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
				<Footer className="footer" />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
