# Phase 14 — Participation-Adjusted Rebound States

## Status

Historical candidate-generation study. Not a new external validation and not a trading strategy.

Phase 14 is a **new user-approved state question**, not a reopening of the failed Phase 12 mechanism search. Phase 12 asked whether peer confirmation, rebound concentration, or futures OI explained the small Day-20 40D return relationship. Those tests remain failed and are not reinterpreted.

Phase 13 shifted attention to state transitions and found that trough age strongly characterizes whether a Day-20 weakness episode remains active. The next question is motivated by a separate economic idea:

> **For a persistently weak stock that has already begun rebounding, how much price displacement occurred relative to the amount of trading participation required to produce it?**

The central intuition is deliberately not assigned a directional sign in advance because two plausible mechanisms compete:

1. **weak-participation interpretation:** a large rebound on unusually subdued activity may be fragile;
2. **seller-exhaustion interpretation:** a large rebound on unusually subdued activity may mean little selling pressure remains.

Phase 14 therefore tests whether participation-adjusted displacement contains state information, and lets the sign be determined by the data.

---

# Historical population

Use the same 400-stock Phase 10 validation universe and reconstruct the same independent Day-20 episode landmarks.

The Phase 10 reconstruction gate remains approximately:

- 1,386 independent valid Day-20 landmarks;
- 352 unique stocks;
- rebound-versus-future-sector-40D Spearman rho near -0.0611.

The Phase 14 mechanism population is then restricted to observations where:

- Day-20 rebound is strictly positive;
- the locked trailing-20-session stock trough occurs strictly before Day 20;
- the rebound interval therefore contains at least one post-trough market session.

This should approximately reproduce the 1,128-observation positive-rebound population from Phase 12A before volume-quality exclusions.

---

# Data source for first-pass participation features

Price reconstruction remains consistent with the earlier Yahoo Finance adjusted-close pipeline.

Daily share volume is taken from Yahoo Finance for this **candidate-generation phase only** because it permits a reproducible 500-stock historical pass without thousands of daily archive requests.

This is not considered sufficient for final confirmation of a volume-based candidate. If the historical candidate survives Phase 14, its volume result must be replicated on official NSE cash-market bhavcopy / deliverable-volume data before any prospective promotion.

### Corporate-action volume audit

Yahoo share volume is raw share count. A stock split inside the baseline/rebound window can therefore create artificial volume changes.

For each event, compare the daily adjustment factor `Adjusted Close / Raw Close` across the complete baseline-plus-rebound window. Exclude an event from volume analysis if the adjustment factor changes by more than 20% between adjacent market sessions. This is a data-quality exclusion, not an outcome-dependent threshold.

---

# Event window

For each positive-rebound Day-20 landmark:

- `t0` = the locked trailing-20-session stock-price trough;
- `t20` = Day-20 anchor;
- **rebound interval** = market sessions strictly after the trough through Day 20;
- **normalization baseline** = the 60 market sessions strictly before the trough.

Require at least:

- 40 valid baseline volume observations;
- 40 valid baseline return observations;
- complete positive-volume data over the rebound interval;
- complete adjusted-close return data over the rebound interval.

No threshold is optimized after viewing outcomes.

---

# Core state features

## 1. Rebound displacement

`rebound_log_displacement`

`log(P_Day20 / P_trough)`

This is the net price displacement from the locked trough to Day 20.

## 2. Relative volume

`relative_rebound_volume`

`median(volume during rebound interval) / median(volume during 60-session pre-trough baseline)`

The median is used instead of the mean because daily share volume is strongly right-skewed and occasional spikes should not define a stock's normal participation level.

Interpretation:

- 1.0 = rebound occurred on typical daily share volume for that stock;
- 0.6 = rebound interval volume was about 60% of recent normal;
- 2.0 = about twice recent normal.

Relative volume measures trading participation, **not buying volume**. Every trade contains both a buyer and a seller.

## 3. Relative realized volatility

`relative_rebound_volatility`

Use root-mean-square daily log return as a realized-volatility proxy:

`RMS(log return during rebound interval) / RMS(log return during 60-session pre-trough baseline)`

RMS is used instead of sample standard deviation because some valid rebound windows are very short and RMS remains defined for a one-session rebound.

## 4. Directional efficiency

`directional_efficiency`

`net positive log rebound / sum(abs(daily log returns during rebound interval))`

For positive rebounds this lies approximately in `[0, 1]`:

- near 1 = price traveled upward relatively directly;
- near 0 = the same endpoint required a much noisier path.

This is distinct from Phase 12A's positive-return concentration, which asked whether one positive day dominated the rebound.

---

# Primary construct: participation-adjusted rebound displacement

A raw ratio `rebound / volume` can become unstable when relative volume is very small. Phase 14 therefore uses a rank-residual construction.

Within the complete-case Phase 14 sample:

1. percentile-rank `rebound_log_displacement`;
2. percentile-rank `log(relative_rebound_volume)`;
3. regress rebound rank on relative-volume rank plus calendar-year fixed effects;
4. retain the regression residual.

Call this residual:

`participation_adjusted_displacement`

Interpretation:

- positive = the rebound was larger than is typical for the amount of relative trading participation observed in that year;
- negative = the rebound was smaller than is typical for that participation level.

This construction is outcome-blind and fixed before examining future state outcomes.

---

# Primary outcome

`new_lower_trough_before_episode_exit_within_10d`

Definition:

- lock the same trough used to measure the Day-20 rebound;
- follow the stock for the next 10 market sessions;
- outcome = 1 if the adjusted stock-price path falls below that locked trough **before** the original weakness episode exits and within the 10-session horizon;
- outcome = 0 otherwise.

Primary horizon: **10 sessions**.

The focus is deliberately shorter than the earlier 40-session return work because this phase studies whether an apparent rebound fails or transitions quickly.

---

# Primary model

Clustered logistic regression:

`new_lower_trough_before_episode_exit_within_10d ~ participation_adjusted_displacement_rank + trough_age_rank + current_severity_rank + prior_max_severity_rank + year fixed effects`

Primary coefficient:

`participation_adjusted_displacement_rank`

### Direction

**Two-sided / not predeclared.**

A positive coefficient supports the weak-participation interpretation: unusually large price displacement for the observed participation is more fragile.

A negative coefficient supports the seller-exhaustion interpretation: unusually large price displacement for the observed participation is less likely to retest the trough.

Inference:

- ticker-clustered standard error;
- descriptive two-sided p-value;
- 2,000 ticker-cluster bootstrap coefficients;
- 2,000 calendar-quarter-cluster bootstrap coefficients.

The two bootstrap intervals must exclude zero in the **same direction** for the primary candidate to be considered historically stable enough for replication.

---

# Secondary state features

Relative realized volatility and directional efficiency are secondary state dimensions.

They are **not allowed to rescue a failed primary participation-adjusted-displacement result**.

Report:

1. their standalone rank association with the primary 10-session state outcome;
2. a controlled logistic model adding both to the primary model;
3. descriptive 2D state maps using rank quartiles rather than optimized cutoffs.

The purpose is to see whether a rebound that is participation-light but smooth differs from one that is participation-light and turbulent, without constructing an optimized composite score.

---

# Secondary horizons and return consequences

State outcomes:

- new lower trough before episode exit within +5 sessions;
- new lower trough before episode exit within +20 sessions.

Return outcomes:

- +5-session sector-relative return;
- +10-session sector-relative return;
- +20-session sector-relative return.

The +10-session state outcome remains primary. Secondary horizons cannot rescue a primary failure.

---

# Descriptive views

Report participation-adjusted-displacement quartiles with:

- observations and unique stocks;
- median rebound;
- median relative volume;
- median relative volatility;
- median directional efficiency;
- new-lower-trough-before-exit rate at +5, +10, +20;
- median sector-relative return at +5, +10, +20.

Also report a non-optimized 4x4 grid:

- relative-volume rank quartile on one axis;
- directional-efficiency rank quartile on the other;
- each cell shows +10D new-lower-trough-before-exit rate and sample size.

This grid is descriptive only.

---

# Candidate-promotion rule

The primary participation-adjusted-displacement candidate is considered historically strong enough for **official-NSE volume replication** only if all of the following hold:

1. at least 700 complete usable events remain after data-quality exclusions;
2. ticker-cluster bootstrap 95% interval excludes zero;
3. calendar-quarter-cluster bootstrap 95% interval excludes zero;
4. both intervals have the same sign;
5. +5D and +20D state-outcome coefficients have the same sign as the +10D primary coefficient;
6. participation-adjusted-displacement quartiles show an economically interpretable progression rather than one isolated extreme bin;
7. the sign survives controls for trough age, current severity, and prior maximum severity.

If these conditions fail, the participation-adjusted-displacement candidate is not promoted. Relative volatility or efficiency cannot rescue it.

If these conditions pass, the next step is **not** a trading strategy. It is a frozen replication of the volume feature using official NSE cash-market data.

---

# What Phase 14 is not allowed to do

- claim low volume means low buying;
- assume in advance that low-volume rebounds are bearish;
- optimize a low/high volume cutoff;
- optimize a low/high volatility cutoff;
- create a weighted composite score after viewing outcomes;
- change the primary horizon from +10D because +5D or +20D looks better;
- use delivery percentage, turnover, futures OI, or basis to rescue a failure;
- reinterpret the sign after seeing the result without explicitly labeling it as the competing mechanism that the sign supports;
- call historical evidence external or prospective validation;
- proceed to official-NSE replication unless the frozen promotion rule is met.
