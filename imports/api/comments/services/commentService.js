import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import {Comments} from '/db';
import {Users} from '/db';
import Security from '/imports/api/security';

export const list =(_id,callback)=>{
  Meteor.call('comment.list',_id, (err, comments) => {
    if(err){
      console.log(err.reason);
      var obj = {error:err.reason,statusCode:500};
      callback(obj);
    }else{
      console.log(comments);
      var obj = {comments:comments,statusCode:200};
       callback(obj);
    }

  })
};

export const create =(comment,callback)=>{
  Meteor.call('comment.create',comment, (err, comment) => {
    if(err){
      console.log(err.reason);
      var obj = {error:err.reason,statusCode:500};
      callback(obj);
    }else{
      console.log(comment);
      var obj = {comment:comment,statusCode:200};
       callback(obj);
    }

  })
};

export const remove =(_id,userId,callback)=>{
  if(userId != Meteor.userId()){
    var obj = {error:'You are not authorized',statusCode:401};
    callback(obj);
    return;
  }else{
    Meteor.call('comment.remove',_id, (err, res) => {
      if(err){
        console.log(err.reason);
        var obj = {error:err.reason,statusCode:500};
        callback(obj);
      }else{
        console.log(res);
        var obj = {result:res,statusCode:200};
         callback(obj);
      }

    })
  }
};
