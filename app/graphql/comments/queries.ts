import { gql } from "@apollo/client";

/**
 * @function ALL_COMMENTS_QUERY
 * @description Define la consulta GraphQL para obtener todos los comentarios.
 *              Esta consulta no requiere parámetros de entrada y retorna
 *              una lista de objetos Comment con sus campos básicos y relaciones anidadas (user, task).
 */
export const ALL_COMMENTS_QUERY = gql`
  query AllComments {
    allComments {
      id
      taskId
      userId
      description
      createdAt
      updatedAt
      user {
        id
        name
        lastname
      }
      task {
        id
        title
      }
    }
  }
`;

/**
 * @function COMMENTS_BY_ID_QUERY
 * @description Define la consulta GraphQL para obtener un comentario específico por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un objeto Comment con sus campos básicos y relaciones anidadas (user, task).
 */
export const COMMENTS_BY_ID_QUERY = gql`
  query CommentsById($id: ID!) {
    commentsById(id: $id) {
      id
      taskId
      userId
      description
      createdAt
      updatedAt
      user {
        id
        name
        lastname
      }
      task {
        id
        title
      }
    }
  }
`;
