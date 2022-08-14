import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'results'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_delete').defaultTo(false).after('latitude')
    })
  }

  public async down () {
    //
  }
}
