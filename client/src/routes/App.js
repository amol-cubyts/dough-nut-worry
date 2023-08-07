import React, { Component } from "react";
import { Col, Layout, Menu, Row, Icon } from "antd";

import { Link, Route, Switch } from "react-router-dom";

import Posts from "./Posts";
import Gallery from "./Gallery";
import Tasks from "./Tasks";
import optionMenuIcon from '../assets/images/optionMenu.png'
class Index extends Component {
	render() {
		const { Header, Content, Footer } = Layout;

		const { match, history } = this.props;

		const selectedKeys = history.location.pathname.substr(1);
		const defaultOpenKeys = selectedKeys.split("/")[1];

		return (
			<div>
				<div className="centered-container">
					<div className="square">
						<Layout>
							<Header>
								<div style={{display: "flex", alignItems: 'center'}}>
									<img src={optionMenuIcon} style={{height: '20px', width: '20px'}} />
									<div style={{ color: "white", marginLeft: '20px' }}>Dough-nut Worry</div>
								</div>
							</Header>
							<Content style={{ padding: "0 50px" }}>
								<Switch>
									{/* <Route
										path={`${match.url}feeds`}
										breadcrumbName="Posts"
										component={Posts}
									/> */}
									{/* <Route
										path={`${match.url}gallery`}
										breadcrumbName="Gallery"
										component={Gallery}
									/>
									<Route
										path={`${match.url}tasks`}
										breadcrumbName="Tasks"
										component={Tasks}
									/> */}
									{/*<Route path={`${match.url}users`} breadcrumbName="Users" component={Users}/>*/}
								</Switch>
							</Content>
							{/* <Footer style={{ textAlign: "center" }}>
								Work of ochomoswill using Ant Design.
							</Footer> */}
						</Layout>
					</div>
				</div>
			</div>
		);
	}
}

export default Index;
