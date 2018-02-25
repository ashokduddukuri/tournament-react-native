const getPlayerDetails = (playerID, tournamentData) => {
    return user = tournamentData.users.filter((user) => {
        return user.id == playerID;
    })[0];
} 

const matchWiseGames = (tournamentData) => {
    const games = Object.values(tournamentData.games);
    const matches = Object.values(tournamentData.matches);
    // Games in the currentStage
    const matchWiseGames = matches.map((match) => {
        // console.log('----', match.id);
        return games.filter((game) => (
            (game.matchId === match.id) && (match.stageId === tournamentData.currentStageId)
        ));
    });
    // console.log("MATCH GAMES",matchWiseGames);
    // Live games
    const liveGames = games.filter((game) => (
        game.isGameOngoing && !game.isGameFinished
    ));
    // completed games
    const completedGames = games.filter((game) => (
        game.isGameFinished
    ));

    let currentStageGames = [];
        matchWiseGames.map((game) => {
            currentStageGames = currentStageGames.concat(game);
        });
    return currentStageGames;
}

getOverallTeamScoreForMatch = (matchId, tournamentData) => {
    const gamesInMatch = tournamentData.games.filter((game) => {
        return game.matchId == matchId;
    });
    let team1Score = 0, team2Score = 0;
    gamesInMatch.map((game) => {
        team1Score += game.team1ScoreFinal;
        team2Score  += game.team2ScoreFinal;
    });

    return {
        "team1MatchScore" : team1Score,
        "team2MatchScore" : team2Score,
    }
}

getLeaderboardData = (tournamentData) => {

    const teams = Object.values(tournamentData.teams);
        const teamScores = [];
        for (let i = 0; i < teams.length; i++) {
            teamScores.push({
                teamId: i,
                pointsWon: 0,
                pointsLost: 0,
                gamesPlayed: 0,
                gamesWon: 0
            });
        }
        
        // console.log('----------------------------------');
        const matches = Object.values(tournamentData.matches);
        const games = matchWiseGames(tournamentData);
        // console.log(games);
        for (let i = 0; i < games.length; i++) {
            const match = matches[games[i].matchId];
            const game = games[i];
            // Deuce condition
            if (game.team1ScoreFinal > 20 && game.team2ScoreFinal > 20 && !game.isGameFinished) {
                teamScores[match.team1].pointsWon += 20;
                teamScores[match.team1].pointsLost += 20;

                teamScores[match.team2].pointsWon += 20;
                teamScores[match.team2].pointsLost += 20;
            } else {
                teamScores[match.team1].pointsWon += game.team1ScoreFinal;
                teamScores[match.team1].pointsLost += game.team2ScoreFinal;

                teamScores[match.team2].pointsWon += game.team2ScoreFinal;
                teamScores[match.team2].pointsLost += game.team1ScoreFinal;
            }
            if (game.isGameFinished) {
                teamScores[match.team1].gamesPlayed++;
                teamScores[match.team2].gamesPlayed++;
                if (game.team1ScoreFinal === 21) {
                    teamScores[match.team1].gamesWon++;
                }
                if (game.team2ScoreFinal === 21) {
                    teamScores[match.team2].gamesWon++;
                }
            }
        }
        // const matches = Object.values(tournamentData.matches);
        // const games = Object.values(tournamentData.games);
        // console.log(games, matches, teams);
        teamScores.sort((a, b) => {
            if (tournamentData.currentStageId === 0) {
                // Points won should be greater
                if (a.pointsWon > b.pointsWon) {
                    return -1;
                } else if (a.pointsWon < b.pointsWon) {
                    return 1;
                }
                // Games won should be greater
                if (a.gamesWon > b.gamesWon) {
                    return -1;
                } else if (a.gamesWon < b.gamesWon) {
                    return 1;
                }
            }
            else {
                if (a.gamesWon > b.gamesWon) {
                    return -1;
                } else if (a.gamesWon < b.gamesWon) {
                    return 1;
                }

                // Points won should be greater
                if (a.pointsWon > b.pointsWon) {
                    return -1;
                } else if (a.pointsWon < b.pointsWon) {
                    return 1;
                }
            }
            
            // Points lost should be lesser
            // if (a.pointsLost < b.pointsLost) {
            //     return -1;
            // } else if (a.pointsLost > b.pointsLost) {
            //     return 1;
            // }
            return 1;
        });
        return teamScores;
}


export {
    getPlayerDetails,
    matchWiseGames,
    getOverallTeamScoreForMatch,
    getLeaderboardData
}