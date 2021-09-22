// Instance and return the repositories

import {PgRepository} from "./PostgresRepository";

const pg_repository = new PgRepository()

export {pg_repository as pgRepository};