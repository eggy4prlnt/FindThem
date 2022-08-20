import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Template from 'App/Models/Template';
import Result from 'App/Models/Result';

export default class TemplatesController {

    public async index({ view }: HttpContextContract) {
        const templates = await Template.all()
        return view.render('templates.index', { templates: templates });
    }

    public async create({ view }: HttpContextContract) {
        return view.render('templates.create');
    }

    public async createTemplate({ request, response }: HttpContextContract) {
        await Template.create({
            name: request.input('name'),
            title: request.input('title'),
            image: request.input('image'),
            description: request.input('description')
        });
        return response.redirect().toPath('/template')
    }

    public async edit({ params, view }: HttpContextContract) {
        const template = await Template.find(params.id)
        return view.render('templates.edit', { template: template });
    }

    public async editTemplate({ params, request, response }: HttpContextContract) {
        await Template.query().where('id', params.id).update({
            name: request.input('name'),
            title: request.input('title'),
            image: request.input('image'),
            description: request.input('description')
        });
        return response.redirect().toPath('/template')
    }

    public async delete({ params, response }: HttpContextContract) {
        await Template.query().where('id', params.id).delete()
        return response.redirect().toPath('/template')
    }

    public async deleteResult({ params, session, response }: HttpContextContract) {
        const result = await Result.query().where('template_id', params.id).update({
            is_delete: true
        });

        return response.redirect('/')
    }

}
