import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostID: null,
        error: false
    };

    postSelectedHandler = (id) => {
        // this.setState({selectedPostID: id});
        // this is mostly used after some operatrtion finished
        // this.props.history.push({ pathname: '/posts/' + id });
        this.props.history.push('/posts/' + id);
    }


    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => ({...post, author: 'Ben'}));
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }

    render() {
        return (
            <div>
                <section className="Posts">
                    {
                        !this.state.error
                            ? this.state.posts
                                .map(post => (
                                    // <Link to={'/posts' + post.id} key={post.id}>
                                    <Post
                                        key={post.id}
                                        clicked={() => { this.postSelectedHandler(post.id) }}
                                        author={post.author}
                                        title={post.title} />
                                    // </Link>
                                    )
                                )
                            : <p style={{ textAlign: 'center' }}>Somthing went worng!</p>
                    }
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;