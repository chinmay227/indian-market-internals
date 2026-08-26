# Phase 14C — Participation Regime Shift Around the Trough

## Status

Historical candidate-generation test. Not external validation and not a trading strategy.

Phase 14B tested whether rebound magnitude and abnormal rebound volume interact to predict subsequent relative returns. That interaction did not meet the frozen promotion rule. A post-result diagnostic suggested that rebound volume itself may contain some short-horizon information, particularly in the sector-relative weakness population, but that diagnostic was not predeclared.

Phase 14C therefore asks a different and more state-oriented question:

> **When a persistently weak stock changes direction around its trough, does trading participation itself change, and does that participation shift contain incremental information about subsequent short-horizon relative returns?**

The main competing possibilities are:

1. **Participation-confirmation view:** participation expands when the rebound begins, and that transition is followed by better short-horizon relative performance.
2. **Seller-exhaustion view:** participation contracts after a high-activity decline because selling pressure has been exhausted, so lower rebound participation can still be followed by better performance.
3. **Participation-irrelevance view:** the change in volume around the trough adds little or no incremental information once the price state is known.

The third possibility is treated as a genuine empirical outcome. A non-significant coefficient alone is not sufficient to claim irrelevance; Phase 14C therefore includes a predeclared practical-equivalence check.

---

# Weakness populations

Run the same analysis independently in three overlapping Day-20 populations:

1. **Nifty-relative weakness** — trailing-20-session stock performance is below Nifty 50 for 20 consecutive sessions.
2. **Sector-relative weakness** — trailing-20-session stock performance is below the leave-one-out sector peer benchmark for 20 consecutive sessions.
3. **Dual-relative weakness** — both conditions hold for 20 consecutive sessions.

No population gets a separately tuned definition.

The same-stock episode-start spacing rule remains **more than 60 market sessions within each population**.

Because the sector-relative population looked more suggestive in a post-result Phase 14B diagnostic, Phase 14C must still be described as historical candidate generation rather than validation even if sector-relative results appear strong.

---

# Day-20 positive-rebound sample

For each weakness population:

- anchor at Day 20 of the corresponding weakness episode;
- use the same trailing-20-session stock trough definition used in Phases 13–14B;
- require the trough to occur strictly before Day 20;
- require a positive rebound from that trough to Day 20;
- future outcomes begin strictly at Day 20 + 1.

No future information is used to define the trough, the legs, or the predictors.

---

# Decline and rebound legs

All leg definitions are frozen before results.

Within the same trailing-20-session stock-price window ending on Day 20:

## Decline leg

The **decline leg** is the portion from the first session of that 20-session window through the trough session, inclusive for volume measurement.

For return-based volatility calculations, use daily returns whose ending sessions fall from the second session of the trailing window through the trough session.

## Rebound leg

The **rebound leg** is the portion from the first session after the trough through Day 20.

For both volume and return-based volatility, use sessions strictly after the trough through Day 20.

## Minimum leg length

Primary leg-quality rule:

- at least **3 valid volume observations** in the decline leg;
- at least **3 valid volume observations** in the rebound leg;
- at least **2 valid daily returns** in each leg for volatility-shift calculations.

The primary participation-shift analysis does not require volatility-shift completeness.

A stricter **minimum 5 volume observations per leg** restriction may be reported only as a predeclared robustness sample. It cannot replace the primary 3-session rule after results are viewed.

---

# Primary predictor — participation shift

For each event:

`participation_shift = log(median_rebound_leg_volume / median_decline_leg_volume)`

Interpretation:

- `participation_shift > 0`: trading activity is higher after the trough than before it;
- `participation_shift = 0`: median activity is similar across the two legs;
- `participation_shift < 0`: trading activity contracts during the rebound.

Volume is measured using each stock's own raw historical trading volume. It measures total trading participation, not buying volume.

The primary predictor is used continuously. No optimized high/low cutoff is allowed.

---

# Secondary predictor — volatility shift

`volatility_shift = log(rebound_leg_RMS_log_return / decline_leg_RMS_log_return)`

Interpretation:

- positive: the rebound leg is more turbulent than the decline leg;
- negative: the rebound leg is calmer than the decline leg.

Volatility shift is secondary. It cannot rescue a null participation-shift result.

Directional efficiency from earlier phases may be reported descriptively but is not a primary or rescue variable.

---

# Primary outcome

Common primary outcome across all three weakness populations:

`future_rel_sector_10d`

Definition: compounded stock return relative to the leave-one-out sector peer benchmark over the next 10 market sessions beginning Day 20 + 1.

Primary horizon: **10 sessions**.

Secondary sector-relative horizons:

- 5 sessions;
- 20 sessions.

Secondary Nifty-relative outcomes:

- 5 sessions;
- 10 sessions;
- 20 sessions.

No 40-session outcome is used in Phase 14C.

---

# Primary model

For each weakness population separately:

`future_rel_sector_10d_rank ~ participation_shift_rank + rebound_rank + trough_age_rank + current_nifty_20d_rank + current_sector_20d_rank + year fixed effects`

All continuous variables are percentile-ranked within the complete-case population and centered at 0.5.

Primary coefficient:

`participation_shift_rank`

Directional prior:

- the user-generated prior is **positive**: greater participation during the rebound relative to the decline should be associated with better subsequent short-horizon relative performance;
- however, the seller-exhaustion and irrelevance mechanisms are explicitly retained as competing explanations;
- inference is two-sided.

Controls are included to avoid mistaking a participation transition for an already-known price-state difference:

- rebound magnitude;
- trough age;
- current 20D Nifty-relative weakness;
- current 20D sector-relative weakness;
- calendar-year fixed effects.

No rebound × volume interaction is primary in Phase 14C because Phase 14B already tested that question directly and did not promote it.

---

# Inference

For the primary 10D sector-relative coefficient in each population report:

- ticker-clustered standard error;
- descriptive two-sided p-value;
- 2,000 ticker-cluster bootstrap coefficients;
- 2,000 calendar-quarter-cluster bootstrap coefficients;
- 95% percentile intervals;
- fraction of bootstrap draws above and below zero.

Bootstrap seed: `20260826` with deterministic population/cluster offsets.

---

# Testing the participation-irrelevance possibility

A large p-value does not prove that participation is irrelevant.

Phase 14C therefore predeclares a **practical-equivalence band** for the ranked primary coefficient:

`[-0.05, +0.05]`

Because both predictor and outcome are percentile-ranked, a coefficient inside this band corresponds roughly to less than a five-outcome-percentile-point change across the full participation-shift rank range, conditional on the model controls.

For each population classify the primary result into one of three categories:

1. **Directional candidate**
   - 95% ticker-bootstrap interval excludes zero;
   - 95% quarter-bootstrap interval excludes zero;
   - both bootstrap medians share the coefficient sign;
   - 5D and 20D sector-relative coefficients share the same sign;
   - descriptive quartiles are coherent rather than driven by one isolated bin.

2. **Evidence consistent with practical irrelevance**
   - the **90% ticker-bootstrap interval** is fully inside `[-0.05,+0.05]`;
   - the **90% quarter-bootstrap interval** is fully inside `[-0.05,+0.05]`;
   - the 5D and 20D coefficients are also inside or close to the same practical band and do not show a stable opposite pattern.

3. **Inconclusive**
   - neither directional-candidate nor practical-equivalence criteria are met.

The practical-equivalence band is a research-design judgment, not a claim that smaller effects can never matter economically.

---

# Descriptive state views

For each weakness population report participation-shift quartiles using rank-based quartiles only.

For each quartile report:

- observations;
- unique stocks;
- median participation shift;
- median decline-leg volume;
- median rebound-leg volume;
- median rebound magnitude;
- median trough age;
- median future sector-relative return at 5D, 10D, 20D;
- probability of positive sector-relative return at 5D, 10D, 20D.

Also create a simple 2 × 2 descriptive map using only median splits:

- low vs high rebound magnitude;
- participation contracted vs expanded relative to the sample median.

This map is descriptive only and cannot define a new threshold.

---

# Predeclared robustness checks

1. Repeat the primary model on the stricter sample requiring at least **5 valid volume observations per leg**.
2. Report the raw Spearman association between participation shift and future sector-relative returns at 5D, 10D, 20D.
3. Report the relationship between participation shift and rebound magnitude / trough age to identify obvious confounding.
4. Apply the same adjustment-factor / corporate-action audit used in Phase 14B; events with a detected >20% adjustment-factor jump over the trailing-20-session feature window are excluded from primary volume analysis.

These checks cannot redefine the primary result.

---

# Data source

Candidate-generation volume may use Yahoo Finance historical raw volume, consistent with Phase 14B.

If a directional candidate is promoted, the volume feature must be replicated using official NSE cash-market data before it is described as a robust participation result.

If practical irrelevance is supported, no official-NSE replication is required merely to rescue the idea unless a data-quality concern is discovered.

---

# What Phase 14C is not allowed to do

- optimize a participation-shift cutoff;
- switch the primary horizon away from 10D after seeing results;
- replace the decline/rebound leg definition after seeing results;
- use rebound × volume interaction as a rescue test;
- add delivery percentage, turnover, futures basis, OI, or more indicators to rescue a null result;
- call volume buying or selling volume;
- declare 'volume irrelevant' solely because p > 0.05;
- present the historical result as external or prospective validation;
- select only the best-looking weakness population and ignore the other two.
