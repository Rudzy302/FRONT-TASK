import { gql } from "@apollo/client";

/**
 * @function ALL_TAGS_QUERY
 * @description Define la consulta GraphQL para obtener todas las etiquetas.
 *              Esta consulta no requiere parámetros de entrada y retorna
 *              una lista de objetos Tag con sus campos básicos y la relación anidada (tasks).
 */
export const ALL_TAGS_QUERY = gql`
  query AllTags {
    allTags {
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
 * @function TAG_BY_ID_QUERY
 * @description Define la consulta GraphQL para obtener una etiqueta específica por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un objeto Tag con sus campos básicos y la relación anidada (tasks).
 */
export const TAG_BY_ID_QUERY = gql`
  query TagById($id: ID!) {
    tagById(id: $id) {
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
