# Phase 12 execution lock

**Frozen before viewing any Phase 12 mechanism results.**

This note clarifies implementation details for `phase_12_anatomy_of_rebound_spec.md` without changing the original Day-20 weakness candidate, 40-session sector-relative outcome, or the three predeclared mechanism hypotheses.

## Execution split

### Phase 12A — price-path mechanisms

Run first using the existing historical price/episode pipeline:

1. H1 peer confirmation;
2. H3 positive-return concentration;
3. secondary episode-survival diagnostics.

### Phase 12B — market-participation mechanisms

Run only after the historical NSE supplementary data are assembled:

1. H2 aggregate single-stock futures open-interest change;
2. secondary futures basis diagnostics;
3. cash volume, turnover, and delivery diagnostics.

Phase 12A results are not allowed to change H2's definition or expected direction.

## Historical analysis universe

Use the **400-stock Phase 10 validation universe** for Phase 12 mechanism exploration. This preserves the same cross-sectional population as the replicated result and avoids folding the original 100-stock discovery set back into mechanism estimation.

This is still **not a new external validation**, because the 400-stock future outcomes have already been viewed in Phase 10.

Primary anchor rule remains:

- episode reaches its 20th consecutive weak-both session;
- same-stock episode starts are spaced by more than 60 market sessions;
- future 40D sector-relative outcome begins at t+1.

## Mechanism sample

A rebound-quality variable is only defined when the stock-price trough used by the locked trailing-20-session rebound measure occurs **strictly before** the Day-20 anchor and the locked rebound is strictly positive.

Therefore:

`mechanism_sample = primary_phase10_sample AND stock_rebound_trailing20_from_low > 0 AND sessions_since_trailing20_stock_trough > 0`

The full Phase 10 sample remains the baseline. Every Phase 12A output must report:

1. full Phase 10 primary sample size;
2. positive-rebound mechanism sample size;
3. baseline rebound-vs-outcome Spearman rho in both samples.

This avoids silently presenting a selected positive-rebound subset as if it were the original validation sample.

## H1 peer-confirmation implementation

For each mechanism-sample anchor:

1. identify the focal stock's trailing-20-session trough used in the locked rebound calculation;
2. define the rebound interval as **the sessions after the trough close through the Day-20 anchor close**;
3. for every leave-one-out stock in the same frozen NSE sector, calculate cumulative return over those exact sessions;
4. require complete peer return coverage over the rebound interval;
5. `peer_confirmation_since_trough` is the share of valid peers whose cumulative return over the interval is greater than zero;
6. require at least two valid peers, matching the earlier leave-one-out sector minimum.

The expected interaction sign remains **positive**.

## H3 concentration implementation

For the same rebound interval:

1. compute focal-stock daily log returns;
2. retain positive log-return days;
3. `positive_return_concentration = max(positive_log_return) / sum(positive_log_returns)`.

Because the mechanism sample requires a positive rebound with a pre-anchor trough, at least one positive-return day should normally be present. Rows where the denominator is non-positive or invalid are excluded from H3 with coverage reported explicitly.

The expected interaction sign remains **negative**.

## Rank regression implementation

For each mechanism separately:

`future_rel_sector_40d_rank ~ rebound_rank + mechanism_rank + rebound_rank:mechanism_rank + current_severity_rank + prior_max_severity_rank + trough_age_rank + year fixed effects`

Continuous variables are converted to percentile ranks within the mechanism-specific complete-case sample and centered at 0.5 before interaction terms are constructed.

Primary regression output:

- interaction coefficient;
- expected sign and observed sign;
- ticker-clustered standard error;
- two-sided p-value as descriptive evidence, not a binary discovery rule;
- 2,000 ticker-cluster bootstrap interaction coefficients;
- 2,000 calendar-quarter-cluster bootstrap interaction coefficients;
- 2.5%, median, and 97.5% bootstrap percentiles.

No threshold is optimized.

## Descriptive bins

Mechanism quartiles are descriptive only. For each quartile report:

- observations;
- unique stocks;
- median rebound;
- median mechanism value;
- rebound-vs-future-sector-40D Spearman rho;
- median future sector-relative 40D return;
- underperformance rate.

A mechanism will not be declared useful solely because one quartile looks extreme.

## Episode-survival diagnostics

Retain the original weakness-episode termination rule. Do not invent a new recovery threshold.

For each Day-20 anchor calculate:

- `remaining_episode_sessions = episode_length - 20`;
- `episode_survives_5d_after_day20 = episode_length >= 25`;
- `episode_survives_10d_after_day20 = episode_length >= 30`.

Because the Phase 10 primary sample requires a valid 40-session future window, fixed 5D and 10D survival diagnostics have sufficient subsequent market history.

Kaplan-Meier / Cox analysis, if used, is secondary and must preserve right-censoring for episodes that continue to the historical data cutoff.

## What cannot change after Phase 12A results

- H2 OI definition and positive expected interaction;
- Day 20;
- 40D sector-relative primary outcome;
- episode definition;
- positive-rebound mechanism-sample rule;
- H1/H3 definitions;
- primary interaction directions;
- bootstrap cluster definitions;
- decision standards in the Phase 12 specification.
