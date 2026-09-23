import { createRoot } from "react-dom/client";
import { Gallery } from "./Gallery";
import "./gallery.css";

const root = document.getElementById("root");
if (!root) throw new Error("Gallery root missing");
createRoot(root).render(<Gallery />);
