import { app } from "./src/app.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.SERVER_PORT || 5001;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "되어봐요 숲잘알 API 문서",
    version: "1.0.0",
    description: "되어봐요 숲잘알 API 문서",
  },
  servers: [
    {
      url: "http://localhost:5001",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routers/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => {
  console.log(`\
 /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$ /$$
| $$|__/|__/|__/|__/|__/|__/|__/|__/|__/|__/|__/|__/|__/|__/|__/|__/|__// $$
| $$                                                                    | $$
| $$        /$$$$$$   /$$$$$$   /$$$$$$         /$$$$$$  /$$   /$$      | $$
| $$       /$$__  $$ /$$$_  $$ /$$$_  $$       /$$__  $$| $$  /$$/      | $$
| $$      |__/  \\ $$| $$$$\\ $$| $$$$\\ $$      | $$  \\ $$| $$ /$$/       | $$
| $$        /$$$$$$/| $$ $$ $$| $$ $$ $$      | $$  | $$| $$$$$/        | $$
| $$       /$$____/ | $$\\ $$$$| $$\\ $$$$      | $$  | $$| $$  $$        | $$
| $$      | $$      | $$ \\ $$$| $$ \\ $$$      | $$  | $$| $$\\  $$       | $$
| $$      | $$$$$$$$|  $$$$$$/|  $$$$$$/      |  $$$$$$/| $$ \\  $$      | $$
| $$      |________/ \\______/  \\______/        \\______/ |__/  \\__/      | $$
| $$                                                                    | $$
| $$ ================================================================== | $$
| $$ ----------           Fun하고 Cool하고 Sexy하게          ---------- | $$
| $$ 777777777777777777777777777777777777777777777777777777777777777777 | $$
| $$                                                                    | $$
|/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$/$$
/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/__/\
  `);
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
