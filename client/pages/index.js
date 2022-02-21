import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { getReadApi, getWriteApi } from "../utils/getApi";

export async function getServerSideProps() {
  const res = await fetch(getReadApi("twitter"));
  const initialTwitterTrends = await res.json();
  return {
    props: {
      initialTwitterTrends,
    },
  };
}

export default function Home({ initialTwitterTrends }) {
  const [twitterTrends, setTwitterTrends] = useState(initialTwitterTrends);
  const refetchTwitterTrends = async () => {
    let newTwitterTrends = [];
    await fetch(getWriteApi("twitter")).then(() => {
      setTimeout(async () => {
        const readTwitterRes = await fetch(getReadApi("twitter"));
        newTwitterTrends = await readTwitterRes.json();
        newTwitterTrends = [{ name: "Peter Kong" }];
        setTwitterTrends(newTwitterTrends);
      }, 3000); // allow time for upload-then-read from database
    });
  };

  const onClickTwitterRefetch = (e) => {
    console.log("Refetching ...");
    e.preventDefault();
    refetchTwitterTrends();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Social Media Trends</title>
        <meta name="description" content="by Peter Kong" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Social Media Trends</h1>

        <button onClick={onClickTwitterRefetch}>Refetch</button>

        <div className={styles.grid}>
          {twitterTrends.map((t) => (
            <a href={t.url} className={styles.card}>
              <h2>{t.name}</h2>
              <p>{t.tweet_volume ?? "N/A"}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
