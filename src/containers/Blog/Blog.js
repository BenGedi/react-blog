import './Blog.css'
import React, { Component, Suspense } from 'react';
import Posts from '../../containers/Blog/Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
// import TestPage from './testPage/testPage';
const TestPage = React.lazy(() => import('./testPage/testPage'));
const AsyncNewPost = asyncComponent(() => {
    // dynamic import approach
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    };

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/posts/"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }}>Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: '/test-page',
                                }}>Test Page</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <h1>Hello</h1>} />*/}
                <Switch>
                    {this.state.auth && <Route path="/new-post" component={AsyncNewPost} />}
                    <Route path="/posts" component={Posts} />
                    <Route path="/test-page" render={() => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <TestPage />
                        </Suspense>)
                    } />
                    <Redirect from="/" to="/posts" />
                    {/*<Route path="/" exact component={Posts} />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;