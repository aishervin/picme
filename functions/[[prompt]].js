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
      "@cf/black-forest-labs/flux-1-schnell",
      { prompt }
    );

    // تبدیل داده base64 به بایت‌های تصویر
    const binaryString = atob(response.image);
    const imgBytes = Uint8Array.from(binaryString, (m) => m.codePointAt(0));

    return new Response(imgBytes, {
      headers: { "content-type": "image/jpeg" }
    });
  } catch (err) {
    // ...
  }
