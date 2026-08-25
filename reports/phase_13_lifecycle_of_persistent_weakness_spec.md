# Phase 13 — Lifecycle of Persistent Weakness

## Status

Historical characterization and candidate generation. Not a new external validation and not a trading strategy.

Phase 12 closed the rebound-mechanism branch after three predeclared mechanisms failed to provide a stable explanation of the small Day-20 return relationship:

1. peer confirmation;
2. rebound concentration;
3. aggregate single-stock futures OI change.

A separate post-result clue from Phase 12A suggested that **how recently a stock made its trailing-20-session trough** may be more closely related to whether the weakness episode itself remains active than the shape of the rebound.

Because that clue was discovered after viewing Phase 12A results, Phase 13 treats it as an **exploratory candidate**, not a confirmed finding.

---

# Research question

> **Once a stock has remained weak versus both Nifty 50 and its sector for 20 consecutive sessions, what prospectively observable Day-20 state variables are associated with how quickly the weakness episode ends?**

The emphasis changes from predicting a 40-session return to characterizing a state transition.

---

# Historical universe

Use the same **400-stock Phase 10 validation universe** and reconstruct the same independent Day-20 episode landmarks.

This keeps the lifecycle analysis tied to the historical population in which the small Day-20 return relationship replicated.

The Phase 10 reconstruction gate remains:

- approximately 1,386 independent valid Day-20 landmarks;
- approximately 352 unique stocks;
- rebound-versus-future-sector-40D Spearman rho close to -0.0611.

If the reconstruction does not pass the same tolerance gate, stop before interpreting Phase 13.

---

# Primary candidate: trough age

## Variable

`sessions_since_trailing20_stock_trough`

This is already measured prospectively at Day 20. It is the number of market sessions between the most recent lowest close-equivalent wealth level in the trailing 20-session stock-price window and the Day-20 anchor.

A value of 0 means the Day-20 anchor itself is the trailing-20-session trough.

A larger value means the trough occurred earlier and the stock has spent more sessions above that low before the Day-20 anchor.

## Exploratory directional candidate

The Phase 12A post-result clue suggests:

> **older troughs should be associated with a higher probability that the weakness episode ends soon after Day 20.**

Equivalently, a very recent trough should be associated with greater episode persistence.

Because this direction was informed by Phase 12A, any historical support in Phase 13 is **candidate-generation evidence only** and must be frozen for future prospective testing before being described as validated.

---

# Primary outcome

`episode_ends_within_10d_after_day20`

Definition:

- 1 if the original weakness episode ends during the next 10 market sessions after the Day-20 anchor;
- 0 if the original episode remains active through the 10th subsequent market session.

This uses the original episode termination rule. No new recovery threshold is introduced.

Because the primary sample requires a valid 40-session future window from Phase 10, the +10-session status is observable for the full reconstructed primary sample.

### Expected direction

Higher trough age is expected to have a **positive** association with the probability of episode termination within 10 sessions.

---

# Primary model

Clustered logistic regression:

`episode_ends_within_10d_after_day20 ~ trough_age_rank + rebound_rank + current_severity_rank + prior_max_severity_rank + year fixed effects`

Continuous variables are percentile-ranked within the complete-case sample and centered at 0.5.

Primary coefficient:

`trough_age_rank`

Expected sign: **positive**.

Inference:

- ticker-clustered standard error;
- descriptive two-sided p-value;
- 2,000 ticker-cluster bootstrap coefficients;
- 2,000 calendar-quarter-cluster bootstrap coefficients.

---

# Primary descriptive check

Split trough age into quartiles using rank-based quartiles, not optimized cutoffs.

For each quartile report:

- observations;
- unique stocks;
- median trough age;
- median rebound;
- median current weakness severity;
- episode ends within +5 sessions;
- episode ends within +10 sessions;
- episode ends within +20 sessions;
- median remaining episode duration, capped descriptively at 20 sessions where useful.

The expected descriptive shape is monotonic or near-monotonic: older-trough quartiles should have higher episode-exit rates.

---

# Secondary outcomes

These cannot rescue failure of the primary +10-session endpoint.

1. `episode_ends_within_5d_after_day20`
2. `episode_ends_within_20d_after_day20`
3. remaining episode duration after Day 20
4. 20-session administratively censored survival curves

A Cox proportional-hazards model may be reported as a secondary summary with follow-up administratively censored at 20 sessions. The primary decision remains based on the +10-session clustered logistic model and its predeclared robustness checks.

---

# Secondary path-state diagnostic

For the next 10 sessions after Day 20, classify the path using only the original trailing-20-session stock trough as the price reference:

1. **episode exits before a new lower stock-price trough**;
2. **a new lower stock-price trough occurs before episode exit**;
3. **episode remains active through +10 sessions without a new lower trough**.

This is descriptive state mapping, not a new optimized signal.

---

# Controls

Primary controls are restricted to state variables already available from the earlier pipeline:

- Day-20 rebound magnitude;
- current combined relative-weakness severity;
- maximum combined weakness observed through Day 20;
- calendar-year fixed effects.

No Phase 12 mechanism variable is included in the primary model:

- peer confirmation failed;
- rebound concentration failed;
- futures OI interaction failed.

This prevents failed mechanism features from being recycled into a composite lifecycle score.

---

# Robustness and candidate-promotion rule

The trough-age candidate is considered historically strong enough to **freeze for prospective lifecycle testing** only if all of the following hold:

1. primary trough-age coefficient is positive;
2. ticker-cluster bootstrap 95% lower bound is above zero;
3. calendar-quarter-cluster bootstrap 95% lower bound is above zero;
4. +5D and +20D secondary endpoint coefficients have the same positive direction;
5. trough-age quartiles show an economically interpretable increase in episode-exit rates rather than one isolated extreme bin;
6. the sign survives controls for rebound magnitude, current severity, and prior maximum severity.

Failure is a valid result. The model is not retuned by changing the landmark, episode definition, outcome horizon, or trough-age threshold.

---

# Prospective implication if supported

If the historical candidate passes the Phase 13 promotion rule, freeze a separate prospective lifecycle monitor after the 2026-08-21 historical cutoff.

That prospective test would ask whether new Day-20 episodes with older troughs continue to exit the weakness state faster than episodes whose lows are very recent.

This prospective lifecycle candidate remains separate from the already-frozen Phase 11 return monitor. One cannot rescue the other.

---

# What Phase 13 is not allowed to do

- return to searching for a rebound-short strategy;
- add basis, delivery, volume, or other indicators after the Phase 12 mechanism branch was closed;
- optimize a trough-age cutoff on the historical sample;
- change +10 sessions to another primary endpoint because another horizon looks better;
- redefine when a weakness episode ends after seeing the result;
- present historical support as prospective validation;
- combine multiple weak variables into a score after viewing coefficients.
