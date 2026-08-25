# Phase 12B — Positioning Behind the Rebound: Result

## Status

Historical mechanism exploration. Not a new external validation and not a trading strategy.

Phase 12B tested the third mechanism that had been frozen before Phase 12A results were viewed:

> Among positive rebounds inside Day-20 persistent weakness, does aggregate NSE single-stock futures open-interest change from the stock-price trough to Day 20 alter the relationship between rebound size and subsequent 40-session sector-relative performance?

The predeclared expected interaction was **positive**. The idea was that increasing aggregate futures OI during the rebound might weaken the previously negative rebound-to-future-underperformance relationship.

Price up plus OI down remained described only as a **position-reduction proxy**, not proof of short covering.

---

## Data coverage

The Phase 12A positive-rebound sample contained 1,128 observations across 345 stocks.

Official NSE F&O bhavcopy data produced valid trough and Day-20 aggregate futures OI for:

- **457 observations**;
- **174 unique stocks**;
- **40.5%** of the Phase 12A mechanism sample.

The predeclared minimum coverage gate was 200 observations, so the Phase 12B primary test passed the coverage gate.

Coverage rose over time, from roughly 28–45% in most earlier years to about 48% in 2025 and 56% in the partial 2026 sample. This is a structurally narrower population because only stocks with valid single-stock futures data can enter H2.

---

# H2 — Aggregate futures OI change

## Locked hypothesis

Higher aggregate futures OI change from the stock-price trough to Day 20 was expected to **weaken** the negative relationship between rebound magnitude and subsequent 40D sector-relative performance.

Expected interaction sign: **positive**.

## Result

Controlled rank-regression interaction:

- observations: **457**;
- unique stocks: **174**;
- interaction coefficient: **-0.218905**;
- ticker-clustered SE: **0.167392**;
- descriptive two-sided p-value: **0.190961**;
- locked sign matched: **no**.

The result therefore fails the predeclared directional hypothesis.

### Cluster bootstrap

Ticker-cluster bootstrap, 2,000 draws:

- 2.5%: **-0.551622**;
- median: **-0.217605**;
- 97.5%: **+0.124274**;
- draws with the expected positive sign: **9.50%**.

Calendar-quarter bootstrap, 2,000 draws:

- 2.5%: **-0.492997**;
- median: **-0.227749**;
- 97.5%: **+0.033597**;
- draws with the expected positive sign: **3.65%**.

Both bootstrap intervals cross zero, but their medians are negative and the vast majority of draws are opposite to the predeclared positive direction.

---

## Descriptive OI-change quartiles

The quartile pattern does not provide a clean alternative mechanism.

| OI-change quartile | Median approximate OI change | Rebound vs future sector-40D rho | Median future sector-40D | Underperformance rate |
|---|---:|---:|---:|---:|
| Q1 | -18.0% | +0.092 | -2.21% | 61.7% |
| Q2 | -5.7% | -0.005 | -3.56% | 61.4% |
| Q3 | -0.3% | +0.095 | -0.26% | 51.8% |
| Q4 | +9.5% | -0.155 | -1.46% | 57.0% |

Only Q4 shows a noticeably negative rebound-versus-future rank relationship. The sequence across Q1–Q4 is non-monotonic, so the opposite-sign interaction should not be promoted into a new mechanism after seeing the result.

---

## OI-up versus OI-down descriptive split

Among valid H2 observations:

### OI down / position-reduction proxy

- observations: **291**;
- unique stocks: **139**;
- median OI log change: **-0.080**;
- median rebound: **3.74%**;
- median future 40D sector-relative return: **-1.89%**;
- underperformance rate: **59.1%**.

### OI up / position-expansion proxy

- observations: **164**;
- unique stocks: **105**;
- median OI log change: **+0.058**;
- median rebound: **3.25%**;
- median future 40D sector-relative return: **-1.17%**;
- underperformance rate: **56.1%**.

The unconditional split is modestly more favorable for OI-up observations, while the controlled rebound-by-OI interaction is negative. These two views do not form a clean single economic story.

The direct Spearman association between OI change and future sector-relative return was **+0.069**. This is small and was not the locked H2 target.

---

## Futures-volume secondary diagnostic

The secondary association between futures-volume change and subsequent 40D sector-relative return was essentially zero:

- observations: **457**;
- Spearman rho: **+0.0177**.

No futures-volume mechanism is promoted from this result.

---

# Decision

**H2 is not supported.**

The interaction sign is opposite to the predeclared hypothesis, the clustered uncertainty intervals cross zero, and the descriptive quartiles do not show a clean monotonic mechanism gradient.

The opposite-sign estimate is not re-labeled as a new confirmed finding. It can be recorded as an exploratory observation, but it does not justify continuing to add basis, delivery, turnover, or other participation variables merely to rescue the rebound mechanism.

---

# Phase 12 branch conclusion

Across Phase 12A and 12B, none of the three predeclared rebound-mechanism hypotheses was supported strongly enough to carry forward:

1. **Peer confirmation:** expected positive interaction, weak and unstable.
2. **Positive-return concentration:** expected negative interaction, observed sign positive.
3. **Aggregate futures OI change:** expected positive interaction, observed sign negative.

The mechanism branch is therefore closed rather than expanded into a larger indicator search.

The strongest exploratory clue from Phase 12A was different in character: **how recently the stock made its trough appeared much more related to whether the weakness episode itself remained active than rebound concentration did.**

That motivates a new research question focused on the lifecycle and termination of persistent-weakness episodes rather than another attempt to explain the small 40D rebound-return relationship.
