import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getPost, getPosts } from "../../utils/posts";

export async function getStaticPaths() {
  const posts = await getPosts({ limit: 100 });

  const paths = posts.map((post) => ({ params: { id: post?.sys?.id } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params?.id);
  const components = documentToReactComponents(post.body);
  return { props: { richTextComponents: components } };
}

export default function Post({ richTextComponents }) {
  return <richTextComponents />;
}
