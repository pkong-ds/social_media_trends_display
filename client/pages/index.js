import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import formatNumber from "../utils/formatNumber";
import { getReadApi, getWriteApi } from "../utils/getApi";

export async function getServerSideProps() {
  // note: use Promise.all() to manage 3 parallel api-calls
  const [initialTwitterTrends, initialGoogleTrends] = await Promise.all([
    fetch(getReadApi("twitter")).then((res) => res.json()),
    fetch(getReadApi("google")).then((res) => res.json()),
  ]);

  return {
    props: {
      initialTwitterTrends,
      initialGoogleTrends,
    },
  };
}

export default function Home({ initialTwitterTrends, initialGoogleTrends }) {
  const [twitterTrends, setTwitterTrends] = useState(initialTwitterTrends);
  const refetchTwitterTrends = async () => {
    let newTwitterTrends = [];
    await fetch(getWriteApi("twitter")).then(() => {
      setTimeout(async () => {
        const readTwitterRes = await fetch(getReadApi("twitter"));
        newTwitterTrends = await readTwitterRes.json();
        setTwitterTrends(newTwitterTrends);
      }, 3000); // allow time for upload, then read
    });
  };

  const onClickTwitterRefetch = (e) => {
    e.preventDefault();
    console.log("Refetching twitter...");
    refetchTwitterTrends();
  };

  const [googleTrends, setGoogleTrends] = useState(initialGoogleTrends);

  return (
    <div className={styles.container}>
      <Head>
        <title>Social Media Trends</title>
        <meta name="description" content="by Peter Kong" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Social Media Trends</h1>
        <div className={styles.columnsContainer}>
          <div className={styles.column}>
            <button onClick={onClickTwitterRefetch}>Refetch Twitter</button>

            <div className={styles.grid}>
              {twitterTrends.map((t) => (
                <a key={t._id} href={t.url} className={styles.card}>
                  <h2>{t.name}</h2>
                  <p>{t.tweet_volume ? formatNumber(t.tweet_volume) : "N/A"}</p>
                </a>
              ))}
            </div>
          </div>
          <div className={styles.column}>
            <button>Refetch Google</button>
            <div className={styles.grid}>
              {googleTrends.map((t) => (
                <a key={t._id} href={t.googleUrl} className={styles.googleCard}>
                  <h2>{t.searchRank}</h2>
                  <div>{t.entityNames.join(" • ")}</div>
                </a>
              ))}
            </div>
          </div>
          <div className={styles.column}>some Reddit trends</div>
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
