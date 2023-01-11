export default async function handleWebhook(req, res) {
  if (req.query.token !== process.env.CONTENTFUL_WEBHOOK_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  await res.revalidate("/");

  const body = JSON.parse(req.body);
  const postId = body.sys.id;
  try {
    await res.revalidate(`/post/${postId}`);
    return res.json({ revalidated: true });
  } catch (e) {
    return res.status(500).send("Error revalidating");
  }
}
