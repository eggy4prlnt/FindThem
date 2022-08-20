import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'links'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_template').defaultTo(false).after('kode')
      table.integer('template_id').unsigned().nullable().after('is_template')
    })
  }

  public async down () {
    //
  }
}
