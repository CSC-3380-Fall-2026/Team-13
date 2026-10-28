import { createElement } from "react";
// @ts-ignore TS6142: JSX is configured by the frontend build toolchain.
import SearchScreen from "./src/screens/SearchScreen";

export default function App() {
  return createElement(SearchScreen);
}