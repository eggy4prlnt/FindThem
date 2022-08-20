import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Template from 'App/Models/Template'

export default class extends BaseSeeder {
  public async run () {
    await Template.createMany([
      {
        name: 'Daget',
        title: 'DANA Kaget buatmu',
        image: 'https://a.m.dana.id/resource/imgs/skywalker/deeplinkpreview/dana_kaget.png',
        description: 'DANA Kaget cuma buat kamu yang paling gesit! Sikat sekarang!',
      }
    ]);
  }
}
