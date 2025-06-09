import { gql } from "@apollo/client";

/**
 * @function CREATE_COMMENT_MUTATION
 * @description Define la mutación GraphQL para crear un nuevo comentario.
 *              Recibe un objeto 'data' de tipo CreateCommentInput (obligatorio) con los campos:
 *              - taskId: ID!
 *              - userId: ID!
 *              - description: String!
 *              Retorna un objeto Comment con los campos id, taskId, userId, y description.
 */
export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComments($data: CreateCommentInput!) {
    createComments(data: $data) {
      id
      taskId
      userId
      description
    }
  }
`;

/**
 * @function UPDATE_COMMENT_MUTATION
 * @description Define la mutación GraphQL para actualizar un comentario existente.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio) y un objeto 'data' de tipo UpdateCommentInput (obligatorio).
 *              Los campos en 'data' (taskId, userId, description) son opcionales para la actualización.
 *              Retorna un objeto Comment con los campos id, taskId, userId, y description.
 */
export const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateComments($id: ID!, $data: UpdateCommentInput!) {
    updateComments(id: $id, data: $data) {
      id
      taskId
      userId
      description
    }
  }
`;

/**
 * @function DELETE_COMMENT_MUTATION
 * @description Define la mutación GraphQL para eliminar un comentario por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un valor booleano (Boolean!) indicando si la eliminación fue exitosa.
 */
export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComments($id: ID!) {
    deleteComments(id: $id)
  }
`;
