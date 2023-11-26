import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>bookmarks</title>
      </head>
      <body>
        <main class="flex justify-center items-center px-6 py-12 min-h-screen bg-stone-100">
          <Component />
        </main>
      </body>
    </html>
  );
}
