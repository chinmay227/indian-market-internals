# Latent Weakness Fragility Framework

## Status

Exploratory research infrastructure and hypothesis-generation framework. Not external validation and not a trading strategy.

This framework follows the earlier persistent-relative-weakness work but deliberately changes the research object. Rather than adding another technical indicator or rebound modifier, it decomposes observed stock weakness into common and stock-specific components, measures how unusual the stock-specific path is relative to peers, and studies whether that latent weakness becomes more consequential when the broader market or sector weakens.

The framework is designed to support three linked research programs:

1. **Common vs idiosyncratic weakness** — how much of a stock's path is explained by the market and sector, and how much remains stock-specific?
2. **Dispersion / contextual weakness** — how unusual is that stock-specific weakness given the contemporaneous spread of peer outcomes?
3. **Weakness propagation** — does isolated stock-specific weakness remain isolated or precede broader deterioration among peers?

A later event-conditioned branch may examine earnings and other corporate events, but event data are not part of this first build.

---

# Population and status

Use the full **current Nifty 500** membership snapshot already stored in the repository.

- Historical period: approximately 2018-01-02 through 2026-08-21, subject to data availability.
- Current-membership / survivorship bias is explicit.
- The full 500-stock panel is exploratory. The earlier 100/400 discovery-validation split is not treated as a fresh holdout for this new framework because the 400-stock sample has already been repeatedly examined.
- Future observations collected after a later hypothesis is frozen are required for genuine prospective validation.

---

# Core return decomposition

For each stock i and date t, estimate a rolling relationship using only information available strictly before t:

`R_i,t = alpha_i + beta_M,i * R_M,t + beta_S,i * (R_sector_peer,t - R_M,t) + epsilon_i,t`

where:

- `R_i,t` = stock daily return;
- `R_M,t` = Nifty 50 daily return;
- `R_sector_peer,t` = leave-one-out equal-weight return of other current-Nifty-500 stocks in the same sector;
- `(R_sector_peer,t - R_M,t)` = sector-specific component relative to the broad market;
- `epsilon_i,t` = daily residual return, interpreted as the part of the stock's return not explained by its estimated market and sector relationships.

The decomposition is descriptive and should not be described as a causal structural model.

## Rolling estimation rule

- Lookback: **252 market sessions**.
- Minimum complete observations: **126**.
- The estimation window ends at t-1. The return at t is never used to estimate its own coefficients.
- Include an intercept.
- Use ordinary least squares in the first implementation.
- Record rolling alpha, market beta, sector-specific beta, expected return, and residual return.

The model is intentionally simple. More complex factor models are not introduced in the first pass.

---

# Residual path measures

The framework does not immediately create a binary weak/not-weak label.

For each valid stock-date, use the most recent **20 sessions of residual returns** to construct continuous state measures.

## 1. Current residual severity

`residual_cum_20d = sum(residual_return over trailing 20 sessions)`

Negative values mean the stock has underperformed what the rolling market/sector model would have implied.

## 2. Residual path occupancy

Construct the cumulative residual path from the first day of the trailing-20-session window:

`C_k = sum_{j=1..k} residual_j`

Then:

`residual_underwater_share_20d = mean( C_k < 0 )`

This measures the fraction of the 20-session path spent below its model-implied baseline. It is threshold-free apart from the economically meaningful zero-residual baseline.

## 3. Residual negative-day share

`residual_negative_day_share_20d = mean(residual_j < 0)`

This distinguishes a path that stayed underwater because of one early shock from a path with repeated negative residual days.

## 4. Residual weakness load

`residual_weakness_load_20d = mean( max(0, -C_k) )`

This is an area-under-the-negative-residual-path measure. It increases when unexplained weakness is deeper and/or persists for longer.

The weakness-load variable is kept continuous and is not thresholded into a signal.

---

# Contextual peer normalization and dispersion

For each stock-date, compare the focal stock with other valid stocks in the same sector.

The focal stock must be excluded from all peer statistics.

## Peer residual dispersion

Primary dispersion measure:

`peer_residual_dispersion_20d = 1.4826 * MAD(peer residual_cum_20d)`

where MAD is median absolute deviation across leave-one-out sector peers on the same date.

Secondary robustness measure:

`peer_residual_std_20d = standard deviation(peer residual_cum_20d)`

No low/high dispersion cutoff is fixed in the first build.

## Contextual residual stretch

Define a robust peer-relative residual stretch coordinate:

`residual_stretch_20d = (peer_median_residual_cum_20d - focal_residual_cum_20d) / peer_residual_dispersion_20d`

Interpretation:

- positive = weaker than the contemporaneous peer median after common market/sector effects have already been removed;
- larger positive values = more unusually weak relative to the current peer distribution;
- negative = stronger than peers.

If the robust peer dispersion is zero or insufficient peers are available, the coordinate is missing rather than artificially capped.

## Contextual persistence coordinate

The first build does **not** force severity and persistence into one weighted score.

Primary persistence coordinate:

`residual_persistence_20d = residual_underwater_share_20d`

Additional path descriptors include negative-day share and weakness load. Their role is exploratory until the data are inspected.

The working proprietary concept is therefore a state rather than a single optimized scalar:

`Latent Weakness Fragility State = (residual_stretch_20d, residual_persistence_20d, common_stress)`

No public claim of novelty is made until a dedicated literature review is completed.

---

# Common stress / activation variables

The user-generated economic hypothesis is:

> Persistent stock-specific weakness may represent latent fragility. That fragility may become more consequential when the broader market or the stock's sector begins to weaken, while extremely stretched stocks may instead exhibit short-horizon reversal pressure.

The first build measures common stress continuously rather than inventing a technical indicator.

For each stock-date report:

- Nifty cumulative return over trailing 5, 10, and 20 sessions;
- leave-one-out sector-peer cumulative return over trailing 5, 10, and 20 sessions;
- sector-specific cumulative return `(sector peer minus Nifty)` over trailing 5, 10, and 20 sessions.

For convenience, also report sign-flipped stress versions where positive means weaker common conditions, for example:

`market_stress_5d = -nifty_return_5d`

`sector_stress_5d = -sector_peer_return_5d`

These remain continuous. No arbitrary stress threshold is fixed in this build.

---

# Future outcomes

The daily panel should contain prospective outcomes beginning strictly at t+1:

For 5, 10, and 20 market-session horizons:

- future absolute stock return;
- future Nifty-relative return;
- future sector-relative return;
- future cumulative residual return using the already-estimated daily residual series;
- future worst cumulative residual excursion where practical.

These outcomes are exploratory. The first build is not a predeclared predictive test.

---

# Peer breadth and propagation infrastructure

To support later propagation research, report for each stock-date:

- fraction of valid sector peers with negative trailing-20D cumulative residual return;
- median peer trailing-20D residual return;
- peer residual dispersion;
- focal stock percentile/rank within its sector by residual_cum_20d;
- future change in negative-residual peer breadth at +5D, +10D, +20D where available.

No severe-weakness cutoff such as bottom 10% is fixed yet. A later propagation hypothesis must predeclare any threshold only after the continuous distributions and representative episodes are understood.

---

# Exploratory state views

The notebook should produce descriptive, non-optimized views for hypothesis generation:

1. **Stretch deciles** vs future 5D/10D/20D residual and sector-relative returns, to inspect whether very extreme stretch shows reversal rather than monotonic continuation.
2. **Persistence × stretch grid** using rank-based quartiles, to ask whether the path to the current state matters beyond current severity.
3. **Persistence × common-stress grid** within broad stretch bands, to inspect the latent-fragility activation idea.
4. **Dispersion × stretch grid**, to inspect whether isolated weakness in a coherent sector differs from weakness in an already heterogeneous sector.
5. A sample of approximately **30 representative historical stock-date cases** spanning qualitatively different states for manual inspection.

These views are exploratory and must not be converted into optimized thresholds or a trading rule from the same sample.

---

# Representative-case sampling

The notebook should produce a compact case table containing examples from combinations such as:

- high persistence + moderate stretch + low common stress;
- high persistence + moderate stretch + high common stress;
- high persistence + extreme stretch;
- low persistence + extreme stretch;
- high stretch + low peer dispersion;
- high stretch + high peer dispersion.

For each case report enough context to reason about the episode without chart indicators:

- ticker, company, sector, date;
- 20D stock return;
- 20D market and sector returns;
- residual_cum_20d;
- residual stretch;
- persistence / negative-day share / weakness load;
- peer dispersion and peer breadth;
- market/sector stress;
- future 5D/10D/20D residual and relative outcomes.

The representative cases are for exploratory reasoning, not cherry-picked evidence.

---

# Data-quality and methodological rules

- Adjusted prices for stock returns.
- Leave-one-out sector peer calculations wherever the focal stock could contaminate its own benchmark.
- At least 2 valid peers for a sector return; contextual peer-distribution measures should require a larger practical peer count and report the count explicitly.
- No future information in rolling coefficient estimation or state construction.
- No RSI, MACD, stochastic oscillator, Bollinger Bands, moving-average crossover, or similar technical indicators.
- No weighted composite fragility score chosen after looking at future outcomes.
- No arbitrary binary weak/not-weak threshold in the first build.
- No claim that residual return is pure firm-specific information; it is the unexplained component relative to the chosen model.
- No claim of causality from historical association.
- No claim of external validation from this full historical sample.

---

# Validation philosophy

The research program has three evidence stages:

1. **Exploration:** use the full historical current-Nifty-500 panel to understand the state variables and generate hypotheses.
2. **Historical robustness:** once a hypothesis is frozen, test stability across years, sectors, stocks, and reasonable alternative measurements.
3. **Prospective validation:** collect genuinely future observations after the hypothesis and specification are frozen.

Only stage 3 should be described as prospective validation.

---

# Immediate deliverable

The first notebook should build and save:

- a reusable daily `stock × date` latent-fragility panel;
- compact state-summary tables;
- stretch-decile and interaction-grid summaries;
- representative historical cases;
- metadata recording the formulas and current-membership limitation;
- a ZIP of compact outputs for review.

The goal of the first notebook is **understanding and hypothesis generation**, not pass/fail significance hunting.