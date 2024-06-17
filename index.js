(() => {
  // index.js
  CHAT_ID = globalThis.TG_CHAT_ID;
  TOKEN = globalThis.TG_TOKEN;
  var Handler = class {
    async send(req) {
      const formData = await req.formData();
      const body = {};
      for (const entry of formData.entries()) {
        body[entry[0]] = entry[1];
      }
      const msg = {
        chat_id: CHAT_ID,
        text: "From: " + body["From"] + "\r\nT   o  : " + body["To"] + "\r\n==== Message: ====\r\n" + body["Body"]
      };
      const init = {
        body: JSON.stringify(msg),
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8"
        }
      };
      let url = "https://api.telegram.org/bot" + TOKEN + "/sendMessage";
      console.log(await fetch(url, init));
      return new Response("", { status: 200 });
    }
  };
  var handler = new Handler();
  addEventListener("fetch", (event) => {
    event.respondWith(handler.send(event.request));
  });
})();
//# sourceMappingURL=index.js.map
