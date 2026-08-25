function chartUrl(target){const u=new URL(window.location.href);u.hash=target;return u.toString();}
async function copyChartLink(btn){const target=btn.dataset.target;await navigator.clipboard.writeText(chartUrl(target));const old=btn.textContent;btn.textContent='Copied';btn.classList.add('copied');setTimeout(()=>{btn.textContent=old;btn.classList.remove('copied');},1400);}
async function shareChart(btn){const target=btn.dataset.target;const title=btn.dataset.title||document.title;const url=chartUrl(target);if(navigator.share){try{await navigator.share({title,url});return;}catch(e){if(e.name==='AbortError')return;}}await navigator.clipboard.writeText(url);const old=btn.textContent;btn.textContent='Link copied';btn.classList.add('copied');setTimeout(()=>{btn.textContent=old;btn.classList.remove('copied');},1400);}
async function downloadChart(btn){if(!window.Plotly)return;const plot=document.getElementById(btn.dataset.plot);if(!plot)return;const title=btn.dataset.title||'CMB Research chart';const oldTitle=plot.layout.title?JSON.parse(JSON.stringify(plot.layout.title)):null;const oldMargin=JSON.parse(JSON.stringify(plot.layout.margin||{}));const oldAnnotations=plot.layout.annotations?JSON.parse(JSON.stringify(plot.layout.annotations)):[];const footer={xref:'paper',yref:'paper',x:0,y:-0.19,xanchor:'left',yanchor:'top',showarrow:false,text:'CMB Research | Chinmay Belgaonkar | research.cmbtrades.trade',font:{size:11,color:'#657084'}};await Plotly.relayout(plot,{'title.text':title,'title.x':0,'title.xanchor':'left','title.font.size':20,'margin.t':72,'margin.b':Math.max(oldMargin.b||48,92),'annotations':oldAnnotations.concat([footer])});try{await Plotly.downloadImage(plot,{format:'png',filename:(btn.dataset.filename||'cmb-research-chart'),width:1400,height:850,scale:1.5});}finally{await Plotly.relayout(plot,{'title':oldTitle,'margin':oldMargin,'annotations':oldAnnotations});}}
document.addEventListener('click',e=>{const btn=e.target.closest('.chart-action');if(!btn)return;if(btn.dataset.action==='copy')copyChartLink(btn);if(btn.dataset.action==='share')shareChart(btn);if(btn.dataset.action==='download')downloadChart(btn);});

function applyLatestResearchUpdate(){
  if(!document.querySelector('#phase12a')||document.querySelector('#phase12b'))return;

  const lede=document.querySelector('.hero .lede');
  if(lede)lede.textContent='The project starts from a familiar momentum intuition: if a stock keeps underperforming both the market and its own sector, perhaps the path of that weakness contains information about what happens next. The strongest early result was invalid, the surviving holdout relationship is small, and all three predeclared Phase 12 rebound mechanisms have now failed to explain it.';

  const statusRow=document.querySelector('.hero .status-row');
  if(statusRow)statusRow.innerHTML='<span class="status success">400-stock holdout passed</span><span class="status">Phase 12 mechanism branch closed</span><span class="status">Phase 13 lifecycle study next</span><span class="status">Future-time return test still pending</span>';

  const metrics=document.querySelectorAll('.metrics-grid .metric');
  if(metrics.length>=6)metrics[5].innerHTML='<span class="metric-label">Phase 12 mechanisms</span><strong>0 / 3</strong><span>predeclared mechanisms supported</span>';

  const nav=document.querySelector('.topbar .nav');
  if(nav){
    const phase12aLink=nav.querySelector('a[href="#phase12a"]');
    if(phase12aLink)phase12aLink.textContent='Phase 12A';
    if(!nav.querySelector('a[href="#phase12b"]')){
      const a=document.createElement('a');a.href='#phase12b';a.textContent='Phase 12B';
      phase12aLink?phase12aLink.after(a):nav.appendChild(a);
    }
  }

  const phase12b=document.createElement('section');
  phase12b.className='section shell';
  phase12b.id='phase12b';
  phase12b.innerHTML=`
    <div class="section-head">
      <div><div class="eyebrow">Phase 12B · derivatives positioning</div><h2>Futures positioning did not rescue the rebound mechanism.</h2></div>
      <p class="section-copy">The third mechanism was frozen before the Phase 12A results were viewed. It asked whether aggregate NSE single-stock futures open-interest change from the stock-price trough to Day 20 distinguished more credible rebounds from temporary ones. The predeclared direction did not survive.</p>
    </div>
    <div class="plain-setup">
      <h3>The sample narrowed naturally to stocks with valid futures data</h3>
      <p>Of the 1,128 positive-rebound observations, 457 observations across 174 stocks had valid aggregate futures OI at both the trough and Day 20. That is 40.5% coverage and clears the frozen 200-observation minimum. The result therefore applies to the narrower single-stock-futures population rather than the full Nifty 500 sample.</p>
    </div>
    <div class="two-col">
      <article class="card narrative-card">
        <div class="card-head"><div><h3>H2 · Aggregate futures OI change</h3><p class="card-subtitle">Hypothesis: rising aggregate OI during a rebound should weaken the negative rebound-to-future-underperformance relationship.</p></div><span class="pill warn">not supported</span></div>
        <div class="step-list">
          <div class="step"><span>01</span><div><strong>Expected interaction</strong><p>Positive. More outstanding futures positioning was expected to make a rebound look more credible.</p></div></div>
          <div class="step"><span>02</span><div><strong>Observed interaction</strong><p>−0.219 with ticker-clustered SE 0.167. The sign was opposite to the predeclared hypothesis.</p></div></div>
          <div class="step"><span>03</span><div><strong>Bootstrap result</strong><p>Ticker-cluster median −0.218 with 95% interval −0.552 to +0.124. Calendar-quarter median −0.228 with interval −0.493 to +0.034.</p></div></div>
          <div class="step"><span>04</span><div><strong>Directional stability</strong><p>Only 9.5% of ticker-bootstrap draws and 3.7% of quarter-bootstrap draws had the expected positive sign.</p></div></div>
        </div>
      </article>
      <article class="card narrative-card">
        <div class="card-head"><div><h3>The opposite sign is not promoted</h3><p class="card-subtitle">The data do contain an opposite-direction pattern, but it was not the hypothesis and the descriptive bins are not clean enough to reinterpret after the fact.</p></div><span class="pill neutral">exploratory only</span></div>
        <div class="step-list">
          <div class="step"><span>01</span><div><strong>OI quartiles were non-monotonic</strong><p>Rebound-versus-future-sector ρ moved +0.092, −0.005, +0.095, then −0.155 from Q1 to Q4.</p></div></div>
          <div class="step"><span>02</span><div><strong>Unconditional OI-up looked slightly better</strong><p>OI-up observations had median future sector-relative performance of about −1.17% versus −1.89% for OI-down observations.</p></div></div>
          <div class="step"><span>03</span><div><strong>Futures volume added little</strong><p>The secondary volume-change association with future sector-relative return was essentially zero, Spearman ρ ≈ +0.018.</p></div></div>
          <div class="step"><span>04</span><div><strong>Conclusion</strong><p>There is no clean single positioning story here, so the opposite-sign estimate is recorded rather than converted into a new claim.</p></div></div>
        </div>
      </article>
    </div>
    <div class="callout important"><strong>Phase 12 branch conclusion:</strong> peer confirmation, rebound concentration, and aggregate futures OI change all failed their predeclared mechanism tests. The project will not keep adding basis, delivery, turnover, or other variables simply to rescue the rebound story.</div>
    <div class="first-person-note"><p><strong>What changes next:</strong> the strongest remaining clue is about the state itself, not the rebound. Phase 13 asks whether how recently a stock made its trough helps explain how quickly a persistent-weakness episode ends.</p></div>
  `;

  const phase12a=document.querySelector('#phase12a');
  phase12a.after(phase12b);

  const prospective=document.querySelector('#prospective');
  if(prospective){
    const eyebrow=prospective.querySelector('.eyebrow');
    const h2=prospective.querySelector('h2');
    const p=prospective.querySelector('p');
    const strong=prospective.querySelector('.monitor-card strong');
    const small=prospective.querySelector('.monitor-card p');
    if(eyebrow)eyebrow.textContent='Next research branch';
    if(h2)h2.textContent='Phase 13 studies the lifecycle of persistent weakness.';
    if(p)p.textContent='Rather than adding more rebound indicators, Phase 13 changes the outcome. The primary question is whether prospectively observable Day-20 state variables, especially how recently the stock made its trailing-20-session trough, are associated with how quickly the original weakness episode ends. The +10-session episode-exit endpoint and controls are frozen before results.';
    if(strong)strong.textContent='Historical lifecycle characterization';
    if(small)small.textContent='Trough-age candidate frozen · prospective validation remains separate';
  }

  const footerLinks=document.querySelector('.footer-links');
  if(footerLinks){
    if(!footerLinks.querySelector('a[href*="phase_12b_positioning_behind_rebound_result"]')){
      const b=document.createElement('a');b.href='https://github.com/chinmay227/indian-market-internals/blob/main/reports/phase_12b_positioning_behind_rebound_result.md';b.target='_blank';b.textContent='Phase 12B result';footerLinks.appendChild(b);
    }
    if(!footerLinks.querySelector('a[href*="phase_13_lifecycle_of_persistent_weakness_spec"]')){
      const p=document.createElement('a');p.href='https://github.com/chinmay227/indian-market-internals/blob/main/reports/phase_13_lifecycle_of_persistent_weakness_spec.md';p.target='_blank';p.textContent='Phase 13 spec';footerLinks.appendChild(p);
    }
  }
}

document.addEventListener('DOMContentLoaded',applyLatestResearchUpdate);