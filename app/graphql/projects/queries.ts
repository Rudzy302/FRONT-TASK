import { gql } from "@apollo/client";

/**
 * @function ALL_PROJECTS_QUERY
 * @description Define la consulta GraphQL para obtener todos los proyectos.
 *              Esta consulta no requiere parámetros de entrada y retorna
 *              una lista de objetos Project con sus campos básicos y relaciones anidadas (user, Tasks).
 */
export const ALL_PROJECTS_QUERY = gql`
  query AllProjects {
    allProjects {
      id
      title
      description
      createdAt
      updatedAt
      user {
        id
        name
        lastname
      }
      Tasks {
        id
        title
      }
    }
  }
`;

/**
 * @function PROJECTS_BY_ID_QUERY
 * @description Define la consulta GraphQL para obtener un proyecto específico por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un objeto Project con sus campos básicos y relaciones anidadas (user, Tasks).
 */
export const PROJECTS_BY_ID_QUERY = gql`
  query ProjectsById($id: ID!) {
    projectsById(id: $id) {
      id
      title
      description
      createdAt
      updatedAt
      user {
        id
        name
        lastname
      }
      Tasks {
        id
        title
      }
    }
  }
`;
