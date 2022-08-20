import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Link from 'App/Models/Link'
import Template from './Template'

export default class Result extends BaseModel {

  public static table = 'results'

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column()
  public user_id: number

  @column()
  public link_id: number

  @column()
  public longtitude: string

  @column()
  public latitude: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Link, {
    foreignKey: 'link_id',
  })
  public link: BelongsTo<typeof Link>

  @belongsTo(() => Template, {
    foreignKey: 'template_id',
  })
  public template: BelongsTo<typeof Template>
}
