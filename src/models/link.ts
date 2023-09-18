import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  originalURL: { type: String, required: true },
  shortID: { type: String, required: true },
  isEdited: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Link = mongoose.models.Link || mongoose.model('Link', linkSchema);
export default Link;
