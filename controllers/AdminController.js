const { User, Profile, Post, Category, PostHasCategories } = require("../models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const nFormatter = require("../helper/formatter")

class AdminController {

    static async adminDashboard(req, res) {
        try {
            const { deleted } = req.query
            const { search } = req.query
            let data
            if (search) {
                data = await User.findAll({
                    include: Post,
                    where: {
                        email: {
                            [Op.iLike]: '%' + search + '%'
                        }
                    }
                })
                
            } else {
                data = await User.findAll({
                    include: Post
                });
            }

            const totalLikes = await Post.findAll({
                attributes: [
                'UserId',
                [sequelize.fn('sum', sequelize.col('likes')), 'total_likes'],
                ],
                group: ['UserId'],
                raw: true
            });

            // console.log(totalLikes.totalLikes)
            // res.send(totalLikes)
            res.render('admin-pages/admin-dashboard', {data, totalLikes, nFormatter, deleted})
        }
        catch(error) {
            console.log(error)
            res.send(error);
        }
    }
    
    static async addUser(req, res) {
        try {
            const data = await User.findAll()
            res.render('admin-pages/formNewUser', {
                data
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postNewUser(req, res) {
        try {
            const { role, email, password } = req.body
            await User.create({ role: role, email: email, password: password })
            res.redirect('/admin')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async editUser(req, res) {
        try {
            const { id } = req.params
            const data = await User.findByPk(id)
            res.render('admin-pages/editUser', {
                data
            })
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params
            const { role, email, password } = req.body

            await User.update({
                role: role,
                email: email,
                password: password,
            }, {
                where: {
                    id: id
                }
            })
            res.redirect('/admin')
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params
            let userId = await User.findByPk(id)
            let data = await User.destroy({
                where: {
                    id: {
                        [Op.or]: [id]
                    }
                }
            })
            res.redirect(`/admin/?deleted=${userId.email} has been removed`)
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
}

module.exports = AdminController;