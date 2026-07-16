export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");

  console.log("OAuth Code:", code);

  return Response.json({
    message: "Authentication successful",
    code,
  });
}
