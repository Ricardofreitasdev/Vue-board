export const VALID_USER_MUTATION = `
  mutation valid($email: String!, $password: String!) {
    valid(email: $email, password: $password) {
      name
      id
      token
    }
  }
`;
