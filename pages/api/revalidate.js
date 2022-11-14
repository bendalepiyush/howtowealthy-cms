export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request

  if (!isValidRequest(req)) {
    return res.status(401).json({ message: "Invalid request" });
  }

  try {
    // revalidate the page
    await res.revalidate(req.body.path);

    return res.json({ revalidated: true });
  } catch (err) {
    // if there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({ message: "Error revalidating" });
  }
}

const isValidRequest = (req) => {
  /* TODO: implement */
  if (req.body.secret === process.env.REVALIDATE_SECRET_TOKEN) {
    return true;
  }

  return false;
};
