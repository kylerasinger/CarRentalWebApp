const mongoose = require("mongoose");
const { User } = require("../models/user");
const ObjectId = mongoose.Types.ObjectId;

//nextauth users
const carRentalUsersDbUri = "mongodb+srv://admin:LlHJIFEgQj9G8iAF@soen341-v1.nzk1doo.mongodb.net/car_rental_users?retryWrites=true&w=majority";

const carRentalUsersDb = mongoose.createConnection(carRentalUsersDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userNextAuthSchema = new mongoose.Schema({}, { strict: false});
const NextAuthUser = carRentalUsersDb.model('userNextAuth', userNextAuthSchema, 'users');

async function syncUsersFunction() {
    try {
        const nextAuthUsers = await NextAuthUser.find({});

        for (const userNextAuth of nextAuthUsers) {            
            const plainUserObject = userNextAuth.toObject();
            const userId = userNextAuth._id.toString();
            
            // Check if user already exists in API users collection
            const existingUser = await User.findOne({ _id: new ObjectId(userId) });
            
            if (!existingUser) {
                const newUser = new User({
                    _id: new ObjectId(userId), // Keep the same ID
                    name: plainUserObject.name, 
                    role: plainUserObject.role || "customer",
                    email: plainUserObject.email
                });

                await newUser.save();
            } else {
                //skip
            }
        }
    } catch (error) {
        console.error("Error in syncUserFunction()", error);
    }
}

module.exports = syncUsersFunction;
