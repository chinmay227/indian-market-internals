const DATA_URL = 'assets/data/dashboard_data.json';
const INK = '#111827';
const MUTED = '#667085';
const GRID = '#e6e9ef';
const ACCENT = '#174a5c';
const ACCENT2 = '#568b95';
const POS = '#176b4d';
const NEG = '#9b3b3b';
const PALE = '#b9c7cc';

const baseLayout = (extra={}) => ({
  margin: {l: 58, r: 24, t: 18, b: 48},
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  font: {family: 'IBM Plex Sans, ui-sans-serif, system-ui, sans-serif', color: INK, size: 12},
  xaxis: {gridcolor: GRID, zerolinecolor: GRID, tickfont:{color:MUTED}},
  yaxis: {gridcolor: GRID, zerolinecolor: GRID, tickfont:{color:MUTED}},
  showlegend: false,
  hoverlabel: {bgcolor:'#fff', bordercolor:'#d9dee7', font:{color:INK}},
  ...extra
});
const config = {displayModeBar:false, responsive:true};

function rho(v){ return Number(v).toFixed(3); }
function pct(v, digits=2){ return `${(Number(v)*100).toFixed(digits)}%`; }
function pp(v, digits=2){ return `${(Number(v)*100).toFixed(digits)} pp`; }

function describeRho(value){
  if(value <= -0.15) return 'a relatively pronounced negative rank relationship';
  if(value <= -0.05) return 'a modest negative rank relationship';
  if(value < -0.02) return 'a weak negative rank relationship';
  if(value <= 0.02) return 'essentially no consistent rank relationship';
  if(value < 0.10) return 'a weak positive rank relationship';
  return 'a positive rank relationship';
}

function setText(selector, text){
  const el=document.querySelector(selector);
  if(el) el.textContent=text;
}

function applyPublicationVoice(){
  setText('.hero h1','What does persistent stock weakness actually look like?');
  setText('.hero .lede','The project began with a simple momentum intuition: a stock that keeps underperforming both the market and its own sector may remain weak. Most of the obvious versions of that idea turned out to be much weaker than expected.');
  setText('#result .section-head h2','A small relationship held up in the 400-stock holdout.');
  setText('.plain-setup p','The test is not simply asking whether a stock is down. A weakness episode is defined as consecutive sessions in which the stock is weak relative to both Nifty 50 and its sector. If that episode survives to Day 20, the rebound from the lowest price in the previous 20 sessions is measured. Future performance is then compared with sector peers over the next 40 sessions.');
  const steps=document.querySelectorAll('.question-step p');
  if(steps[1]) steps[1].textContent='On Day 20, the rebound is measured as the distance from the lowest stock price in the trailing 20 sessions.';
  if(steps[2]) steps[2].textContent='The next 40 sessions are compared with sector peers. Negative sector-relative return means the stock lagged its sector.';
  setText('#chart-holdout .card-subtitle','The candidate was found on 100 stocks. The specification was then frozen and tested on the other 400 stocks from the same Nifty 500 snapshot.');
  setText('#chart-landmarks .card-subtitle','This chart is discovery only. Fixed Day 5, Day 10, and Day 20 landmarks were tested because each could have been observed in real time.');
  setText('#chart-quartiles .card-subtitle','The 1,386 validation observations are split into four groups based only on rebound size. Q1 has the smallest rebounds. Q4 has the largest.');
  setText('#chart-bootstrap .card-subtitle','Rows from the same stock, quarter, or sector are not fully independent. The validation data are therefore resampled in clusters rather than treating every observation as unrelated.');
  setText('#chart-outcomes .card-subtitle','The same rebound ranking is compared with three future outcomes to distinguish absolute stock direction from Nifty-relative and sector-relative performance.');
  setText('#bias .section-head h2','A promising result turned out to be created by hindsight.');
  setText('#bias .section-copy','The original test searched forward for the largest rebound inside a 20-session window and then measured returns after that selected peak. The historical anchor therefore depended on information that would not have been known at the time.');
  setText('#chart-bias .card-subtitle','Cases are grouped by where the retrospectively selected maximum rebound occurred inside the future 20-session search window.');
  setText('#episodes .eyebrow','Episode definition');
  setText('#episodes .section-head h2','Consecutive weak days are grouped into episodes to avoid repeated counting.');
  setText('#episodes .section-copy','A weakness episode continues while the stock remains weak relative to both Nifty and its sector. Once that condition breaks, the episode ends.');
  setText('#explorer .section-head h2','Sector results show how much the relationship varies across industries.');
  setText('#explorer .section-copy','The locked validation result is the full 400-stock holdout. The sector breakdown is secondary. Some sectors have only a few dozen observations, so these estimates are treated as noisy diagnostics rather than separate confirmed results.');
  setText('.explorer-rho-card .card-subtitle','Each bar is a within-sector Spearman rank correlation. The dotted vertical line is the overall 400-stock holdout result, Spearman ρ = −0.061. It is a reference point, not a cutoff or confidence interval.');
  const interp=document.getElementById('sectorInterpretation');
  if(interp) interp.innerHTML='<strong>How to use this:</strong> select a sector to compare its descriptive relationship with the full locked holdout.';
  setText('#sectorTechnicalTitle','Why the sector view is secondary');
  setText('#method .section-head h2','The design reduces hindsight and repeated counting.');
  setText('#method .section-copy','The full notebook trail and working paper are in the repository. This section summarizes the design choices that matter most for interpreting the result.');
  const methods=document.querySelectorAll('#method .method-card p');
  if(methods[0]) methods[0].textContent='Each stock is compared with Nifty 50 and with a leave-one-out equal-weight sector peer benchmark.';
  if(methods[1]) methods[1].textContent='Magnitude, persistence, concentration, and related features remain separate rather than being collapsed into one optimized score at this stage.';
  if(methods[5]) methods[5].textContent='The Day-20 predictor, 40-session sector-relative outcome, holdout universe, and pass criteria were frozen before the validation result was inspected.';
  setText('#prospective h2','The historical candidate is now frozen.');
  setText('#prospective p','The historical research cutoff is 21 August 2026. New Day-20 episode landmarks after that date will be evaluated with the same rebound measure and the same next-40-session sector-relative outcome. No new historical tuning will be used to redefine the candidate while the prospective test is running.');
}

async function init(){
  const data = await fetch(DATA_URL).then(r=>r.json());

  Plotly.newPlot('discoveryValidation', [{type:'bar', x:['Discovery\n100 stocks','Validation\n400 stocks'], y:[data.meta.discovery_spearman,data.meta.validation_spearman], marker:{color:[ACCENT,ACCENT2]}, text:[rho(data.meta.discovery_spearman),rho(data.meta.validation_spearman)], textposition:'outside', cliponaxis:false, hovertemplate:'%{x}<br>Spearman ρ = %{y:.3f}<extra></extra>'}], baseLayout({yaxis:{title:'Spearman ρ',range:[-0.22,0.04],gridcolor:GRID,zerolinecolor:'#9ca3af'}, margin:{l:62,r:20,t:18,b:58}}), config);

  Plotly.newPlot('landmarkChart', [{type:'bar', x:data.landmarks.map(d=>`Day ${d.landmark_day}`), y:data.landmarks.map(d=>d.spearman), marker:{color:[ACCENT2,ACCENT2,ACCENT]}, text:data.landmarks.map(d=>rho(d.spearman)), textposition:'outside', cliponaxis:false, customdata:data.landmarks.map(d=>d.observations), hovertemplate:'%{x}<br>ρ = %{y:.3f}<br>n = %{customdata}<extra></extra>'}], baseLayout({yaxis:{title:'40D sector-relative Spearman ρ',range:[-0.22,0.03],gridcolor:GRID,zerolinecolor:'#9ca3af'}, margin:{l:70,r:20,t:18,b:50}}), config);

  Plotly.newPlot('quartileChart', [{type:'bar', x:data.quartiles.map(d=>`Q${d.rebound_quartile}`), y:data.quartiles.map(d=>d.median_sector40*100), marker:{color:ACCENT}, text:data.quartiles.map(d=>`${(d.median_sector40*100).toFixed(2)}%`), textposition:'outside', cliponaxis:false, customdata:data.quartiles.map(d=>[(d.median_rebound*100).toFixed(2), (d.underperf_sector40_rate*100).toFixed(1), d.observations]), hovertemplate:'%{x}<br>Median rebound %{customdata[0]}%<br>Median 40D sector-relative %{y:.2f}%<br>Underperformance rate %{customdata[1]}%<br>n=%{customdata[2]}<extra></extra>'}], baseLayout({yaxis:{title:'Median 40D sector-relative return (%)',gridcolor:GRID,zerolinecolor:'#9ca3af'}, margin:{l:70,r:20,t:18,b:48}}), config);

  const b=data.bootstrap;
  Plotly.newPlot('bootstrapChart', [{type:'scatter', mode:'markers', y:b.map(d=>d.cluster==='calendar_quarter'?'Calendar quarter':d.cluster[0].toUpperCase()+d.cluster.slice(1)), x:b.map(d=>d.median_rho), marker:{size:9,color:ACCENT}, error_x:{type:'data',symmetric:false,array:b.map(d=>d.ci_97_5-d.median_rho),arrayminus:b.map(d=>d.median_rho-d.ci_2_5),color:ACCENT,thickness:2,width:5}, customdata:b.map(d=>[d.ci_2_5,d.ci_97_5,d.clusters,d.pct_rho_negative]), hovertemplate:'%{y}<br>Median ρ %{x:.3f}<br>95% CI [%{customdata[0]:.3f}, %{customdata[1]:.3f}]<br>Clusters %{customdata[2]}<br>Negative draws %{customdata[3]:.1f}%<extra></extra>'}], baseLayout({xaxis:{title:'Spearman ρ',range:[-0.14,0.025],gridcolor:GRID,zerolinecolor:'#9ca3af'}, yaxis:{gridcolor:'rgba(0,0,0,0)'}, margin:{l:115,r:20,t:18,b:52}}), config);

  const outcomes=[
    {name:'Sector-relative 40D',rho:data.meta.validation_spearman},
    ...data.secondary.filter(d=>['future_rel_nifty_40d','future_stock_40d'].includes(d.outcome)).map(d=>({name:d.outcome==='future_rel_nifty_40d'?'Nifty-relative 40D':'Absolute stock 40D',rho:d.spearman}))
  ];
  Plotly.newPlot('outcomeChart', [{type:'bar', orientation:'h', y:outcomes.map(d=>d.name), x:outcomes.map(d=>d.rho), marker:{color:outcomes.map(d=>d.rho<0?ACCENT:POS)}, text:outcomes.map(d=>rho(d.rho)), textposition:'outside', cliponaxis:false, hovertemplate:'%{y}<br>Spearman ρ = %{x:.3f}<extra></extra>'}], baseLayout({xaxis:{title:'Spearman ρ',range:[-0.075,0.03],gridcolor:GRID,zerolinecolor:'#9ca3af'}, yaxis:{gridcolor:'rgba(0,0,0,0)'}, margin:{l:145,r:36,t:18,b:48}}), config);

  Plotly.newPlot('biasChart', [{type:'bar', x:data.hindsight_bias.map(d=>d.offset_group), y:data.hindsight_bias.map(d=>d.median_post10*100), marker:{color:data.hindsight_bias.map(d=>d.offset_group==='20'?POS:NEG)}, text:data.hindsight_bias.map(d=>`${(d.median_post10*100).toFixed(1)}%`), textposition:'outside', cliponaxis:false, customdata:data.hindsight_bias.map(d=>[d.observations,(d.median_rebound*100).toFixed(1),(d.negative_rate_post10*100).toFixed(1)]), hovertemplate:'Selected max rebound offset %{x}<br>Median next-10D return %{y:.2f}%<br>Median selected rebound %{customdata[1]}%<br>Negative rate %{customdata[2]}%<br>n=%{customdata[0]}<extra></extra>'}], baseLayout({xaxis:{title:'Where the retrospectively selected rebound peak occurred'}, yaxis:{title:'Median next-10D stock return (%)',gridcolor:GRID,zerolinecolor:'#9ca3af'}, margin:{l:70,r:20,t:18,b:62}}), config);

  Plotly.newPlot('episodeChart', [{type:'bar', x:data.episode_duration.map(d=>d.bucket), y:data.episode_duration.map(d=>d.episodes), marker:{color:ACCENT}, hovertemplate:'Episode length %{x} sessions<br>%{y:,} episodes<extra></extra>'}], baseLayout({xaxis:{title:'Episode length (market sessions)'}, yaxis:{title:'Episodes',gridcolor:GRID}, margin:{l:70,r:20,t:18,b:55}}), config);

  setupExplorer(data.sector_summary, data.sector_quartiles, data.meta);
}

function setupExplorer(summary, quartiles, meta){
  const sector=document.getElementById('sectorFilter');
  summary.forEach(d=>sector.insertAdjacentHTML('beforeend',`<option>${d.sector}</option>`));

  const renderSectorBars=(selected)=>{
    const ordered=[...summary].sort((a,b)=>a.spearman-b.spearman);
    const colors=ordered.map(d=>{
      if(selected!=='ALL' && d.sector===selected) return ACCENT;
      return d.spearman < 0 ? PALE : '#b8c9bf';
    });

    Plotly.react('sectorRhoChart', [{
      type:'bar', orientation:'h',
      y:ordered.map(d=>d.sector),
      x:ordered.map(d=>d.spearman),
      marker:{color:colors},
      text:ordered.map(d=>rho(d.spearman)),
      textposition:'outside', cliponaxis:false,
      customdata:ordered.map(d=>[d.observations,d.unique_stocks,d.median_sector40*100,d.underperf_rate*100]),
      hovertemplate:'%{y}<br>Within-sector Spearman ρ %{x:.3f}<br>Observations %{customdata[0]} · stocks %{customdata[1]}<br>Median future sector-relative %{customdata[2]:.2f}%<br>Underperformance rate %{customdata[3]:.1f}%<extra></extra>'
    }], baseLayout({
      xaxis:{title:'Rank correlation (Spearman ρ)',range:[-0.42,0.36],gridcolor:GRID,zerolinecolor:'#9ca3af'},
      yaxis:{gridcolor:'rgba(0,0,0,0)',automargin:true},
      margin:{l:190,r:42,t:42,b:55},
      shapes:[{type:'line',x0:meta.validation_spearman,x1:meta.validation_spearman,y0:-0.5,y1:ordered.length-0.5,line:{color:ACCENT,dash:'dash',width:2}}],
      annotations:[{x:meta.validation_spearman,y:ordered.length-0.15,text:'Overall 400-stock holdout<br>Spearman ρ = −0.061',showarrow:false,xanchor:'left',yanchor:'bottom',align:'left',font:{size:11,color:ACCENT},bgcolor:'rgba(255,255,255,.9)',borderpad:4}]
    }), config);
  };

  const render=()=>{
    const selected=sector.value;
    const selectedRow = selected==='ALL' ? null : summary.find(d=>d.sector===selected);

    document.getElementById('filteredCount').textContent = selected==='ALL'
      ? `${summary.length} sectors · full holdout remains primary`
      : `${selectedRow.observations} observations · ${selectedRow.unique_stocks} stocks`;

    renderSectorBars(selected);

    const statRho=document.getElementById('sectorStatRho');
    const statRhoNote=document.getElementById('sectorStatRhoNote');
    const statN=document.getElementById('sectorStatN');
    const statNNote=document.getElementById('sectorStatNNote');
    const statMedian=document.getElementById('sectorStatMedian');
    const interpretation=document.getElementById('sectorInterpretation');
    const technicalTitle=document.getElementById('sectorTechnicalTitle');
    const technicalBody=document.getElementById('sectorTechnicalBody');
    const quartileCaption=document.getElementById('sectorQuartileCaption');
    const quartileBox=document.getElementById('sectorQuartileChart');

    if(selected==='ALL'){
      statRho.textContent=rho(meta.validation_spearman);
      statRhoNote.textContent='locked 400-stock holdout';
      statN.textContent=meta.validation_observations.toLocaleString();
      statNNote.textContent=`${meta.validation_unique_stocks} stocks`;
      statMedian.textContent='—';
      interpretation.innerHTML='<strong>How to read this:</strong> the dotted line is the overall 400-stock holdout estimate (ρ = −0.061). Bars show how much individual sector estimates vary around it. The line is a reference point, not a cutoff or confidence interval.';
      technicalTitle.textContent='Why the sector view is secondary';
      technicalBody.textContent='The candidate and success rule were locked for the complete 400-stock holdout, not for each sector separately. Sector decompositions are therefore heterogeneity diagnostics rather than confirmatory tests.';
      Plotly.purge(quartileBox);
      quartileBox.innerHTML='<div class="plot-placeholder"><strong>Select a sector</strong><span>Then this panel will split that sector’s observations into four rebound groups and show their median next-40-session performance relative to sector peers.</span></div>';
      quartileCaption.textContent='The full validation quartiles are shown earlier on the page. This panel is intentionally reserved for within-sector diagnostics.';
      return;
    }

    statRho.textContent=rho(selectedRow.spearman);
    statRhoNote.textContent=describeRho(selectedRow.spearman);
    statN.textContent=selectedRow.observations.toLocaleString();
    statNNote.textContent=`${selectedRow.unique_stocks} stocks`;
    statMedian.textContent=pct(selectedRow.median_sector40);

    const signComparison = selectedRow.spearman < meta.validation_spearman
      ? 'more negative than the full-holdout estimate'
      : selectedRow.spearman > 0
        ? 'opposite in sign to the full-holdout estimate'
        : 'less negative than the full-holdout estimate';
    const smallSample = selectedRow.observations < 50
      ? ` Only ${selectedRow.observations} observations are available, so this subgroup estimate is particularly noisy.`
      : '';

    interpretation.innerHTML=`<strong>${selected}:</strong> this slice shows ${describeRho(selectedRow.spearman)} (ρ = ${rho(selectedRow.spearman)}), ${signComparison}. The median 40D sector-relative outcome is ${pct(selectedRow.median_sector40)}.${smallSample}`;

    const qrows=quartiles.filter(d=>d.sector===selected).sort((a,b)=>a.quartile-b.quartile);
    if(!qrows.length){
      Plotly.purge(quartileBox);
      quartileBox.innerHTML='<div class="plot-placeholder"><strong>Insufficient data</strong><span>There are not enough observations for a four-quartile view.</span></div>';
      quartileCaption.textContent='No quartile interpretation is shown because the subgroup is too small.';
      technicalTitle.textContent=`${selected}: technical note`;
      technicalBody.textContent=`The sector-level rank correlation is ${rho(selectedRow.spearman)} based on ${selectedRow.observations} observations from ${selectedRow.unique_stocks} stocks. This is a post-validation descriptive decomposition, not a separately predeclared test.`;
      return;
    }

    const medians=qrows.map(d=>d.median_sector40);
    const q4minusq1=medians[3]-medians[0];
    const monotonicDown=medians.every((v,i)=>i===0 || v<=medians[i-1]);
    const directionalSteps=medians.slice(1).filter((v,i)=>v<medians[i]).length;

    Plotly.purge(quartileBox);
    quartileBox.innerHTML='';
    Plotly.newPlot(quartileBox, [{
      type:'bar',
      x:qrows.map(d=>`Q${d.quartile}`),
      y:qrows.map(d=>d.median_sector40*100),
      marker:{color:qrows.map((d,i)=>i===3?ACCENT:ACCENT2)},
      text:qrows.map(d=>`${(d.median_sector40*100).toFixed(2)}%`),
      textposition:'outside', cliponaxis:false,
      customdata:qrows.map(d=>[(d.median_rebound*100).toFixed(2),d.observations,(d.underperf_rate*100).toFixed(1)]),
      hovertemplate:'%{x}<br>Median rebound %{customdata[0]}%<br>Median future sector-relative %{y:.2f}%<br>Underperformance rate %{customdata[2]}%<br>n=%{customdata[1]}<extra></extra>'
    }], baseLayout({yaxis:{title:'Median next-40-session return vs sector (%)',gridcolor:GRID,zerolinecolor:'#9ca3af'},margin:{l:72,r:20,t:18,b:48}}), config);

    quartileCaption.textContent = monotonicDown
      ? `This sector shows a clean downward Q1→Q4 ordering. Q4 is ${Math.abs(q4minusq1*100).toFixed(2)} percentage points below Q1, but this remains a descriptive subgroup result.`
      : `This sector is not monotonic across all four groups (${directionalSteps} of 3 adjacent steps move downward). Q4 − Q1 is ${(q4minusq1*100).toFixed(2)} percentage points; the middle quartiles show why the sector slice should not be over-interpreted.`;

    technicalTitle.textContent=`${selected}: technical read`;
    technicalBody.textContent=`Within this sector, Spearman ρ = ${rho(selectedRow.spearman)} using ${selectedRow.observations} observations from ${selectedRow.unique_stocks} stocks. The full locked holdout is ρ = ${rho(meta.validation_spearman)} across ${meta.validation_observations.toLocaleString()} observations. Each sector quartile contains only about ${Math.floor(selectedRow.observations/4)} observations, so the quartile shape is a diagnostic of heterogeneity rather than an independent replication claim.`;
  };

  sector.addEventListener('change',render);
  document.getElementById('resetFilters').addEventListener('click',()=>{sector.value='ALL';render();});
  render();
}

document.addEventListener('DOMContentLoaded',()=>{
  applyPublicationVoice();
  const timer=setInterval(()=>{if(window.Plotly){clearInterval(timer);init().catch(err=>console.error(err));}},25);
});