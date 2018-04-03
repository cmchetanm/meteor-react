import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import CommentSchema from '/db/comments/schema';
import CommentService from '/imports/api/comments/services/commentService';
import PostService from '/imports/api/posts/services/postService';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null,comments:[]};
    }

    componentDidMount() {
       this.listComments();
       this.getPosts();
       PostService.incrementViewCount(this.props.match.params._id,(res)=>{
           if(res.statusCode == 200){
             console.log('---view count incremented');
           }else{
              console.log('error in incrementViewCount-----');
           }
       })

    }

    getPosts(){
      PostService.get(this.props.match.params._id,(res)=>{
      if(res.statusCode == 200){
        this.setState({ post:res.post });
      }else{
        alert(res.error);
      }
    })
  }

    listComments(){
      CommentService.list(this.props.match.params._id,(res)=>{
        if(res.statusCode == 200){
          this.setState({ comments:res.comments });
        }else{
          alert(res.error);
        }
      })

  }

    createComment = (comment)=>{
      console.log('----xxxx----');
      comment.postId = this.props.match.params._id;
      console.log(comment);
      CommentService.create(comment,(res)=>{
        if(res.statusCode == 200){
          this.listComments();
        }else{
          alert(res.error);
        }
      })
    }

    removeComment = (e,_id,userId)=>{
      console.log(_id);
      CommentService.remove(_id,userId,(res)=>{
        if(res.statusCode == 200){
         if(res.result == 1){
            this.listComments();
            alert('Comments deleted successfully!');
         }else{
            alert('You are not authorized user');
          }
        }else{
          alert(res.error);
        }
      })

    }

  removePost = (e,_id,userId)=>{
    console.log(_id);
    PostService.remove(_id,userId,(res)=>{
      if(res.statusCode == 200){
          alert('Post deleted successfully!');
          return this.props.history.push('/posts');
      }else{
        alert(res.error);
      }
    })
  }

    render() {
        const {comments,post} = this.state;
        const {history} = this.props;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                            <div key={post._id}>
                                <p>Post id: {post._id} </p>
                                <p>Post title: {post.title}, Post Description: {post.description} </p>
                                <button onClick={(e) => {
                                    this.removePost(e,post._id,post.userId)
                                }}> Remove post
                                </button>
                                <button onClick={() => history.push('/posts')}>Back</button>
                                <br/><br/>
                                <p>Comments: </p>
                                {
                                    comments.map((com) => {
                                        return (
                                            <div key={com._id}>
                                                <p>Comment: {com.comment} , Author: {com.email} <button onClick={(e)=>this.removeComment(e,com._id,com.userId)}>Remove</button></p>
                                            </div>
                                        )
                                    })}
                                    <br/><br/>
                            </div>
                            <div><p>Type your comments below: </p></div>
                            <AutoForm onSubmit={this.createComment} schema={CommentSchema}>
                               <LongTextField name="comment"/>
                               <button type='submit'>Post comment</button>
                            </AutoForm>

            </div>
        )
    }
}
