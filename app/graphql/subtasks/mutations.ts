import { gql } from "@apollo/client";

/**
 * @function CREATE_SUBTASK_MUTATION
 * @description Define la mutación GraphQL para crear una nueva subtarea.
 *              Recibe un objeto 'data' de tipo CreateSubtaskInput (obligatorio) con los campos:
 *              - title: String!
 *              - description: String (opcional)
 *              - completed: Boolean!
 *              - taskId: ID!
 *              Retorna un objeto Subtask con los campos id, title, description, completed, y taskId.
 */
export const CREATE_SUBTASK_MUTATION = gql`
  mutation CreateSubtask($data: CreateSubtaskInput!) {
    createSubtask(data: $data) {
      id
      title
      description
      completed
      taskId
    }
  }
`;

/**
 * @function UPDATE_SUBTASK_MUTATION
 * @description Define la mutación GraphQL para actualizar una subtarea existente.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio) y un objeto 'data' de tipo UpdateSubtaskInput (obligatorio).
 *              Los campos en 'data' (title, description, completed, taskId) son opcionales para la actualización.
 *              Retorna un objeto Subtask con los campos id, title, description, completed, y taskId.
 */
export const UPDATE_SUBTASK_MUTATION = gql`
  mutation UpdateSubtask($id: ID!, $data: UpdateSubtaskInput!) {
    updateSubtask(id: $id, data: $data) {
      id
      title
      description
      completed
      taskId
    }
  }
`;

/**
 * @function DELETE_SUBTASK_MUTATION
 * @description Define la mutación GraphQL para eliminar una subtarea por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un valor booleano (Boolean!) indicando si la eliminación fue exitosa.
 */
export const DELETE_SUBTASK_MUTATION = gql`
  mutation DeleteSubtask($id: ID!) {
    deleteSubtask(id: $id)
  }
`;
