import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import HomePage from './views/Home';

import './App.css';
import BookList from './views/BookList';
import AddBookView from './views/AddBookView';
import BookDetail from './views/BookDetail';
import UserListContainer from './views/UserList';
import Breadcrumbs from './views/Breadcrumbs';
import { setCurrentUser, logoutUser } from './actions/authAction';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

if (localStorage.jwToken) {
  setAuthToken(localStorage.jwToken);
  // 解析token
  const decoded = jwt_decode(localStorage.jwToken);
  store.dispatch(setCurrentUser(decoded));
  // 检测token过期
  // 获取当前时间
  const currentTime = Date.now() / 1000; //由毫秒转成秒
  console.log(decoded);
  console.log(currentTime);
  // 判断当前时间是否大于token中的exp时间;如果大于是为过期
  if (decoded.exp < currentTime) {
    // 清除本地存储
    store.dispatch(logoutUser());
    // 退出后再跳转页面
    window.location.href = '/';
  }
}

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route
        path="/home"
        render={() => (
          <Layout>
            <Header className="header">
              <Row type="flex" justify="space-between" align="middle">
                <Col span={8}>
                  <div className="logo">
                    <span style={{ color: 'white', fontSize: 18 }}>
                      Reading Club
                    </span>
                  </div>
                </Col>
                <Col span={8}>
                  <Row type="flex" justify="end" align="middle">
                    <Button
                      type="link"
                      onClick={() => {
                        store.dispatch(logoutUser());
                        window.location.href = '/';
                      }}
                    >
                      Logout
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['Book']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <SubMenu
                    key="Book"
                    title={
                      <span>
                        <Icon type="book" />
                        Books
                      </span>
                    }
                  >
                    <Menu.Item key="1">
                      <Link to="/home/booklist">Book List</Link>
                    </Menu.Item>
                    <Menu.Item key="2">Borrowed Books</Menu.Item>
                    <Menu.Item key="3">Unborrowed Books</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="User"
                    title={
                      <span>
                        <Icon type="user" />
                        Users
                      </span>
                    }
                  >
                    <Menu.Item key="5">
                      <Link to="/home/userlist">User List</Link>
                    </Menu.Item>
                    <Menu.Item key="6">option6</Menu.Item>
                    <Menu.Item key="7">option7</Menu.Item>
                    <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="Settings"
                    title={
                      <span>
                        <Icon type="setting" />
                        Settings
                      </span>
                    }
                  >
                    <Menu.Item key="9">option9</Menu.Item>
                    <Menu.Item key="10">option10</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumbs />
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 600,
                  }}
                >
                  <Switch>
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/home/booklist" component={BookList} />
                    <Route
                      path="/home/booklist/addBook"
                      render={(props) => {
                        return <AddBookView {...props} />;
                      }}
                    />
                    <Route
                      exact
                      path="/home/booklist/detail"
                      component={BookDetail}
                    />
                    <Route
                      path="/home/userlist"
                      component={UserListContainer}
                    />
                    <Route
                      path="/home/userlist/detail"
                      component={UserListContainer}
                    />
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )}
      />
    </Router>
  );
}

export default App;
