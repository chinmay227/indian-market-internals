# Phase 12 — Anatomy of a Rebound

## Purpose

Phase 12 extends the validated Day-20 weakness result without changing the original episode definition, Day-20 anchor, or 40-session sector-relative outcome.

The Phase 10 result says that, among stocks still weak versus both Nifty and their sector on Day 20, larger rebounds from the recent stock-price trough were associated with modestly worse subsequent 40-session performance relative to sector peers. The effect replicated on the 400-stock cross-sectional holdout, but shrank substantially.

Phase 12 asks a different question:

> **Does the quality and source of a rebound explain why some rebounds inside persistent weakness are followed by continued relative underperformance while others are not?**

This is a mechanism-oriented extension, not a claim that a new trading strategy has already been found.

---

## Research discipline

The following are frozen from the earlier project:

- weakness episode definition;
- Day-20 landmark;
- predictor history ending at the Day-20 anchor;
- future outcomes starting strictly at t+1;
- primary future horizon of 40 market sessions;
- primary outcome `future_rel_sector_40d`;
- same-stock episode spacing rule (>60 market sessions) for the primary independent sample.

Phase 12 is **historical mechanism exploration**. It is not a fresh external validation sample because the historical weakness outcomes have already been studied. Any mechanism that looks promising must later be frozen and evaluated prospectively on post-2026-08-21 observations.

---

## Why this is different from simply adding more indicators

The original rebound variable records only magnitude. A 7% rebound can arise from very different paths:

- a broad sector recovery;
- an isolated stock-specific bounce;
- a multi-day recovery;
- one large event day;
- rising derivatives open interest;
- falling derivatives open interest;
- strong or weak cash-market participation.

Phase 12 tests a small set of predeclared mechanism hypotheses rather than searching across dozens of technical indicators.

---

# Primary hypotheses

## H1 — Peer confirmation

### Variable

`peer_confirmation_since_trough`

For the stock-specific rebound window running from the trailing-20-session stock-price trough to the Day-20 anchor:

- calculate each leave-one-out sector peer's cumulative return over the same dates;
- calculate the share of peers with a positive cumulative return.

### Hypothesis

A rebound that occurs alongside broad peer recovery should look more like a genuine sector-supported recovery than an isolated bounce.

**Expected interaction:** higher peer confirmation should weaken the negative relationship between rebound magnitude and future 40D sector-relative performance.

In an interaction regression, the expected sign on:

`rebound_rank × peer_confirmation_rank`

is **positive**.

---

## H2 — Derivatives position change

### Variable

`aggregate_futures_oi_change_since_trough`

For each stock-day, aggregate open interest across all active NSE single-stock futures expiries. Measure percentage/log change in aggregate stock futures OI from the stock-price trough date to the Day-20 anchor.

This avoids the artificial OI jumps created by rolling a single front-month contract.

### Interpretation

Price up + OI down is treated only as a **position-reduction proxy**. It is not described as proof of short covering. Price up + OI up is treated as a **new-positioning proxy**.

### Hypothesis

If a rebound is accompanied by increasing aggregate futures OI, it may contain more new positioning than a rebound occurring while outstanding positions are being reduced.

**Expected interaction:** higher OI change should weaken the negative rebound-to-future-underperformance relationship.

Expected sign on:

`rebound_rank × oi_change_rank`

is **positive**.

---

## H3 — Rebound concentration

### Variable

`positive_return_concentration`

During the stock-specific rebound window from trough to Day 20:

- use daily log stock returns;
- retain positive-return days;
- define concentration as the largest positive daily log return divided by the sum of positive daily log returns in the window.

A value near 1 means most of the rebound came from one day. A lower value means the rebound was distributed across several positive sessions.

### Hypothesis

A rebound dominated by one large day is more likely to be a temporary interruption than a persistent recovery.

**Expected interaction:** greater concentration should make the negative rebound relationship stronger.

Expected sign on:

`rebound_rank × concentration_rank`

is **negative**.

---

# Secondary diagnostics

These are useful but will not be allowed to rescue failure of the three primary mechanism hypotheses.

## Cash-market participation

- cash volume z-score versus trailing 60 sessions;
- security-wise delivery percentage;
- delivery-percentage z-score versus trailing 60 sessions;
- turnover z-score.

No directional claim is locked in advance because delivery percentage is not a direct measure of institutional buying.

## Futures basis

Potential measure:

- use the nearest monthly FUTSTK contract with more than five calendar days to expiry;
- compute annualized log basis: `ln(F/S) × 365 / days_to_expiry`;
- evaluate change in basis from trough to Day 20.

Basis is secondary because expiry effects, financing, dividends, and roll mechanics require additional care.

## Rebound path

- fraction of rebound-window sessions with positive stock returns;
- rebound-window realized volatility versus the preceding weakness window;
- rebound duration in sessions from trough to Day 20.

---

# Primary statistical design

For each predeclared mechanism variable, fit a controlled rank regression:

`future_rel_sector_40d_rank ~ rebound_rank + mechanism_rank + rebound_rank:mechanism_rank + controls`

Controls retained from earlier robustness work where available:

- current relative-weakness severity;
- maximum prior episode severity;
- time since stock-price trough;
- calendar-year fixed effects.

Primary inference should report:

1. interaction coefficient and direction;
2. stock-clustered standard error;
3. ticker-cluster bootstrap interval;
4. calendar-quarter cluster bootstrap interval;
5. descriptive Spearman correlations by mechanism tercile/quartile.

No optimized threshold is to be selected from the same sample.

---

# Secondary state-transition analysis

Phase 12 should also translate the result into an episode-management question.

Using the already-defined weakness state:

- `episode_survives_5d_after_day20`;
- `episode_survives_10d_after_day20`;
- `remaining_episode_duration` after Day 20.

The preferred extension is survival analysis using the original episode termination rule rather than inventing a new recovery definition after viewing outcomes.

Kaplan-Meier curves and a Cox proportional-hazards model may be used descriptively to ask whether rebound quality changes the rate at which persistent-weakness episodes terminate.

---

# Universe and data

## Historical research sample

Start with Day-20 episode anchors already generated by the weakness pipeline and retain observations for which the required additional data are available.

For derivatives-specific hypotheses, the effective universe is naturally limited to stock-days with valid NSE single-stock futures data.

A stronger later extension would reconstruct the historical daily FUTSTK universe directly from NSE derivatives bhavcopies instead of relying only on current Nifty 500 membership.

## Required sources

### Existing weakness data

Need the full daily analytical dataset used to construct Day-20 landmarks, including ticker, date, sector, stock price/return, market-relative and sector-relative weakness variables, episode id, and future outcomes.

### NSE equity reports

Useful official daily files include:

- Full Bhavcopy and Security Deliverable data;
- Security-wise Delivery Positions;
- equity market activity / bhavcopy fields needed for cash volume and turnover.

### NSE derivatives reports

Useful official daily files include:

- F&O UDiFF/Common Bhavcopy Final;
- historical F&O bhavcopy files;
- contract open interest and volume fields.

For OI, aggregate across active FUTSTK expiries by stock-day before measuring change.

---

# Literature checks

Phase 12 must explicitly distinguish the proposed mechanism from established momentum effects.

At minimum compare the interpretation with:

- Moskowitz & Grinblatt (1999), *Do Industries Explain Momentum?*, Journal of Finance. Industry momentum explains a substantial component of conventional stock momentum.
- Blitz, Huij & Martens (2011), *Residual Momentum*, Journal of Empirical Finance. Ranking on residual rather than total returns changes momentum exposure and performance.

This means a result that disappears after removing broad sector/common-factor movement is still informative, but should not be presented as a novel standalone effect.

---

# What Phase 12 is not allowed to do

- change Day 20 because another landmark looks better;
- change the 40D primary outcome because another horizon looks better;
- create a large composite score after seeing which features work;
- call price-up/OI-down observations confirmed short covering;
- optimize OI, breadth, delivery, or concentration thresholds on the same historical sample;
- convert an exploratory historical subgroup into a new claim of external validation;
- hide mechanisms that fail.

---

# Decision rule

Each primary mechanism hypothesis is evaluated separately.

A mechanism is considered **historically supported enough to freeze for prospective testing** only if:

1. the interaction sign matches the predeclared direction;
2. the effect is not driven by a tiny subgroup;
3. ticker-cluster and calendar-quarter resampling give broadly consistent direction;
4. the interpretation survives controls for the existing weakness severity/path variables;
5. the result has an economically interpretable shape in descriptive bins rather than depending on a single regression coefficient.

Failure is a valid Phase 12 result.

---

# Buy-side output if a mechanism survives

The useful deliverable is not immediately a trading signal. It is a **rebound-quality diagnostic** for active persistent-weakness episodes.

For each active Day-20 episode, a future monitor could display:

- rebound magnitude;
- peer confirmation;
- aggregate futures OI change;
- rebound concentration;
- historical episode survival rate for comparable observations;
- historical 40D sector-relative outcome distribution;
- explicit uncertainty and sample size.

Only after prospective evidence would it make sense to ask whether these diagnostics can be combined into a portfolio rule.
