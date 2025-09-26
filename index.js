import{a as T,S as C,i as c}from"./assets/vendor-xwsNXkQR.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const m="/goit-js-hw-12/assets/sprite-BJL0HFtM.svg",M="52315817-6546dbd007993710b423406a2";async function g(t,e=1){const{data:s}=await T("https://pixabay.com/api/",{params:{key:M,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}});return s}const $=new C(".gallery a"),y=document.querySelector(".loader"),l=document.querySelector(".load-btn");function p(t,e){const s=[...e].map(({webformatURL:n,largeImageURL:o,tags:r,likes:i,views:w,comments:S,downloads:q})=>`
    <li class="gallery-item">
    <a class="gallery-link" href="${o}"><img class="gallery-image" src="${n}" alt="${r}" /></a>
    <ul class="content-list">
    <li class="content-item">
    <h3 class="content-header">Likes</h3>
    <p class="content-value">${i}</p> 
    </li>
    <li class="content-item">
    <h3 class="content-header">Views</h3>
    <p class="content-value">${w}</p>
    </li>
    <li class="content-item">
    <h3 class="content-header">Comments</h3>
    <p class="content-value">${S}</p>
    </li>
    <li class="content-item">
    <h3 class="content-header">Downloads</h3>
    <p class="content-value">${q}</p>
    </li>
    </ul>
    </li>
`).join("");t.insertAdjacentHTML("beforeend",s),$.refresh()}function z(t){t.innerHTML=""}function L(){y.classList.remove("is-hidden")}function b(){y.classList.add("is-hidden")}function H(){l.classList.remove("is-hidden")}function v(){l.classList.add("is-hidden")}const B=document.querySelector(".form"),O=document.querySelector("input"),a=document.querySelector(".gallery");B.addEventListener("submit",P);l.addEventListener("click",x);let u=null,d=1,f=0;async function P(t){if(t.preventDefault(),z(a),v(),u=O.value.trim(),!u){const e={...h};e.message="Please enter your search query",c.error(e);return}L(),a.style.opacity="0";try{d=1;const{hits:e,totalHits:s}=await g(u,d);if(f=e.length,e.length===0){c.error(h);return}else p(a,e),a.style.opacity="1",s>f&&H()}catch(e){E(e)}finally{b(),t.target.reset()}}async function x(){l.disabled=!0,L();try{d+=1;const{hits:t,totalHits:e}=await g(u,d);if(f+=t.length,p(a,t),I(),f>=e){const s={...h};s.message="We're sorry, but you've reached the end of search results.",s.backgroundColor="#859ceeff",c.error(s),v()}}catch(t){E(t)}finally{b(),l.disabled=!1}}function I(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,left:0,behavior:"smooth"})}function E(t){const e={...h};e.message=t.message,c.error(e)}const h={message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:" #ef4040",titleColor:"#fff",messageColor:"#fff",icon:" ",close:!1,maxWidth:435,class:"custom-toast",onOpening:function(t,e){const s=e.querySelector(".iziToast-icon");s&&(s.innerHTML=`
    <svg class="icon-custom">
      <use href="${m}#icon-bi_x-octagon"></use>
    </svg>`);const n=document.createElement("button");n.classList.add("iziToast-close-custom"),n.innerHTML=`
    <svg class="icon-custom-close">
      <use href="${m}#icon-Vector-3"></use>
    </svg>`,n.addEventListener("click",()=>{c.hide({},e)}),e.appendChild(n)}};
//# sourceMappingURL=index.js.map
