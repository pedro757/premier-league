import { expect, test } from "@jest/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { useClubsSorted } from ".";
import { getData } from "./_app";

const queryClient = new QueryClient();

queryClient.setQueryData(["clubs"], getData);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("useClubsSorted custom Hook", async () => {
  const { result } = renderHook(() => useClubsSorted(), { wrapper });

  expect(result.current).toMatchObject([
    {
      club: "Leicester City",
      draw: 1,
      gamesPlayed: [
        {
          date: "05/04 14:00",
          score: {
            "Leicester City": 2,
            "Manchester United": 1,
          },
        },
        {
          date: "17/04 17:00",
          score: {
            "Leicester City": 2,
            "Manchester City": 1,
          },
        },
        {
          date: "28/04 12:00",
          score: {
            Arsenal: 0,
            "Leicester City": 0,
          },
        },
        {
          date: "05/03 14:00",
          score: {
            Chelsea: 1,
            "Leicester City": 4,
          },
        },
      ],
      goalDifference: 5,
      loss: 0,
      nextGames: [
        {
          date: "05/06 17:00",
          score: {
            "Leicester City": null,
            Liverpool: null,
          },
        },
        {
          date: "05/09 14:00",
          score: {
            "Leicester City": null,
            "Tottenham Hotspur": null,
          },
        },
      ],
      numberGamesPlayed: 4,
      totalPoints: 10,
      win: 3,
    },
    {
      club: "Liverpool",
      draw: 0,
      gamesPlayed: [
        {
          date: "05/01 14:00",
          score: {
            Liverpool: 2,
            "Manchester City": 1,
          },
        },
        {
          date: "05/02 17:00",
          score: {
            Arsenal: 2,
            Liverpool: 3,
          },
        },
        {
          date: "29/04 17:00",
          score: {
            Chelsea: 1,
            Liverpool: 3,
          },
        },
      ],
      goalDifference: 4,
      loss: 0,
      nextGames: [
        {
          date: "05/09 11:00",
          score: {
            Liverpool: null,
            "Manchester United": null,
          },
        },
        {
          date: "05/09 17:00",
          score: {
            Liverpool: null,
            "Tottenham Hotspur": null,
          },
        },
        {
          date: "05/06 17:00",
          score: {
            "Leicester City": null,
            Liverpool: null,
          },
        },
      ],
      numberGamesPlayed: 3,
      totalPoints: 9,
      win: 3,
    },
    {
      club: "Manchester United",
      draw: 2,
      gamesPlayed: [
        {
          date: "05/04 14:00",
          score: {
            "Leicester City": 2,
            "Manchester United": 1,
          },
        },
        {
          date: "05/05 11:00",
          score: {
            "Manchester United": 1,
            "Tottenham Hotspur": 1,
          },
        },
        {
          date: "03/04 17:00",
          score: {
            Chelsea: 2,
            "Manchester United": 2,
          },
        },
        {
          date: "03/05 17:00",
          score: {
            "Manchester City": 2,
            "Manchester United": 1,
          },
        },
        {
          date: "01/04 17:00",
          score: {
            Arsenal: 2,
            "Manchester United": 6,
          },
        },
      ],
      goalDifference: 2,
      loss: 2,
      nextGames: [
        {
          date: "05/09 11:00",
          score: {
            Liverpool: null,
            "Manchester United": null,
          },
        },
      ],
      numberGamesPlayed: 5,
      totalPoints: 5,
      win: 1,
    },
    {
      club: "Manchester City",
      draw: 1,
      gamesPlayed: [
        {
          date: "03/05 17:00",
          score: {
            "Manchester City": 2,
            "Manchester United": 1,
          },
        },
        {
          date: "05/01 14:00",
          score: {
            Liverpool: 2,
            "Manchester City": 1,
          },
        },
        {
          date: "16/04 17:00",
          score: {
            Chelsea: 0,
            "Manchester City": 0,
          },
        },
        {
          date: "17/04 17:00",
          score: {
            "Leicester City": 2,
            "Manchester City": 1,
          },
        },
      ],
      goalDifference: -1,
      loss: 2,
      nextGames: [
        {
          date: "05/06 12:00",
          score: {
            "Manchester City": null,
            "Tottenham Hotspur": null,
          },
        },
        {
          date: "05/11 14:00",
          score: {
            Arsenal: null,
            "Manchester City": null,
          },
        },
      ],
      numberGamesPlayed: 4,
      totalPoints: 4,
      win: 1,
    },
    {
      club: "Tottenham Hotspur",
      draw: 3,
      gamesPlayed: [
        {
          date: "05/05 11:00",
          score: {
            "Manchester United": 1,
            "Tottenham Hotspur": 1,
          },
        },
        {
          date: "05/04 12:00",
          score: {
            Arsenal: 1,
            "Tottenham Hotspur": 1,
          },
        },
        {
          date: "05/04 14:00",
          score: {
            Chelsea: 1,
            "Tottenham Hotspur": 1,
          },
        },
      ],
      goalDifference: 0,
      loss: 0,
      nextGames: [
        {
          date: "05/09 17:00",
          score: {
            Liverpool: null,
            "Tottenham Hotspur": null,
          },
        },
        {
          date: "05/06 12:00",
          score: {
            "Manchester City": null,
            "Tottenham Hotspur": null,
          },
        },
        {
          date: "05/09 14:00",
          score: {
            "Leicester City": null,
            "Tottenham Hotspur": null,
          },
        },
      ],
      numberGamesPlayed: 3,
      totalPoints: 3,
      win: 0,
    },
    {
      club: "Chelsea",
      draw: 3,
      gamesPlayed: [
        {
          date: "03/04 17:00",
          score: {
            Chelsea: 2,
            "Manchester United": 2,
          },
        },
        {
          date: "29/04 17:00",
          score: {
            Chelsea: 1,
            Liverpool: 3,
          },
        },
        {
          date: "16/04 17:00",
          score: {
            Chelsea: 0,
            "Manchester City": 0,
          },
        },
        {
          date: "05/04 14:00",
          score: {
            Chelsea: 1,
            "Tottenham Hotspur": 1,
          },
        },
        {
          date: "05/03 14:00",
          score: {
            Chelsea: 1,
            "Leicester City": 4,
          },
        },
      ],
      goalDifference: -5,
      loss: 2,
      nextGames: [
        {
          date: "05/11 12:00",
          score: {
            Arsenal: null,
            Chelsea: null,
          },
        },
      ],
      numberGamesPlayed: 5,
      totalPoints: 3,
      win: 0,
    },
    {
      club: "Arsenal",
      draw: 2,
      gamesPlayed: [
        {
          date: "01/04 17:00",
          score: {
            Arsenal: 2,
            "Manchester United": 6,
          },
        },
        {
          date: "05/02 17:00",
          score: {
            Arsenal: 2,
            Liverpool: 3,
          },
        },
        {
          date: "28/04 12:00",
          score: {
            Arsenal: 0,
            "Leicester City": 0,
          },
        },
        {
          date: "05/04 12:00",
          score: {
            Arsenal: 1,
            "Tottenham Hotspur": 1,
          },
        },
      ],
      goalDifference: -5,
      loss: 2,
      nextGames: [
        {
          date: "05/11 14:00",
          score: {
            Arsenal: null,
            "Manchester City": null,
          },
        },
        {
          date: "05/11 12:00",
          score: {
            Arsenal: null,
            Chelsea: null,
          },
        },
      ],
      numberGamesPlayed: 4,
      totalPoints: 2,
      win: 0,
    },
  ]);
});
