(function(){
var API='https://rpmkofhtsfmnzqfdwhvo.supabase.co/functions/v1/ig-api';
var sb=supabase.createClient('https://mraqhjjxxvbhftapjnos.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYXFoamp4eHZiaGZ0YXBqbm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzcyNTMsImV4cCI6MjA2OTkxMzI1M30.S2JfG5Ic2M942LrQDoh7XZ2z_4oKcmV1b2YjLtejQn4',{auth:{storageKey:'site_admin_auth'}});
var $=function(i){return document.getElementById(i)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var S={flows:[],cur:null,days:7};
async function api(action,data){var s=(await sb.auth.getSession()).data.session;if(!s){showLogin();throw 'login'}
 var r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+s.access_token},body:JSON.stringify(Object.assign({action:action},data||{}))});
 var j=await r.json();if(r.status===401){$('le').textContent='Esta conta não tem acesso.';showLogin();throw 'auth'}if(j.error)throw j.error;return j}
function showLogin(){$('lf').hidden=false;$('app').hidden=true}
$('lf').onsubmit=function(e){e.preventDefault();$('le').textContent='';sb.auth.signInWithPassword({email:$('em').value.trim(),password:$('pw').value}).then(function(r){if(r.error){$('le').textContent='E-mail ou senha incorretos.';return}$('pw').value='';load()})};
$('out').onclick=function(){sb.auth.signOut().then(showLogin)};
document.querySelectorAll('.tabs button').forEach(function(b){b.onclick=function(){document.querySelectorAll('.tabs button').forEach(function(x){x.classList.toggle('on',x===b)});$('t-res').classList.toggle('hide',b.dataset.t!=='res');$('t-edit').classList.toggle('hide',b.dataset.t!=='edit')}});
async function load(keep){var d;try{d=await api('list')}catch(e){return}
 $('lf').hidden=true;$('app').hidden=false;$('who').textContent=d.email;S.flows=d.flows;S.d=d;
 if(!keep||!S.flows.some(function(f){return f.id===S.cur}))S.cur=S.flows[0]&&S.flows[0].id;
 $('fsel').innerHTML=S.flows.map(function(f){return '<option value="'+f.id+'"'+(f.id===S.cur?' selected':'')+'>'+(f.active?'🟢 ':'⚪ ')+esc(f.name)+'</option>'}).join('');
 renderStatus();renderEdit();renderRes()}
$('fsel').onchange=function(){S.cur=this.value;renderEdit();renderRes()};
$('newf').onclick=function(){S.cur=null;renderEdit(true);document.querySelector('[data-t=edit]').click()};
function renderStatus(){var d=S.d,c=d.conf,dry=d.settings.dry_run==='true',lw=d.last_webhook;
 var live=c.IG_ACCESS_TOKEN&&c.IG_APP_SECRET;
 $('status').innerHTML='<div class="row" style="justify-content:space-between"><b>Status</b><span class="pill '+(dry?'warn':'ok')+'">'+(dry?'🧪 Modo teste (não envia de verdade)':'✅ Enviando de verdade')+'</span></div>'+
 '<div style="margin-top:6px">'+pill(c.IG_ACCESS_TOKEN,'Token Instagram')+pill(c.IG_APP_SECRET,'Chave do app Meta')+pill(c.IG_USER_ID,'ID da conta')+
 '<span class="pill">Último evento: '+(lw?new Date(lw.received_at).toLocaleString('pt-BR'):'nenhum')+'</span></div>'+
 '<div class="row" style="margin-top:8px"><button class="sec" id="tdry">'+(dry?'Ligar envio real':'Voltar pro modo teste')+'</button></div>';
 $('tdry').onclick=async function(){if(dry&&!live){alert('Falta conectar o Instagram (token e chave do app) antes de ligar o envio real.');return}
  if(dry&&!confirm('Ligar o envio real de mensagens no Instagram?'))return;await api('set_setting',{key:'dry_run',value:!dry});load(true)}}
function pill(ok,t){return '<span class="pill '+(ok?'ok':'bad')+'">'+(ok?'✓ ':'✗ ')+t+'</span>'}
function cur(){return S.flows.find(function(f){return f.id===S.cur})}
function fmtDelay(s){s=+s||0;if(!s)return 'na hora';if(s<60)return s+' s';if(s<3600)return Math.round(s/6)/10+' min';return Math.round(s/360)/10+' h'}
function renderEdit(isNew){var f=isNew?{name:'',active:false,keywords:[],match_mode:'contains',media_ids:[],trigger_on_dm:true,public_reply:'Te mandei no direct! 📩',optin_text:'',optin_button:'',steps:[{text:'',delay_seconds:0}]}:cur();
 if(!f){$('t-edit').innerHTML='<div class="card">Nenhum fluxo.</div>';return}
 S.edit=JSON.parse(JSON.stringify(f));drawEdit()}
function drawEdit(){var f=S.edit;
 var h='<div class="card"><label>Nome do fluxo</label><input id="e-name" value="'+esc(f.name)+'">'+
 '<label class="sw"><input type="checkbox" id="e-active"'+(f.active?' checked':'')+'> Fluxo ativo</label>'+
 '<label>Palavras-gatilho (separe por vírgula; maiúscula e acento não importam)</label><input id="e-kw" value="'+esc(f.keywords.join(', '))+'">'+
 '<label>Como comparar</label><select id="e-mm"><option value="contains">Comentário contém a palavra</option><option value="exact">Comentário é exatamente a palavra</option><option value="any">Qualquer comentário</option></select>'+
 '<label>Só nestes posts (IDs, separe por vírgula; vazio = todos)</label><input id="e-media" value="'+esc((f.media_ids||[]).join(', '))+'">'+
 '<label class="sw"><input type="checkbox" id="e-dm"'+(f.trigger_on_dm!==false?' checked':'')+'> Também disparar se mandarem a palavra no direct</label>'+
 '<label>Resposta pública no comentário (vazio = não responde)</label><input id="e-pub" value="'+esc(f.public_reply||'')+'"></div>'+
 '<div class="card"><b>1ª mensagem (abre a conversa)</b><div class="sub">O Instagram só deixa mandar várias mensagens depois que a pessoa responde. Por isso a 1ª mensagem tem um botão: quando ela toca, o resto do fluxo é liberado.</div>'+
 '<label>Texto</label><textarea id="e-ot">'+esc(f.optin_text||'')+'</textarea><label>Texto do botão (até 20 letras)</label><input id="e-ob" maxlength="20" value="'+esc(f.optin_button||'')+'"></div>'+
 '<h2>Mensagens do fluxo</h2><div id="steps"></div><button class="sec" id="addst" style="width:100%">+ Adicionar mensagem</button>'+
 '<div class="row" style="margin-top:14px"><button id="save">💾 Salvar</button>'+(f.id?'<button class="sec" id="test">🧪 Simular comentário</button>':'')+'</div>'+
 (f.id?'<div class="row" style="margin-top:8px"><button class="red" id="del">Excluir fluxo</button></div>':'')+'<div class="err" id="emsg"></div>';
 $('t-edit').innerHTML=h;$('e-mm').value=f.match_mode||'contains';drawSteps();
 $('addst').onclick=function(){sync();f.steps.push({text:'',delay_seconds:60});drawSteps()};
 $('save').onclick=save;if($('test'))$('test').onclick=test;if($('del'))$('del').onclick=async function(){if(!confirm('Excluir o fluxo "'+f.name+'" e os resultados dele?'))return;await api('delete_flow',{id:f.id});load()}}
function drawSteps(){var f=S.edit;$('steps').innerHTML=f.steps.map(function(s,i){
 return (i?'<div class="delay">⏱ espera <input data-k="delay_min" data-i="'+i+'" type="number" min="0" step="0.5" style="width:80px;display:inline-block" value="'+((s.delay_seconds||0)/60)+'"> min</div>':'')+
 '<div class="step"><div class="row"><b>Mensagem '+(i+1)+'</b>'+
 '<span style="flex:0;white-space:nowrap">'+(i?'<button class="sec" data-up="'+i+'">↑</button> ':'')+'<button class="red" data-rm="'+i+'">✕</button></span></div>'+
 '<label>Texto</label><textarea data-k="text" data-i="'+i+'">'+esc(s.text)+'</textarea>'+
 '<label>Link (vira link rastreado)</label><input data-k="link_url" data-i="'+i+'" value="'+esc(s.link_url||'')+'" placeholder="https://...">'+
 '<label>Texto do botão (vazio = link vai no texto)</label><input data-k="button_title" data-i="'+i+'" maxlength="20" value="'+esc(s.button_title||'')+'"></div>'}).join('');
 document.querySelectorAll('[data-rm]').forEach(function(b){b.onclick=function(){sync();f.steps.splice(+b.dataset.rm,1);drawSteps()}});
 document.querySelectorAll('[data-up]').forEach(function(b){b.onclick=function(){sync();var i=+b.dataset.up,t=f.steps[i];f.steps[i]=f.steps[i-1];f.steps[i-1]=t;drawSteps()}})}
function sync(){var f=S.edit;if(!$('e-name'))return;f.name=$('e-name').value;f.active=$('e-active').checked;f.keywords=$('e-kw').value.split(',').map(function(x){return x.trim()}).filter(Boolean);f.match_mode=$('e-mm').value;
 f.media_ids=$('e-media').value.split(',').map(function(x){return x.trim()}).filter(Boolean);f.trigger_on_dm=$('e-dm').checked;f.public_reply=$('e-pub').value;f.optin_text=$('e-ot').value;f.optin_button=$('e-ob').value;
 document.querySelectorAll('#steps [data-k]').forEach(function(el){var s=f.steps[+el.dataset.i];if(el.dataset.k==='delay_min')s.delay_seconds=Math.round(parseFloat(el.value||0)*60);else s[el.dataset.k]=el.value})}
async function save(){sync();var f=S.edit;$('emsg').textContent='';
 if(!f.name.trim())return $('emsg').textContent='Dê um nome ao fluxo.';if(f.match_mode!=='any'&&!f.keywords.length)return $('emsg').textContent='Coloque pelo menos uma palavra-gatilho.';
 if(f.steps.some(function(s){return !s.text.trim()}))return $('emsg').textContent='Tem mensagem sem texto.';
 try{var r=await api('save_flow',{flow:f,steps:f.steps});S.cur=r.id;await load(true);$('emsg').textContent='✅ Salvo';}catch(e){$('emsg').textContent='Erro: '+e}}
async function test(){try{await api('test',{flow_id:S.edit.id,text:'teste'});alert('Simulação criada. As mensagens aparecem em Resultados (marcadas como teste) conforme os tempos de espera. Nada é enviado de verdade.');document.querySelector('[data-t=res]').click();renderRes()}catch(e){alert('Erro: '+e)}}
var ST={sent:'✅ enviada',dry_run:'🧪 simulada',pending:'⏳ aguardando',sending:'📤 enviando',failed:'❌ falhou',skipped:'⏭ pulada'};
var RS={started:'iniciado',awaiting_optin:'esperando tocar no botão',sending:'em andamento',done:'concluído'};
async function renderRes(){var f=cur();if(!f){$('t-res').innerHTML='';return}
 $('t-res').innerHTML='<div class="card">Carregando…</div>';var d;try{d=await api('stats',{flow_id:f.id,days:S.days})}catch(e){$('t-res').innerHTML='<div class="card err">Erro: '+esc(e)+'</div>';return}
 var fn=d.funnel||{},top=Math.max(fn.triggers||0,1);
 function line(t,n){return '<div>'+t+'<div class="bar" style="width:'+Math.round(100*(n||0)/top)+'%"></div></div><b>'+(n||0)+'</b>'}
 var h='<div class="card"><div class="row" style="justify-content:space-between"><b>Funil</b><select id="days" style="flex:0;width:auto">'+[1,7,30,90].map(function(x){return '<option value="'+x+'"'+(x==S.days?' selected':'')+'>'+(x==1?'24 h':x+' dias')+'</option>'}).join('')+'</select></div><div class="fun" style="margin-top:10px">'+
 line('Gatilhos (comentário ou direct)',fn.triggers)+line('↳ vieram de comentário',fn.from_comment)+line('1ª mensagem enviada',fn.opener_sent)+line('Tocaram no botão (opt-in)',fn.optin);
 (fn.steps||[]).forEach(function(s){h+=line('Mensagem '+s.position+' enviada',s.sent)+line('↳ clicaram no link'+(s.clicks_total>s.clicked?' ('+s.clicks_total+' cliques)':''),s.clicked)});
 h+='</div><div class="sub" style="margin-top:8px">Inclui simulações enquanto estiver no modo teste.</div></div>';
 var clk={};(d.clicks||[]).forEach(function(c){clk[c.run_id+'_'+c.position]=1});
 h+='<h2>Últimos contatos</h2><div class="card" style="overflow-x:auto"><table><tr><th>Quem</th><th>Quando</th><th>Situação</th></tr>'+
 ((d.runs||[]).map(function(r){var c=r.contacts||{};var q=(r.queue||[]).filter(function(x){return x.kind!=='public_reply'}).sort(function(a,b){return (a.position||0)-(b.position||0)});
  return '<tr><td>'+(c.username?'@'+esc(c.username):esc(c.ig_user_id||'?'))+(r.is_test?' <span class="pill warn">teste</span>':'')+'<div class="sub">'+esc((r.trigger_text||'').slice(0,40))+'</div></td><td>'+new Date(r.created_at).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'})+'</td><td>'+(RS[r.status]||r.status)+
  '<div class="sub">'+q.map(function(x){return (x.kind==='private_reply'?'abertura':'msg '+x.position)+': '+(ST[x.status]||x.status)+(clk[r.id+'_'+x.position]?' 🔗clicou':'')+(x.last_error?' — '+esc(x.last_error).slice(0,80):'')}).join('<br>')+'</div></td></tr>'}).join('')||'<tr><td colspan="3">Ninguém ainda.</td></tr>')+'</table></div>';
 h+='<h2>Erros recentes</h2><div class="card">'+((d.errors||[]).map(function(e){return '<div style="margin-bottom:8px"><span class="pill bad">'+esc(e.where_||'erro')+'</span> <span class="sub">'+new Date(e.created_at).toLocaleString('pt-BR')+'</span><div style="font-size:13px">'+esc(e.message||JSON.stringify(e.detail||'')).slice(0,300)+'</div></div>'}).join('')||'Nenhum erro 🎉')+'</div>';
 h+='<h2>Configuração do Instagram</h2><div class="card" style="font-size:14px">URL do webhook (vai no app da Meta):<br><code>'+esc(S.d.webhook_url)+'</code><br><br>Campos para assinar: <b>comments</b> e <b>messages</b>.</div>';
 h+='<div class="row"><button class="sec" id="rf">↻ Atualizar</button><button class="red" id="clr">Apagar simulações</button></div>';
 $('t-res').innerHTML=h;$('days').onchange=function(){S.days=+this.value;renderRes()};$('rf').onclick=renderRes;
 $('clr').onclick=async function(){if(!confirm('Apagar todos os contatos e resultados de teste?'))return;await api('clear_tests');renderRes()}}
sb.auth.getSession().then(function(r){if(r.data.session)load();else showLogin()});
})();
