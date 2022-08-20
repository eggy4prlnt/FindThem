import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'templates'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('domain').notNullable().after('description')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('domain')
    })
  }
}
