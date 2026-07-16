export async function GET() {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${process.env.INSTAGRAM_ACCOUNT_ID}/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`,
    );

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch Instagram posts" },
      { status: 500 },
    );
  }
}
