import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
  public async handle({session, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (session.get('user').data.is_admin === 0) {
      return response.send('Come back idiot.')
    }
    await next()
  }
}
