// import { getConnection } from 'typeorm';
// import dataSource from '../src/ormconfig';
//
// const connection = {
//   async open() {
//     // await getConnection().close();
//     await dataSource.initialize();
//   },
//
//   async close() {
//     // await getConnection().close();
//     await dataSource.destroy();
//   },
//
//   async clear() {
//     // const connection = getConnection();
//     // const connection = dataSource.entityMetadatas;
//     const entities = dataSource.entityMetadatas;
//
//     await Promise.all(
//       entities.map((entity) => {
//         // const repository = connection.getRepository(entity.name);
//         // const repository = connection.getRepository(entity.name);
//         return dataSource.query(`DELETE FROM ${entity.tableName}`);
//       }),
//     );
//
//     // entities.forEach(async (entity) => {
//     //   const repository = connection.getRepository(entity.name);
//     //   await repository.query(`DELETE FROM ${entity.tableName}`);
//     // });
//   },
//
//   getDataSource() {
//     return dataSource;
//   },
// };
//
// export default connection;
