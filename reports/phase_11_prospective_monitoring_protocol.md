# Phase 11 — Prospective Monitoring Protocol

## Status

Phase 10 cross-sectionally replicated the Day-20 rebound candidate on 400 previously unused stocks, but the historical period remained the same as discovery.

Phase 11 therefore freezes the candidate for **future-time monitoring** using only Day-20 landmarks occurring after the historical research cutoff:

**2026-08-21**

## Locked candidate

- weakness episode: consecutive valid sessions with 20D relative return < 0 versus both Nifty and leave-one-out sector peers;
- landmark: Day 20 of the episode;
- predictor: continuous `stock_rebound_trailing20_from_low`;
- primary outcome: 40D sector-relative return;
- expected direction: negative;
- no rebound threshold;
- no landmark or horizon optimization;
- same-stock episode-start anchors spaced by more than 60 market sessions.

## Purpose

This phase does not search the 2018–2026 history again. It accumulates genuinely new observations after the research cutoff.

The historical candidate remains frozen while new Day-20 episodes mature through their subsequent 40-session outcome windows.

## Interpretation discipline

A handful of new observations will not be treated as confirmation or rejection.

A formal future-time decision threshold, including any minimum prospective sample size, must be specified before the corresponding future outcomes are inspected.

Until then, the prospective notebook produces a descriptive scorecard only.

## Current evidence hierarchy

1. historical discovery on 100 stocks;
2. internal robustness checks;
3. locked cross-sectional validation on 400 unused stocks — PASS;
4. future-time prospective monitoring — now beginning.

## Important limitation

Even a future-time relationship would not automatically establish a tradable shorting strategy. The validated historical effect is mainly sector-relative rather than an outright negative stock-return relationship.
