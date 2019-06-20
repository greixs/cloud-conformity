import React, { Component } from "react";
import { tsImportEqualsDeclaration } from "@babel/types";

class postDetail extends Component {
    constructor(props) {
        super(props)
        this.titleWasClicked = this.titleWasClicked.bind(this)
        this.toggleContent = this.toggleContent.bind(this)
        this.handleRemoveContent = this.handleRemoveContent.bind(this)
        this.state = {
            showContent: true,
            postItem: null
        }
    }

    titleWasClicked(event) {
        event.preventDefault()
        const { dataCallback } = this.props
        let newPostItem = this.props.post
        newPostItem['title'] = "test change"

        this.setState({
            postItem: newPostItem
        })

        if (dataCallback !== undefined) {
            dataCallback(newPostItem)
        }
    }

    toggleContent(event) {
        event.preventDefault()
        this.setState({
            showContent: !this.state.showContent
        })
    }

    handleRemoveContent(event) {
        event.preventDefault()
        this.props.didHandleRemove(this.props.post)
    }

    componentDidMount() {
        const { post } = this.props
        this.setState({
            postItem: post
        })
    }

    render() {
        const { showContent, postItem } = this.state;
        return (
            <div>
                {postItem !== null ?
                    <div>
                        <h1 onClick={this.titleWasClicked}>{postItem.title}</h1>
                        {showContent === true ? <p>{postItem.content}</p> : ""}
                        <button onClick={this.toggleContent}>Toggle Content Display</button>
                        <button onClick={this.handleRemoveContent}>Remove Content</button>
                    </div>
                    : ""}
            </div>
        );
    }
}

export default postDetail;
