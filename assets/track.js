(function(){try{if(!/hernandesnogueira\.com\.br$/.test(location.hostname))return;
var U='https://mraqhjjxxvbhftapjnos.supabase.co/rest/v1/site_events',K='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYXFoamp4eHZiaGZ0YXBqbm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzcyNTMsImV4cCI6MjA2OTkxMzI1M30.S2JfG5Ic2M942LrQDoh7XZ2z_4oKcmV1b2YjLtejQn4';
var sid;try{sid=sessionStorage.getItem('se_sid');if(!sid){sid=Math.random().toString(36).slice(2)+Date.now().toString(36);sessionStorage.setItem('se_sid',sid);}}catch(e){sid=Math.random().toString(36).slice(2);}
var q=new URLSearchParams(location.search),c=function(s,n){return s?String(s).slice(0,n):null;};
function send(t,target,href){try{fetch(U,{method:'POST',keepalive:true,headers:{'apikey':K,'Authorization':'Bearer '+K,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify({page:c(location.pathname,200),event_type:t,target:c(target,300),href:c(href,500),referrer:c(document.referrer,500),utm_source:c(q.get('utm_source'),100),utm_medium:c(q.get('utm_medium'),100),utm_campaign:c(q.get('utm_campaign'),100),user_agent:c(navigator.userAgent,400),session_id:sid})}).catch(function(){});}catch(e){}}
send('view');
document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('a,button,video,[data-track]');if(!el)return;
var sec=el.closest('[id]');var lbl=el.getAttribute('data-track')||el.getAttribute('aria-label')||(el.innerText||el.alt||'').replace(/\s+/g,' ').trim()||(el.querySelector('img')&&el.querySelector('img').alt)||el.tagName.toLowerCase();
send('click',(sec?'#'+sec.id+' | ':'')+lbl,el.href||null);},true);
}catch(e){}})();
