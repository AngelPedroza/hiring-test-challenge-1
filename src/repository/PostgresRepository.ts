import {createQueryBuilder, EntityTarget, getRepository} from "typeorm";

export class PgRepository {

    async save(data: object, entity: EntityTarget<any>): Promise<object> {
        const obj = getRepository(entity).create(data);
        return await getRepository(entity).save(obj)
    }

    async findOne(filter: object, entity: EntityTarget<any>): Promise<object> {
        return await getRepository(entity).findOne(filter);
    }

    async find(filter: object, entity: EntityTarget<any>): Promise<object> {
        const data = await getRepository(entity).find(filter)
        console.log(data);
        return data;
    }

    async findJoin(leftColumn: string, leftAlias: string, rightColumn: string, condition: object, entity: string) {
        const query = await createQueryBuilder(entity)
            .innerJoinAndSelect(`${entity}.${leftColumn}`, leftAlias) // Message.alien_id as Alien
            .where(`${leftAlias}.${rightColumn} = :${rightColumn}`, condition)// 'w.userId = u.id' may be omitted
        return await query.getMany();

    }
}