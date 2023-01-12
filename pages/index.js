import styles from '../styles/Home.module.css';
import { getPosts } from '../lib/posts';
import Link from 'next/link';

export async function getStaticProps({ params }) {
  const skip = params?.skip;
  const posts = await getPosts({ limit: 10, skip });
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Sammie Ritter</header>
      <ul className={styles.postList}>
        {posts.map(post => (
          <li className={styles.postItem} key={post.title}>
            <Link href={`/post/${post.sys.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
