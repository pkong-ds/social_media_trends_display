import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import formatNumber from "../utils/formatNumber";
import { getReadApi, getWriteApi } from "../utils/getApi";

export async function getServerSideProps() {
  // note: use Promise.all() to manage 3 parallel api-calls
  const [initialTwitterTrends, initialGoogleTrends, initialRedditTrends] =
    await Promise.all([
      fetch(getReadApi("twitter")).then((res) => res.json()),
      fetch(getReadApi("google")).then((res) => res.json()),
      fetch(getReadApi("reddit")).then((res) => res.json()),
    ]);

  return {
    props: {
      initialTwitterTrends,
      initialGoogleTrends,
      initialRedditTrends,
    },
  };
}

export default function Home({
  initialTwitterTrends,
  initialGoogleTrends,
  initialRedditTrends,
}) {
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isRedditLoading, setIsRedditLoading] = useState(false);

  const [twitterTrends, setTwitterTrends] = useState(initialTwitterTrends);
  const [googleTrends, setGoogleTrends] = useState(initialGoogleTrends);
  const [redditTrends, setRedditTrends] = useState(initialRedditTrends);

  const refetchTwitterTrends = async () => {
    setIsTwitterLoading(true);
    await fetch(getWriteApi("twitter")).then(() => {
      setTimeout(async () => {
        const readTwitterRes = await fetch(getReadApi("twitter"));
        const newTwitterTrends = await readTwitterRes.json();
        setTwitterTrends(newTwitterTrends);
        setIsTwitterLoading(false);
      }, 3000); // allow time for upload, then read
    });
  };

  const onClickTwitterRefetch = (e) => {
    e.preventDefault();
    console.log("Refetching twitter...");
    refetchTwitterTrends();
  };

  const refetchGoogleTrends = async () => {
    setIsGoogleLoading(true);
    await fetch(getWriteApi("google")).then(() => {
      setTimeout(async () => {
        const readGoogleRes = await fetch(getReadApi("google"));
        const newGoogleTrends = await readGoogleRes.json();
        setGoogleTrends(newGoogleTrends);
        setIsGoogleLoading(false);
      }, 3000); // allow time for upload, then read
    });
  };
  const onClickGoogleRefetch = (e) => {
    e.preventDefault();
    console.log("Refetching google...");
    refetchGoogleTrends();
  };

  const refetchRedditTrends = async () => {
    setIsRedditLoading(true);
    await fetch(getWriteApi("reddit")).then(() => {
      setTimeout(async () => {
        const readRedditRes = await fetch(getReadApi("reddit"));
        const newRedditTrends = await readRedditRes.json();
        setRedditTrends(newRedditTrends);
        setIsRedditLoading(false);
      }, 3000); // allow time for upload, then read
    });
  };
  const onClickRedditRefetch = (e) => {
    e.preventDefault();
    console.log("Refetching reddit...");
    refetchRedditTrends();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Social Media Trends</title>
        <meta name="description" content="by Peter Kong" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.columnsContainer}>
          <div className={styles.column}>
            <h1>Twitter Trends</h1>
            <button disabled={isTwitterLoading} onClick={onClickTwitterRefetch}>
              Refetch Twitter
            </button>

            {!isTwitterLoading && (
              <div className={styles.grid}>
                {twitterTrends.map((t, index) => (
                  <a key={t._id} href={t.url} className={styles.card}>
                    <h2>{index + 1}</h2>
                    <h2>{t.name}</h2>
                    <p>
                      {t.tweet_volume ? formatNumber(t.tweet_volume) : "N/A"}
                    </p>
                  </a>
                ))}
              </div>
            )}
            {isTwitterLoading && <h4>Refetching ...</h4>}
          </div>
          <div className={styles.column}>
            <h1>Google Search Trends</h1>
            <button disabled={isGoogleLoading} onClick={onClickGoogleRefetch}>
              Refetch Google
            </button>
            {!isGoogleLoading && (
              <div className={styles.grid}>
                {googleTrends.map((t) => (
                  <a
                    key={t._id}
                    href={t.googleUrl}
                    className={styles.googleCard}
                  >
                    <h2>{t.searchRank}</h2>
                    <div>{t.entityNames.join(" • ")}</div>
                  </a>
                ))}
              </div>
            )}
            {isGoogleLoading && <h4>Refetching ...</h4>}
          </div>
          <div className={styles.column}>
            <h1>Reddit Trends</h1>
            <button disabled={isRedditLoading} onClick={onClickRedditRefetch}>
              Refetch Reddit
            </button>
            {!isRedditLoading && (
              <div className={styles.grid}>
                {redditTrends.map((t, index) => (
                  <a key={t._id} href={t.url} className={styles.redditCard}>
                    <h3>{index + 1}</h3>
                    <h2>{t.title}</h2>
                    <p>{t.score ? formatNumber(t.score) : "N/A"}</p>
                  </a>
                ))}
              </div>
            )}
            {isRedditLoading && <h4>Refetching ...</h4>}
          </div>
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
