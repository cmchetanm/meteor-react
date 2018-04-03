import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import {Comments} from '/db';
import {Users} from '/db';
import Security from '/imports/api/security';

Meteor.methods({
    'comment.create'(comment) {
      console.log('---comment---');
      console.log(comment);
        Security.checkLoggedIn(this.userId);
        comment.userId = this.userId;
        Comments.insert(comment);
    },

    'comment.list' (_id) {
        var result = Comments.find({postId:_id}).fetch();
        console.log('--user--');
        result.forEach(item=>{
          var user = Users.findOne(item.userId);
          //console.log(this.userId);
          //console.log(user.emails[0].address);
          item.email = user.emails[0].address;
        })
        return result;
    },

    'comment.edit' (_id, postData) {
      console.log('---postdata---');
      console.log(postData);
        Comments.update({_id: _id, userId: this.userId}, {
            $set: {
                title: postData.title,
                description: postData.description,
                type:postData.type
            }
        });
    },

    'comment.remove' (_id){
         var result = Comments.remove({_id: _id, userId: this.userId});
         console.log(result);
         return result;
    },

    'comment.get' (_id) {
        return Comments.findOne(_id);
    }
});
