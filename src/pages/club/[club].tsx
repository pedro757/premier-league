import { useQueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClubsObj } from "../_app";

const Club: NextPage = () => {
  const queryClient = useQueryClient();
  const clubs: ClubsObj | undefined = queryClient.getQueryData(["clubs"]);
  const router = useRouter();
  const { club: clubName } = router.query;

  if (!clubs || typeof clubName !== "string") {
    return <div>There&apos;s an error, Sorry!</div>;
  }

  return (
    <>
      <Head>
        <title>{clubName}</title>
        <meta name="description" content={"This is " + clubName + "schedule"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-slate-600 text-slate-200">
        {clubs[clubName]?.nextGames.map((_, index, arr) => {
          const item = arr[arr.length - 1 - index];
          if (item)
            return (
              <div key={item.date} className="flex p-4">
                <div>{item.date}</div>
                <div className="flex px-10">
                  {Object.entries(item.score).map((clubScore, index) => {
                    if (index === 1)
                      return (
                        <div className="flex px-2 space-x-2" key={clubScore[0]}>
                          <div>{clubScore[0]}</div>
                        </div>
                      );
                    return (
                      <div className="flex px-2 space-x-2" key={clubScore[0]}>
                        <div>{clubScore[0]}</div>
                        <div>
                          <b>VS</b>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
        })}
        {clubs[clubName]?.gamesPlayed.map((item) => {
          return (
            <div key={item.date} className="flex p-4">
              <div>{item.date}</div>
              <div className="flex px-10">
                {Object.entries(item.score).map((clubScore, index) => {
                  if (index === 1)
                    return (
                      <div className="flex px-2 space-x-2" key={clubScore[0]}>
                        <div>
                          <b>{clubScore[1]}</b>
                        </div>
                        <div>{clubScore[0]}</div>
                      </div>
                    );
                  return (
                    <div className="flex px-2 space-x-2" key={clubScore[0]}>
                      <div>{clubScore[0]}</div>
                      <div>
                        <b>{clubScore[1]}</b>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Club;
