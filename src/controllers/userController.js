/** @format */

import User from '../models/userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import shortid from 'shortid';
// import dotenv from 'dotenv'

// dotenv.config()

const generateJwtToken = (_id, role) => {
  return jwt.sign({_id, role}, 'baomat', {
    expiresIn: '1d',
  });
};
const signup = asyncHandler(async (req, res) => {
    console.log("hello")
  User.findOne({email: req.body.email}).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: 'User already registered',
      });

    const {firstName, lastName, email, password, userAva, role} = req.body;
    console.log(req.body)
    const password_hash = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      userName: shortid.generate(),
      email,
      password_hash,
      userAva: '',
      role: 'User',
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: 'Something went wrong',
        });
      }

      if (user) {
        const token = generateJwtToken(user._id, user.role);
        const {_id, firstName, lastName, email, role, fullName, userAva} = user;
        return res.status(201).json({
          token,
          user: {_id, firstName, lastName, email, role, fullName, userAva},
        });
      }
    });
  });
});

const signin = asyncHandler(async (req, res) => {
  User.findOne({email: req.body.email}).exec(async (error, user) => {
    if (error) return res.status(400).json({error});
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === 'User') {
        const token = generateJwtToken(user._id, user.role);
        const {_id, firstName, lastName, email, role, fullName} = user;
        res.status(200).json({
          token,
          user: {_id, firstName, lastName, email, role, fullName},
        });
      } else {
        return res.status(400).json({
          message: 'Something went wrong',
        });
      }
    } else {
      return res.status(400).json({message: 'Something went wrong'});
    }
  });
});
const signOut = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successfully...!',
  });
});

// UPDATE USER

export {signup, signin, signOut};
