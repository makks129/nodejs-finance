import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import JWT from './JWT';
import { UserModel } from '../db/model/User';
import UserRepo from '../db/repo/UserRepo';

const LocalStrategy = passportLocal.Strategy;
passport.use('local', new LocalStrategy({ usernameField: 'email' }, UserModel.authenticate()));
export const authenticateLocal = passport.authenticate('local', { session: false });

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: async (req, rawJwtToken, done) => {
        const token = await JWT.getPublicKey();
        done(null, token);
      },
    },
    async (payload, done) => {
      UserRepo.findById(payload._id)
        .then((user) => done(null, user))
        .catch((err) => done(err, null));
    },
  ),
);
export const authenticateJwt = passport.authenticate('jwt', { session: false });
