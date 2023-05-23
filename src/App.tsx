import { useRoutes } from "react-router-dom";
import { routes } from "src/routes/route";

function App() {
  const content = useRoutes(routes);
  return <>{content}</>;
}

export default App;
