import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidMount() {
        console.log(this.props)
        if (!this.props.match.params.id) return;
        if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {
            axios.get('/posts/' + this.props.match.params.id)
                .then(respose => {
                    this.setState({ loadedPost: respose.data });
                });
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({loadedPost: null});
            });
    }
    render () {
        let post = <p style={{ textAlign: 'center' }}>
        {this.props.match.params.id ? 'Loading...' : 'Please select a Post!'}
            </p>;
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;