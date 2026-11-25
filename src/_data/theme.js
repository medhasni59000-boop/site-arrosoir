// Calcule les couleurs finales à partir de la rubrique « Apparence » de l'admin
// (fichier apparence.json). Pour ajouter une palette, copier un bloc ci-dessous.
import { readFileSync } from "node:fs";

const palettes = {
  "rideau-rouge": { principale: "#a3192f", accent: "#e3b04b", fond: "#faf5ee", fond_alterne: "#f2e8da", fond_sombre: "#170f13", texte: "#1d1418" },
  "bleu-nuit":    { principale: "#2b4c9b", accent: "#f0b429", fond: "#f6f7fb", fond_alterne: "#e6eaf4", fond_sombre: "#0f1626", texte: "#141a2a" },
  "vert-foret":   { principale: "#2f6b4f", accent: "#d9a441", fond: "#f6f4ec", fond_alterne: "#e7eadb", fond_sombre: "#102019", texte: "#172119" },
  "prune":        { principale: "#7a2e6e", accent: "#f2a65a", fond: "#fbf6f8", fond_alterne: "#f1e4ec", fond_sombre: "#1c1020", texte: "#201424" },
};

export default function () {
  const a = JSON.parse(readFileSync(new URL("./apparence.json", import.meta.url), "utf8"));
  const c = a.palette === "personnalise" ? { ...palettes["rideau-rouge"], ...a.couleurs } : (palettes[a.palette] || palettes["rideau-rouge"]);
  const url = (u) => (u ? `url("${u}")` : "none");
  const voile = Math.max(0, Math.min(100, Number(a.assombrir_image_accueil ?? 75)));
  const css = [
    `--principale: ${c.principale}`,
    `--accent: ${c.accent}`,
    `--fond: ${c.fond}`,
    `--fond-alterne: ${c.fond_alterne}`,
    `--fond-sombre: ${c.fond_sombre}`,
    `--texte: ${c.texte}`,
    `--hero-image: ${url(a.image_accueil)}`,
    `--hero-voile-pct: ${voile}%`,
    `--pieces-image: ${url(a.image_pieces)}`,
    `--rideau: ${a.rideau === false ? 0 : 1}`,
  ].join("; ");
  return { css: `:root { ${css}; }`, couleurs: c };
}
