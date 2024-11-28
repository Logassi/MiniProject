import app from "./server";
import { PORT as port } from "./utils/envConfig";

const PORT = port || 8000;

// dont forget to start the MySQL80 via cmd run as admin
// CL : net start MySQL80

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
