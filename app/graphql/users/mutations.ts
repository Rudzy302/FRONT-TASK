import { gql } from "@apollo/client";

/**
 * @function CREATE_USER_MUTATION
 * @description Define la mutación GraphQL para crear un nuevo usuario.
 *              Recibe un objeto 'data' de tipo CreateUserInput (obligatorio) con los campos:
 *              - name: String!
 *              - lastname: String!
 *              - email: String!
 *              - password: String!
 *              Retorna un objeto User con los campos id, name, lastname, y email.
 */
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      lastname
      email
    }
  }
`;

/**
 * @function UPDATE_USER_MUTATION
 * @description Define la mutación GraphQL para actualizar un usuario existente.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio) y un objeto 'data' de tipo UpdateUserInput (obligatorio).
 *              Los campos en 'data' (name, lastname, email, password) son opcionales para la actualización.
 *              Retorna un objeto User con los campos id, name, lastname, y email.
 */
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      name
      lastname
      email
    }
  }
`;

/**
 * @function DELETE_USER_MUTATION
 * @description Define la mutación GraphQL para eliminar un usuario por su ID.
 *              Recibe un parámetro 'id' de tipo ID (obligatorio).
 *              Retorna un valor booleano (Boolean!) indicando si la eliminación fue exitosa.
 */
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
