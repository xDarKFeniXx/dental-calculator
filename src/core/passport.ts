import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JWTstrategy, ExtractJwt} from 'passport-jwt';
import bcrypt from 'bcryptjs'
import {IUser, UserModel} from "../models/user-model";
import {SECRET_KEY} from "../utils/consts";

passport.use(
    new LocalStrategy({
            usernameField: 'email'
        },
        async (username:IUser['email']|IUser['username'], password:IUser['password'], done): Promise<void> => {
            try {
                const user = await UserModel.findOne({ $or: [{ email: username }, { username }] }).exec();

                if (!user) {
                    return done(null, false);
                }

                if (bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            }
        },
    ),
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromHeader('token'),
        },
        async (payload: { data: IUser }, done): Promise<void> => {
            try {
                const user = await UserModel.findById(payload.data._id).exec();

                if (user) {
                    return done(null, user);
                }

                done(null, false);
            } catch (error) {
                done(error, false);
            }
        },
    ),
);

    // @ts-ignore
passport.serializeUser((user:IUser, done) => {
    done(null, user?._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err:any, user:IUser) => {
        done(err, user);
    });
});

export { passport };
