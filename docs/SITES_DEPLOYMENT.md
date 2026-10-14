# Sites catalog copy

The Medusa application remains the source for the Ubuntu deployment. A separate static catalog is registered in Sites for preview and sharing, with the same English/Arabic pages, product records, local artwork, and WhatsApp flow.

- Project ID: `appgprj_6acff2613c6c81919eca22936ae67757`
- Site origin: `https://immortal-games-store.briskcivet256.chatgpt.site`
- Local Sites checkout: `D:\immortal_games\sites\immortal-games-store`
- Audience: private to the owner by default

`scripts/build-sites.cjs` renders the existing storefront's React components into HTML. `scripts/sites-browser.js` supplies catalog filtering, category deep links, language switching, and the deal slider. This copy uses the checked-in catalog snapshot rather than a live Medusa backend.

Build prerequisites are the storefront dependencies. Set `SITES_ORIGIN` to the returned Site origin, then run `node scripts/build-sites.cjs`. If building from the separate checkout while reusing installed dependencies, set `SITES_DEPENDENCY_APP` to the original storefront app directory. When a completed Next build is present there, its font assets are copied into the static output for local font serving.

Run `node scripts/verify-sites.cjs` against the generated `dist` directory. The verifier checks links, assets, fonts, all policy routes, language direction, contact details, and warranty periods. Build output is ignored in Git and included only in the Sites deployment archive.

Source preparation, Git synchronization, archive packaging, and publication use the installed Sites workflow helper and native tools. Credentials are supplied through hidden stdin and are not persisted. For future updates, reuse the project ID above and the hosting manifest in the separate checkout; do not register a duplicate Site.
