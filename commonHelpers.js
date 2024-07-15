import{a as b,S as w,i as c}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const x="44825095-5da981a8d37f63705e36ec7d1";async function p({q:e,page:t,pageSize:s}={}){try{return(await b.get(`https://pixabay.com/api/?key=${x}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${s}&lang=en`)).data}catch(i){throw console.error("Error fetching data:",i),i}}function f(e){return e.map(({webformatURL:t,largeImageURL:s,tags:i,likes:r,views:a,comments:l,downloads:S})=>`
    <li class="gallery-item">
      <a class="gallery-link" href=${s}>
        <img
          class="gallery-image"
          src=${t}
          data-source=${s}
          alt="${i}"
        />
      </a>
      <div class="text-container">
        <p>Likes <span class="text-span">${r}</span></p>
        <p>Views <span class="text-span">${a}</span></p>
        <p>Comments <span class="text-span">${l}</span></p>
        <p>Downloads <span class="text-span">${S}</span></p>
      </div>
    </li>
  `).join("")}const o={form:document.querySelector(".form_for_image"),inp:document.querySelector(".input"),button:document.querySelector(".button"),list:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadButton:document.querySelector(".load-button"),loadingText:document.querySelector(".loading-text")},n={q:"",page:1,pageSize:15,maxPage:0},m="is-hidden";function d(e){e.classList.add(m)}function y(e){e.classList.remove(m)}function $(e){e.disabled=!1}d(o.loadButton);o.loader.style.display="none";let g=new w(".gallery a",{captionsData:"alt",captionDelay:250});o.form.addEventListener("submit",v);function v(e){e.preventDefault(),n.page=1,o.list.innerHTML="";const t=o.inp.value.trim().toLowerCase();if(t===""){c.error({title:"Error",message:"Please enter a search query!"});return}n.q=t,B()}async function B(){q();try{const e=await p(n);if(u(),e.hits.length>0){const t=f(e.hits);o.list.innerHTML+=t,g.refresh(),L(.3),y(o.loadButton),$(o.loadButton),o.loadButton.addEventListener("click",h)}else d(o.loadButton),c.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!"})}catch(e){u(),E(e)}}async function h(){n.page+=1,d(o.loadButton),q();try{const e=await p(n),t=f(e.hits);o.list.innerHTML+=t,g.refresh(),L(3.4),y(o.loadButton),u(),n.maxPage=Math.ceil(e.totalHits/n.pageSize),n.page===n.maxPage&&(d(o.loadButton),o.loadButton.removeEventListener("click",h),c.error({title:"End of results",message:"We're sorry, but you've reached the end of search results."}))}catch(e){c.error({title:"Error",message:`Error during request: ${e}`})}}function L(e){const t=document.querySelector(".gallery-item");if(t){const s=t.getBoundingClientRect();window.scrollBy(0,s.height*e)}}function E(e){console.error("Error fetching data:",e)}function q(){o.loader.style.display="block"}function u(){o.loader.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
