import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { default as NextImage } from "next/image";
import { createRenderOptions, getPost, getPosts } from "../../lib/posts";

export async function getStaticPaths() {
  const posts = await getPosts({ limit: 100 });

  const paths = posts.map((post) => ({ params: { id: post?.sys?.id } }));
  return { paths, fallback: blocking };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params?.id);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return { props: { post } };
}

function Image({ src, width, height, alt }) {
  return (
    <NextImage
      src={src}
      width={width}
      height={height}
      alt={alt}
      className="image"
    />
  );
}

export default function Post({ post }) {
  const renderOptions = createRenderOptions(post, Image);
  const components = documentToReactComponents(post.body.json, renderOptions);
  return <>{components}</>;
}
