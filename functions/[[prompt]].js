export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const prompt = decodeURIComponent(url.pathname.slice(1)).trim();

  if (!prompt) {
    return new Response(
      `<html>
        <body style="font-family:system-ui;margin:0;padding:1rem;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#121212;color:#ffffff;box-sizing:border-box;">
          <div style="text-align:center;">
            <h2 style="margin-bottom:0.5rem;">SHΞN™🎴ᴘʀᴏᴍᴘɪᴄ</h2>
            <p style="color:#b0b0b0;">
              Add prompt after URL, e.g.<br>
              <a href="/SHERVIN%20logotype"
                 style="color:#00e5ff;text-decoration:underline;text-underline-offset:2px;">
                Prompic.page.dev/SHERVIN Logotype
              </a>
            </p>
          </div>
        </body>
      </html>`,
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
    return new Response(
      `Error: ${err.message}\n\nenv.AI type: ${typeof env.AI}\n\nStack: ${err.stack}`,
      { headers: { "content-type": "text/plain" } }
    );
  }
}
