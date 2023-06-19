import "./globals.css";
import { Inter } from "next/font/google";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";
import CookbookSidebar from "@/lib/modules/sidebar/CookbookSidebar";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  let content = <></>;

  try {
    const games = await HttpService.get(Routes.GAMES_GET_ALL, {
      name: "melee",
    });
    const cookbooks = await HttpService.get(Routes.COOKBOOK_GET_ALL, {
      game: games[0]._id,
    });

    content = (
      <>
        <CookbookSidebar cookbooks={cookbooks} />
        {children}
      </>
    );
  } catch (err) {
    console.log(err);
    content = <>Error</>;
  }

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-900 flex overflow-hidden h-screen w-screen`}
      >
        {content}
      </body>
    </html>
  );
}
