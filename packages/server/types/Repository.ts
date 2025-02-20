import type {
  Attributes,
  WhereAttributeHashValue,
  FindOptions,
  WhereOptions,
  DestroyOptions,
  CountOptions,
} from 'sequelize'
import type { Model, ModelCtor } from 'sequelize-typescript'
import type { MakeNullishOptional } from 'sequelize/types/utils'

export class Repository<T extends Model<T>> {
  model: ModelCtor<T>

  constructor(model: ModelCtor<T>) {
    this.model = model
  }

  public async create(
    value: MakeNullishOptional<T['_creationAttributes']>,
  ): Promise<T> {
    return this.model.create(value)
  }

  public async bulkCreate<M>(
    value: MakeNullishOptional<T['_creationAttributes']>[],
  ): Promise<T[] | M[]> {
    return this.model.bulkCreate(value)
  }

  public async findOrCreate(
    id: WhereAttributeHashValue<Attributes<T>['id']> | undefined,
    values: MakeNullishOptional<T['_creationAttributes']>,
  ) {
    return this.model.findOrCreate({
      where: { id },
      defaults: {
        ...values,
      },
    })
  }

  // public async findByIDContractOrCreate(
  //   id_contract:
  //     | WhereAttributeHashValue<Attributes<T>['id_contract']>
  //     | undefined,
  //   id_sla: WhereAttributeHashValue<Attributes<T>['id_sla']> | undefined,
  //   values: MakeNullishOptional<T['_creationAttributes']>
  // ) {
  //   return this.model.findOrCreate({
  //     where: { id_contract, id_sla },
  //     defaults: {
  //       ...values,
  //     },
  //   })
  // }

  public async update(
    id: WhereAttributeHashValue<Attributes<T>['id']> | undefined,
    values: MakeNullishOptional<T['_creationAttributes']>,
  ): Promise<[affectedCount: number]> {
    return this.model.update(values, { where: { id } })
  }

  public async getAll(
    options?: FindOptions<Attributes<T>> | undefined,
  ): Promise<T[]> {
    if (options) return this.model.findAll(options)
    else return this.model.findAll()
  }

  public async findOne<M>(
    options: FindOptions<Attributes<T>>,
  ): Promise<T | null | M> {
    return this.model.findOne(options)
  }

  public async findAll<M>(
    options: FindOptions<Attributes<T>>,
  ): Promise<T[] | M[]> {
    return this.model.findAll(options)
  }

  public async count(options: CountOptions<Attributes<T>>): Promise<number> {
    return this.model.count(options)
  }

  public async get(
    id: WhereAttributeHashValue<Attributes<T>['id']> | undefined,
  ): Promise<T | null> {
    return this.model.findOne({ where: { id } })
  }

  public async delete(
    id: WhereAttributeHashValue<Attributes<T>['id']> | undefined,
  ): Promise<number> {
    return this.model.destroy({ where: { id } })
  }

  public async deleteByCustomId(
    id: WhereAttributeHashValue<Attributes<T>['id']> | undefined,
  ): Promise<number> {
    return this.model.destroy({ where: id })
  }

  public async destroy(
    options: DestroyOptions<Attributes<T>>,
  ): Promise<number> {
    return this.model.destroy(options)
  }

  public async drop(options: DestroyOptions<Attributes<T>>): Promise<void> {
    return this.model.drop(options)
  }

  public async createOrDestroy(
    searchParameters: WhereOptions<Attributes<T>>,
    body: MakeNullishOptional<T['_creationAttributes']>,
  ): Promise<T | null> {
    const data = await this.model.findOne({ where: searchParameters })

    if (data) {
      await data.destroy()
      return null
    } else {
      const res = await this.create(body)
      return res
    }
  }
}
