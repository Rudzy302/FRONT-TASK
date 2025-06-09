import { gql } from "@apollo/client";

/**
 * @function CREATE_TASK_MUTATION
 * @description Define la mutación GraphQL para crear una nueva tarea.
 *              Recibe un objeto 'data' de tipo CreateTaskInput (obligatorio) con los campos:
 *              - projectId: ID!
 *              - title: String!
 *              - description: String!
 *              - dueDate: String!
 *              - priorityId: ID!
 *              - statusId: ID!
 *              - userId: ID!
 *              - tags: [ID] (opcional)
 *              Retorna un objeto Task con los campos id, projectId, title, description, dueDate, priorityId, statusId, y userId.
 */
export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($data: CreateTaskInput!) {
    createTask(data: $data) {
      id
      projectId
      title
      description
      dueDate
      priorityId
      statusId
      userId
    }
  }
`;

/**
 * @function UPDATE_TASK_MUTATION
 * @description Define la mutación GraphQL para actualizar una tarea existente.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio) y un objeto 'data' de tipo UpdateTaskInput (obligatorio).
 *              Los campos en 'data' (projectId, title, description, dueDate, priorityId, statusId, userId, tags) son opcionales para la actualización.
 *              Retorna un objeto Task con los campos id, projectId, title, description, dueDate, priorityId, statusId, y userId.
 */
export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!, $data: UpdateTaskInput!) {
    updateTask(id: $id, data: $data) {
      id
      projectId
      title
      description
      dueDate
      priorityId
      statusId
      userId
    }
  }
`;

/**
 * @function DELETE_TASK_MUTATION
 * @description Define la mutación GraphQL para eliminar una tarea por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un valor booleano (Boolean!) indicando si la eliminación fue exitosa.
 */
export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
