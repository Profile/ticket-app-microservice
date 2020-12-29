import mongoose from "mongoose";

/**
 * User attributes.
 */
interface IUserAttrs {
    email: string;
    password: string;
}

/**
 * User document.
 */
export interface IUserDocument extends IUserAttrs, mongoose.Document {}

/**
 * User model.
 */
interface IUserModel extends mongoose.Model<IUserDocument> {
    build(attrs: IUserAttrs): IUserDocument;
}

const userSchema = new mongoose.Schema({
   email: {
       type: String,
       required: true
   },
    password: {
       type: String,
        required: true,
    }
});

userSchema.statics.build = (attrs: IUserDocument) => {
    return new User(attrs);
}

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export { User };
