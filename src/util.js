export function joinSiteAndPath(site, path) {
  const normalizedSite = site.toString().endsWith('/')
    ? site.toString().slice(0, site.length - 1)
    : site;
  return `${normalizedSite}${path}`;
}
