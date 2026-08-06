export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const prompt = decodeURIComponent(url.pathname.slice(1)).trim();

  if (!prompt) {
    return new Response(
      `<html><body style="font-family:system-ui;margin:0;padding:1rem;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#121212;color:#ffffff;">
        <div style="text-align:center;">
          <h2>SHΞN™🎴ᴘʀᴏᴍᴘɪᴄ</h2>
          <p style="color:#b0b0b0;">Add prompt after URL<br>
          <a href="/a cyberpunk cat" style="color:#00e5ff;">Example</a></p>
        </div>
      </body></html>`,
      { headers: { "content-type": "text/html;charset=UTF-8" } }
    );
  }

  // گزینه A: Redirect مستقیم (ساده‌ترین)
  // return Response.redirect(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`);
  
  // گزینه B: Proxy (URL خودت حفظ می‌شه)
  try {
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&seed=${Math.floor(Math.random() * 100000)}`;
    const imageResponse = await fetch(imageUrl);
    
    return new Response(imageResponse.body, {
      headers: {
        "content-type": "image/jpeg",
        "cache-control": "public, max-age=3600"
      }
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
