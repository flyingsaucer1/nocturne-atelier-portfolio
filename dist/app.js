const content = window.PORTFOLIO || {};
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const safeURL = value => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } };
const make = (tag, className, text) => { const el = document.createElement(tag); if (className) el.className = className; if (text) el.textContent = text; return el; };
const external = (label, url) => { const valid = safeURL(url); if (!valid) return null; const link = make('a', '', label); link.href = valid; link.target = '_blank'; link.rel = 'noopener noreferrer'; return link; };
if (content.bio) document.querySelector('#bio').textContent = content.bio;
const dialog = document.querySelector('#project-dialog');
const projects = Array.isArray(content.projects) ? content.projects : [];
projects.forEach((p, index) => {
  const article = make('article', 'project reveal');
  article.id = `project-${p.id || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const visual = make('button', 'project-visual'); visual.type='button'; visual.setAttribute('aria-label', `View ${p.title} project details`);
  const img=make('img'); img.src=p.image; img.alt=p.imageAlt||`${p.title} project preview`; img.width=1265; img.height=712; img.loading='lazy';
  const arrow=make('span','image-action','↗'); arrow.setAttribute('aria-hidden','true'); visual.append(img,arrow);
  const copy=make('div','project-copy'); copy.append(make('p','project-number',`${String(index+1).padStart(2,'0')} / ${p.category.toUpperCase()}`),make('h3','',p.title),make('p','project-description',p.description));
  const tags=make('div','tags'); (p.stack||[]).forEach(item=>tags.append(make('span','',item))); copy.append(tags);
  const actions=make('div','project-actions'); const details=make('button','','Explore the project ↗'); details.type='button'; details.addEventListener('click',()=>openProject(p)); actions.append(details);
  const live=external('Visit live site ↗',p.url); if(live) actions.append(live);
  const source=external('View source ↗',p.github); if(source) actions.append(source); copy.append(actions); visual.addEventListener('click',()=>openProject(p));
  article.append(visual,copy); document.querySelector('#projects').append(article);
});
function openProject(p){
  document.querySelector('#dialog-category').textContent=`${p.category} / ${p.year}`; document.querySelector('#dialog-title').textContent=p.title;
  const img=document.querySelector('#dialog-image'); img.src=p.image; img.alt=p.imageAlt||`${p.title} project preview`;
  document.querySelector('.image-note').textContent=p.imageNote||'Actual project interface.';
  document.querySelector('#dialog-description').textContent=p.description; document.querySelector('#dialog-work').textContent=p.work; document.querySelector('#dialog-role').textContent=p.role;
  const features=document.querySelector('#dialog-features'); features.replaceChildren(); (p.features||[]).forEach(item=>features.append(make('li','',item)));
  const tags=document.querySelector('#dialog-stack'); tags.replaceChildren(); (p.stack||[]).forEach(item=>tags.append(make('span','',item)));
  const links=document.querySelector('#dialog-links'); links.replaceChildren(); [['View source on GitHub ↗',p.github],['Visit live website ↗',p.url]].forEach(([label,url])=>{const link=external(label,url);if(link)links.append(link)});
  document.body.classList.add('dialog-open'); dialog.showModal(); dialog.scrollTop=0;
}
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
const email=content.email||'arshp038@gmail.com';document.querySelector('#email-address').textContent=email;document.querySelector('#email-address').href=`mailto:${email}`;
document.querySelector('#email-cta').href=`mailto:${email}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent('Hi Nocturne Atelier,\n\nI’m looking for a website for my business.\n\nBusiness name:\nWhat I have in mind:\nIdeal timeline:\n\nThanks!')}`;
document.querySelector('#copy-email').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(email);status.textContent='Email address copied.'}catch{status.textContent=`You can copy this address: ${email}`}});
const linkedin=external('LinkedIn ↗',content.linkedin);if(linkedin)document.querySelector('#footer-links').prepend(linkedin);
let manualPause=false;const motion=document.querySelector('.motion-toggle');
function updateMotion(){const paused=manualPause||reduced.matches;document.body.classList.toggle('motion-paused',paused);motion.setAttribute('aria-pressed',String(paused));motion.querySelector('.motion-label').textContent=paused?'Motion paused':'Pause motion';motion.querySelector('.motion-icon').textContent=paused?'▷':'Ⅱ';window.dispatchEvent(new Event('scene-motion-change'))}
motion.addEventListener('click',()=>{if(reduced.matches){motion.querySelector('.motion-label').textContent='Reduced motion enabled';return}manualPause=!manualPause;updateMotion()});reduced.addEventListener('change',updateMotion);updateMotion();
document.addEventListener('visibilitychange',()=>document.body.classList.toggle('page-hidden',document.hidden));
if('IntersectionObserver' in window){const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px 35px 0px'});document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('will-reveal');reveal.observe(el)}});const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('offscreen',!entry.isIntersecting)),{rootMargin:'80px'});document.querySelectorAll('[data-motion]').forEach(el=>observer.observe(el));}
