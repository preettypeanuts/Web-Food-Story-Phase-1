const { User, Profile, Post, Category, PostHasCategories } = require("../models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const bcrypt = require('bcryptjs');

class ProfileController {

    static async profileDashboard(req, res) {
        try {
            let profileValue = await Profile.findAll()
            res.render('profile-pages/profile-dashboard',{profileValue})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async addProfile(req, res) {
        try {
            res.render('profile-pages/formNewProfile')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postNewProfile(req, res) {
        try {
            const {name, bio, gender} = req.body
            await Profile.create({name, bio, gender, UserId: req.session.userId})
            res.redirect('/')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async editProfile(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async updateProfile(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async deleteProfile(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

}

module.exports = ProfileController