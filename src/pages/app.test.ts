import { describe, expect, test } from "@jest/globals";
import { getData } from "./_app";

describe("getData function", () => {
  test("Test the getData function", () => {
    expect(getData()["Arsenal"]).toMatchObject({
      club: "Arsenal",
      draw: 2,
      gamesPlayed: [
        {
          date: "01/04 17:00",
          score: { Arsenal: 2, "Manchester United": 6 },
        },
        { date: "05/02 17:00", score: { Arsenal: 2, Liverpool: 3 } },
        { date: "28/04 12:00", score: { Arsenal: 0, "Leicester City": 0 } },
        {
          date: "05/04 12:00",
          score: { Arsenal: 1, "Tottenham Hotspur": 1 },
        },
      ],
      goalDifference: -5,
      loss: 2,
      nextGames: [
        {
          date: "05/11 14:00",
          score: { Arsenal: null, "Manchester City": null },
        },
        { date: "05/11 12:00", score: { Arsenal: null, Chelsea: null } },
      ],
      numberGamesPlayed: 4,
      totalPoints: 2,
      win: 0,
    });
  });
});
