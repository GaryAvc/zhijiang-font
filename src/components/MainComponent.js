import React, { Component } from 'react';
import DishDetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	postComment,
	postFeedback,
	fetchDishes,
	fetchComments,
	fetchPromos,
	fetchLeaders,
	loginUser,
	logoutUser,
	fetchFavorites,
	googleLogin,
	postFavorite,
	deleteFavorite,
	fetchRecords,
	fetchRanks,
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
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders,
		favorites: state.favorites,
		auth: state.auth,
		records: state.records,
		ranks: state.ranks,
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchRecords: () => {
		dispatch(fetchRecords());
	},
	fetchRanks: () => {
		dispatch(fetchRanks());
	},
	postComment: (dishId, rating, comment) =>
		dispatch(postComment(dishId, rating, comment)),
	fetchDishes: () => {
		dispatch(fetchDishes());
	},
	resetFeedbackForm: () => {
		dispatch(actions.reset('feedback'));
	},
	fetchComments: () => {
		dispatch(fetchComments());
	},
	fetchPromos: () => {
		dispatch(fetchPromos());
	},
	fetchLeaders: () => dispatch(fetchLeaders()),
	postFeedback: (feedback) => dispatch(postFeedback(feedback)),
	loginUser: (creds) => dispatch(loginUser(creds)),
	logoutUser: () => dispatch(logoutUser()),
	fetchFavorites: () => dispatch(fetchFavorites()),
	googleLogin: () => dispatch(googleLogin()),
	postFavorite: (dishId) => dispatch(postFavorite(dishId)),
	deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});

class Main extends Component {
	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchRecords();
		this.props.fetchRanks();
		this.props.fetchComments();
		this.props.fetchPromos();
		this.props.fetchLeaders();
		this.props.fetchFavorites();
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
					promotion={
						this.props.promotions.promotions.filter(
							(promo) => promo.featured
						)[0]
					}
					promosLoading={this.props.promotions.isLoading}
					promosErrMess={this.props.promotions.errMess}
					leader={
						this.props.leaders.leaders.filter((leader) => leader.featured)[0]
					}
					leaderLoading={this.props.leaders.isLoading}
					leaderErrMess={this.props.leaders.errMess}
				/>
			);
		};

		const DishWithId = ({ match }) => {
			return this.props.auth.isAuthenticated ? (
				<DishDetail
					dish={
						this.props.dishes.dishes.filter(
							(dish) => dish._id === match.params.dishId
						)[0]
					}
					records={this.props.records}
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
				/>
			) : (
				<DishDetail
					dish={
						this.props.dishes.dishes.filter(
							(dish) => dish._id === match.params.dishId
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
				<TransitionGroup>
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
							<Route path="/menu/:dishId" component={DishWithId} />

							{/* <PrivateRoute
								exact
								path="/menu"
								component={() => <ProjectMenu dishes={this.props.dishes} />}
							/> */}

							{/* Todo: delete later */}
							<Route
								exact
								path="/menu"
								component={() => <ProjectMenu dishes={this.props.dishes} />}
							/>

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
								path="/contactus"
								component={() => <Ranking ranks={this.props.ranks} />}
							/>
							<Redirect to="/home" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
