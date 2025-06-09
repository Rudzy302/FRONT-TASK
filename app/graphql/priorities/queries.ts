import { gql } from "@apollo/client";

/**
 * @function ALL_PRIORITIES_QUERY
 * @description Define la consulta GraphQL para obtener todas las prioridades.
 *              Esta consulta no requiere parámetros de entrada y retorna
 *              una lista de objetos Priorities con sus campos básicos y la relación anidada (tasks).
 */
export const ALL_PRIORITIES_QUERY = gql`
  query AllPriorities {
    allPriorities {
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
 * @function PRIORITIES_BY_ID_QUERY
 * @description Define la consulta GraphQL para obtener una prioridad específica por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un objeto Priorities con sus campos básicos y la relación anidada (tasks).
 */
export const PRIORITIES_BY_ID_QUERY = gql`
  query PrioritiesById($id: ID!) {
    prioritiesById(id: $id) {
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
