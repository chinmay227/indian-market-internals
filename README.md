# Indian Market Internals

This project studies momentum, mean reversion, and market breadth in Indian equities.

## Core Question

If a stock outperformed Nifty over the last 6 months, did it continue to outperform over the next 3 months?

## Why This Matters

Index returns can hide what is happening underneath. Nifty may rise even when only a small number of stocks are leading. This project looks below the index level to study market breadth, relative strength, and leadership rotation.

## What This Project Measures

- Stock returns over 1M, 3M, 6M, and 12M periods
- Nifty returns over the same periods
- Relative return versus Nifty
- Percentage of stocks outperforming Nifty
- Forward returns after outperformance or underperformance
- Momentum versus mean reversion behavior

## First Version

The first version tests whether past 6-month outperformers continue to outperform Nifty over the next 3 months.

## Planned Dashboard Pages

1. Market Breadth
2. Momentum Test
3. Mean Reversion Test
4. Regime Comparison

## Tools

Python, pandas, yfinance, matplotlib, Streamlit
