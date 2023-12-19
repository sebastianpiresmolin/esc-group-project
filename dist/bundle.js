(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function d(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(o){if(o.ep)return;o.ep=!0;const e=d(o);fetch(o.href,e)}})();document.getElementById("headerButton").addEventListener("click",function(){let n=document.getElementById("menuOverlay"),t=document.getElementById("popinMenu");n.style.display="block",t.style.display="flex",setTimeout(function(){t.style.animation="grow 0.1s linear",t.style.opacity=1},100),setTimeout(function(){n.style.animation="fadein 0.3s linear",n.style.opacity=1},10),document.documentElement.style.overflowY="hidden"});document.getElementById("closebtn").addEventListener("click",function(){let n=document.getElementById("menuOverlay"),t=document.getElementById("popinMenu");n.style.animation="",t.style.animation="",n.style.opacity=0,t.style.opacity=0,setTimeout(function(){n.style.display="none",t.style.display="none"},200),document.documentElement.style.overflowY="auto"});let p={online:!0,onsite:!0,minRating:1,maxRating:5,labels:[],words:[]};const re=document.body.dataset.page;if(re==="challenges"){let d=function(e,a,u){const r=document.querySelectorAll(".challenge"),l=document.querySelectorAll("#ratingID"),y=document.getElementById("noMatchError");let m=!1;e.forEach(s=>s.classList.remove("checked"));for(let s=0;s<=a;s++)e[s].classList.add("checked");const i=a+1;if(u)if(i<=p.maxRating)p.minRating=i;else for(let s=p.maxRating;s<=a;s++)e[s].classList.remove("checked");else p.maxRating=i,p.maxRating<p.minRating&&(p.minRating=p.maxRating,n[p.minRating-1].click());if(i>=p.minRating&&i<=p.maxRating)for(let s=0;s<r.length;s++){let f=l[s].textContent;f>=p.minRating&&f<=p.maxRating?(r[s].style.display="",m=!0):r[s].style.display="none",r[s].style.display=="none"&&m==!1?y.innerHTML="No matching challenges":y.innerHTML=""}},o=function(){const e=document.querySelector(".filterInputBox input").value.toLowerCase(),a=document.querySelectorAll(".challenge"),u=document.querySelectorAll(".challenge h2"),r=document.querySelectorAll("#descID"),l=document.getElementById("noMatchError");let y=!1;for(let m=0;m<a.length;m++){let i=u[m].textContent||u[m].innerHTML,s=r[m].innerHTML||r[m].innerText;i.toLowerCase().indexOf(e)>-1||s.toLowerCase().indexOf(e)>-1?(a[m].style.display="",y=!0):a[m].style.display="none"}y?l.innerHTML="":l.innerHTML="No matching challenges"};var xe=d,we=o;const n=[document.querySelector("#fromOne"),document.querySelector("#fromTwo"),document.querySelector("#fromThree"),document.querySelector("#fromFour"),document.querySelector("#fromFive")],t=[document.querySelector("#toOne"),document.querySelector("#toTwo"),document.querySelector("#toThree"),document.querySelector("#toFour"),document.querySelector("#toFive")];n.forEach((e,a)=>{e.addEventListener("click",()=>d(n,a,!0))}),t.forEach((e,a)=>{e.addEventListener("click",()=>d(t,a,!1))});const c=document.querySelector(".filterInputBox input");c.addEventListener("keyup",function(e){if(e.key==="Enter"){const a=c.value.toLowerCase();c.value="",p.words=a.split(" ")}}),document.getElementById("searchBox").addEventListener("keyup",o)}let v,F=[],le=document.querySelectorAll(".spinner");class de{constructor(t){this.data=t}render(){const t=document.createElement("div");t.classList.add("challenge");const d=document.createElement("div");d.classList.add("img__container"),t.append(d);const c=document.createElement("img");c.src=this.data.image,c.classList.add("img__container"),d.append(c),document.createElement("div").classList.add("titleIcon__div");const e=document.createElement("span");e.classList.add("card_icon"),t.append(e),this.data.type=="online"?(console.log("online"),e.innerHTML='<i class="fa fa-home"></i>'):(console.log("onsite"),e.innerHTML='<i class="fa fa-laptop" aria-hidden="true"></i>');const a=document.createElement("h2");a.textContent=this.data.title,t.append(a);function u(E){const b=document.createElement("div");b.classList.add("star__container");const P='<img class="rating__star" src="media/full_star.png" alt="Full star">',D='<img class="rating__star" src="media/half_star.png" alt="Half star">',ce='<img class="rating__star" src="media/no_star.png" alt="No star">',N=Math.floor(E),te=E%1!==0;for(let x=0;x<N;x++)b.innerHTML+=P;te&&(b.innerHTML+=D);const ie=te?5-N-1:5-N;for(let x=0;x<ie;x++)b.innerHTML+=ce;return b}const r=document.createElement("div");r.classList.add("rating__container"),r.appendChild(u(this.data.rating)),t.appendChild(r);const l=document.createElement("p");l.textContent=this.data.rating,t.append(l),l.setAttribute("id","ratingID"),l.style.display="none";const y=document.createElement("span");y.textContent=this.data.minParticipants+" - "+this.data.maxParticipants+" participants",r.appendChild(y);const m=document.createElement("p");m.textContent="Description: "+this.data.description,t.append(m),m.setAttribute("id","descID");let i,s=[];for(let E=0;E<this.data.labels.length;E++)i=document.createElement("p"),s=this.data.labels,i.textContent="Labels: "+s[E],i.classList.add("labels"),i.classList.add("cardLabels"),i.setAttribute("id","cardLabels"),i.style.display="none",t.append(i);let f,ee=[];f=document.createElement("p"),ee=this.data.type,f.textContent="Type: "+ee,f.classList.add("cardType"),f.setAttribute("id","cardType"),f.style.display="none",t.append(f);const I=document.createElement("button");return I.textContent="Book this room",I.dataset.challengeId=this.data.id,t.append(I),I.addEventListener("click",function(E){const b=E.currentTarget.dataset.challengeId;Ee(),v=F.find(D=>D.data.id===parseInt(b));const P=document.querySelector("#modal1__title");P.textContent='Book Room: "'+v.data.title+'" (Step 1)'}),t}}function ue(){le.forEach(n=>{n.style.display="block"})}function me(){le.forEach(n=>{n.style.display="none"})}class oe{async getAllChallenges(){ue();const d=await fetch("https://lernia-sjj-assignments.vercel.app/api/challenges");return me(),F=(await d.json()).challenges.map(o=>new de(o)),F}}class pe{async render(t){const c=await new oe().getAllChallenges();for(let o=0;o<c.length;o++){const a=c[o].render();t.append(a)}}}class ye{async render(t){const o=(await new oe().getAllChallenges()).sort((e,a)=>a.data.rating-e.data.rating);for(let e=0;e<3;e++){const u=o[e].render();t.append(u)}}}const z=document.body.dataset.page;document.querySelector("#modal__bg");if(z==="challenges"){const n=document.querySelector(".challenges__container");new pe().render(n)}else if(z==="front-page"){const n=document.querySelector(".containerTwo__carousel");new ye().render(n)}if(z==="challenges"){let d=function(){const e=document.querySelectorAll(".challenge"),a=document.querySelectorAll(".cardType"),u=document.getElementById("noMatchError");let r=!1;if(n.checked&&!t.checked)for(let l=0;l<e.length;l++)a[l].textContent.toLowerCase().includes("online")?(e[l].style.display="",r=!0):e[l].style.display="none",r?u.innerHTML="":u.innerHTML="No matching challenges";else if(t.checked&&!n.checked)for(let l=0;l<e.length;l++)a[l].textContent.toLowerCase().includes("onsite")?(e[l].style.display="",r=!0):e[l].style.display="none",r?u.innerHTML="":u.innerHTML="No matching challenges";else if(n.checked&&t.checked)for(let l=0;l<e.length;l++)e[l]?(e[l].style.display="",r=!0):e[l].style.display="none",r?u.innerHTML="":u.innerHTML="No matching challenges";else if(!n.checked&&!t.checked)for(let l=0;l<e.length;l++)e[l].style.display="none",u.innerHTML="No matching challenges"},o=function(e){const a=e.id;e.classList.contains("active")?(e.classList.remove("active"),p.labels=p.labels.filter(i=>i!==a),console.log("Removed tag:",a),console.log("Current labels:",p.labels)):(e.classList.add("active"),p.labels.push(a),console.log("Current labels:",p.labels));const u=document.querySelectorAll(".challenge"),r=document.querySelectorAll(".cardLabels");document.querySelectorAll(".filterTags label");const l=p.labels,y=document.getElementById("noMatchError");let m=!1;for(let i=0;i<u.length;i++)r[i].innerHTML.toLowerCase().indexOf(l)>-1?(u[i].style.display="",m=!0):u[i].style.display="none",m?y.innerHTML="":y.innerHTML="No matching challenges"};var Me=d,ke=o;const n=document.querySelector("#online"),t=document.querySelector("#onsite");n.addEventListener("click",d),t.addEventListener("click",d),[document.querySelector("#web"),document.querySelector("#linux"),document.querySelector("#cryptography"),document.querySelector("#coding"),document.querySelector("#ssh"),document.querySelector("#ctf"),document.querySelector("#hacking"),document.querySelector("#bash"),document.querySelector("#javascript"),document.querySelector("#electronics"),document.querySelector("#phreaking")].forEach(e=>{e.addEventListener("click",()=>o(e))})}let U=[],S=new URL("https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2023-12-12&challenge=4'"),ne=[],j,Y;const h=document.getElementById("modal__bg");h.classList.add("modal__background");h.style.overflowY="hidden";const C=document.createElement("div");C.classList.add("modal__container1");const T=document.createElement("div");T.classList.add("modal__container2");const w=document.createElement("div");w.classList.add("modal__container3");const _=document.createElement("h1");_.classList.add("modal__title");_.setAttribute("id","modal1title");const Z=document.createElement("h2");Z.classList.add("modal__subtitle");h.addEventListener("click",function(n){n.target===h&&he()});function he(){h.style.display="none",C.style.display="none",T.style.display="none",w.style.display="none",L.value="",M.value="",k.value="",q.innerHTML="",A.innerHTML="",g.textContent=""}const $=document.createElement("p");$.classList.add("modal__date");const L=document.createElement("input");L.setAttribute("type","date");L.classList.add("input__date");const Q=document.createElement("div"),g=document.createElement("p");g.classList.add("error__msg");Q.appendChild(g);const H=document.createElement("button");H.classList.add("button__search");H.textContent="Search available times";const V=document.createElement("p");V.classList.add("modal__name");const M=document.createElement("input");M.setAttribute("type","text");M.classList.add("input__name");const W=document.createElement("p");W.classList.add("modal__name");const k=document.createElement("input");k.setAttribute("type","text");k.classList.add("input__mail");const ae=document.createElement("p"),X=document.createElement("input");X.setAttribute("type","tel");const J=document.createElement("p");J.classList.add("modal__time");const ge=document.createElement("ul");ge.classList.add("time__list");const q=document.createElement("select");q.classList.add("select__menu__time");const K=document.createElement("p");K.classList.add("modal__participants");const A=document.createElement("select");A.classList.add("select__menu__part");const R=document.createElement("button");R.classList.add("button__submit");R.textContent="Submit booking";const G=document.createElement("h1");G.classList.add("title__thankyou");const O=document.createElement("a");O.classList.add("modal__linkback");const B=new Date,se=B.toISOString().substring(0,10),fe=new Date(B.getFullYear(),B.getMonth()+12,B.getDate()),Le=fe.toISOString().substring(0,10);function Ee(){return h.style.display="block",C.style.display="block",_.setAttribute("id","modal1__title"),Z.textContent="What date would you like to come?",$.textContent="Date",L.value=se,C.append(_,Z,$,L,Q,H),h.append(C),_}function _e(){_.textContent='Book Room: "'+v.data.title+'" (Step 2)',h.style.display="block",C.style.display="none",T.style.display="block",_.setAttribute("id","modal2__title"),V.textContent="Name",W.textContent="E-mail",ae.textContent="Phone number",J.textContent="What time?",K.textContent="How many participants?",T.append(_,Q,V,M,W,k,ae,X,J,q,K,A,R),h.append(T)}async function be(){h.style.display="block",T.style.display="none",w.style.display="flex",G.textContent="Thank you!",O.text="Close window",O.setAttribute("href",""),w.append(G,O),h.append(w)}async function ve(){H.addEventListener("click",function(){let n=new URLSearchParams(S.search),t=v.data.id;return L.value<se||L.value>Le?(g.textContent="You must choose a date newer than today and within a year!",g.style.color="red"):(n.set("date",L.value),n.set("id",parseInt(t)),S.search=n.toString(),S=S.toString(),Se(),_e(),g.textContent=""),S})}async function Se(){(await(await fetch(S)).json()).slots.forEach(c=>{U.push(c),j=document.createElement("option"),j.innerText=c,q.appendChild(j)});for(let c=v.data.minParticipants;c<=v.data.maxParticipants;c++)ne.push(c);return ne.forEach(c=>{Y=document.createElement("option"),Y.innerText=c+" participants",A.appendChild(Y)}),U}ve();function Ce(){R.addEventListener("click",function(){let n=v.data.id,t=M.value.trim(),d=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase(),c=/^[a-zA-Z]+ [a-zA-Z]+$/,o=k.value.trim(),e=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,a=X.value,u=L.value;const r=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;if(d.match(c))if(o.match(r))if(a.match(e)){let l=q.selectedOptions,y="";for(let s=0;s<l.length;s++)y+=l[s].label;console.log(U);let m="",i=A.selectedOptions;for(let s=0;s<i.length;s++)m+=i[s].label;return Te(n,d,o,a,u,y,parseInt(m)),g.textContent="",be(),!0}else return g.textContent="You must enter a 10-digit phone number",!1;else return g.textContent="You must enter a valid email!",!1;else return g.textContent="You must enter your first name and last name",!1})}Ce();async function Te(n,t,d,c,o,e,a){const r=await(await fetch("https://lernia-sjj-assignments.vercel.app/api/booking/reservations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({challenge:n,name:t,email:d,phonenumber:c,date:o,time:e,participants:a})})).json();console.log(r)}