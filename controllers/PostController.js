const { User, Profile, Post, Category, PostHasCategories } = require("../models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

class PostController {

    static async postDashboard(req, res){
        try {
            // let profileValue = await Profile.findAll()
            let postValue = await Post.findAll({})
            // res.send(profileValue)
            res.render('post-pages/post-dashboard', {postValue})
        } catch (error) {
            res.send(error)
        }
    }

    static async likesPost(req, res) {
        try {
            const { id } = req.params

            await Post.update()

            res.redirect('post-pages/post-dashboard')
        } catch (error) {
            
        }
    }

}

module.exports = PostController