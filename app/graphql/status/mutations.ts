import { gql } from "@apollo/client";

/**
 * @function CREATE_STATUS_MUTATION
 * @description Define la mutación GraphQL para crear un nuevo estado.
 *              Recibe un objeto 'data' de tipo CreateStatusInput (obligatorio) con el campo:
 *              - name: String!
 *              Retorna un objeto Status con los campos id y name.
 */
export const CREATE_STATUS_MUTATION = gql`
  mutation CreateStatus($data: CreateStatusInput!) {
    createStatus(data: $data) {
      id
      name
    }
  }
`;

/**
 * @function UPDATE_STATUS_MUTATION
 * @description Define la mutación GraphQL para actualizar un estado existente.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio) y un objeto 'data' de tipo UpdateStatusInput (obligatorio).
 *              El campo 'name' es opcional para la actualización.
 *              Retorna un objeto Status con los campos id y name.
 */
export const UPDATE_STATUS_MUTATION = gql`
  mutation UpdateStatus($id: ID!, $data: UpdateStatusInput!) {
    updateStatus(id: $id, data: $data) {
      id
      name
    }
  }
`;

/**
 * @function DELETE_STATUS_MUTATION
 * @description Define la mutación GraphQL para eliminar un estado por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un valor booleano (Boolean!) indicando si la eliminación fue exitosa.
 */
export const DELETE_STATUS_MUTATION = gql`
  mutation DeleteStatus($id: ID!) {
    deleteStatus(id: $id)
  }
`;
