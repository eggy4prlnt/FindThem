import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, BelongsTo, belongsTo  } from '@ioc:Adonis/Lucid/Orm'
import Result from 'App/Models/Result'
import User from 'App/Models/User'
import Template from 'App/Models/Template'

export default class Link extends BaseModel {

  public static table = 'links'

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column()
  public judul: string

  @column()
  public url: string

  @column()
  public kode: string

  @column()
  public user_id: number

  @column()
  public is_template: boolean

  @column()
  public template_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Result, {
    foreignKey: 'link_id',
  })
  public results: HasMany<typeof Result>

  @belongsTo(() => Template, {
    foreignKey: 'template_id',
  })
  public template: BelongsTo<typeof Template>
}
