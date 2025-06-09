import { gql } from "@apollo/client";

/**
 * @function ALL_SUBTASKS_QUERY
 * @description Define la consulta GraphQL para obtener todas las subtareas.
 *              Esta consulta no requiere parámetros de entrada y retorna
 *              una lista de objetos Subtask con sus campos básicos y la relación anidada (task).
 */
export const ALL_SUBTASKS_QUERY = gql`
  query AllSubtasks {
    allSubtasks {
      id
      title
      description
      completed
      createdAt
      updatedAt
      task {
        id
        title
      }
    }
  }
`;

/**
 * @function SUBTASK_BY_ID_QUERY
 * @description Define la consulta GraphQL para obtener una subtarea específica por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un objeto Subtask con sus campos básicos y la relación anidada (task).
 */
export const SUBTASK_BY_ID_QUERY = gql`
  query SubtasksById($id: ID!) {
    subtasksById(id: $id) {
      id
      title
      description
      completed
      createdAt
      updatedAt
      task {
        id
        title
      }
    }
  }
`;
