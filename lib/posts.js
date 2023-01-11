import { BLOCKS } from "@contentful/rich-text-types";
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const token = process.env.CONTENTFUL_TOKEN;
const contentfulUrl = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/`;

async function fetchQuery(query) {
  const result = await fetch(contentfulUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });
  const json = await result.json();
  return json;
}

export async function getPosts({ limit = 10, skip = 0 }) {
  const query = `
    {
      postCollection(limit: ${limit}, skip: ${skip}, order: sys_firstPublishedAt_ASC) {
        items {
          sys {
            id
          }
          title
          body {
            json
          }
        }
      }
    }
  `;
  const json = await fetchQuery(query);
  const posts = json?.data?.postCollection?.items;
  return posts;
}

export async function getPost(id) {
  const query = `
    {
      post(id: "${id}") {
        title
        body {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                width
                height
                description
                contentType
              }
            }
          }
        }
      }
    }
  `;
  const json = await fetchQuery(query);
  const post = json?.data?.post;
  return post;
}

export function createRenderOptions(post, ImageComponent) {
  const links = post.body.links;
  const assetMap = new Map();
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetMap.get(node.data.target.sys.id);

        switch (asset.contentType) {
          case "image/jpeg":
          case "image/png":
          case "image/webp":
            return (
              <ImageComponent
                src={asset.url}
                width={asset.width}
                height={asset.height}
                alt={asset.description}
              />
            );
          default:
            return null;
        }
      },
    },
  };

  return renderOptions;
}
