export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.ignores.add("src/admin/**");

  const byDate = (a, b) => new Date(a.data.debut ?? a.data.date) - new Date(b.data.debut ?? b.data.date);
  eleventyConfig.addCollection("evenements", (api) =>
    api.getFilteredByGlob("src/evenements/*.md").sort(byDate));
  eleventyConfig.addCollection("actualites", (api) =>
    api.getFilteredByGlob("src/actualites/*.md").sort(byDate).reverse());
  eleventyConfig.addCollection("pieces", (api) =>
    api.getFilteredByGlob("src/pieces/*.md").sort((a, b) => b.data.annee - a.data.annee));

  const fmt = (d, opts) => new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", ...opts }).format(new Date(d));
  eleventyConfig.addFilter("dateLongue", (d) => fmt(d, { day: "numeric", month: "long", year: "numeric" }));
  eleventyConfig.addFilter("jourCourt", (d) => fmt(d, { weekday: "short" }));
  eleventyConfig.addFilter("jourNum", (d) => fmt(d, { day: "numeric" }));
  eleventyConfig.addFilter("moisCourt", (d) => fmt(d, { month: "short" }));
  eleventyConfig.addFilter("heure", (d) => fmt(d, { hour: "2-digit", minute: "2-digit" }).replace(":00", "h").replace(":", "h"));
  eleventyConfig.addFilter("aVenir", (list) => list.filter((e) => new Date(e.data.debut) >= new Date(Date.now() - 864e5)));
  eleventyConfig.addFilter("jourISO", (d) => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris" }).format(new Date(d)));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  return { dir: { input: "src", output: "_site" } };
}
