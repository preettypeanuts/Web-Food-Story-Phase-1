const { User, Profile, Post, Category, PostHasCategories } = require("../models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

class AdminController {

    static async adminDashboard(req, res) {
        try {
            const { deleted } = req.query
            const { search } = req.query
            // console.log(search, 'searchnya');
            let data
            if (search) {
                data = await User.findAll({
                    where: {
                        email: {
                            [Op.iLike]: '%' + search + '%'
                        }
                    }
                });
            } else {
                data = await User.findAll()
            }
            res.render('admin-pages/admin-dashboard', {data, deleted, search})
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
            res.redirect('/user')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async editUser(req, res) {
        try {
            const { id } = req.params
            const data = await User.findByPk(id)
            res.render('admin-pages/editForm', {
                data
            })
        } catch (error) {

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
            // console.log('masuk update');
            res.redirect('/user')
        } catch (error) {

        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params
            let data = await User.findByPk(id)

            await User.destroy({
                where: {
                    id: {
                        [Op.or]: [id]
                    }
                }
            })
            res.redirect(`/admin/?deleted=${data.email} has been removed`)
        } catch (error) {

        }
    }
}

module.exports = AdminController;