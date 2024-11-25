import passport from "passport";
import FacebookStrategy from "passport-facebook";
import facebookMember from "../../database/facebookMember";

passport.use(
  new FacebookStrategy(
    {
      clientId: process.env.AppId,
      clientSecret: process.env.Appsecret,
      callbackUrl: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await facebookMember.findOne({ facebookId: profile.id });
        if (!user) {
          // If the user does not exist, create a new one
          user = new facebookMember({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : "",
            avatar: profile.photos ? profile.photos[0].value : "",
          });

          // Save the user to the database
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
