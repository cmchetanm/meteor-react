import React from 'react';
import {AutoForm, AutoField, LongTextField,SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import PostService from '/imports/api/posts/services/postService';

export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    submit = (post)=>{
      console.log('----xxxx----');
      console.log(post);
      PostService.create(post,(res)=>{
        if(res.statusCode == 200){
          alert('Post added!')
        }else{
          alert(res.error);
        }
      })
    }

    render() {
        const {history} = this.props;

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="type" options={[{label: 'Nature', value: 'Nature'},{label: 'Psychology', value: 'Psychology'},{label: 'Music', value: 'Music'},{label: 'Programming', value: 'Programming'},{label: 'Project Management', value: 'Project Management'},{label: 'Other', value: 'Other'}]}></SelectField>
                    <button type='submit'>Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
