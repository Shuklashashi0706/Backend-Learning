import { connectDB } from "./data/database.js";
import  {app}  from "./app.js";
//connecting databse
connectDB();
const port = process.env.PORT;

app.listen(port, (req, res) => {
  console.log(`Listening at port no: ${port}`);
});
