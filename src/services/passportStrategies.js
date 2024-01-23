import passport from "passport";
import config from "../config/config.js";
import { userModel } from "../DAL/mongoDB/models/users.model.js";
import { cartModel } from "../DAL/mongoDB/models/carts.model.js";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use("github", new GitHubStrategy({
    clientID: config.github_client_id,
    clientSecret: config.github_client_secret,
    callbackURL: config.github_callback_url
}, async function (accessToken, refreshToken, profile, done) {
    console.log("priofileee", profile)
    try {
        const userDB = await userModel.findOne({ email: profile._json.email });
        if (!userDB) {
            const newUser = {
                first_name: profile.displayName.split(" ")[0],
                last_name: profile.displayName.split(" ")[1],
                email: profile._json.email,
                password: "",
            }
            const result = await userModel.create(newUser);
            const newCart = new cartModel({
                user: result._id,
                products: [],
            })
            await newCart.save();
            const newUserData = {
                _id: result._id,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
                password: "",
                cart: newCart,
            }
            done(null, newUserData)
        } else {
            done(null, userDB)
        }
    } catch (error) {
        return done(error);
    }
}
));


passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id)
        done(null, user);
    } catch (error) {
        done(error)
    }
})
