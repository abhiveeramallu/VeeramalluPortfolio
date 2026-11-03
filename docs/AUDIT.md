# Audit — November 2026 (frozen archive transformation)

The previous audit (October 2026 upgrade) is in git history.

## Repository state before this change

- Next.js 14 App Router, TypeScript strict, Tailwind, R3F/drei, Framer Motion, Lenis; Vitest + Playwright + GitHub Actions; streaming chat, contact API with honest delivery reporting, pdf-lib résumé, OG images, sitemap/robots/JSON-LD. All of this was working and is preserved.
- Content: six projects, of which four had no matching repository (Lumina, Kinetic Craft) or were renamed versions of real repositories with unsupported numbers (DocuSense, Aura Flora). Many metrics marked `TODO: verify`.
- A Playground with five experiments, a design-process section written as product-design research that the repositories don't show, placeholder testimonials, and a warm orange brand.

## GitHub repositories inspected (22)

| Repository                                                                                                                        | Used as                     | Notes                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------ |
| RouteFusion                                                                                                                       | Case study                  | README + system design; live demo responds                                                             |
| ThreatlensAI                                                                                                                      | Case study                  | README, METRICS / ADVERSARIAL_TEST / THREAT_MODEL referenced; package.json checked; live demo responds |
| Image_Guard                                                                                                                       | Case study                  | README; `ImageGuard` is an earlier copy with the same code in a subfolder                              |
| visionRag                                                                                                                         | Case study                  | README (VisionRAG-X)                                                                                   |
| Honeypot-Attack-Classification                                                                                                    | Case study                  | README                                                                                                 |
| EdgeAiThermalManagementUsingStm32                                                                                                 | Case study                  | No README; read `training_summary.txt`, `outputs/*`, `live_uart.py`                                    |
| GreenHouseMicroClimateForcastingModel                                                                                             | Case study                  | README; live demo responds                                                                             |
| Smart-Document-Intelligence                                                                                                       | Case study                  | README                                                                                                 |
| StockMind                                                                                                                         | Case study (in development) | README; created Nov 2026                                                                               |
| Tickbooking, SignalAppClone, GreenTwin, RegretForecaster, AI-AssistedPolicyManagementSystem, ShadowHunter-Network-Monitoring-Tool | Archive list                | README summaries only                                                                                  |
| Bot-detection                                                                                                                     | Not listed                  | Earlier version of ThreatLensAI                                                                        |
| ImageGuard                                                                                                                        | Not listed                  | Duplicate of Image_Guard                                                                               |
| NewsGroups, Hospital-Data-Management-System-, chatbot-for-PDFs, pythonchatbott                                                    | Not listed                  | Small or early exercises                                                                               |
| VeeramalluPortfolio                                                                                                               | —                           | This site                                                                                              |

## Phases executed

1. Audit and content verification — this document; `data/content.ts` rewritten from the repositories.
2. Playground removal — routes, components, data, tests, SEO, palette, chat, docs.
3. Design system — frozen palette, type, tokens with contrast tests.
4. 3D environment — procedural world, scroll-driven camera, artifacts, fallbacks.
5. Projects — home journey, `/work` index with archive, case-study structure.
6. About, contact, résumé — rewritten from verified facts.
7. Performance and accessibility — interaction-triggered WebGL, tiers, culling, reduced motion, scene index.
8. Validation — typecheck, lint, format, unit, build, Playwright, Lighthouse, manual desktop/mobile review.
