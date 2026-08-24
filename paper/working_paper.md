# Persistent Relative Weakness and Rebound Dynamics in Indian Equities

**Working Paper / Research Report — Version 0.1**  
**Research cutoff:** 21 August 2026  
**Status:** Ongoing research; not peer reviewed; not a trading recommendation

---

## Abstract

This study examines how persistent relative weakness develops and evolves across Indian equities. Rather than begin with a fixed trading rule, the project first constructs continuous measures of weakness versus both the Nifty 50 and leave-one-out sector peers, then studies persistence, concentration, episode structure, rebound behaviour, and forward return paths.

The initial discovery universe contains 100 current Nifty 500 stocks sampled across five market-cap strata. Early stock-date analyses show that simple measures of prior weakness have weak and unstable relationships with subsequent market-relative returns, while sector-relative weakness is somewhat more persistent. To reduce dependence from repeated daily observations, consecutive weak sessions are compressed into weakness episodes.

A retrospective episode analysis initially appears to show a strong “weakness → rebound → renewed deterioration” pattern. Further audit reveals that this result is contaminated by selecting the maximum rebound using future data and then measuring returns from that selected turning point. The result is therefore rejected as prospective evidence.

The experiment is redesigned using fixed, prospectively observable Day-5, Day-10, and Day-20 episode landmarks. In the reduced-overlap discovery sample, the strongest candidate appears at Day 20: a larger rebound from the trailing-20-session stock trough is associated with poorer subsequent 40-session performance relative to sector peers (Spearman rho approximately -0.188; 360 observations). The specification is then frozen before external validation.

The candidate is tested on the complete 400-stock complement of the same frozen Nifty 500 snapshot, with zero overlap with the discovery stocks. The relationship replicates with substantial effect-size shrinkage: Spearman rho = -0.061 across 1,386 valid observations from 352 validation stocks. Predeclared stock-, calendar-quarter-, and sector-cluster bootstrap criteria all pass. The result is primarily sector-relative: corresponding relationships with absolute 40-session stock returns and Nifty-relative returns are near zero.

The evidence therefore supports a modest cross-sectionally replicated relationship, not an outright shorting rule. The next stage is prospective monitoring on observations occurring after the historical research cutoff.

---

## 1. Introduction

A stock can appear “weak” for very different reasons. It may suffer one concentrated drawdown, drift lower across many sessions, underperform the broad market while holding up against peers, or lag both the market and its own sector. These paths need not have the same economic meaning or the same subsequent behaviour.

This project began with a simple intuition: persistent laggards may continue to lag. Rather than immediately convert that intuition into a threshold-based backtest, the analysis asks a more basic question:

> **What does persistent relative weakness actually look like, and what paths do weak stocks follow after that weakness becomes observable?**

A second question is deliberately kept separate:

> **Does any prospectively observable state within that process contain useful information about subsequent returns?**

Separating these questions is important. A useful description of laggard behaviour is not automatically a profitable trading rule, and a historically attractive pattern may disappear once overlap, hindsight, and sample selection are handled more carefully.

The study therefore follows a staged research process: measurement, classification, episode construction, path analysis, bias audit, prospective redesign, internal robustness testing, and cross-sectional external validation.

---

## 2. Research Design

### 2.1 Discovery universe

The original research universe contains 100 stocks sampled from the current Nifty 500. The sample is stratified by current market-cap rank:

- 20 stocks from ranks 1–100;
- 20 from 101–200;
- 20 from 201–300;
- 20 from 301–400;
- 20 from 401–500.

Sampling is sector-aware and reproducible using a fixed random seed of 42.

The approximate historical window is 2 January 2018 through 21 August 2026. The panel is intentionally unbalanced because some sampled companies listed after 2018.

### 2.2 External-validation universe

After a candidate relationship is identified and internally audited, the validation specification is frozen before examining the holdout result.

The external cross-sectional holdout uses **all 400 remaining stocks** from the same frozen Nifty 500 snapshot. No discovery stock appears in the validation universe.

This design tests cross-sectional generalization to unused stocks. It is **not** a future-time out-of-sample test because discovery and validation stocks share the same historical market period.

### 2.3 Known universe limitation

Historical analysis uses current Nifty 500 membership rather than reconstructing historical constituent membership. The study therefore remains exposed to survivorship and membership bias. This limitation is documented rather than treated as resolved.

---

## 3. Benchmark Construction

### 3.1 Market benchmark

The market benchmark is the Nifty 50.

### 3.2 Sector benchmark

For each stock and session, the sector benchmark is the equal-weight daily return of all other valid current Nifty 500 stocks in the same NSE sector.

The focal stock is excluded from its own benchmark. A minimum of two valid peers is required.

Conceptually, for stock *i* on day *t*:

```text
sector peer return(i,t)
    = mean return of valid same-sector stocks excluding i
```

This leave-one-out construction prevents the focal stock from mechanically contributing to the benchmark against which it is evaluated.

---

## 4. Measuring Weakness

The project avoids defining a laggard using one arbitrary threshold. Weakness is instead represented along several continuous dimensions.

### 4.1 Relative-return magnitude

For 5-, 10-, and 20-session windows, the analysis measures compounded relative performance versus:

- Nifty 50;
- leave-one-out sector peers.

### 4.2 Persistence

For the same windows, the analysis counts the number of sessions on which the stock underperforms each benchmark.

### 4.3 Concentration

A 20-session deterioration may arise from one or two large negative sessions or from smaller losses distributed across many sessions. The project therefore measures:

- top-3 negative-session concentration;
- effective negative days;
- negative-day evenness.

These features distinguish concentrated breakdowns from distributed persistent weakness without forcing either pattern into a discrete trading category.

---

## 5. From Stock-Dates to Weakness Episodes

Daily observations are highly dependent. A stock that remains weak for ten consecutive sessions should not automatically be treated as ten independent experiments.

A **weakness episode** is therefore defined as a consecutive run of valid market sessions during which both conditions hold:

```text
20D relative return vs Nifty < 0
AND
20D relative return vs sector peers < 0
```

No minimum episode duration is imposed and nearby episodes are not stitched together.

In the original 100-stock universe, 75,104 weak stock-sessions compress into 9,656 episodes, reducing repeated daily observations by roughly 87%. A second reduced-overlap sample keeps same-stock episode-start anchors more than 60 market sessions apart.

The raw episode structure is highly fragmented: approximately 31% of episodes last one session and roughly 45% last two sessions or fewer. However, short episodes are not dominated solely by tiny zero-crossings, so the analysis does not introduce an arbitrary minimum-duration rule simply to make episodes look cleaner.

---

## 6. Initial Forward-Path Results

### 6.1 Episode starts

The start of a weakness episode is prospectively observable. Forward returns are measured from the next session over multiple horizons.

The main descriptive result is that **market-relative weakness largely dissipates**. In the reduced-overlap sample, longer-horizon Nifty-relative outcomes move close to a 50/50 split between subsequent outperformance and underperformance.

Sector-relative weakness is somewhat more persistent. At 20–60 session horizons, stocks entering a weak-both state continue to show modestly negative median performance relative to their own sectors more often than relative to Nifty.

### 6.2 Severity and shape at episode start

Continuous start-of-episode measures such as:

- combined relative weakness;
- underperformance-day counts;
- concentration;
- effective negative days;

show little monotonic relationship with subsequent returns. In the reduced-overlap sample, most Spearman correlations are close to zero.

This is an important null result: **being more weak at the moment an episode begins does not, by itself, provide a strong continuation signal.**

---

## 7. A Strong-Looking Result That Was Rejected

A later experiment examined what happened after the retrospectively worst point of each completed episode.

The procedure was:

1. identify the maximum-severity date inside the completed episode;
2. inspect the next 20 sessions;
3. select the maximum cumulative rebound during that future window;
4. measure subsequent returns from the selected rebound maximum.

The resulting post-rebound deterioration appeared very strong.

However, this design contains a mechanical selection problem. If the rebound maximum is selected using the entire future 20-session path, subsequent returns measured from that maximum are partly constrained by the fact that the chosen point was the maximum within the search window.

The bias becomes visible when results are grouped by the location of the selected rebound peak. When the selected maximum occurs early in the 20-session search window, subsequent negative returns are extremely common. When the maximum occurs on session 20—the edge of the selection window—the apparent deterioration largely disappears.

This result is therefore retained as a methodological finding, but **rejected as evidence of a prospective rebound-then-decline signal**.

---

## 8. Prospective Redesign: Fixed Episode Landmarks

To remove the turning-point selection problem, the rebound hypothesis is reformulated using fixed episode ages that would have been observable in real time.

The primary landmarks are:

- Day 5;
- Day 10;
- Day 20.

At each landmark, all predictor information ends on that session and every future outcome begins at `t+1`.

The primary rebound variable is continuous:

`stock_rebound_trailing20_from_low`

It measures how far the stock has already rebounded from the lowest close-equivalent wealth level observed during the trailing 20 sessions ending at the landmark.

No +5%, +10%, or other rebound cutoff is optimized.

---

## 9. Discovery Result

The Day-5 relationship is weak and the Day-10 relationship remains small. The strongest candidate emerges among episodes that remain weak through **Day 20**.

In the reduced-overlap discovery sample:

| Landmark | Spearman: rebound vs future 40D sector-relative return |
|---|---:|
| Day 5 | -0.036 |
| Day 10 | -0.061 |
| Day 20 | **-0.188** |

The Day-20 sample contains 360 observations.

Descriptive rebound quartiles also show an ordered pattern:

| Rebound quartile | Median rebound | Median future sector-relative 40D | Sector-underperformance rate |
|---|---:|---:|---:|
| Q1 | 0.00% | +3.18% | 37.5% |
| Q2 | 1.61% | +0.90% | 47.2% |
| Q3 | 4.03% | -2.10% | 59.3% |
| Q4 | 8.88% | -4.13% | 60.9% |

These quartiles are descriptive and are **not** treated as trading thresholds.

---

## 10. Internal Robustness Audit

Because the Day-20 relationship is discovered after examining the original sample, internal robustness checks cannot convert it into independent confirmation. They can only determine whether the candidate is strong enough to justify a separate holdout test.

The candidate remains negative under:

- stock-cluster bootstrap resampling;
- calendar-quarter-cluster bootstrap resampling;
- sector-cluster bootstrap resampling;
- leave-one-year-out analysis;
- controls for current severity, maximum severity observed so far, sessions since trough, and calendar year;
- broad market-direction and volatility regimes.

Removing any single year leaves the primary Spearman correlation approximately between -0.166 and -0.206.

A controlled rank regression gives a negative rebound-rank coefficient of approximately -0.224 with ticker-clustered standard error of approximately 0.058.

These checks support moving to external validation, but they are not reported as independent evidence.

---

## 11. Locked Cross-Sectional External Validation

Before the 400-stock holdout returns are evaluated, the following are locked in the repository:

- Day-20 landmark;
- continuous rebound predictor;
- 40-session sector-relative primary outcome;
- expected negative direction;
- same-stock episode-start spacing greater than 60 sessions;
- 2,000 bootstrap repetitions;
- stock-, calendar-quarter-, and sector-cluster validation checks;
- no threshold optimization or episode-definition changes after seeing results.

The validation passes only if:

1. at least 200 valid independent Day-20 observations exist;
2. the primary Spearman correlation is negative;
3. ticker-cluster bootstrap 95% upper bound is below zero;
4. calendar-quarter-cluster bootstrap 95% upper bound is below zero;
5. sector-cluster bootstrap 95% upper bound is below zero.

---

## 12. External-Validation Results

The holdout produces:

- 400 validation stocks;
- 35,575 weakness episodes;
- 5,143 episodes reaching Day 20;
- 1,418 independent Day-20 landmarks;
- **1,386 valid primary observations**;
- **352 unique stocks** represented in the valid primary sample.

### 12.1 Primary relationship

| Measure | Discovery | Validation |
|---|---:|---:|
| Spearman rho | -0.1882 | **-0.0611** |

The direction replicates, but the effect shrinks substantially. The validation correlation retains roughly one-third of the discovery magnitude.

### 12.2 Cluster-bootstrap evidence

| Cluster unit | Median rho | 95% interval | % bootstrap estimates negative |
|---|---:|---:|---:|
| Stock | -0.0615 | [-0.1164, -0.0060] | 98.60% |
| Calendar quarter | -0.0610 | [-0.1190, -0.0002] | 97.55% |
| Sector | -0.0611 | [-0.1225, -0.0139] | 99.80% |

All five predeclared validation conditions pass.

The calendar-quarter upper bound is only slightly below zero, so the relationship should be described as **modest rather than strong**.

### 12.3 Validation quartiles

| Rebound quartile | Median rebound | Median future sector-relative 40D | Sector-underperformance rate |
|---|---:|---:|---:|
| Q1 | 0.00% | -0.68% | 52.45% |
| Q2 | 1.63% | -1.44% | 57.23% |
| Q3 | 3.97% | -1.91% | 58.67% |
| Q4 | 8.11% | -2.33% | 58.50% |

The Q4-minus-Q1 difference in median 40-session sector-relative performance is approximately **-1.65 percentage points**.

### 12.4 What did not replicate as an outright directional signal

Secondary validation relationships are small:

| Outcome | Spearman rho |
|---|---:|
| 60D sector-relative return | -0.0595 |
| 40D Nifty-relative return | -0.0126 |
| 40D absolute stock return | +0.0134 |

This distinction is central.

The replicated relationship is primarily **relative to sector peers**. It is not evidence that a high-rebound weak stock is likely to produce a negative absolute return.

Therefore the project does not interpret the result as a naked-short signal.

---

## 13. Interpretation

The combined evidence suggests that the useful information is not simply “this stock is very weak” or “this stock has rebounded.”

The more specific empirical state is:

> A stock has remained weak versus both the broad market and its own sector for 20 consecutive valid sessions, yet has already rebounded more strongly from a recent trough.

Among such observations, larger rebound is associated with modestly poorer subsequent performance relative to sector peers.

One possible interpretation is that a rebound inside a persistent weak state may represent incomplete relative recovery rather than a durable change in leadership. However, the present study does not establish a causal mechanism, and the effect-size shrinkage in validation argues against strong economic claims.

---

## 14. Limitations

### 14.1 Current-membership / survivorship bias

The historical sample uses current Nifty 500 membership. Delisted firms and historical constituents are not reconstructed.

### 14.2 Same historical time period

The 400-stock holdout is cross-sectionally independent from discovery stocks but shares the same 2018–2026 market history. Common market events therefore remain present in both samples.

### 14.3 Sector benchmark construction

Sector benchmarks are equal-weight leave-one-out peer portfolios based on current NSE sector classifications. They are research benchmarks rather than investable official sector indices.

### 14.4 Effect size

The primary correlation falls from approximately -0.188 in discovery to -0.061 in validation. This shrinkage is material.

### 14.5 No trading-cost analysis

The study does not yet model:

- borrow availability;
- shorting constraints;
- futures basis;
- transaction costs;
- turnover;
- portfolio construction;
- market neutrality;
- execution slippage.

### 14.6 No causal claim

The analysis identifies a historical association. It does not establish why the relationship exists.

### 14.7 Multiple research iterations

Several hypotheses were examined during the broader research process. The external-validation protocol reduces post-discovery flexibility for the final candidate, but the project should not be interpreted as if the Day-20 specification had been the only hypothesis considered from the beginning.

---

## 15. Prospective Monitoring

The research cutoff is frozen at **21 August 2026**.

The next phase evaluates genuinely new observations occurring after that cutoff without changing:

- the Day-20 landmark;
- the weakness-episode definition;
- the continuous rebound predictor;
- the 40-session sector-relative outcome;
- the expected negative direction.

This future-time evidence is intentionally separated from the historical discovery and cross-sectional validation datasets.

---

## 16. Conclusion

This project began with a broad idea that persistent laggards might continue to underperform. The evidence does not support that idea in its simplest form.

Simple measures of weakness magnitude, persistence, and concentration provide little robust market-relative predictability at episode onset. Sector-relative weakness is somewhat more persistent, but the effect is modest.

A strong apparent rebound-then-deterioration pattern is found and subsequently rejected after identifying retrospective turning-point selection bias. Replacing that design with fixed prospective landmarks produces a narrower candidate: among stocks still weak through Day 20, larger already-observed rebounds are associated with poorer subsequent 40-session performance relative to sector peers.

The relationship survives internal robustness tests and replicates on 400 previously unused stocks, although its magnitude shrinks substantially from rho approximately -0.188 to -0.061.

The appropriate conclusion is therefore limited but positive:

> **The Day-20 rebound state contains a modest, cross-sectionally replicated sector-relative relationship. It is not yet a future-time validated or directly tradable shorting signal.**

The next objective is not further historical optimization. It is prospective monitoring on genuinely new data.

---

## 17. Reproducibility and Project Materials

Key repository materials:

- [`README.md`](../README.md) — project overview;
- [`reports/phase_9_internal_robustness.md`](../reports/phase_9_internal_robustness.md) — internal candidate audit;
- [`reports/phase_9_locked_external_validation_spec.json`](../reports/phase_9_locked_external_validation_spec.json) — locked candidate specification;
- [`reports/phase_10_external_validation_protocol.md`](../reports/phase_10_external_validation_protocol.md) — predeclared cross-sectional validation protocol;
- [`reports/phase_10_external_validation_result.md`](../reports/phase_10_external_validation_result.md) — holdout result;
- [`data/reference/`](../data/reference/) — frozen research-universe reference files;
- [`notebooks/`](../notebooks/) — available research notebooks.

Large intermediate analytical datasets are not all stored directly in the repository. Compact validation outputs and methodological reports are used to document the main research decisions and results.

---

## 18. Suggested Citation

Until a formal bibliographic version is prepared, this repository should be cited simply as the **Indian Equity Weakness Monitor working paper and accompanying code repository**.

A formal literature review and academic reference list are intentionally left for a later revision rather than added without a dedicated source-verification pass.
