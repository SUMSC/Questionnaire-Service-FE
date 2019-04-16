export const participate = content => {
    return `
query ($userId: Int, $eventId: Int){
  participate(userId: $userId, eventId: $eventId) {
    ${content}
  }
}
`;
};

export const user = content => `
query ($id: Int, $idTag: String) {
    user(id: $id, idTag: $idTag) {
        ${content}
    }
}
`;

export const event = content => `
query ($userId: Int, $id: Int, $name: String, $active: Boolean){
    event(id: $id, name: $name, creatorId: $userId, Active: $active) {
        ${content}
    }
}
`;