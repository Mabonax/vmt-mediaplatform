import demo from "./demo.json";
import { parseServicePromo } from "../../../engine/schemas/promo";
export const demoPromo = parseServicePromo(demo);
