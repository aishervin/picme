export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const prompt = decodeURIComponent(url.pathname.slice(1)).trim();

  if (!prompt) {
    return new Response(
      `<html><body style="font-family:system-ui;text-align:center;padding:2rem">
       <h2>®️SHΞN™ᴢᴇʀᴏ </h2>
       <p>Add a prompt to the URL, e.g. <a href="/SHERVIN%20logotype">/SHERVIN Logotype</a></p>
       </body></html>`,
      { headers: { "content-type": "text/html;charset=UTF-8" } }
    );
  }

  try {
    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      { prompt }
    );

    return new Response(response, {
      headers: { "content-type": "image/png" }
    });
  } catch (err) {
    return new Response(
      `Error: ${err.message}\n\nenv.AI type: ${typeof env.AI}\n\nStack: ${err.stack}`,
      { headers: { "content-type": "text/plain" } }
    );
  }
}
