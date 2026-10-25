import { registerRootComponent } from "expo";
import App from "./src/App";

// registerRootComponent ensures the environment (Expo Go / native) sets up
// the root component correctly across platforms.
registerRootComponent(App);
