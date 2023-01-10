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
  const json = fetchQuery(query);
  const posts = json?.data?.postCollection?.items;
  return posts;
}

export async function getPost(id) {
  const query = `
    {
      post(id: ${id}) {
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
  const json = fetchQuery(query);
  const post = json?.data?.post;
  return post;
}
