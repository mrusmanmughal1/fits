const http = require("http");

function post(data) {
  const body = JSON.stringify(data);
  const req = http.request(
    {
      hostname: "127.0.0.1",
      port: 3000,
      path: "/api/auth/register",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    },
    (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        console.log("STATUS", res.statusCode);
        try {
          console.log("BODY", JSON.stringify(JSON.parse(d), null, 2));
        } catch {
          console.log("BODY", d);
        }
      });
    }
  );
  req.on("error", (e) => console.error("ERR", e.message));
  req.write(body);
  req.end();
}

post({ email: "nope", password: "short" });
