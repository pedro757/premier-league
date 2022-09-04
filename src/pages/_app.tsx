import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { format } from "date-fns";
import { data, gamesPlayed } from "../data";

const queryClient = new QueryClient();

export type ClubStats = {
  club: string;
  win: number;
  loss: number;
  draw: number;
  totalPoints: number;
  gamesPlayed: gamesPlayed[];
  numberGamesPlayed: number;
  nextGames: gamesPlayed[];
  goalDifference: number;
};

export type ClubsObj = {
  [team: string]: ClubStats;
};

export function getData() {
  function isValidDate(date: string) {
    return !Number.isNaN(new Date(date).getTime());
  }

  return data.reduce((acc: ClubsObj, curr) => {
    const [club1, club2] = Object.keys(curr.score);
    if (club1 === undefined || club2 === undefined) return acc;
    if (acc[club1] === undefined) {
      acc[club1] = {
        club: club1,
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
    if (acc[club2] === undefined) {
      acc[club2] = {
        club: club2,
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

    if (isValidDate(curr.date)) {
      curr.date = format(new Date(curr.date), "dd/MM HH:mm");
    }

    if (curr.score[club1] === null) {
      acc[club1]!.nextGames.push(curr);
      acc[club2]!.nextGames.push(curr);
    } else if (curr.score[club1]! > curr.score[club2]!) {
      acc[club1]!.win = acc[club1]!.win + 1;
      acc[club1]!.goalDifference =
        acc[club1]!.goalDifference +
        Math.abs(curr.score[club1]! - curr.score[club2]!);
      acc[club2]!.goalDifference =
        acc[club2]!.goalDifference -
        Math.abs(curr.score[club1]! - curr.score[club2]!);
      acc[club1]!.totalPoints = acc[club1]!.totalPoints + 3;
      acc[club1]!.gamesPlayed.push(curr);
      acc[club1]!.numberGamesPlayed = acc[club1]!.gamesPlayed.length;
      acc[club2]!.gamesPlayed.push(curr);
      acc[club2]!.numberGamesPlayed = acc[club2]!.gamesPlayed.length;
      acc[club2]!.loss = acc[club2]!.loss + 1;
    } else if (curr.score[club2]! > curr.score[club1]!) {
      acc[club2]!.win = acc[club2]!.win + 1;
      acc[club2]!.goalDifference =
        acc[club2]!.goalDifference +
        Math.abs(curr.score[club1]! - curr.score[club2]!);
      acc[club1]!.goalDifference =
        acc[club1]!.goalDifference -
        Math.abs(curr.score[club1]! - curr.score[club2]!);
      acc[club2]!.totalPoints = acc[club2]!.totalPoints + 3;
      acc[club1]!.loss = acc[club1]!.loss + 1;
      acc[club1]!.gamesPlayed.push(curr);
      acc[club1]!.numberGamesPlayed = acc[club1]!.gamesPlayed.length;
      acc[club2]!.gamesPlayed.push(curr);
      acc[club2]!.numberGamesPlayed = acc[club2]!.gamesPlayed.length;
    } else {
      acc[club2]!.draw = acc[club2]!.draw + 1;
      acc[club1]!.draw = acc[club1]!.draw + 1;
      acc[club2]!.totalPoints = acc[club2]!.totalPoints + 1;
      acc[club1]!.totalPoints = acc[club1]!.totalPoints + 1;
      acc[club1]!.gamesPlayed.push(curr);
      acc[club1]!.numberGamesPlayed = acc[club1]!.gamesPlayed.length;
      acc[club2]!.gamesPlayed.push(curr);
      acc[club2]!.numberGamesPlayed = acc[club2]!.gamesPlayed.length;
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
