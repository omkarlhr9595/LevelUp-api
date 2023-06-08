import mongoose from "mongoose";


const CLientJobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    start_date: {
        type: Date,
    },

    skills: {
        type: String,
        required: true,
    }

})

const Job = mongoose.model("job", CLientJobSchema);
export default Job;
