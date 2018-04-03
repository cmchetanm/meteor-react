import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import PostService from '/imports/api/posts/services/postService';

export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    submit = (post) => {
      console.log(post);
      PostService.edit(this.props.match.params._id,post,(res)=>{
        if(res.statusCode == 200){
          alert('Post modified!')
        }else{
          alert(res.error);
        }
      })
    };

    render() {
        const {history} = this.props;
        const {post} = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="type" options={[{label: 'Nature', value: 'Nature'},{label: 'Psychology', value: 'Psychology'},{label: 'Music', value: 'Music'},{label: 'Programming', value: 'Programming'},{label: 'Project Management', value: 'Project Management'},{label: 'Other', value: 'Other'}]}></SelectField>
                    <button type='submit'>Edit post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
