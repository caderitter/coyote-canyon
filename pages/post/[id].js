import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { BLOCKS } from '@contentful/rich-text-types';
import { getPost, getPosts } from '../../lib/posts';
import styles from '../../styles/Post.module.css';
import homeStyles from '../../styles/Home.module.css';

export async function getStaticPaths() {
  const posts = await getPosts({ limit: 100 });

  const paths = posts.map(post => ({ params: { id: post?.sys?.id } }));
  return { paths, fallback: 'blocking' };
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

const createRenderOptions = post => {
  const links = post.body.links;
  const assetMap = new Map();
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  return {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const asset = assetMap.get(node.data.target.sys.id);

      switch (asset.contentType) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/webp':
          return (
            <div className={styles.imageContainer}>
              <Image
                src={asset.url}
                width={asset.width}
                height={asset.height}
                alt={asset.description}
              />
            </div>
          );
        default:
          return null;
      }
    },
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className={styles.paragraph}>{children}</p>
    ),
  };
};

export default function Post({ post }) {
  const renderOptions = createRenderOptions(post);
  const options = {
    renderNode: renderOptions,
  };
  const components = documentToReactComponents(post.body.json, options);
  return (
    <>
      <header className={homeStyles.header}>{post.title}</header>
      {components}
    </>
  );
}
