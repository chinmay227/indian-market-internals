# Phase 10 — Cross-Sectional External Validation Result

## Status

**Locked validation: PASS**

The Day-20 rebound candidate discovered in the original 100-stock research universe was tested on the complete 400-stock complement of the same frozen Nifty 500 snapshot.

No discovery stock was included in the validation universe. The landmark, predictor, primary outcome, bootstrap design, and pass/fail conditions were locked in GitHub before the validation returns were evaluated.

This is a **cross-sectional holdout**, not future-time out-of-sample evidence, because discovery and validation stocks share the same historical market period.

## Locked primary specification

- Episode state: 20th consecutive valid session weak versus both Nifty and leave-one-out sector peers
- Predictor: `stock_rebound_trailing20_from_low`
- Predictor treatment: continuous; no optimized rebound cutoff
- Primary outcome: `future_rel_sector_40d`
- Same-stock dependence control: episode-start anchors spaced by more than 60 market sessions
- Expected direction: negative
- Bootstrap repetitions: 2,000
- Bootstrap seed: `20260824`

## Coverage

- Validation universe: **400 stocks**
- Validation stocks with usable prices: **400**
- All weakness episodes: **35,575**
- Episodes reaching Day 20: **5,143**
- Independent Day-20 landmarks: **1,418**
- Valid primary observations: **1,386**
- Unique stocks in the valid primary sample: **352**

## Primary result

| Measure | Result |
|---|---:|
| Discovery-reference Spearman | -0.1882 |
| 400-stock validation Spearman | **-0.0611** |
| Same direction as discovery | Yes |
| Locked validation pass | **Yes** |

The validation effect is materially smaller than the discovery estimate: roughly one-third of the original correlation magnitude remains. This shrinkage is important and should not be hidden.

## Predeclared decision checks

All five locked conditions passed:

1. at least 200 valid independent observations — **PASS**;
2. primary Spearman correlation < 0 — **PASS**;
3. ticker-cluster bootstrap 95% upper bound < 0 — **PASS**;
4. calendar-quarter-cluster bootstrap 95% upper bound < 0 — **PASS**;
5. sector-cluster bootstrap 95% upper bound < 0 — **PASS**.

## Cluster bootstrap results

| Cluster | Clusters | Median rho | 2.5% | 97.5% | % negative |
|---|---:|---:|---:|---:|---:|
| ticker | 352 | -0.0615 | -0.1164 | **-0.0060** | 98.60% |
| calendar quarter | 34 | -0.0610 | -0.1190 | **-0.0002** | 97.55% |
| sector | 19 | -0.0611 | -0.1225 | **-0.0139** | 99.80% |

The calendar-quarter upper bound is only slightly below zero, so this should be described as a modest but reproducible relationship rather than a strong effect.

## Descriptive magnitude

The rebound quartiles preserve the expected ordering in median 40D sector-relative return:

| Rebound quartile | Median rebound | Median future sector-relative 40D | Sector-underperformance rate |
|---|---:|---:|---:|
| Q1 | 0.00% | -0.68% | 52.45% |
| Q2 | 1.63% | -1.44% | 57.23% |
| Q3 | 3.97% | -1.91% | 58.67% |
| Q4 | 8.11% | -2.33% | 58.50% |

The median Q4-minus-Q1 sector-relative spread is approximately **-1.65 percentage points over 40 sessions**, and the sector-underperformance-rate difference is about **+6.1 percentage points**.

These quartiles are descriptive. They are not an optimized trading cutoff.

## Secondary outcomes

| Outcome | Observations | Spearman |
|---|---:|---:|
| 60D sector-relative return | 1,385 | -0.0595 |
| 40D Nifty-relative return | 1,324 | -0.0126 |
| 40D absolute stock return | 1,386 | +0.0134 |

This distinction is central:

> The validated relationship is primarily **sector-relative**, not an outright prediction that the stock price itself will fall.

The evidence therefore does not justify describing the candidate as a naked-short signal.

## Timing and implementation validation

Independent spot checks confirm:

- the stored Day-20 anchor matches direct reconstruction;
- predictor history ends on the anchor session;
- future windows begin exactly at `t+1`;
- rebound reconstruction differences are zero in the checked cases;
- 40D sector-relative return reconstruction differences are zero;
- leave-one-out sector benchmark recomputations match stored values in the checked cases.

## Interpretation

Phase 10 provides evidence that the candidate is not merely an idiosyncrasy of the original 100 sampled stocks.

However, it does **not** establish:

- future-time stability;
- causality;
- transaction-cost feasibility;
- a profitable threshold-based trading rule;
- an outright shorting edge;
- robustness to historical constituent membership / delistings.

The correct statement is:

> Among stocks that remain weak versus both Nifty and their sector through Day 20 of a weakness episode, a larger rebound from the trailing-20-session stock trough is associated with modestly poorer subsequent 40D performance relative to sector peers. The relationship replicated on 400 previously unused current-Nifty-500 stocks, but with substantial effect-size shrinkage.

## Next research step

The candidate should now be treated as **cross-sectionally replicated but not future-time validated**.

The next phase should avoid further optimization on the 2018–2026 historical sample. The preferred next step is to freeze a prospective monitoring specification and collect genuinely new Day-20 episode observations after the research cutoff date, while separately characterizing the economic meaning of the sector-relative effect without converting it prematurely into a naked-short strategy.
