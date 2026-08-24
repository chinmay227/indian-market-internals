# Indian Equity Weakness Monitor

A quantitative research project studying how **relative weakness develops, persists, rebounds, and sometimes disappears** across Indian equities.

The project is intentionally research-first. It does **not** assume that a weak stock is automatically a good short, and it does not present an unvalidated backtest as a trading strategy.

## Research question

The central question is:

> What does genuine persistent weakness look like, and what paths do weak stocks historically follow after that weakness becomes observable?

The analysis separates two different questions:

1. **Research:** what does persistent laggard behaviour look like?
2. **Trading:** does any prospectively observable weakness state contain useful forward information?

Those questions are deliberately not collapsed into one definition.

## Research universe

Version 1 began with a frozen 100-stock discovery sample drawn from the current Nifty 500:

- 20 stocks from market-cap ranks 1–100
- 20 from 101–200
- 20 from 201–300
- 20 from 301–400
- 20 from 401–500
- sector-balanced random sampling
- fixed random seed: `42`

Approximate historical period: **2018-01-02 to 2026-08-21**.

For external cross-sectional validation, the project then used **all 400 remaining stocks** from the same frozen Nifty 500 snapshot, with zero overlap with the 100-stock discovery universe.

### Known limitation

Current Nifty 500 membership is used historically, so the project has survivorship / membership bias. This is documented rather than silently ignored.

## Benchmark design

### Market benchmark

Nifty 50.

### Sector benchmark

For each stock and day, the sector benchmark is the equal-weight daily return of **all other valid current Nifty 500 stocks in the same NSE sector**.

The focal stock is excluded from its own benchmark (leave-one-out). At least two valid peers are required.

This avoids using incomplete Yahoo sector-index histories while preventing a stock from mechanically influencing the benchmark it is compared against.

## How weakness is measured

The project does not define a laggard using one arbitrary rule such as “12 bad days out of 20.” Weakness is measured along several continuous dimensions:

- 5D / 10D / 20D relative return vs Nifty
- 5D / 10D / 20D relative return vs sector peers
- number of underperformance sessions
- top-3 deterioration concentration
- effective negative days
- negative-day evenness
- episode duration
- rebound magnitude

This allows **magnitude**, **persistence**, and **concentration** to remain separate research dimensions.

## Main findings so far

### 1. Describing weakness is easier than predicting from it

Severe historical weakness does not automatically imply further near-term underperformance. Many simple relationships between weakness magnitude / persistence and subsequent returns were small or unstable.

### 2. Market-relative weakness largely washes out

After prospectively observable weakness-episode starts, longer-horizon Nifty-relative outcomes move toward roughly 50/50 underperformance versus outperformance.

### 3. Sector-relative weakness is somewhat more persistent

Weak stocks show a modestly more persistent tendency to lag their own sector over 20–60 session horizons. The effect is descriptive and not large enough, by itself, to call a trading signal.

### 4. Overlapping stock-date observations materially exaggerate sample size

A stock weak on Monday, Tuesday, Wednesday and Thursday is not four independent experiments. The project therefore compresses consecutive weak sessions into **weakness episodes** and also maintains a reduced-overlap sample whose same-stock episode anchors are spaced by more than 60 market sessions.

### 5. A strong-looking rebound result was rejected because of hindsight bias

An early episode-path experiment selected the maximum rebound within a future 20-session window and then measured what happened after that selected maximum. This mechanically made post-peak deterioration look stronger.

Rather than retain the attractive result, the experiment was redesigned around fixed, prospectively observable landmarks.

### 6. A Day-20 candidate emerged in the hindsight-safe experiment

At fixed episode Days 5, 10 and 20, all predictor information is restricted to what was known on that date and every future outcome begins at `t+1`.

In the reduced-overlap discovery sample, the most interesting candidate appeared among episodes that remained weak through **Day 20**:

> Larger rebound from the trailing-20-session stock trough was associated with poorer subsequent 40D sector-relative performance.

Discovery estimate: approximately **Spearman rho = -0.188**.

### 7. The candidate replicated on 400 previously unused stocks, but with substantial shrinkage

The external specification was frozen in GitHub before validation returns were evaluated.

The complete 400-stock complement produced:

- **1,386** valid primary observations
- **352** unique validation stocks
- validation Spearman: **-0.061**
- ticker-cluster bootstrap 95% interval: approximately **[-0.116, -0.006]**
- calendar-quarter-cluster interval: approximately **[-0.119, -0.0002]**
- sector-cluster interval: approximately **[-0.123, -0.014]**

All five predeclared validation conditions passed.

However, the validation effect retained only about one-third of the original discovery correlation magnitude. That shrinkage is reported explicitly.

The descriptive Q4-minus-Q1 median 40D sector-relative spread is about **-1.65 percentage points**, while the sector-underperformance rate is about **6 percentage points higher** in the largest-rebound quartile than the smallest-rebound quartile.

Crucially, the relationship is mainly **sector-relative**. The corresponding validation correlations with 40D Nifty-relative return and 40D absolute stock return are near zero.

So the evidence does **not** justify calling this a naked-short signal.

Detailed evidence is in:

- `reports/phase_9_internal_robustness.md`
- `reports/phase_9_locked_external_validation_spec.json`
- `reports/phase_10_external_validation_protocol.md`
- `reports/phase_10_external_validation_result.md`

## Why the project includes null and rejected results

A core objective is to distinguish real structure from patterns created by:

- overlapping observations
- retrospective turning-point selection
- arbitrary thresholds
- regime dependence
- survivorship bias
- repeated testing

A result that disappears after these checks is treated as a research result, not hidden.

## Research notebook sequence

The working research sequence is:

```text
01_download_prices.ipynb
02_calculate_relative_returns.ipynb
03_expand_universe_and_breadth.ipynb
04_build_research_universe.ipynb
05_build_relative_returns.ipynb
06_build_persistence_features.ipynb
07_classify_weakness_and_test_forward_outcomes.ipynb
08_build_weakness_episodes_and_paths.ipynb
09_test_prospective_rebound_landmarks.ipynb
10_internal_robustness_and_lock_validation.ipynb
11_external_validate_day20_rebound_candidate.ipynb
```

Notebooks 01–05 are currently committed under `notebooks/`. Later research notebooks have been validated in the working Colab workflow; their compact validated findings and locked protocols are committed under `reports/` while the larger notebook artifacts are promoted separately through a safe file-upload path.

## Research progression

```text
Build research universe
        ↓
Construct Nifty- and sector-relative returns
        ↓
Measure magnitude, persistence and concentration
        ↓
Test forward outcomes
        ↓
Find weak / unstable simple predictive relationships
        ↓
Identify overlapping-observation problem
        ↓
Compress weak stock-dates into episodes
        ↓
Discover retrospective rebound-selection bias
        ↓
Replace hindsight turning points with fixed Day 5 / 10 / 20 landmarks
        ↓
Find a Day-20 candidate relationship
        ↓
Run internal robustness checks
        ↓
Lock external-validation specification
        ↓
Replicate the candidate on 400 previously unused stocks
```

## Current status

The Day-20 candidate is now **cross-sectionally replicated**, but it is not future-time validated and has not been converted into a trading rule.

The next research step should avoid further tuning on the 2018–2026 history. A better next phase is to freeze a prospective monitoring specification for genuinely new post-cutoff observations and separately investigate the economic meaning of the sector-relative effect.

## Tools

Python, pandas, NumPy, SciPy, statsmodels, PyArrow, yfinance, Jupyter / Google Colab.

## Project philosophy

> Measure the phenomenon first. Understand its shape. Audit the experiment. Only then discuss whether anything is tradable.
