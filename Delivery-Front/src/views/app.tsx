import { Counter } from "$/views/counter";
import jsxpineLogo from "/jsxpine.jpg";
import viteLogo from "/vite.svg";

export function App() {
  const readDoccs = new Intl.ListFormat("en", {
    style: "long",
    type: "disjunction",
  }).format(["vite", "jsxpine"]);

  return (
    <div class="text-2xl font-bold text-center ">hello world</div>
  );
}
