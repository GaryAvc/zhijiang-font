import React, { Component } from 'react';
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavbarToggler,
	Collapse,
	NavItem,
	Jumbotron,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Input,
	Label,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavOpen: false,
			isModalOpen: false,
		};
		this.toggleNav = this.toggleNav.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen,
		});
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleLogin(event) {
		this.toggleModal();
		this.props.loginUser({
			username: this.username.value,
			password: this.password.value,
		});
		event.preventDefault();
	}

	handleGoogleLogin(event) {
		this.toggleModal();
		this.props.googleLogin();
		event.preventDefault();
	}

	handleLogout() {
		this.props.logoutUser();
	}

	render() {
		return (
			<React.Fragment>
				<Navbar dark expand="md" fixed="top">
					<div className="container">
						<NavbarToggler onClick={this.toggleNav} />
						<NavbarBrand className="mr-auto" href="/">
							<img
								src="assets/images/zhijiang.jpg"
								height="100"
								width="250"
								alt="Zhi Jiang"
							/>
						</NavbarBrand>
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem>
									<NavLink className="nav-link" to="/home">
										<span className="fa fa-home fa-lg"></span> 主页
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/aboutus">
										<span className="fa fa-info fa-lg"></span> 关于我们
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/menu">
										<span className="fa fa-list fa-lg"></span> 查看题目
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/favorites">
										<span className="fa fa-heart fa-lg"></span> 我的收藏
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link" to="/contactus">
										<span className="fa fa-address-card fa-lg"></span> 排行榜
									</NavLink>
								</NavItem>
							</Nav>
							<Nav className="ml-auto" navbar>
								<NavItem>
									{!this.props.auth.isAuthenticated ? (
										<Button color="success" onClick={this.toggleModal}>
											<span className="fa fa-sign-in fa-lg"></span> 登录
											{this.props.auth.isFetching ? (
												<span className="fa fa-spinner fa-pulse fa-fw"></span>
											) : null}
										</Button>
									) : (
										<div>
											<div className="navbar-text mr-3">
												{this.props.auth.user.email}
											</div>
											<Button color="success" onClick={this.handleLogout}>
												<span className="fa fa-sign-out fa-lg"></span> 退出登录
												{this.props.auth.isFetching ? (
													<span className="fa fa-spinner fa-pulse fa-fw"></span>
												) : null}
											</Button>
										</div>
									)}
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>

				{/* added info */}
				<div id="home" className="landing">
					<div className="home-wrap">
						<div className="home-inner"></div>
					</div>
				</div>

				<div className="caption text-left">
					<h1>之江实验室</h1>
					<p>
						之江实验室是由余杭区重点打造的科研机构，位于余杭未来科技城的中国（杭州）人工智能小镇。
					</p>
					<p>
						为认真贯彻落实习近平总书记科技创新思想，深入实施创新驱动发展战略，
					</p>
					<p>
						以科技创新为核心带动全面创新，加快推进网络信息国家实验室创建工作，
					</p>
					<p>
						积极探索一条从人才强、科技强到产业强、经济强、国家强的发展新路径，浙江省政府决定成立之江实验室。
					</p>
				</div>
				{/* added info */}
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>登录你的帐号</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.handleLogin}>
							<FormGroup>
								<Label htmlFor="username">用户名</Label>
								<Input
									type="text"
									id="username"
									name="username"
									innerRef={(input) => (this.username = input)}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="password">密码</Label>
								<Input
									type="password"
									id="password"
									name="password"
									innerRef={(input) => (this.password = input)}
								/>
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input
										type="checkbox"
										name="remember"
										innerRef={(input) => (this.remember = input)}
									/>
									记住我
								</Label>
							</FormGroup>
							<Button type="submit" value="submit" color="primary">
								登录
							</Button>
						</Form>
						<p></p>
						<Button color="danger" onClick={this.handleGoogleLogin}>
							<span className="fa fa-google fa-lg"></span> 用Google登录
						</Button>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

export default Header;
