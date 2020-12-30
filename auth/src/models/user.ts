import mongoose from "mongoose";

import { Password } from "../helpers/password";

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
},
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    }
);

userSchema.pre('save', async function (done) {
    if(this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'));
        this.set('password', hashedPassword);
    }
    done();
});

userSchema.statics.build = (attrs: IUserDocument) => {
    return new User(attrs);
}

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export { User };
