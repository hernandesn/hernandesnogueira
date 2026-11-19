window.Painel=window.Painel||{};
var URL_='https://mraqhjjxxvbhftapjnos.supabase.co/rest/v1/rpc/site_painel',K='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYXFoamp4eHZiaGZ0YXBqbm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzcyNTMsImV4cCI6MjA2OTkxMzI1M30.S2JfG5Ic2M942LrQDoh7XZ2z_4oKcmV1b2YjLtejQn4',dias=7,page='',inicio='',fim='';
var PN={'/':'Página inicial','/ganhar-em-dolar.html':'Ganhar em dólar','/conta-internacional.html':'Conta internacional'};
function hojeCuiaba(){return new Date().toLocaleDateString('en-CA',{timeZone:'America/Cuiaba'})}
function isoAdd(iso,n){var a=iso.split('-').map(Number);var d=new Date(Date.UTC(a[0],a[1]-1,a[2]+n));return d.toISOString().slice(0,10)}
function isoDays(a,b){var x=a.split('-').map(Number),y=b.split('-').map(Number);return Math.round((Date.UTC(y[0],y[1]-1,y[2])-Date.UTC(x[0],x[1]-1,x[2]))/86400000)+1}
function fmtBR(iso){var a=String(iso).slice(0,10).split('-');return a[2]+'/'+a[1]+'/'+a[0]}
function ehPreset(d0,d1){var h=hojeCuiaba();return d1===h&&(d0===h||d0===isoAdd(h,-6)||d0===isoAdd(h,-29))}
function setDatas(d0,d1){
  if(!d0||!d1)return;
  if(d0>d1){var t=d0;d0=d1;d1=t}
  var msg='';
  if(isoDays(d0,d1)>90){d1=isoAdd(d0,89);msg='O intervalo máximo é de 90 dias. Ajustei a data final.'}
  inicio=d0;fim=d1;
  var h=hojeCuiaba(),i0=document.getElementById('d0'),i1=document.getElementById('d1');
  if(i0){i0.value=inicio;i0.max=h}if(i1){i1.value=fim;i1.max=h}
  var on=null;
  if(fim===h){if(inicio===h)on=1;else if(inicio===isoAdd(h,-6))on=7;else if(inicio===isoAdd(h,-29))on=30}
  if(on)dias=on;
  document.querySelectorAll('.f button[data-d]').forEach(function(b){b.classList.toggle('on',+b.dataset.d===on)});
  var aviso=document.getElementById('daviso');
  if(aviso){aviso.hidden=!msg;aviso.textContent=msg}
}
Painel.html='<div class="f"><button type="button" data-d="1">Hoje</button><button type="button" data-d="7" class="on">7 dias</button><button type="button" data-d="30">30 dias</button></div><div class="f datas"><label>De <input id="d0" type="date"></label><label>Até <input id="d1" type="date"></label></div><div class="sub" id="daviso" hidden></div><div class="f"><select id="pg"><option value="">Todas as páginas</option><option value="/">Página inicial</option><option value="/ganhar-em-dolar.html">Ganhar em dólar</option><option value="/conta-internacional.html">Conta internacional</option></select></div><div class="sub" id="upd">carregando…</div><div id="app"></div>';
Painel.start=function(el){el.innerHTML=Painel.html;
var h=hojeCuiaba();setDatas(isoAdd(h,-6),h);
el.querySelectorAll('.f button[data-d]').forEach(function(b){b.onclick=function(){var h=hojeCuiaba();setDatas(isoAdd(h,1-+b.dataset.d),h);load();}});
document.getElementById('d0').onchange=document.getElementById('d1').onchange=function(){var a=document.getElementById('d0').value,b=document.getElementById('d1').value;if(!a||!b)return;setDatas(a,b);load();};
document.getElementById('pg').onchange=function(){page=this.value;load();};
load();if(!Painel._t)Painel._t=setInterval(load,60000);};
Painel.load=function(){load()};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function list(t,a,k,v){if(!a.length)return '<div class="c"><h2>'+t+'</h2><div class="l">Sem dados ainda</div></div>';var mx=Math.max.apply(0,a.map(function(x){return x[v]}));
return '<div class="c"><h2>'+t+'</h2>'+a.map(function(x){return '<div class="row"><span>'+esc(x[k])+'</span><b>'+x[v]+'</b></div><div class="bar" style="width:'+(100*x[v]/mx)+'%"></div>'}).join('')+'</div>'}
function fillDays(rows,d0,d1){var map={};(rows||[]).forEach(function(x){map[String(x.dia).slice(0,10)]=x});var out=[],d=d0;while(d<=d1){var x=map[d];out.push(x?{dia:d,visitas:+x.visitas||0,sessoes:+x.sessoes||0,cliques:+x.cliques||0}:{dia:d,visitas:0,sessoes:0,cliques:0});d=isoAdd(d,1)}return out}
function chart(d){if(!d.length)return '';var W=Math.max(600,d.length*22),H=150,mx=Math.max(1,Math.max.apply(0,d.map(function(x){return Math.max(x.visitas,x.cliques)}))),n=d.length,bw=W/n,step=n<=14?1:n<=31?2:n<=62?7:14;
return '<div class="c"><h2>Por dia</h2><div class="chart-wrap"><svg viewBox="0 0 '+W+' '+(H+18)+'">'+d.map(function(x,i){var h=x.visitas/mx*H,h2=x.cliques/mx*H,lab=(i%step===0||i===n-1)?'<text x="'+(i*bw+bw/2)+'" y="'+(H+14)+'" font-size="11" text-anchor="middle" fill="#666">'+x.dia.slice(8)+'/'+x.dia.slice(5,7)+'</text>':'',val=x.visitas?'<text x="'+(i*bw+bw*.32)+'" y="'+(H-h-3)+'" font-size="11" text-anchor="middle">'+x.visitas+'</text>':'';return '<rect x="'+(i*bw+bw*.15)+'" y="'+(H-h)+'" width="'+bw*.35+'" height="'+h+'" fill="#00c2c7" rx="3"/><rect x="'+(i*bw+bw*.5)+'" y="'+(H-h2)+'" width="'+bw*.35+'" height="'+h2+'" fill="#111" rx="3"/>'+lab+val}).join('')+'</svg></div><div class="l">■ <span style="color:#00c2c7">visitas</span> ■ cliques</div></div>'}
function rpc(a,body){return fetch(URL_,{method:'POST',headers:{apikey:K,Authorization:'Bearer '+(a.token||K),'Content-Type':'application/json'},body:JSON.stringify(body)})}
function load(){Painel.auth().then(function(a){return rpc(a,{p_key:a.key||null,p_inicio:inicio,p_fim:fim,p_page:page||null}).then(function(r){if(r.ok)return r.json();if(!ehPreset(inicio,fim))throw r.status===404||r.status===400?'datas':0;return rpc(a,{p_key:a.key||null,p_dias:dias,p_page:page||null}).then(function(r2){if(!r2.ok)throw 0;return r2.json()})})}).then(function(r){
var p=r.periodo,t=r.totais,ctr=p.sessoes?Math.round(100*p.sessoes_bitget/p.sessoes):0,dv=r.dispositivo,tv=(dv.mobile+dv.desktop)||1;
document.getElementById('app').innerHTML='<div class="g"><div class="c"><div class="k">'+p.visitas+'</div><div class="l">Visitas</div></div><div class="c"><div class="k">'+p.sessoes+'</div><div class="l">Pessoas (sessões)</div></div><div class="c"><div class="k">'+p.cliques+'</div><div class="l">Cliques</div></div><div class="c"><div class="k">'+ctr+'%</div><div class="l">Clicaram na Bitget</div></div></div>'
+'<div class="c l">Hoje: <b>'+t.hoje.visitas+'</b> visitas / <b>'+t.hoje.cliques+'</b> cliques · 7d: <b>'+t['7d'].visitas+'</b> / <b>'+t['7d'].cliques+'</b> · 30d: <b>'+t['30d'].visitas+'</b> / <b>'+t['30d'].cliques+'</b></div>'
+(page?'':list('Por página',r.por_pagina.map(function(x){return {p:(PN[x.pagina]||x.pagina)+' · '+x.cliques+' cliques',v:x.visitas}}),'p','v'))+chart(fillDays(r.por_dia,inicio,fim))+list('Cliques por botão',r.por_alvo,'alvo','cliques')+list('Origem (utm_source)',r.por_utm,'origem','visitas')+list('Site de origem',r.por_referrer,'dominio','visitas')
+'<div class="c"><h2>Dispositivo</h2><div class="row"><span>📱 Celular</span><b>'+dv.mobile+' ('+Math.round(100*dv.mobile/tv)+'%)</b></div><div class="row"><span>💻 Computador</span><b>'+dv.desktop+' ('+Math.round(100*dv.desktop/tv)+'%)</b></div></div>';
document.getElementById('upd').textContent='Período '+fmtBR(inicio)+' a '+fmtBR(fim)+' · atualizado '+new Date().toLocaleTimeString('pt-BR',{timeZone:'America/Cuiaba'})+' · atualiza a cada 60s';
}).catch(function(e){document.getElementById('app').innerHTML=e==='datas'?'<div class="err">Essa seleção de data ainda precisa ser ativada no servidor. Os botões Hoje, 7 dias e 30 dias continuam funcionando.</div>':'<div class="err">Sem acesso ou erro ao carregar.</div>'})}
