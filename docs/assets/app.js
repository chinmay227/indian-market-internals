const DATA_URL = 'assets/data/dashboard_data.json';
const INK = '#111827';
const MUTED = '#667085';
const GRID = '#e6e9ef';
const ACCENT = '#174a5c';
const ACCENT2 = '#568b95';
const POS = '#176b4d';
const NEG = '#9b3b3b';

const baseLayout = (extra={}) => ({
  margin: {l: 58, r: 24, t: 18, b: 48},
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  font: {family: 'Inter, ui-sans-serif, system-ui, sans-serif', color: INK, size: 12},
  xaxis: {gridcolor: GRID, zerolinecolor: GRID, tickfont:{color:MUTED}},
  yaxis: {gridcolor: GRID, zerolinecolor: GRID, tickfont:{color:MUTED}},
  showlegend: false,
  hoverlabel: {bgcolor:'#fff', bordercolor:'#d9dee7', font:{color:INK}},
  ...extra
});
const config = {displayModeBar:false, responsive:true};

function rho(v){ return Number(v).toFixed(3); }

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

  setupExplorer(data.sector_summary, data.sector_quartiles);
}

function setupExplorer(summary, quartiles){
  const sector=document.getElementById('sectorFilter');
  summary.forEach(d=>sector.insertAdjacentHTML('beforeend',`<option>${d.sector}</option>`));

  const render=()=>{
    const selected=sector.value;
    const rows = selected==='ALL' ? summary : summary.filter(d=>d.sector===selected);
    document.getElementById('filteredCount').textContent = selected==='ALL'
      ? `${rows.length} sectors · full holdout remains primary`
      : `${rows[0]?.observations || 0} observations · ${rows[0]?.unique_stocks || 0} stocks`;

    const ordered=[...rows].sort((a,b)=>a.spearman-b.spearman);
    Plotly.react('sectorRhoChart', [{type:'bar',orientation:'h',y:ordered.map(d=>d.sector),x:ordered.map(d=>d.spearman),marker:{color:ordered.map(d=>d.spearman<0?ACCENT:POS)},customdata:ordered.map(d=>[d.observations,d.unique_stocks,d.median_sector40*100,d.underperf_rate*100]),hovertemplate:'%{y}<br>Spearman ρ %{x:.3f}<br>n=%{customdata[0]} · stocks=%{customdata[1]}<br>Median future sector-relative %{customdata[2]:.2f}%<br>Underperformance rate %{customdata[3]:.1f}%<extra></extra>'}], baseLayout({xaxis:{title:'Spearman ρ',gridcolor:GRID,zerolinecolor:'#9ca3af'},yaxis:{gridcolor:'rgba(0,0,0,0)',automargin:true},margin:{l:selected==='ALL'?175:140,r:20,t:18,b:52}}), config);

    if(selected==='ALL'){
      document.getElementById('sectorQuartileChart').innerHTML='<div style="padding:110px 25px;text-align:center;color:#667085">Choose a sector to inspect within-sector rebound quartiles.</div>';
      return;
    }
    const qrows=quartiles.filter(d=>d.sector===selected).sort((a,b)=>a.quartile-b.quartile);
    if(!qrows.length){
      document.getElementById('sectorQuartileChart').innerHTML='<div style="padding:110px 25px;text-align:center;color:#667085">Not enough observations for a four-quartile view.</div>';
      return;
    }
    Plotly.react('sectorQuartileChart', [{type:'bar',x:qrows.map(d=>`Q${d.quartile}`),y:qrows.map(d=>d.median_sector40*100),marker:{color:ACCENT},text:qrows.map(d=>`${(d.median_sector40*100).toFixed(2)}%`),textposition:'outside',cliponaxis:false,customdata:qrows.map(d=>[(d.median_rebound*100).toFixed(2),d.observations,(d.underperf_rate*100).toFixed(1)]),hovertemplate:'%{x}<br>Median rebound %{customdata[0]}%<br>Median future sector-relative %{y:.2f}%<br>Underperformance rate %{customdata[2]}%<br>n=%{customdata[1]}<extra></extra>'}], baseLayout({yaxis:{title:'Median 40D sector-relative return (%)',gridcolor:GRID,zerolinecolor:'#9ca3af'},margin:{l:70,r:20,t:18,b:48}}), config);
  };
  sector.addEventListener('change',render);
  document.getElementById('resetFilters').addEventListener('click',()=>{sector.value='ALL';render();});
  render();
}

document.addEventListener('DOMContentLoaded',()=>{
  const timer=setInterval(()=>{if(window.Plotly){clearInterval(timer);init().catch(err=>console.error(err));}},25);
});