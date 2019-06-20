import React, { Component } from "react";
import PostData from "../data/posts.json";
import PostDetail from "./PostDetail";

class PostList extends Component {
    constructor(props) {
        super(props)
        this.handleDataCallback = this.handleDataCallback.bind(this)
        this.handlePostRemove = this.handlePostRemove.bind(this)
        this.state = {
            postList: []
        }
    }

    handleDataCallback(postItem) {
        console.log(postItem)
        let currentPostList = this.state.postList
        currentPostList.push(postItem)
        this.setState({
            postList: currentPostList
        })
    }

    handlePostRemove(postItem) {
        const newList = this.state.postList.filter(item => item !== postItem)
        this.setState({
            postList: newList
        })
    }

    componentDidMount() {
        this.setState({
            postList: PostData
        })
    }

    render() {
        const { postList } = this.state
        return (
            <div>
                {postList.map((item) => {
                    return <PostDetail post={item}
                        key={item.id}
                        didHandleRemove={this.handlePostRemove}
                        dataCallback={this.handleDataCallback} />;
                })}
            </div>
        );
    }
}

export default PostList;
