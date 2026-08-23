# Phase 10 — Locked External Stock-Sample Validation Protocol

## Objective

Test whether the Day-20 rebound relationship discovered in the original 100-stock universe generalizes to stocks that played no role in discovering it.

This is a **cross-sectional holdout**. It is not a future-time out-of-sample test because discovery and validation stocks share the same historical market period.

## Validation universe

Use the same frozen 500-stock sector-universe snapshot used by the discovery pipeline.

Exclude all 100 discovery stocks and retain **every one of the 400 remaining stocks**.

No second random sample is drawn and no validation stock may be removed because of its outcome.

The original discovery universe contains exactly 20 stocks from each of five 100-rank market-cap strata. Therefore the untouched complement contains the remaining 80 stocks from each original stratum.

## Historical window

Use data only through **2026-08-21**, matching the discovery dataset.

## Locked state definition

A weakness episode is a consecutive run of valid market sessions where both are true:

- 20D relative return vs Nifty < 0
- 20D relative return vs leave-one-out sector peers < 0

No minimum episode duration and no gap stitching are introduced.

The validation anchor is the **20th consecutive weak-both session** of an episode.

Same-stock episode starts used in the primary sample must be spaced by more than 60 market sessions.

## Locked predictor

`stock_rebound_trailing20_from_low`

This is the stock's rebound from the lowest close-equivalent wealth level in the trailing 20 market sessions ending on the Day-20 anchor.

It is continuous. No rebound cutoff is selected.

All predictor history ends at the anchor session.

## Locked primary outcome

`future_rel_sector_40d`

The future window begins at the session immediately after the Day-20 anchor.

Expected direction: **negative**.

## Locked success rule

The primary validation passes only if all conditions hold:

1. at least 200 valid independent Day-20 observations;
2. primary Spearman correlation < 0;
3. ticker-cluster bootstrap 95% upper bound < 0;
4. calendar-quarter-cluster bootstrap 95% upper bound < 0;
5. sector-cluster bootstrap 95% upper bound < 0.

Bootstrap repetitions: **2,000**.

Bootstrap seed: **20260824**.

## Secondary outcomes

Reported but unable to rescue a failed primary test:

- 60D sector-relative return
- 40D Nifty-relative return
- 40D absolute stock return

## No-reoptimization rule

After validation outcomes are visible, do not:

- move the Day-20 landmark;
- change the 40D primary horizon;
- substitute another primary outcome;
- introduce a rebound threshold;
- alter episode boundaries to improve results;
- subset the 400-stock validation complement based on outcomes.

A null or opposite result is reported unchanged.

## Interpretation

A pass would support cross-sectional generalization of the candidate to previously unused stocks. It would **not** establish future-time stability, execution feasibility, transaction-cost robustness, or a tradable shorting strategy.