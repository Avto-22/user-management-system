const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");

server.use(cors());
server.options("*", cors());

server.get("/users", (req, res) => {
  const searchQuery = req.query.searchQuery?.toLowerCase().trim() || "";
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  let users = router.db.get("users").value();

  if (searchQuery) {
    users = users.filter(
      (user) =>
        user.name?.toLowerCase().trim()?.includes(searchQuery) ||
        user.workplace?.toLowerCase().trim()?.includes(searchQuery),
    );
  }

  const totalRecords = users.length;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  users = users.slice(startIndex, endIndex);
  res.status(200).json({ users, page, totalRecords });
});

server.get("/check-email/:email/:uid", (req, res) => {
  const email = req.params.email;
  const uid = +req.params.uid;
  const users = router.db.get("users").value();
  const isEmailTaken = users
    .filter((user) => user.id !== uid)
    .some((user) => user.email === email);
  res.json(isEmailTaken);
});

server.get("/check-name/:name/:uid", (req, res) => {
  const name = req.params.name;
  const uid = +req.params.uid;
  const users = router.db.get("users").value();
  const isNameTaken = users
    .filter((user) => user.id !== uid)
    .some((user) => user.name === name);
  res.json(isNameTaken);
});

server.get("/user/:uid", (req, res) => {
  const uid = +req.params.uid;
  const users = router.db.get("users").value();
  const user = users.find((user) => user.id === uid);
  res.json({ ...user });
});

server.use(middlewares);
server.use(router);

server.listen(5000, () => {
  console.log("JSON Server is running on port 5000");
});
