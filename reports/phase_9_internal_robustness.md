# Phase 9 — Internal Robustness Audit

## Status

Phase 9 evaluates a candidate relationship discovered in the hindsight-safe Phase 8.1 landmark analysis.

This is **internal robustness evidence only**. It is not an independent validation because the candidate was discovered on the same original 100-stock research universe.

## Locked candidate

Primary sample:

- weakness episodes still active on **Day 20**
- `independent_60d_anchor = True`

Primary predictor:

- `stock_rebound_trailing20_from_low`
- continuous; no optimized rebound cutoff

Primary outcome:

- `future_rel_sector_40d`

Expected direction:

- larger already-observed rebound → poorer subsequent sector-relative performance

## Main result

In the reduced-overlap Day-20 sample:

- observations: **360**
- primary Spearman correlation: **-0.188**

The relationship is materially stronger at Day 20 than at Day 5 or Day 10.

### Comparison by landmark

40D sector-relative Spearman correlation in the independent sample:

- Day 5: **-0.036**
- Day 10: **-0.061**
- Day 20: **-0.188**

This is a descriptive comparison. Day 20 is now locked for external validation and must not be changed after seeing new-sample results.

## Rebound quartiles

Quartiles are descriptive only and are not trading thresholds.

| Rebound quartile | Median rebound | Median 40D sector-relative return | Sector-underperformance rate |
|---|---:|---:|---:|
| Q1 | 0.00% | +3.18% | 37.5% |
| Q2 | 1.61% | +0.90% | 47.2% |
| Q3 | 4.03% | -2.10% | 59.3% |
| Q4 | 8.88% | -4.13% | 60.9% |

The monotonic-looking pattern is interesting, but these quartiles were inspected on the discovery sample and must not be interpreted as optimized entry cutoffs.

## Controlled rank regression

A rank regression controls for:

- current combined weakness
- maximum weakness observed so far
- sessions since the trailing-20-session trough
- calendar year

Standard errors are clustered by ticker.

For the primary 40D sector-relative outcome:

- rebound rank coefficient: **-0.224**
- clustered standard error: **0.058**

The relationship remains negative after these controls.

Secondary controlled results are also negative for:

- 60D sector-relative return
- 40D Nifty-relative return
- 40D absolute stock return

The 20D sector-relative relationship is weaker.

## Cluster robustness

Primary Spearman correlation under clustered bootstrap resampling:

| Cluster unit | Median rho | 95% interval |
|---|---:|---:|
| Stock | -0.188 | [-0.289, -0.085] |
| Calendar quarter | -0.187 | [-0.276, -0.097] |
| Sector | -0.190 | [-0.270, -0.106] |

All three intervals remain below zero in this internal diagnostic.

## Leave-one-year-out

Removing any one calendar year leaves the primary relationship negative.

The resulting correlations range approximately from:

- weakest: **-0.166**
- strongest: **-0.206**

This reduces the concern that one unusual year is driving the entire result.

## Regime checks

40D sector-relative rebound relationship:

### Market direction

- falling 60D Nifty regime: **-0.101**
- rising 60D Nifty regime: **-0.234**

### Volatility

- high volatility: **-0.227**
- low volatility: **-0.093**
- normal volatility: **-0.114**

The relationship is not isolated to one major regime, although its magnitude varies.

## Severity check

Within current-weakness quartiles, the rebound relationship remains negative in three of four groups and approximately zero in one group.

This suggests rebound is not merely a simple proxy for current severity, but the result is not perfectly uniform.

## Permutation diagnostic

A descriptive permutation test shuffled rebound values within calendar-year × severity groups while preserving broad time and severity structure.

- observed rho: **-0.188**
- 5,000 permutations
- descriptive one-sided tail probability: approximately **0.0006**

This is **not** a clean confirmatory p-value because the candidate was discovered after inspecting Phase 8.1.

## Decision

All five predeclared internal-support checks passed:

1. primary correlation is negative;
2. stock-, quarter-, and sector-cluster bootstrap upper 95% bounds remain below zero;
3. every leave-one-year-out estimate is negative;
4. the controlled rebound coefficient remains negative;
5. the relationship is not confined to one broad market or volatility regime.

Therefore the candidate is strong enough to justify **external validation**.

It is still not appropriate to call this alpha or a trading strategy.

## Next step

The external validation specification is locked in:

`reports/phase_9_locked_external_validation_spec.json`

The validation sample should use current Nifty 500 stocks that were **not part of the original 100-stock discovery universe**, while preserving the existing market-cap-stratified and sector-balanced sampling philosophy.

If the candidate fails on the new sample, the failure should be reported unchanged.