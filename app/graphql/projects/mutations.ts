import { gql } from "@apollo/client";

/**
 * @function CREATE_PROJECT_MUTATION
 * @description Define la mutación GraphQL para crear un nuevo proyecto.
 *              Recibe un objeto 'data' de tipo CreateProjectInput (obligatorio) con los campos:
 *              - title: String!
 *              - description: String (opcional)
 *              - createdBy: ID!
 *              Retorna un objeto Project con los campos id, title, description, createdAt, y updatedAt.
 */
export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProjects($data: CreateProjectInput!) {
    createProjects(data: $data) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`;

/**
 * @function UPDATE_PROJECT_MUTATION
 * @description Define la mutación GraphQL para actualizar un proyecto existente.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio) y un objeto 'data' de tipo UpdateProjectInput (obligatorio).
 *              Los campos en 'data' (title, description) son opcionales para la actualización.
 *              Retorna un objeto Project con los campos id, title, y description.
 */
export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProjects($id: ID!, $data: UpdateProjectInput!) {
    updateProjects(id: $id, data: $data) {
      id
      title
      description
    }
  }
`;

/**
 * @function DELETE_PROJECT_MUTATION
 * @description Define la mutación GraphQL para eliminar un proyecto por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un valor booleano (Boolean!) indicando si la eliminación fue exitosa.
 */
export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProjects($id: ID!) {
    deleteProjects(id: $id)
  }
`;
