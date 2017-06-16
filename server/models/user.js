import mongoose from 'mongoose';

const {
    Schema
} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

const User = mongoose.model('User', userSchema);

export default User;
