import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule
} from "./chunk-IQUYOTCY.js";
import {
  LoadingBarModule,
  LoadingBarService
} from "./chunk-3KJ7E7FA.js";
import "./chunk-MQA7MIET.js";
import "./chunk-JSIT66G7.js";
import "./chunk-KVQY5VBS.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-W4EDNBDG.js";
import "./chunk-WSA2QMXP.js";
import "./chunk-IEMOZLTW.js";

// node_modules/@ngx-loading-bar/router/fesm2020/ngx-loading-bar-router.mjs
var LoadingBarRouterModule = class {
  constructor(router, loader) {
    const ref = loader.useRef("router");
    router.events.subscribe((event) => {
      const navState = this.getCurrentNavigationState(router);
      if (navState && navState.ignoreLoadingBar) {
        return;
      }
      if (event instanceof NavigationStart) {
        ref.start();
      }
      if (event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel) {
        ref.complete();
      }
    });
  }
  getCurrentNavigationState(router) {
    const currentNavigation = router.getCurrentNavigation && router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras) {
      return currentNavigation.extras.state;
    }
    return {};
  }
};
LoadingBarRouterModule.ɵfac = function LoadingBarRouterModule_Factory(t) {
  return new (t || LoadingBarRouterModule)(ɵɵinject(Router), ɵɵinject(LoadingBarService));
};
LoadingBarRouterModule.ɵmod = ɵɵdefineNgModule({
  type: LoadingBarRouterModule,
  imports: [RouterModule, LoadingBarModule],
  exports: [RouterModule, LoadingBarModule]
});
LoadingBarRouterModule.ɵinj = ɵɵdefineInjector({
  imports: [[RouterModule, LoadingBarModule], RouterModule, LoadingBarModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingBarRouterModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule, LoadingBarModule],
      exports: [RouterModule, LoadingBarModule]
    }]
  }], function() {
    return [{
      type: Router
    }, {
      type: LoadingBarService
    }];
  }, null);
})();
export {
  LoadingBarRouterModule
};
//# sourceMappingURL=@ngx-loading-bar_router.js.map
