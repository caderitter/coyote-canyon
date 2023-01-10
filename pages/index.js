import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getPosts } from "../utils/posts";

export async function getStaticProps({ params }) {
  const { skip } = params;
  const posts = await getPosts({ limit: 10, skip });
  return { props: { posts } };
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coyote canyon</title>
        <meta name="description" content="Sam Ritter's writing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
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
