import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import {Comments} from '/db';
import Security from '/imports/api/security';

Meteor.methods({
    'post.create'(post) {
        Security.checkLoggedIn(this.userId);
        post.userId = this.userId;
        Posts.insert(post);
    },

    'post.list' () {
       var result =  Posts.find().fetch();
        result.forEach(item=>{
          var comm = Comments.find({postId:item._id}).fetch();
          var count = comm.length;
          item.commentCount = count;
        })
        return result;
    },

    'post.edit' (_id, postData) {
      console.log('---postdata---');
      console.log(postData);
        var result = Posts.update({$and:[{_id: _id},{userId: this.userId}]}, {
            $set: {
                title: postData.title,
                description: postData.description,
                type:postData.type
            }
        });
        console.log(result);
        return result;
    },

    'post.remove' (_id){
        var result = Posts.remove({_id:_id, userId:this.userId});
        console.log(result);
          var comObj = Comments.remove({postId:_id,userId:this.userId},{multi:true});
          console.log(comObj);
          return comObj;
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    },

    'post.incrementViewCount' (_id){
      //console.log(_id);
      var result = Posts.findOne(_id);
        //console.log(result);
        var count = result.views;
        count = count+1;
        Posts.update({_id: _id, userId: this.userId}, {
            $set: {
                views: count
            }
        });
        return 'Incremented';
    }
});
