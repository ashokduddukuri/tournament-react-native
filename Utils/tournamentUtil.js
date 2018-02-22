const getPlayerDetails = (playerID, tournamentData) => {
    return user = tournamentData.users.filter((user) => {
        return user.id == playerID;
    })[0];
} 

export {
    getPlayerDetails
}