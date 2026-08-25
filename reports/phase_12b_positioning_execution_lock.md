# Phase 12B — Positioning Behind the Rebound

**Frozen before viewing Phase 12B results.**

Phase 12B tests the third mechanism predeclared in `phase_12_anatomy_of_rebound_spec.md`.

## Question

Among positive Day-20 rebounds inside persistent weakness episodes, does the change in outstanding NSE single-stock futures positioning help distinguish rebounds that later continue to lag their sectors from rebounds that do not?

This is historical mechanism exploration. It is not a fresh external validation sample and it does not alter the Phase 10 prospective monitor.

## Historical sample

Start from the Phase 12A positive-rebound mechanism sample:

- Phase 10 independent Day-20 validation observations;
- `stock_rebound_trailing20_from_low > 0`;
- stock-price trough occurs strictly before the Day-20 anchor.

Phase 12B further requires valid single-stock futures open interest for the focal ticker on both:

1. the locked stock-price trough date;
2. the Day-20 anchor date.

No observation without valid F&O data is imputed into the primary H2 test. Coverage and excluded observations must be reported.

## Primary mechanism H2

### Aggregate futures open interest

For each stock-date, sum open interest across **all active single-stock futures expiries** for the same underlying symbol.

This avoids treating the disappearance of one front-month contract during a roll as if the underlying stock suddenly lost all positioning.

Modern UDiFF F&O rows with instrument type `STF` and legacy F&O rows with instrument type `FUTSTK` are treated as single-stock futures.

### Primary variable

`aggregate_futures_oi_log_change_since_trough`

Defined as:

`ln(total_OI_Day20 / total_OI_trough)`

Both totals must be strictly positive.

### Interpretation discipline

Because the mechanism sample already requires a positive stock-price rebound:

- positive OI change = rebound accompanied by greater outstanding futures positioning;
- negative OI change = rebound accompanied by reduced outstanding futures positioning.

Price up + OI down is described only as a **position-reduction proxy**. It is not proof that shorts covered.

### Predeclared expected interaction

The controlled rank regression is:

`future_rel_sector_40d_rank ~ rebound_rank + oi_change_rank + rebound_rank:oi_change_rank + controls`

Expected sign on:

`rebound_rank × oi_change_rank`

is **positive**.

Interpretation: increasing aggregate futures OI is expected to weaken the negative rebound-to-future-sector-underperformance relationship.

## Controls

Retain the Phase 12A controlled-rank specification where available:

- current combined relative-weakness severity;
- maximum prior combined weakness through Day 20;
- sessions since the trailing-20 stock-price trough;
- calendar-year fixed effects.

Continuous variables are percentile-ranked within the complete-case Phase 12B sample and centered at 0.5 before interactions.

## Inference

Report:

1. interaction coefficient;
2. ticker-clustered standard error;
3. descriptive two-sided p-value;
4. 2,000 ticker-cluster bootstrap interaction coefficients;
5. 2,000 calendar-quarter-cluster bootstrap interaction coefficients;
6. 2.5%, median, and 97.5% bootstrap percentiles;
7. fraction of bootstrap draws with the expected positive sign.

The p-value is descriptive, not a stand-alone pass/fail rule.

## Descriptive bins

OI-change quartiles are descriptive only. For each quartile report:

- observations;
- unique stocks;
- median OI log change;
- median rebound;
- rebound-vs-future-sector-40D Spearman rho;
- median future 40D sector-relative return;
- underperformance rate;
- median remaining weakness-episode duration;
- 5D and 10D episode-survival rates.

No OI threshold is optimized.

## Secondary F&O diagnostics

The same F&O files may be used for descriptive diagnostics that cannot rescue H2:

- aggregate futures trading-volume log change from trough to Day 20;
- number of active futures expiries at trough and Day 20;
- open-interest concentration in the nearest expiry;
- position-reduction indicator (`OI change < 0`) versus position-expansion indicator (`OI change > 0`).

Futures basis, cash-market delivery, and 60-session cash participation measures are deferred until after the H2 result so that the primary open-interest test remains narrow and auditable.

## Data source and format transition

Use official NSE archive F&O bhavcopy files.

- Legacy F&O bhavcopy is used before the UDiFF transition.
- NSE discontinued the old F&O bhavcopy/common-bhavcopy format from 8 July 2024 and directs users to the F&O UDiFF Common Bhavcopy Final thereafter.
- Modern UDiFF files include instrument type, symbol, expiry, prices, traded volume, and open interest.

The notebook must standardize both formats into one contract-level schema before aggregation.

## Data-quality gates

Before H2 is interpreted, report:

- number of unique event dates requested;
- dates downloaded successfully;
- dates missing or unparsable;
- Phase 12A observations with valid trough OI;
- valid anchor OI;
- valid OI at both dates;
- number of unique stocks with valid H2 data;
- coverage by calendar year.

If the F&O-complete sample has fewer than 200 observations, H2 is treated as underpowered/descriptive and is not eligible to be frozen for prospective testing regardless of coefficient sign.

## What cannot change after results

- positive-rebound sample rule;
- exact trough and Day-20 event dates;
- aggregate-across-expiries OI definition;
- log-change transformation;
- positive expected interaction sign;
- Day-20 landmark;
- 40D sector-relative outcome;
- regression controls;
- bootstrap cluster definitions;
- 200-observation minimum coverage gate.
