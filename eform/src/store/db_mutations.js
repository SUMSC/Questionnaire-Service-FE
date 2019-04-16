export const createUser = content => `
mutation ($idTag: ID!, $name: String!) {
    createUser(
        idTag: $idTag, 
        name: $name
    ) {${content}}
}
`;