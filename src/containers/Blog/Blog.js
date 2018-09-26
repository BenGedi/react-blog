import React, { Component } from 'react';
import Posts from '../../containers/Blog/Posts/Posts';
import { Route } from 'react-router-dom';
import './Blog.css';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>

                <Route path="/" exact render={() => <Posts />} />
                <Route path="/new-post" exact render={() => <NewPost />} />
            </div>
        );
    }
}

export default Blog;