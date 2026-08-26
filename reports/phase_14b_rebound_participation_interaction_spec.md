# Phase 14B — Rebound × Participation Interaction

## Status

Corrective historical test. Not external validation and not a trading strategy.

Phase 14A produced a visually strong state result, but its participation-adjusted displacement variable was almost identical to rebound magnitude and its primary outcome (returning below the prior trough) was mechanically easier to hit after small rebounds than after large rebounds. Phase 14B therefore removes that barrier coupling and tests the economic question directly.

This specification is frozen before Phase 14B results are viewed.

---

# Research question

> **For persistently weak stocks with a positive rebound before Day 20, does abnormal trading participation change the information contained in rebound magnitude about subsequent relative returns?**

The key object is the interaction between rebound magnitude and relative volume, not a composite score.

Two economic mechanisms are plausible:

1. **Weak-participation view:** large rebounds on subdued participation are fragile; higher volume should make a large rebound less negative / more favorable.
2. **Seller-exhaustion view:** large rebounds on subdued participation reflect reduced selling pressure; higher volume could make the same rebound less favorable.

Because these mechanisms imply opposite signs, the primary interaction test is **two-sided**.

---

# Weakness populations

Run the same analysis independently in three overlapping Day-20 populations:

1. **Nifty-relative weakness** — the stock has underperformed Nifty 50 over the trailing 20 sessions for 20 consecutive sessions.
2. **Sector-relative weakness** — the stock has underperformed its leave-one-out sector peer benchmark over the trailing 20 sessions for 20 consecutive sessions.
3. **Dual-relative weakness** — the stock satisfies both conditions for 20 consecutive sessions. This is the original project definition.

These populations are intentionally overlapping. No population gets a separately tuned definition.

The same-stock episode-start spacing rule remains **>60 market sessions within each population**.

---

# Day-20 positive-rebound sample

For each population:

- anchor at Day 20 of the corresponding weakness episode;
- require a valid trailing-20-session stock trough before Day 20;
- require `sessions_since_trailing20_stock_trough > 0`;
- require positive rebound from that trough to the Day-20 anchor;
- future outcomes begin strictly at Day 20 + 1.

No future information is used to define the rebound.

---

# Relative volume

For each event:

`relative_rebound_volume = median(volume during trough+1 through Day20) / median(volume during 60 sessions before the trough)`

Rules:

- minimum 40 valid baseline volume observations;
- all rebound-window sessions must have valid positive volume;
- use the stock's own historical median rather than a cross-sectional market average;
- volume measures trading participation, **not buying volume**;
- rows with a detected >20% adjustment-factor jump across the baseline/rebound window are excluded from the primary volume analysis.

Candidate-generation data may use Yahoo historical volume. If a candidate is promoted, the volume result must later be replicated using official NSE cash-market data.

---

# Rebound magnitude

Primary rebound variable:

`rebound_log_displacement = log(Day20 adjusted price / trailing20 trough adjusted price)`

Within each population's complete-case sample, rebound and log relative volume are converted to centered percentile ranks.

---

# Primary outcome

The common primary outcome across all three populations is:

`future_rel_sector_10d`

Definition: compounded stock return minus the leave-one-out sector peer return over the next 10 market sessions, beginning Day20 + 1.

Using the same sector-relative outcome across all three populations lets the experiment ask whether the *definition of prior weakness* changes the information content of rebound participation while holding the future target fixed.

Primary horizon: **10 market sessions**.

Secondary sector-relative horizons: **5 and 20 sessions**.

Secondary Nifty-relative outcomes: **5, 10, and 20 sessions**.

No 40-session outcome is used in Phase 14B.

---

# Primary model

For each weakness population separately:

`future_rel_sector_10d_rank ~ rebound_rank + relative_volume_rank + rebound_rank:relative_volume_rank + trough_age_rank + nifty_20d_rank + sector_20d_rank + year fixed effects`

All continuous variables are percentile-ranked within the complete-case population and centered at 0.5.

Primary coefficient:

`rebound_rank:relative_volume_rank`

Interpretation:

- **positive interaction:** higher participation makes larger rebounds relatively more favorable / less negative;
- **negative interaction:** higher participation makes larger rebounds relatively less favorable;
- near zero: participation does not materially alter the information in rebound size.

The interaction is two-sided. Neither sign is declared a pass in advance.

Inference:

- ticker-clustered standard error;
- descriptive two-sided p-value;
- 2,000 ticker-cluster bootstrap interaction coefficients;
- 2,000 calendar-quarter-cluster bootstrap interaction coefficients.

---

# Secondary volatility and path features

These are secondary descriptors and cannot rescue a failed volume interaction.

1. `relative_rebound_volatility`
   - RMS daily log return during trough+1 through Day20;
   - divided by RMS daily log return over the 60 sessions before the trough.

2. `directional_efficiency`
   - net positive log rebound divided by the sum of absolute daily log returns during the rebound interval;
   - bounded to [0,1].

Secondary models may report:

- rebound × relative-volatility interaction;
- rebound × directional-efficiency interaction;
- a descriptive 4×4 relative-volume × directional-efficiency state map.

No combined score or optimized weighting is allowed.

---

# Descriptive interaction views

For each weakness population, split rebound rank and relative-volume rank into quartiles and report a 4×4 table of:

- observations;
- median rebound;
- median relative volume;
- median future sector-relative return at 5D, 10D, and 20D.

Also report simple high/low volume differences within each rebound quartile using median splits only for interpretation. These are descriptive, not optimized thresholds.

---

# Benchmark-decomposition interpretation

The three populations answer different economic questions:

- **Nifty-relative only:** broad market-relative lagging, potentially containing sector rotation.
- **Sector-relative only:** peer-relative lagging, closer to stock-specific weakness.
- **Dual-relative:** stricter laggard state requiring both.

The benchmark decomposition is part of the research question, not a post-result rescue test.

---

# Promotion rule

Phase 14B produces a candidate worth official-NSE volume replication only if all of the following are true for at least one weakness population:

1. at least **700 complete positive-rebound events** in that population;
2. ticker-cluster bootstrap 95% interval for the rebound × volume interaction excludes zero;
3. calendar-quarter-cluster bootstrap 95% interval excludes zero;
4. both bootstrap medians have the same sign as the primary interaction coefficient;
5. the 5D and 20D sector-relative interaction coefficients have the same sign as the 10D primary interaction;
6. the descriptive rebound × volume grid shows a coherent pattern rather than one isolated cell;
7. the result is not contradicted by a simple data-quality or corporate-action audit.

If multiple populations pass, compare effect size and robustness without selecting a new threshold.

If none pass, the rebound-participation idea is not promoted by changing horizons, definitions, or adding more indicators.

---

# What Phase 14B is not allowed to do

- use the Phase 14A old-trough-retest outcome as the primary target;
- use participation-adjusted displacement as the primary predictor;
- optimize a volume cutoff;
- change the 10D primary horizon after viewing results;
- tune separate episode definitions for Nifty, sector, and dual populations;
- call raw volume 'buying volume';
- add delivery percentage, basis, turnover, or more features to rescue a null result;
- claim external validation from the same historical sample.
