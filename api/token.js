export default async function handler(req, res) {
if (req.method !== "GET") {
return res.status(405).json({ error: "Method not allowed" });
}

const clientId = process.env.a0644d8cba7f44b8bdbd4de080be7b25;
const clientSecret = process.env.35df3d1c6eaa4bfbb6a0ab033f76e839;

if (!clientId || !clientSecret) {
return res.status(500).json({ error: "Missing Spotify credentials" });
}

const auth = Buffer.from(
`${clientId}:${clientSecret}`
).toString("base64");

try {
const response = await fetch("https://accounts.spotify.com/api/token", {
method: "POST",
headers: {
Authorization: `Basic ${auth}`,
"Content-Type": "application/x-www-form-urlencoded",
},
body: "grant_type=client_credentials",
});

const data = await response.json();
res.status(200).json(data);
} catch (err) {
res.status(500).json({ error: "Failed to fetch token" });
}
}
