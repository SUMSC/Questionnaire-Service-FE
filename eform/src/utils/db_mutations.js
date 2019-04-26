export const createUser = content => `
mutation ($idTag: ID!, $name: String!) {
    createUser(
        idTag: $idTag, 
        name: $name
    ) {
        ok
        message
        user{${content}}
    }
}
`;

export const participate = op => content => `
mutation ($userId: Int!, $id: Int!, $answer: JSONString!){
    ${op === 'init' ? 'joinEvent' : 'updateParticipate'}(
        eventId: $id,
        userId: $userId,
        answer: $answer
    ) {
        ok
        message
        participate {
            ${content}
        }
    }
}
`;
