export default async function handleWebhook(req, res) {
  if (req.query.token !== process.env.CONTENTFUL_WEBHOOK_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
