import { format } from "date-fns";

export type Game = {
  score: {
    [team: string]: number | null;
  };
  date: string;
};

export const data: Game[] = [
  {
    score: {
      "Manchester United": 1,
      "Leicester City": 2,
    },
    date: "2021-05-04T14:00:00",
  },
  {
    score: { "Manchester United": null, Liverpool: null },
    date: "2021-05-09T11:00:00",
  },
  {
    score: { "Manchester United": 1, "Tottenham Hotspur": 1 },
    date: "2021-05-05T11:00:00",
  },
  {
    score: { "Manchester United": 2, Chelsea: 2 },
    date: "2021-03-04T17:00:00",
  },
  {
    score: { "Manchester United": 1, "Manchester City": 2 },
    date: "2021-03-05T17:00:00",
  },
  {
    score: { "Manchester United": 6, Arsenal: 2 },
    date: "2021-01-04T17:00:00",
  },
  {
    score: { Liverpool: null, "Tottenham Hotspur": null },
    date: "2021-05-09T17:00:00",
  },
  {
    score: { Liverpool: null, "Leicester City": null },
    date: "2021-05-06T17:00:00",
  },
  {
    score: { "Manchester City": 1, Liverpool: 2 },
    date: "2021-05-01T14:00:00",
  },
  {
    score: { Arsenal: 2, Liverpool: 3 },
    date: "2021-05-02T17:00:00",
  },
  {
    score: { Chelsea: 1, Liverpool: 3 },
    date: "2021-04-29T17:00:00",
  },
  {
    score: { "Manchester City": 0, Chelsea: 0 },
    date: "2021-04-16T17:00:00",
  },
  {
    score: { "Manchester City": 1, "Leicester City": 2 },
    date: "2021-04-17T17:00:00",
  },
  {
    score: { "Manchester City": null, "Tottenham Hotspur": null },
    date: "2021-05-06T12:00:00",
  },
  {
    score: { "Manchester City": null, Arsenal: null },
    date: "2021-05-11T14:00:00",
  },
  {
    score: { Arsenal: null, Chelsea: null },
    date: "2021-05-11T12:00:00",
  },
  {
    score: { Arsenal: 0, "Leicester City": 0 },
    date: "2021-04-28T12:00:00",
  },
  {
    score: { Arsenal: 1, "Tottenham Hotspur": 1 },
    date: "2021-05-04T12:00:00",
  },
  {
    score: { Chelsea: 1, "Tottenham Hotspur": 1 },
    date: "2021-05-04T14:00:00",
  },
  {
    score: { Chelsea: 1, "Leicester City": 4 },
    date: "2021-05-03T14:00:00",
  },
  {
    score: { "Tottenham Hotspur": null, "Leicester City": null },
    date: "2021-05-09T14:00:00",
  },
];

type gamePlayed = {
  score: {
    [team: string]: number;
  };
  date: string;
};

type nextGames = {
  score: {
    [team: string]: null;
  };
  date: string;
};

export type ClubStats = {
  club: string;
  win: number;
  loss: number;
  draw: number;
  totalPoints: number;
  gamesPlayed: gamePlayed[];
  numberGamesPlayed: number;
  nextGames: nextGames[];
  goalDifference: number;
};

export type ClubsObj = {
  [team: string]: ClubStats;
};

export function getData() {
  function isValidDate(date: string) {
    return !Number.isNaN(new Date(date).getTime());
  }

  function isGamePlayed(Game: Game, clubKey: string): Game is gamePlayed {
    return typeof Game.score[clubKey] === "number";
  }

  function isNextGame(nextGame: Game, clubKey: string): nextGame is nextGames {
    return nextGame.score[clubKey] === null;
  }

  return data.reduce((acc: ClubsObj, curr) => {
    const [clubKey1, clubKey2] = Object.keys(curr.score);
    if (clubKey1 === undefined || clubKey2 === undefined) return acc;
    if (acc[clubKey1] === undefined) {
      acc[clubKey1] = {
        club: clubKey1,
        win: 0,
        loss: 0,
        draw: 0,
        goalDifference: 0,
        totalPoints: 0,
        gamesPlayed: [],
        numberGamesPlayed: 0,
        nextGames: [],
      };
    }
    if (acc[clubKey2] === undefined) {
      acc[clubKey2] = {
        club: clubKey2,
        win: 0,
        loss: 0,
        draw: 0,
        goalDifference: 0,
        totalPoints: 0,
        gamesPlayed: [],
        numberGamesPlayed: 0,
        nextGames: [],
      };
    }
    const club1 = acc[clubKey1] as ClubStats;
    const club2 = acc[clubKey2] as ClubStats;

    if (isValidDate(curr.date)) {
      curr.date = format(new Date(curr.date), "dd/MM HH:mm");
    }

    if (isNextGame(curr, clubKey1)) {
      club1.nextGames.push(curr);
      club2.nextGames.push(curr);
    } else if (isGamePlayed(curr, clubKey1)) {
      const score1 = curr.score[clubKey1] as number;
      const score2 = curr.score[clubKey2] as number;
      if (score1 > score2) {
        club1.win = club1.win + 1;
        club2.loss = club2.loss + 1;
        club1.gamesPlayed.push(curr);
        club2.gamesPlayed.push(curr);
        club1.goalDifference = club1.goalDifference + Math.abs(score1 - score2);
        club2.goalDifference = club2.goalDifference - Math.abs(score1 - score2);
        club1.totalPoints = club1.totalPoints + 3;
        club1.numberGamesPlayed = club1.gamesPlayed.length;
        club2.numberGamesPlayed = club2.gamesPlayed.length;
      } else if (score2 > score1) {
        club2.win = club2.win + 1;
        club2.goalDifference = club2.goalDifference + Math.abs(score1 - score2);
        club1.goalDifference = club1.goalDifference - Math.abs(score1 - score2);
        club1.loss = club1.loss + 1;
        club1.gamesPlayed.push(curr);
        club1.numberGamesPlayed = club1.gamesPlayed.length;
        club2.totalPoints = club2.totalPoints + 3;
        club2.gamesPlayed.push(curr);
        club2.numberGamesPlayed = club2.gamesPlayed.length;
      } else {
        club1.draw = club1.draw + 1;
        club1.totalPoints = club1.totalPoints + 1;
        club1.gamesPlayed.push(curr);
        club1.numberGamesPlayed = club1.gamesPlayed.length;
        club2.draw = club2.draw + 1;
        club2.totalPoints = club2.totalPoints + 1;
        club2.gamesPlayed.push(curr);
        club2.numberGamesPlayed = club2.gamesPlayed.length;
      }
    }
    return acc;
  }, {});
}
