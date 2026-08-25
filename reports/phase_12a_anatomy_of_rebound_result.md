# Phase 12A — Anatomy of a Rebound: Result

## Status

Historical mechanism exploration. Not a new external validation and not a trading strategy.

Phase 12A tested two predeclared mechanism hypotheses inside the 400-stock Phase 10 validation universe:

- H1 peer confirmation;
- H3 positive-return concentration.

The original Day-20 episode definition, 40-session sector-relative outcome, and >60-session same-stock spacing rule were retained.

---

## Baseline reconstruction

The Phase 10 result reconstructed essentially exactly:

- observations: **1,386**;
- unique stocks: **352**;
- Spearman rho between Day-20 rebound and subsequent 40D sector-relative return: **-0.061088**.

This matches the published Phase 10 reference closely enough to pass the reconstruction gate.

The positive-rebound mechanism sample contained:

- observations: **1,128**;
- unique stocks: **345**;
- rebound-vs-sector-40D Spearman rho: **-0.034244**.

Thus, restricting the analysis to observations with an actual positive rebound weakened the baseline relationship further. About 18.6% of the full Phase 10 primary sample was excluded by the positive-rebound mechanism rule.

---

# H1 — Peer confirmation

## Locked hypothesis

Higher peer confirmation during the stock-specific trough-to-Day-20 rebound interval was expected to weaken the negative relationship between rebound magnitude and subsequent sector-relative performance.

Expected interaction sign: **positive**.

## Result

Controlled rank-regression interaction:

- coefficient: **+0.029978**;
- ticker-clustered SE: **0.103230**;
- descriptive two-sided p-value: **0.771506**;
- locked sign matched: **yes**.

Cluster bootstrap:

### Ticker clusters

- 2.5%: **-0.166118**;
- median: **+0.031611**;
- 97.5%: **+0.231503**;
- draws with expected positive sign: **62.20%**.

### Calendar-quarter clusters

- 2.5%: **-0.155801**;
- median: **+0.026987**;
- 97.5%: **+0.229275**;
- draws with expected positive sign: **61.35%**.

## Descriptive quartiles

Peer-confirmation quartiles did not show a clean mechanism gradient.

| Peer-confirmation quartile | Median confirmation | Rebound vs future sector-40D rho | Median future sector-40D | Underperformance rate |
|---|---:|---:|---:|---:|
| Q1 | 0.410 | -0.003 | -1.99% | 58.9% |
| Q2 | 0.651 | -0.056 | -2.01% | 61.7% |
| Q3 | 0.794 | -0.072 | -2.47% | 57.4% |
| Q4 | 0.926 | -0.024 | -1.38% | 55.7% |

## Decision

**H1 is not historically supported strongly enough to freeze as a prospective mechanism.**

The interaction has the expected sign but is very small relative to its uncertainty, both cluster-bootstrap intervals cross zero widely, and the descriptive bins do not show an economically clean progression.

---

# H3 — Positive-return concentration

## Locked hypothesis

A rebound dominated by one large positive day was expected to strengthen the negative relationship between rebound magnitude and subsequent sector-relative performance.

Expected interaction sign: **negative**.

## Result

Controlled rank-regression interaction:

- coefficient: **+0.079774**;
- ticker-clustered SE: **0.112906**;
- descriptive two-sided p-value: **0.479848**;
- locked sign matched: **no**.

Cluster bootstrap:

### Ticker clusters

- 2.5%: **-0.147756**;
- median: **+0.084578**;
- 97.5%: **+0.296839**;
- draws with the expected negative sign: **24.60%**.

### Calendar-quarter clusters

- 2.5%: **-0.136219**;
- median: **+0.090270**;
- 97.5%: **+0.329142**;
- draws with the expected negative sign: **21.55%**.

## Descriptive quartiles

| Concentration quartile | Median concentration | Rebound vs future sector-40D rho | Median future sector-40D | Underperformance rate |
|---|---:|---:|---:|---:|
| Q1 | 0.268 | -0.020 | -3.41% | 62.4% |
| Q2 | 0.392 | -0.040 | -0.96% | 54.6% |
| Q3 | 0.578 | -0.054 | -2.22% | 60.6% |
| Q4 | 1.000 | +0.027 | -1.99% | 56.0% |

There is no clean negative interaction gradient.

## Decision

**H3 fails the predeclared directional hypothesis.**

The controlled interaction is positive rather than negative, the bootstrap medians are positive, and fewer than one quarter of bootstrap draws have the expected negative sign.

---

# Secondary episode-survival pattern

The concentration quartiles show a visually strong monotonic pattern in episode persistence:

| Concentration quartile | Median remaining episode sessions | Survives +5 sessions | Survives +10 sessions |
|---|---:|---:|---:|
| Q1 | 3 | 37.2% | 17.7% |
| Q2 | 4 | 46.5% | 24.5% |
| Q3 | 8 | 63.1% | 42.6% |
| Q4 | 10 | 74.1% | 54.3% |

This is **not evidence that one-day-concentrated rebounds cause weakness to persist**.

A post-result audit shows that positive-return concentration is strongly tied to rebound-window age:

- Spearman rho between concentration and rebound-window sessions: **-0.851**.

In practical terms, the shortest rebound windows are almost mechanically the most concentrated. For example, a one-session rebound necessarily has concentration equal to 1.0.

The same post-result audit shows:

- concentration vs remaining episode sessions: rho **+0.328**;
- concentration vs future 40D sector-relative return: rho **+0.025**.

The survival pattern therefore appears to be dominated by **how recently the stock made its trailing-20-session trough**, not by concentration as an independent rebound-quality mechanism.

A post-hoc clustered logistic diagnostic reinforces this interpretation: after simultaneously controlling for trough age, rebound magnitude, current severity, prior maximum severity, and year, concentration did not materially explain 10-session episode survival, while trough age remained strongly related to survival. This diagnostic is exploratory and was not part of the predeclared Phase 12A decision rule.

---

# What Phase 12A changes in the research interpretation

1. **Peer breadth does not clearly explain the Phase 10 return relationship.**
2. **One-day rebound concentration does not behave in the direction hypothesized.**
3. **Rebound timing / trough recency looks more important for episode persistence than rebound concentration.**
4. The original Phase 10 relationship becomes weaker when restricted to actual positive-rebound observations (`rho = -0.034` versus `-0.061` in the full primary sample).

That last point matters. It suggests the original Day-20 relationship should not be casually described as a strong "rebound quality" effect. Some of its ordering appears to come from the broader Day-20 state, including observations with little or no rebound.

---

# Phase 12A conclusion

Neither H1 nor H3 passes the predeclared standard for promotion to prospective mechanism testing.

This is a useful failure rather than a reason to retune the hypotheses. The next predeclared mechanism, H2, uses a qualitatively different information source: **NSE single-stock futures positioning**.

Phase 12B should therefore proceed without changing H2:

> higher aggregate futures OI change during the rebound interval is expected to weaken the negative rebound-to-future-underperformance relationship.

Price-up / OI-down observations will remain described only as a **position-reduction proxy**, not proof of short covering.
