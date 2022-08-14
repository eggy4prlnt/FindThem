import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Result from 'App/Models/Result';

export default class PenggunasController {

    public async index({ view }: HttpContextContract) {
        const users = await User.query().orderBy('is_admin', 'desc')
        return view.render('pengguna.index', { users: users });
    }

    public async create({ view }: HttpContextContract) {
        return view.render('pengguna.create');
    }

    public async createUser({ request, response }: HttpContextContract) {
        await User.create({
            kode: request.input('kode'),
            nama: request.input('nama'),
            is_admin: false,
            is_vip: request.input('is_vip') == 'on' ? true : false,
            expired: request.input('expired')
        });
        return response.redirect().toPath('/pengguna')
    }

    public async edit({ params, view }: HttpContextContract) {
        const user = await User.find(params.id)
        return view.render('pengguna.edit', { user: user });
    }

    public async editUser({ params, request, response }: HttpContextContract) {
        await User.query().where('id', params.id).update({
            kode: request.input('kode'),
            nama: request.input('nama'),
            is_vip: request.input('is_vip') == 'on' ? true : false,
            expired: request.input('expired')
        });
        return response.redirect().toPath('/pengguna')
    }

    public async delete({ params, response }: HttpContextContract) {
        await User.query().where('id', params.id).delete()
        return response.redirect().toPath('/pengguna')
    }

    public async deleteResult({ params, session, response }: HttpContextContract) {
        const result = await Result.query().where('user_id', params.id).update({
            is_delete: true
        });
        
        return response.redirect('/')
    }

}
