import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidUpdate() {
        if (!this.props.id) return;
        if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then(respose => {
                    this.setState({ loadedPost: respose.data });
                });
        }
    }
    render () {
        let post = <p style={{ textAlign: 'center' }}>
        {this.props.id ? 'Loading...' : 'Please select a Post!'}
            </p>;
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;