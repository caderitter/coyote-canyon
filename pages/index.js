import Head from "next/head";
import Image from "next/image";
import { Libre_Baskerville } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { getPosts } from "../lib/posts";
import Link from "next/link";

export async function getStaticProps({ params }) {
  const skip = params?.skip;
  const posts = await getPosts({ limit: 10, skip });
  return { props: { posts } };
}

const libreBaskerville = Libre_Baskerville({ weight: "400", subsets: "latin" });

export default function Home({ posts }) {
  return (
    <div className={`${styles.container} ${libreBaskerville.className}`}>
      <Head>
        <title>Coyote canyon</title>
        <meta name="description" content="Sam Ritter's writing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <Link href={`/post/${post.sys.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
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
