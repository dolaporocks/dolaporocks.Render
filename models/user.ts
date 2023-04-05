import mongoose, {Schema} from "mongoose";

const ContactSchema = new Schema(
    {
        FullName: String,
        ContactNumber: String,
        EmailAddress: String
    },
    {
        collection: "contacts"
    }
);

const Model = mongoose.model("Contact", ContactSchema);
export default Model;