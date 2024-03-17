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
        console.log("Starting to sync users...")

        const nextAuthUsers = await NextAuthUser.find({});
        console.log("Found "+ nextAuthUsers.length + " users in car_rental_users");

        for (const userNextAuth of nextAuthUsers) {
            console.log("Processing user: " + userNextAuth._id);
            
            
            const plainUserObject = userNextAuth.toObject();
            const userId = userNextAuth._id.toString();
            
            console.log(plainUserObject.role);

            // Check if user already exists in API users collection
            const existingUser = await User.findOne({ _id: new ObjectId(userId) });
            
            if (!existingUser) {
                console.log("Syncing a new user");

                const newUser = new User({
                    _id: new ObjectId(userId), // Keep the same ID
                    name: plainUserObject.name, 
                    role: plainUserObject.role || "customer",
                    email: plainUserObject.email
                });

                await newUser.save();
            } else {
                console.log("User already exists, skipping");
            }
        }
    } catch (error) {
        console.error("Error in syncUserFunction()", error);
    }
}

module.exports = syncUsersFunction;
