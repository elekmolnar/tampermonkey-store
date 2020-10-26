// ==UserScript==
// @name         PS Store
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  quick fix - title's are really missing
// @author       Elek Molnar
// @match        https://store.playstation.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function addGlobalStyle(css) {
    let head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

  function init() {
    let product$;

    setInterval(() => {
      product$ = document.querySelectorAll('.ems-sdk-product-tile-link');
      if (product$ && product$[0] && !product$[0].title) {
        updateProducts(product$);
      }
    }, 1000);
  }

  function updateProducts(products) {
    let details, name;
    products.forEach((node) => {
      if (node.dataset.telemetryMeta) {
        setTitle(details, name, node);
      }
    })
  }

  function setTitle(details, name, node) {
    let titleElement = document.createElement("span");
    name = JSON.parse(node.dataset.telemetryMeta).name;
    node.title = name;
    titleElement.innerHTML = name;
    titleElement.className = 'product-title';
    details = node.querySelector('.ems-sdk-product-tile__details');
    details.prepend(titleElement);
  }

  addGlobalStyle('.product-title { color: #363636; font-size: 16px; display: flex; padding-top: .5rem; } .ems-sdk-product-tile-link { position: relative;} .discount-badge__container { position: absolute!important; top: 15px;} .ems-sdk-product-tile .discount-badge { background-color: #e2062e!important;}');
  init();
})();
