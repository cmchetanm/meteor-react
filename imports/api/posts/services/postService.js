import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import {Comments} from '/db';
import {Users} from '/db';
import Security from '/imports/api/security';

export const get =(_id,callback)=>{
  Meteor.call('post.get',_id, (err, post) => {
    if(err){
    //  console.log(err);
    var obj = {error:err.reason,statusCode:500};
    callback(obj);
    }else{
      //console.log(post);
      var obj = {post:post,statusCode:200};
      callback(obj);
    }

  })
};

export const create =(post,callback)=>{
  Meteor.call('post.create',post, (err, post) => {
    if(err){
      console.log(err.reason);
      var obj = {error:err.reason,statusCode:500};
      callback(obj);
    }else{
      //console.log(post);
      var obj = {post:post,statusCode:200};
       callback(obj);
    }

  })
};

export const edit =(_id,post,callback)=>{
  if(post.userId != Meteor.userId()){
    var obj = {error:'You are not authorized',statusCode:401};
    callback(obj);
    return;
  }else{
    Meteor.call('post.edit',_id,post, (err, post) => {
      if(err){
        console.log(err.reason);
        var obj = {error:err.reason,statusCode:500};
        callback(obj);
      }else{
        //console.log(post);
        var obj = {post:post,statusCode:200};
         callback(obj);
      }

    })
    }
};


export const incrementViewCount =(_id,callback)=>{
  Meteor.call('post.incrementViewCount',_id,(err,count)=>{
    if(err){
      //console.log(err);
      var obj = {error:err.reason,statusCode:500};
      callback(obj);
    }else{
      //console.log(post);
      var obj = {count:count,statusCode:200};
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
    Meteor.call('post.remove',_id, (err, res) => {
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
