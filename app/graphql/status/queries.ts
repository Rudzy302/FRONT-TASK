import { gql } from "@apollo/client";

/**
 * @function ALL_STATUS_QUERY
 * @description Define la consulta GraphQL para obtener todos los estados.
 *              Esta consulta no requiere parámetros de entrada y retorna
 *              una lista de objetos Status con sus campos básicos y la relación anidada (tasks).
 */
export const ALL_STATUS_QUERY = gql`
  query AllStatus {
    allStatus {
      id
      name
      createdAt
      updatedAt
      tasks {
        id
        title
      }
    }
  }
`;

/**
 * @function STATUS_BY_ID_QUERY
 * @description Define la consulta GraphQL para obtener un estado específico por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un objeto Status con sus campos básicos y la relación anidada (tasks).
 */
export const STATUS_BY_ID_QUERY = gql`
  query StatusById($id: ID!) {
    statusById(id: $id) {
      id
      name
      createdAt
      updatedAt
      tasks {
        id
        title
      }
    }
  }
`;
