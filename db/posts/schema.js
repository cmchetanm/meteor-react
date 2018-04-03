import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    views: {
      type:Number,
      defaultValue:0,
      optional:true
    },
    // force value to be current date (on server) upon insert and prevent updates thereafter
    createdAt:{
      type: Date,
      defaultValue: new Date
    },
    type:{
      type: String,
      optional: true
    }
});
