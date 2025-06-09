import { gql } from "@apollo/client";

/**
 * @function ALL_USERS_QUERY
 * @description Define la consulta GraphQL para obtener todos los usuarios.
 *              Esta consulta no requiere parámetros de entrada y retorna
 *              una lista de objetos User con los campos id, name, lastname, email, createdAt, y updatedAt.
 */
export const ALL_USERS_QUERY = gql`
  query AllUsers {
    allUsers {
      id
      name
      lastname
      email
      createdAt
      updatedAt
    }
  }
`;

/**
 * @function USER_BY_ID_QUERY
 * @description Define la consulta GraphQL para obtener un usuario específico por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un objeto User con los campos id, name, lastname, email, createdAt, y updatedAt.
 */
export const USER_BY_ID_QUERY = gql`
  query UserById($id: ID!) {
    userById(id: $id) {
      id
      name
      lastname
      email
      createdAt
      updatedAt
    }
  }
`;
