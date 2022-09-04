import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ClubStats, ClubsObj } from "./_app";

export function useClubsSorted() {
  const queryClient = useQueryClient();
  const clubsObject: ClubsObj | undefined = queryClient.getQueryData(["clubs"]);
  const [clubsSorted, setClubsSorted] = useState<ClubStats[]>([]);

  useEffect(() => {
    if (!clubsObject) return;
    const clubData = Object.values(clubsObject);

    const len = clubData.length;
    let isSwapped = false;

    for (let i = 0; i < len; i++) {
      isSwapped = false;
      for (let j = 0; j < len; j++) {
        const x = clubData[j + 1]
        const y = clubData[j]
        if (x && y) {
          if (y.totalPoints < x.totalPoints) {
            clubData[j] = x;
            clubData[j + 1] = y;
            isSwapped = true;
          } else if (
            y.totalPoints === x.totalPoints
          ) {
            if (y.goalDifference < x.goalDifference) {
              clubData[j] = x;
              clubData[j + 1] = y;
              isSwapped = true;
            }
          }
        }
      }

      if (!isSwapped) {
        break;
      }
    }

    setClubsSorted(clubData);
  }, [clubsObject]);
  return clubsSorted;
}

function useClubsTable() {
  const clubs = useClubsSorted();
  const columnHelper = createColumnHelper<ClubStats>();

  const columns = [
    columnHelper.accessor((_, index) => index + 1, {
      header: "Pos.",
    }),
    columnHelper.accessor("club", {
      header: "Club",
    }),
    columnHelper.accessor("totalPoints", {
      header: "Points",
    }),
    columnHelper.accessor("goalDifference", {
      header: "GD",
    }),
    columnHelper.accessor("numberGamesPlayed", {
      header: "Games",
    }),
    columnHelper.accessor("win", {
      header: "Win",
    }),
    columnHelper.accessor("draw", {
      header: "Draw",
    }),
    columnHelper.accessor("loss", {
      header: "Loss",
    }),
  ];
  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data: clubs,
    getCoreRowModel: getCoreRowModel(),
  });
  return { getRowModel, getHeaderGroups };
}

const Home: NextPage = () => {
  const { getRowModel, getHeaderGroups } = useClubsTable();

  return (
    <>
      <Head>
        <title>FlankSource</title>
        <meta name="description" content="This is a take-home assessment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-slate-600">
        <table className="border-collapse border text-slate-200 border-slate-500 bg-slate-800 text-sm shadow-sm">
          <thead className="bg-slate-700">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-slate-600 font-semibold p-4 text-slate-200 text-left"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Link
                    key={cell.id}
                    href={`/club/${encodeURIComponent(row.getValue("club"))}`}
                  >
                    <td className="cursor-pointer border border-slate-700 p-4 text-slate-400 truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  </Link>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Home;
