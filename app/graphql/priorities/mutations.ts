import { gql } from "@apollo/client";

/**
 * @function CREATE_PRIORITY_MUTATION
 * @description Define la mutación GraphQL para crear una nueva prioridad.
 *              Recibe un objeto 'data' de tipo CreatePrioritiesInput (obligatorio) con el campo:
 *              - name: String!
 *              Retorna un objeto Priorities con los campos id y name.
 */
export const CREATE_PRIORITY_MUTATION = gql`
  mutation CreatePriority($data: CreatePrioritiesInput!) {
    createPriority(data: $data) {
      id
      name
    }
  }
`;

/**
 * @function UPDATE_PRIORITY_MUTATION
 * @description Define la mutación GraphQL para actualizar una prioridad existente.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio) y un objeto 'data' de tipo UpdatePrioritiesInput (obligatorio).
 *              El campo 'name' es opcional para la actualización.
 *              Retorna un objeto Priorities con los campos id y name.
 */
export const UPDATE_PRIORITY_MUTATION = gql`
  mutation UpdatePriority($id: ID!, $data: UpdatePrioritiesInput!) {
    updatePriority(id: $id, data: $data) {
      id
      name
    }
  }
`;

/**
 * @function DELETE_PRIORITY_MUTATION
 * @description Define la mutación GraphQL para eliminar una prioridad por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un valor booleano (Boolean!) indicando si la eliminación fue exitosa.
 */
export const DELETE_PRIORITY_MUTATION = gql`
  mutation DeletePriority($id: ID!) {
    deletePriority(id: $id)
  }
`;
