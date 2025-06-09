import { gql } from "@apollo/client";

/**
 * @function ALL_TASKS_QUERY
 * @description Define la consulta GraphQL para obtener todas las tareas.
 *              Esta consulta no requiere parámetros de entrada y retorna
 *              una lista de objetos Task con sus campos básicos y relaciones anidadas (user, project, status, priority, tags).
 */
export const ALL_TASKS_QUERY = gql`
  query AllTasks {
    allTasks {
      id
      projectId
      title
      description
      dueDate
      priorityId
      statusId
      createdAt
      updatedAt
      user {
        id
        name
        lastname
      }
      project {
        id
        title
      }
      status {
        id
        name
      }
      priority {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

/**
 * @function TASK_BY_ID_QUERY
 * @description Define la consulta GraphQL para obtener una tarea específica por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un objeto Task con sus campos básicos y relaciones anidadas (user, project, status, priority, tags).
 */
export const TASK_BY_ID_QUERY = gql`
  query TaskById($id: ID!) {
    taskById(id: $id) {
      id
      projectId
      title
      description
      dueDate
      priorityId
      statusId
      createdAt
      updatedAt
      user {
        id
        name
        lastname
      }
      project {
        id
        title
      }
      status {
        id
        name
      }
      priority {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;
