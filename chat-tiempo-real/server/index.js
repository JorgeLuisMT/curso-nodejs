import express from "express";
import logger from "morgan";
import {createClient} from "@libsql/client";
import dotenv from "dotenv";

import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3001;

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const db= createClient({
  url: "libsql://right-forgotten-one-jorgeluismt.turso.io",
  authToken: process.env.DB_TOKEN
})

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
  )
`)

io.on("connection", async (socket) => {
  console.log("a user has connected");

  socket.on("disconnect", () => {
    console.log("an user has disconnected");
  });

  socket.on("chat message", async (msg) => {
  let result;
  let username=socket.handshake.auth.user
    try {
      result = await db.execute({
        sql:'INSERT INTO messages (content, user) VALUES (:msg, :username)',
        args:{msg, username}
      })
    } catch (error) {
      console.error(error);
      return
    }

    io.emit("chat message", msg, result.lastInsertRowid.toString(), username);
  });

  console.log(socket.handshake.auth.serverOffsetMsg)

  if(!socket.recovered){
    try {
      console.log("hola")
      const results = await db.execute({
        sql:'SELECT id, content, user FROM messages WHERE id > ?',
        args:[socket.handshake.auth.serverOffsetMsg ?? 0]
      })

      results.rows.forEach(row=>{
        socket.emit("chat message", row.content, row.id.toString(), row.user)
      })
    } catch (error) {
      console.error(error);
    }
  }
});

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(port, () => console.log(`http://localhost:${port}`));
