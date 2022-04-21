import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"

export default class UsersController {
    public async index() {
        const users = await User.all()

        return users
    }

    public async store({ request }: HttpContextContract) {
        const data = request.only(["username", "email", "password"])
        const users = await User.create(data)

        return users
    }

    public async show({ params }: HttpContextContract) {
        const users = await User.find({ id: params.id })

        return users
    }

    public async update({ request, params }: HttpContextContract) {
        const data = request.only(["username", "email", "password"])
        const users = await User.findOrFail(params.id)

        return users.merge(data).save()
    }

    public async destroy({ params }: HttpContextContract) {
        const users = await User.findOrFail(params.id)

        return users.delete()
    }
}
