/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

(function() {
  window.FIXTURES = window.FIXTURES || {};

  window.FIXTURES.scrollspy = `
    <style class="fixture">
      .fixed-height {
        min-height: 3000px;
      }
      .top0 {
        height: 200px;
      }
      .top200 {
        height: 250px;
      }
      .top550 {
        height: 700px;
      }
      .top1150 {
        height: 850px;
      }
    </style>
    <div id="scrollspy-fixture" class="fixture fixed-height">
       <div class="top0">
       </div>
       <div class="top200">
       </div>
       <div class="top550">
       </div>
       <div class="top1150">
       </div>
    </div>
  `;
})();

