import "./App.css";
import Router from "./routes";
import "@fontsource/roboto-slab";
import { Providers } from "./providers";

console.log(process.env.REACT_APP_API_URL);

const App = () => {
  return (
    <Providers>
      <Router />
    </Providers>
  );
};

export default App;
