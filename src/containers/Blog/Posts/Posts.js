import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';

import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostID: null,
        error: false
    };

    postSelectedHandler = (id) => {
        this.setState({selectedPostID: id});
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
            <section className="Posts">
                {
                    !this.state.error
                        ? this.state.posts
                            .map(post => <Post
                                key={post.id}
                                clicked={() => { this.postSelectedHandler(post.id) }}
                                author={post.author}
                                title={post.title} />)
                        : <p style={{textAlign: 'center'}}>Somthing went worng!</p>
                }
            </section>
        )
    }
}

export default Posts;