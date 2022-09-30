import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { format } from "date-fns";
import { data, Game } from "../data";

const queryClient = new QueryClient();

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
      const score1 = curr.score[clubKey1] as number
      const score2 = curr.score[clubKey2] as number
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

queryClient.setQueryData(["clubs"], getData);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
