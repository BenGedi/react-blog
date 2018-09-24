import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from 'axios';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostID: null,
        error: false
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => ({...post, author: 'Ben'}));
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostID: id});
    }

    render() {

        return (
            <div>
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
                <section>
                    <FullPost id={this.state.selectedPostID} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;