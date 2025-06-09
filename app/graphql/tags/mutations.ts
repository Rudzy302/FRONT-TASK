import { gql } from "@apollo/client";

/**
 * @function CREATE_TAG_MUTATION
 * @description Define la mutación GraphQL para crear una nueva etiqueta.
 *              Recibe un objeto 'data' de tipo CreateTagInput (obligatorio) con el campo:
 *              - name: String!
 *              Retorna un objeto Tag con los campos id y name.
 */
export const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($data: CreateTagInput!) {
    createTag(data: $data) {
      id
      name
    }
  }
`;

/**
 * @function UPDATE_TAG_MUTATION
 * @description Define la mutación GraphQL para actualizar una etiqueta existente.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio) y un objeto 'data' de tipo UpdateTagInput (obligatorio).
 *              El campo 'name' es opcional para la actualización.
 *              Retorna un objeto Tag con los campos id y name.
 */
export const UPDATE_TAG_MUTATION = gql`
  mutation UpdateTag($id: ID!, $data: UpdateTagInput!) {
    updateTag(id: $id, data: $data) {
      id
      name
    }
  }
`;

/**
 * @function DELETE_TAG_MUTATION
 * @description Define la mutación GraphQL para eliminar una etiqueta por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un valor booleano (Boolean!) indicando si la eliminación fue exitosa.
 */
export const DELETE_TAG_MUTATION = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`;
