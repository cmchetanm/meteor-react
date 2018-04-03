import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    comment: String,
    userId: {
        type: String,
        optional: true
    },
    postId: {
        type: String,
        optional: true
    },
    // force value to be current date (on server) upon insert and prevent updates thereafter
    createdAt:{
      type: Date,
      defaultValue: new Date
    }
});
