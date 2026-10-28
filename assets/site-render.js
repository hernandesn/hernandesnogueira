/* Renderizador do site (usado pelo painel editar.html) */
(function(){
const ICONS={"dollar": "<path d=\"M13 2v2.1c2.2.3 3.8 1.6 4 3.6h-2.6c-.2-.9-1-1.6-2.4-1.6-1.6 0-2.4.7-2.4 1.6 0 .9.7 1.4 2.9 1.9 2.8.6 4.8 1.6 4.8 4.1 0 2-1.6 3.4-4.3 3.8V22h-2v-2.5c-2.5-.3-4.3-1.8-4.4-4h2.6c.2 1.2 1.2 1.9 2.8 1.9 1.7 0 2.6-.7 2.6-1.7s-.8-1.5-3-2c-2.7-.6-4.6-1.6-4.6-4 0-1.9 1.6-3.3 4-3.6V2z\"/>", "bank": "<path d=\"M12 2 2 7v2h20V7L12 2zm-7 9v7h3v-7H5zm5.5 0v7h3v-7h-3zM16 11v7h3v-7h-3zM2 20v2h20v-2H2z\"/>", "youtube": "<path d=\"M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z\"/>", "instagram": "<path d=\"M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z\"/>", "tiktok": "<path d=\"M12.5 0h4c.2 1.6.8 3.1 2 4.2 1.2 1.1 2.8 1.7 4.4 1.8v4.1c-1.5 0-3-.4-4.4-1-.6-.3-1.1-.6-1.6-.9v8.9c0 1.4-.5 2.9-1.3 4.1A7.6 7.6 0 0 1 9.4 24a7.4 7.4 0 0 1-4-1.1A7.7 7.7 0 0 1 1.7 17c0-.5 0-1 0-1.5a7.7 7.7 0 0 1 9.2-6.8c0 1.5 0 3 0 4.5a3.5 3.5 0 0 0-4.5 2.2c-.2.6-.2 1.2-.2 1.9.3 1.8 2 3.3 3.9 3.1 1.2 0 2.4-.7 3-1.8.2-.4.5-.8.5-1.2.1-1.9.1-3.7.1-5.6V0z\"/>", "x": "<path d=\"M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.5h2L6.5 3.2H4.3l13.3 17.5z\"/>", "whatsapp": "<path d=\"M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.8 17.7L.1 24l6.4-1.7A11.8 11.8 0 0 0 24 12c0-3.2-1.2-6.2-3.5-8.5z\"/>", "link": "<path d=\"M10.6 13.4a1 1 0 0 1 0-1.4l3.4-3.4a3 3 0 1 1 4.2 4.2l-2.1 2.1a1 1 0 1 1-1.4-1.4l2.1-2.1a1 1 0 0 0-1.4-1.4l-3.4 3.4a1 1 0 0 1-1.4 0zm2.8-2.8a1 1 0 0 1 0 1.4L10 15.4a3 3 0 1 1-4.2-4.2l2.1-2.1a1 1 0 1 1 1.4 1.4l-2.1 2.1a1 1 0 0 0 1.4 1.4l3.4-3.4a1 1 0 0 1 1.4 0z\"/>", "telegram": "<path d=\"M22 3.5 2.6 11c-1.3.5-1.3 1.3-.2 1.6l5 1.6 1.9 5.8c.2.7.4.9.9.9s.7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.6.2 1.8-.9L23.6 5c.3-1.4-.5-2-1.6-1.5zM8.6 14l9.7-6.1c.5-.3.9-.1.5.2l-8 7.3-.3 3.3L8.6 14z\"/>", "email": "<path d=\"M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.4V17h16V7.4l-8 5.3-8-5.3zM5.2 7l6.8 4.5L18.8 7H5.2z\"/>", "site": "<path d=\"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15 15 0 0 0-1.3-3.9A8 8 0 0 1 18.9 8zM12 4c.8 1.1 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.9 1.9-4zM4.3 14a8 8 0 0 1 0-4h3.4a16 16 0 0 0 0 4H4.3zm.8 2h3c.3 1.4.8 2.7 1.3 3.9A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.3-3.9C8.9 5.3 8.4 6.6 8.1 8zM12 20c-.8-1.1-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.9-1.9 4zm2.3-6H9.7a14 14 0 0 1 0-4h4.6a14 14 0 0 1 0 4zm.3 5.9c.5-1.2 1-2.5 1.3-3.9h3a8 8 0 0 1-4.3 3.9zm1.7-5.9a16 16 0 0 0 0-4h3.4a8 8 0 0 1 0 4h-3.4z\"/>", "star": "<path d=\"M12 2l3 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.5 5.6 21.2l1.6-7.1L1.8 9.3 9 8.6z\"/>"};
const ICON_NAMES={dollar:'Dólar',bank:'Banco',youtube:'YouTube',instagram:'Instagram',tiktok:'TikTok',x:'X (Twitter)',whatsapp:'WhatsApp',telegram:'Telegram',email:'E-mail',site:'Site',link:'Link',star:'Estrela'};
const COLORS={default:{name:'Padrão (dourado)',cls:'',hex:'#b08a3e'},green:{name:'Verde',cls:'feat',hex:'#2f7d4a'},teal:{name:'Azul-turquesa',cls:'feat bg',hex:'#00a8b5'},orange:{name:'Laranja',cls:'feat c-or',hex:'#e07b12'},blue:{name:'Azul',cls:'feat c-bl',hex:'#2d5fa8'},red:{name:'Vermelho',cls:'feat c-rd',hex:'#a3201a'},purple:{name:'Roxo',cls:'feat c-pu',hex:'#6b3fa0'}};
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function ytId(v){v=String(v||'').trim();const m=v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);if(m)return m[1];return /^[\w-]{11}$/.test(v)?v:'';}
function bioHtml(b){return '“'+esc(b).replace(/\*([^*]+)\*/g,'<mark class="marker">$1</mark>')+'”';}
function linkHtml(b){
  const c=(COLORS[b.color]||COLORS.default).cls;
  const ic=ICONS[b.icon]||ICONS.link;
  return '    <a '+(c?'class="'+c+'" ':'')+'href="'+esc(b.url)+'"'+(b.newTab?' target="_blank" rel="noopener"':'')+'><svg viewBox="0 0 24 24" aria-hidden="true">'+ic+'</svg><span>'+esc(b.label)+'</span></a>\n';
}
function blocks(d){
  return {
    cover:'<div class="cover"><img src="'+esc(d.cover)+'" alt="" width="1200" height="600" fetchpriority="high"></div>',
    avatar:'<img class="avatar" src="'+esc(d.avatar)+'" alt="Foto de '+esc(d.name)+'" width="400" height="400">',
    name:'<h1>'+esc(d.name)+'</h1>',
    bio:'<p class="bio">'+bioHtml(d.bio)+'</p>',
    video:'<iframe src="https://www.youtube-nocookie.com/embed/'+esc(ytId(d.videoId))+'?rel=0" title="Vídeo em destaque no YouTube" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>',
    links:'\n'+(d.buttons||[]).filter(b=>b.visible!==false&&b.label&&b.url).map(linkHtml).join('')
  };
}
function apply(html,d){
  const b=blocks(d);
  for(const k in b){
    const re=new RegExp('(<!--E:'+k+'-->)[\\s\\S]*?(<!--\\/E:'+k+'-->)');
    if(!re.test(html))throw new Error('Marcador '+k+' não encontrado no index.html');
    html=html.replace(re,(m,a,z)=>a+b[k]+z);
  }
  return html;
}
window.SiteRender={ICONS,ICON_NAMES,COLORS,ytId,blocks,apply,esc};
})();
