import mongoose from 'mongoose';
import User from './user';

const {
    Schema
} = mongoose;

const phraseSchema = new Schema({
  content: String,
  _creator: {type: Schema.ObjectId, ref: User}
});

const Phrase = mongoose.model("Phrase", phraseSchema);

export default Phrase;
