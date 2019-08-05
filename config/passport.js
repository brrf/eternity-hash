const User = require('../schemas/users');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');;

module.exports = function(passport) {

	passport.use(new LocalStrategy(
	  function(username, password, done) {

	    User.findOne({ username: username }, async function (err, user) {
	      if (err) { return done(err); }
	      if (!user) { return done(null, false); }
	      const match = await bcrypt.compare(password, user.password);
	      if (!match) { return done(null, false); }
	      return done(null, user);
	    });
	  }
	));

	passport.serializeUser(function(user, done) {
  		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
  		User.findById(id, function(err, user) {
    	done(err, user);
  		});
	});
};