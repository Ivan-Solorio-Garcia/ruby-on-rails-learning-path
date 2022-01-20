if (self.CavalryLogger) { CavalryLogger.start_js(["pE8e\/jE"]); }

__d("KaiOSSendMessageUtil",["Event"],(function(a,b,c,d,e,f,g){"use strict";b=function(){function a(){this.$1=!1,this.$2=null,this.$3()}var b=a.prototype;b.$3=function(){var a=this;this.$2=c("Event").listen(window,"beforeunload",function(){a.$1=!0,a.$2&&(a.$2.remove(),a.$2=null)})};b.postMessage=function(a,b,c,d){if(a&&b&&!this.$1){var e=new Map();e.set(h,b);c&&e.set(i,c);d!=null&&e.set(j,d);a.postMessage(e,"*")}};return a}();d=Object.freeze({HANDLE_BACK:"handle_back",MESSAGE_RECEIVED:"received",OPEN_URL:"open_url",REGISTER_PUSH:"register_push",SCREEN_ORIENTATION_LOCK:"screen_orientation_lock",UNREGISTER_PUSH:"unregister_push",CHECK_FOR_PUSH_UPDATE:"check_for_push_update",PUSH_UPDATE_COMPLETED:"push_update_completed",SET_VOLUME:"set_volume",FBT_STRINGS:"fbt_strings",CONFIG_RESPONSE:"config_response",FETCH_MSISDN:"fetch_msisdn",GET_CONTACTS:"get_contacts",TOGGLE_SPATIAL_NAV:"toggle_spatial_nav",LITE_MIGRATION_STATUS:"lite_migration_status"});var h="action",i="payload",j="callback_id",k=new b();function a(a,b,c,d){k.postMessage(a,b,c,d)}g.Type=d;g.Action=h;g.ActionPayload=i;g.CallbackID=j;g._singletonImpl=k;g.postMessage=a}),98);
__d("KaiOSConnectionHelper",["KaiOSSendMessageUtil"],(function(a,b,c,d,e,f,g){"use strict";var h="app://m.facebook.com";a=function(){function a(){this.hostWindow=null,this.resolveOnConnect=null}var b=a.prototype;b.receiveMessage=function(a){if(!a||a.origin!==h||!a.source)return!1;if(a.data==="ping"){this.hostWindow||(this.hostWindow=a.source,d("KaiOSSendMessageUtil").postMessage(this.hostWindow,d("KaiOSSendMessageUtil").Type.MESSAGE_RECEIVED));a=this.resolveOnConnect;a&&(a(),this.resolveOnConnect=null)}return!0};return a}();b=new a();c=b;g["default"]=c}),98);
__d("KaiOSControllerConfig",[],(function(a,b,c,d,e,f){"use strict";a={};b=a;f["default"]=b}),66);
__d("KaiOSControllerUtils",["KaiOSConnectionHelper","KaiOSSendMessageUtil","URLSearchParams"],(function(a,b,c,d,e,f,g){"use strict";var h=function(){function a(){this.callbacks=new Map(),this.nextCallbackID=1}var b=a.prototype;b.setCallback=function(a){var b=(this.nextCallbackID++).toString();this.callbacks.set(b,a);return b};b.handleCallback=function(a,b){if(a){var c=this.callbacks.get(a);c&&(this.callbacks["delete"](a),c(b));return!0}return!1};return a}();function a(a){return!1}function b(){var a=location.pathname;a=a==="/"||a==="/kaiosapp/jio/home/"||a.startsWith("/home.php")||a.startsWith("/index.php")||a.startsWith("/confirmemail.php");var b=new(c("URLSearchParams"))(window.location.search);b=b.has("soft");return a&&!b}function e(){var a=new(c("URLSearchParams"))(window.location.search);return a.has("exit_on_back")}function f(a){var b=new Map();b.set("url",a);d("KaiOSSendMessageUtil").postMessage(c("KaiOSConnectionHelper").hostWindow,d("KaiOSSendMessageUtil").Type.OPEN_URL,b)}function i(){return new h()}function j(a,b,c){var d=new XMLHttpRequest();d.open("POST",a);d.setRequestHeader("Content-Type","application/x-www-form-urlencoded");a=[];for(var e in b)a.push(encodeURIComponent(e)+"="+encodeURIComponent(b[e]));d.onload=function(){c&&c(d)};d.send(a.join("&"))}g.keyDownEventHandledByRegPage=a;g.isOnHomeOrConfPage=b;g.shouldExitOnBackForLoggedOutPush=e;g.openUrl=f;g.createCallbackHandler=i;g.sendBasicPost=j}),98);
__d("KaiOSFullscreenVideoHandler",["$InternalEnum","KaiOSSendMessageUtil","getActiveElement"],(function(a,b,c,d,e,f,g){"use strict";var h=b("$InternalEnum")({RIGHT:6,LEFT:4,UP:2,DOWN:8,MIDDLE:5}),i=b("$InternalEnum")({KEY:"type",DOWN:"-1",UP:"1"});a=function(){function a(a){this.hostWindow=a}var b=a.prototype;b.handleKeyDownEvent=function(a){var b=this.getVideoIfFullScreen();if(!b)return!1;if(a.key==="SoftLeft"){document.exitFullscreen();return!0}else if(a.key==="SoftRight"){b.muted=!b.muted;return!0}return!1};b.handleClickEvent=function(a){a=this.getVideoIfFullScreen();if(!a)return!1;this.togglePause(a);return!0};b.handleMouseMoveEvent=function(a){return!1};b.getVideoIfFullScreen=function(){return document.fullscreenElement&&document.fullscreenElement.nodeName&&document.fullscreenElement.nodeName=="VIDEO"?c("getActiveElement")():null};b.seek=function(a,b){b?a.currentTime=Math.min(a.duration,a.currentTime+10):a.currentTime=Math.max(0,a.currentTime-10)};b.togglePause=function(a){a.paused?a.play():a.pause()};b.volume=function(a){if(!a||a!=Number(i.UP)&&a!=Number(i.DOWN))return;var b=new Map();b.set(String(i.KEY),a.toString());d("KaiOSSendMessageUtil").postMessage(this.hostWindow,d("KaiOSSendMessageUtil").Type.SET_VOLUME,b)};b.control=function(a,b){if(b)switch(b){case h.UP:this.volume(Number(i.UP));break;case h.DOWN:this.volume(Number(i.DOWN));break;case h.LEFT:this.seek(a,!1);break;case h.RIGHT:this.seek(a,!0);break;case h.MIDDLE:this.togglePause(a);break}};return a}();g["default"]=a}),98);
__d("KaiOSHTMLElementUtils",["EventListener","Keys"],(function(a,b,c,d,e,f,g){"use strict";var h=["email","number","password","search","tel","text","url"];function i(a){var b=a.tabIndex;if(parseInt(b,10)<0)return!1;if(b>0||b===0&&a.getAttribute("tabIndex")!==null)return!0;if(a instanceof HTMLAnchorElement)return!!a.href&&a.rel!="ignore";else if(a instanceof HTMLInputElement)return a.type!="hidden"&&a.type!="file"&&!a.disabled;else if(a instanceof HTMLButtonElement||a instanceof HTMLSelectElement||a instanceof HTMLTextAreaElement)return!a.disabled;return!1}function a(a){return a instanceof HTMLTextAreaElement||a instanceof HTMLInputElement&&(h.includes(a.type)||a.type==="")}function j(a){return a.tagName==="A"}function b(a){return a.hasAttribute("data-nt")}function d(a){return a.hasAttribute("data-kaios-file-upload-element")}function e(a){return(a.hasAttribute("data-kaios-spatial-navigation")||a.hasAttribute("data-kaios-whitelist-nav")||i(a))&&!a.hasAttribute("data-kaios-blacklist-nav")&&k(a)}function k(a){return(a.offsetHeight!==0&&a.offsetWidth!==0||a.offsetParent!==null)&&window.getComputedStyle(a).visibility!=="hidden"}function f(a){for(var b=0;b<a.children.length;++b)if(j(a.children[b]))return a.children[b];for(var b=0;b<a.children.length;++b){var c=a.children[b];for(var d=0;d<c.children.length;++d)if(j(c.children[d]))return c.children[d]}return null}function l(a,b){c("EventListener").listen(a,"click",function(){b.submit()}),c("EventListener").listen(a,"keyup",function(a){a.keyCode===c("Keys").RETURN&&b.submit()})}g.isTextfieldInput=a;g.isLink=j;g.isNTElement=b;g.isFileUploadElement=d;g.isSpatialNavElement=e;g.isVisible=k;g.getFirstLink=f;g.attachClickHandlerToSubmitFormOnElement=l}),98);
__d("KaiOSSoftkeyTrayLogger",["BanzaiLogger"],(function(a,b,c,d,e,f,g){"use strict";a=function(a){var b={event_category:"softkey_tray"};switch(a){case"kaios_tray_back":b.event="softkey_back_button_clicked";break;case"kaios_tray_menu":b.event="softkey_menu_button_clicked";break;case"kaios_tray_post":b.event="softkey_post_button_clicked";break;case"kaios_tray_menu_close":b.event="softkey_menu_close_button_clicked";break;default:b.event="softkey_other_button_clicked";b.miscellaneous={detail:a};break}c("BanzaiLogger").log("KaiOSEventsLoggerConfig",b)};g.logSoftkeyTrayButtonClicked=a}),98);
__d("KaiOSMenuHandler",["csx","cx","fbt","CSS","DOM","Event","KaiOSSoftkeyTrayLogger","MViewport","Stratcom","URI","regeneratorRuntime"],(function(a,b,c,d,e,f,g,h,i){"use strict";var j;a=function(){function a(){var a=this;this.menuShown=!1;this.showPageSoftkeyTray=!1;this.toggleMenuVisibility=function(a,c){var d=b("MViewport").getScrollTop();if(d<=0)return;if(c)a.style.top="0px",a.classList.add("float");else{c=-Math.min(d,a.clientHeight);a.style.top=c+"px";a.classList.remove("float")}};this.$1=function(){a.showFloatingMenu()};this.$2=function(c){var d=a.leftButtonElement;c=c.getData().path;if(a.menuShown&&d!=null){var e=null;c!=null&&(e=new(j||(j=b("URI")))(c).getQueryData().soft);c=new CustomEvent("kaios_close_menu",{detail:{focusFirstNode:e!=="search"}});d.dispatchEvent(c);b("MViewport").scrollToTop()}};this.$3=function(c){c=c.detail;var d=c.leftButtonText;if(d!=null){a.showPageSoftkeyTray||b("DOM").show(a.softkeyTrayContainer);var e=c.leftButtonEvent,f=c.leftButtonLoggingId;f=b("DOM").create("div",{className:"_6ykc",id:f},d);b("DOM").replace(a.leftButtonElement,f);a.leftButtonElement=f;e!=null&&b("Event").listen(f,"click",function(){var b=new CustomEvent(e);window.dispatchEvent(b);a.restorePageTray()})}d=c.rightButtonText;if(d!=null){var g=c.rightButtonEvent;f=c.rightButtonLoggingId;f=b("DOM").create("div",{className:"_6ykd",id:f},d);b("DOM").replace(a.rightButtonElement,f);a.rightButtonElement=f;g!=null&&b("Event").listen(f,"click",function(){var a=new CustomEvent(g);window.dispatchEvent(a)})}d=c.centerButtonText;if(d!=null&&a.centerButtonElement!=null&&d!=a.centerButtonElement.textContent){f=b("DOM").create("div",{className:"_7gvg"},d);b("DOM").replace(a.centerButtonElement,f);a.centerButtonElement=f}};this.$4=function(b){a.restorePageTray()}}var c=a.prototype;c.handleKeyEvents=function(a){if(this.softkeyTrayContainer==null||this.softkeyTrayContainer.style.display!=""||this.viewportElement!=null&&this.viewportElement.style.display!="")return!1;switch(a.key){case"SoftLeft":a=this.leftButtonElement;if(a!=null){a.click();b("KaiOSSoftkeyTrayLogger").logSoftkeyTrayButtonClicked(a.getAttribute("id"));return!0}break;case"SoftRight":a=this.rightButtonElement;if(a!=null){a.click();b("KaiOSSoftkeyTrayLogger").logSoftkeyTrayButtonClicked(a.getAttribute("id"));return!0}break;case"Backspace":case"BrowserBack":case"ArrowUp":case"ArrowDown":if(this.menuShown&&this.leftButtonElement!=null){this.leftButtonElement.click();return!0}break}return!1};c.showFloatingMenu=function(){var a=this.menuContainerElement;a!=null&&(this.menuShown=!0,this.toggleMenuVisibility(a,!0),this.updateBackgroundOverlayVisibility(!0),this.setupCloseMenuButton())};c.setupCloseMenuButton=function(){var a=this,c,d=this.leftButtonElement,e=this.rightButtonElement,f=this.centerButtonElement,g=(c=b("DOM")).create("div",{className:"_6ykc",id:"kaios_tray_menu_close"},i._(/*FBT_CALL*/"Cerrar"/*FBT_CALL*/));c.replace(this.leftButtonElement,g);this.leftButtonElement=g;var h=c.create("div"),j=c.create("div");c.replace(this.rightButtonElement,h);this.rightButtonElement=h;c.replace(this.centerButtonElement,j);this.centerButtonElement=j;b("Event").listen(g,"click",function(){a.hideMenu(),a.swapButtons(g,d,h,e,j,f)});b("Event").listen(g,"kaios_close_menu",function(b){b=b.detail;var c=!0;typeof b==="object"&&("focusFirstNode"in b&&(c=b.focusFirstNode));a.hideMenu(c);a.swapButtons(g,d,h,e,j,f)})};c.hideMenu=function(a){var c;return b("regeneratorRuntime").async(function(b){while(1)switch(b.prev=b.next){case 0:a===void 0&&(a=!1),c=this.menuContainerElement,c&&(this.menuShown=!1,this.toggleMenuVisibility(c,!1),this.updateBackgroundOverlayVisibility(!1));case 3:case"end":return b.stop()}},null,this)};c.swapButtons=function(a,c,d,e,f,g){b("DOM").replace(a,c),b("DOM").replace(d,e),b("DOM").replace(f,g),this.leftButtonElement=c,this.rightButtonElement=e,this.centerButtonElement=g};c.updateBackgroundOverlayVisibility=function(a){this.backgroundElement&&(a?this.backgroundElement.classList.add("shown"):this.backgroundElement.classList.remove("shown"))};c.restorePageTray=function(){this.showPageSoftkeyTray||b("DOM").hide(this.softkeyTrayContainer),b("DOM").replace(this.leftButtonElement,this.pageLeftButtonElement),b("DOM").replace(this.rightButtonElement,this.pageRightButtonElement),this.leftButtonElement=this.pageLeftButtonElement,this.rightButtonElement=this.pageRightButtonElement};c.restoreMenuOnInitIfShown=function(){this.menuShown&&this.hideMenu()};c.setupSoftKeyElements=function(a,b,c,d,e){this.backgroundElement=a,this.menuContainerElement=b,this.menuRootElement=c,this.softkeyTrayContainer=d,this.viewportElement=e};c.setupLeftButton=function(a){this.leftButtonElement=a,this.pageLeftButtonElement=a};c.setupMenuButton=function(a){this.setupLeftButton(a),this.menuShown=!1,b("Event").listen(a,"click",this.$1)};c.setupRightButton=function(a){this.rightButtonElement=a,this.pageRightButtonElement=a};c.setupCenterButton=function(a){this.centerButtonElement=a};c.setupHistoryListener=function(){b("Stratcom").listen("history:change",null,this.$2)};c.setupNavigationUpdateListener=function(){b("Event").listen(window,"m:kaios:spatialnav:update_tray",this.$3)};c.setupRestoreTrayListener=function(){b("Stratcom").listen("m:kaios:spatialav:restore_tray",null,this.$4)};c.setupSoftKeyTrayShowHideListener=function(){var a=this;b("Stratcom").listen("m:kaios:spatialnav:hide_tray",null,function(){if(!a.softkeyTrayContainer)return;b("CSS").addClass(a.softkeyTrayContainer,"_7hj_")});b("Stratcom").listen("m:kaios:spatialnav:show_tray",null,function(){if(!a.softkeyTrayContainer)return;b("CSS").removeClass(a.softkeyTrayContainer,"_7hj_")})};return a}();var k={impl:new a(),setup:function(a){var c=document.querySelector("._6yui"),d=document.querySelector("._6ywo"),e=document.querySelector("._6usn"),f=document.getElementById("viewport"),g=document.getElementById("kaios_tray");k.impl.showPageSoftkeyTray=a;a||b("DOM").hide(g);k.impl.setupSoftKeyElements(c,d,e,g,f)},initForPage:function(a,b,c,d,e){k.setup(e),k.impl.setupNavigationUpdateListener(),k.impl.setupSoftKeyTrayShowHideListener(),k.impl.setupLeftButton(a),k.impl.setupCenterButton(d),k.impl.setupRightButton(b)},initForMenu:function(a){k.impl.restoreMenuOnInitIfShown(),k.impl.setupMenuButton(a),k.impl.setupHistoryListener(),k.impl.setupRestoreTrayListener(),k.impl.updateBackgroundOverlayVisibility(!1)},handleKeyEvents:function(a){return k.impl.handleKeyEvents(a)}};e.exports=k}),null);
__d("KaiOSNavigatorUtils",["KaiOSConnectionHelper","KaiOSSendMessageUtil"],(function(a,b,c,d,e,f,g){"use strict";var h=new Map([["nav_mode","spatial"]]),i=new Map([["nav_mode","cursor"]]);function j(a){d("KaiOSSendMessageUtil").postMessage(c("KaiOSConnectionHelper").hostWindow,d("KaiOSSendMessageUtil").Type.TOGGLE_SPATIAL_NAV,a)}function a(){j(i)}function b(){j(h)}g.showCursor=a;g.hideCursor=b}),98);
__d("KaiOSKeyEventHandlers",["KaiOSConnectionHelper","KaiOSControllerConfig","KaiOSControllerUtils","KaiOSHTMLElementUtils","KaiOSMenuHandler","KaiOSNavigatorUtils","KaiOSSendMessageUtil","MViewport","URI","isLinkshimURI"],(function(a,b,c,d,e,f,g){"use strict";function a(a){if(c("KaiOSControllerConfig").fullScreenVideoHandler&&c("KaiOSControllerConfig").fullScreenVideoHandler.handleClickEvent(a)){a.preventDefault();a.stopPropagation();return}var b=a.target,e=null;b&&b.tagName==="A"?e=b.href:b&&b.parentElement&&b.parentElement.tagName==="A"?e=b.parentElement.href:b&&b.parentElement&&b.parentElement.parentElement&&b.parentElement.parentElement.tagName==="A"&&(e=b.parentElement.parentElement.href);b=new(c("URI"))(e);var f=e!=null&&e!==""&&!/\.facebook.com$/i.test(b.getDomain());e!=null&&(c("isLinkshimURI")(b)||f)&&(d("KaiOSControllerUtils").openUrl(e),a.preventDefault(),a.stopPropagation())}function h(a){return c("KaiOSControllerConfig").appVersion!=null&&d("KaiOSHTMLElementUtils").isTextfieldInput(a.target)}function b(a){h(a)&&d("KaiOSNavigatorUtils").hideCursor()}function e(a){h(a)&&d("KaiOSNavigatorUtils").showCursor()}function f(a){if(d("KaiOSMenuHandler").handleKeyEvents(a)||c("KaiOSControllerConfig").fullScreenVideoHandler&&c("KaiOSControllerConfig").fullScreenVideoHandler.handleKeyDownEvent(a)){a.preventDefault();a.stopPropagation();return}switch(a.key){case"Backspace":if(k())break;case"BrowserBack":i(a);break;case"Enter":j(a);break}}function i(a){document.fullscreenElement?(document.exitFullscreen(),a.preventDefault(),a.stopPropagation()):d("KaiOSControllerUtils").keyDownEventHandledByRegPage(a.key)?(a.preventDefault(),a.stopPropagation()):d("KaiOSControllerUtils").isOnHomeOrConfPage()&&d("MViewport").getScrollTop()>5?(a.preventDefault(),a.stopPropagation(),d("MViewport").scrollTo(0,0)):!d("KaiOSControllerUtils").isOnHomeOrConfPage()&&!d("KaiOSControllerUtils").shouldExitOnBackForLoggedOutPush()&&(d("KaiOSSendMessageUtil").postMessage(c("KaiOSConnectionHelper").hostWindow,d("KaiOSSendMessageUtil").Type.HANDLE_BACK),a.preventDefault(),a.stopPropagation())}function j(a){c("KaiOSControllerConfig").appVersion!=null&&a.target.type=="textarea"&&(a.target.blur(),a.preventDefault(),a.stopPropagation())}function k(){var a=document.activeElement;if(a&&a instanceof HTMLInputElement)return!0;else return!1}g.interceptClick=a;g.handleTextfieldFocus=b;g.handleTextfieldBlur=e;g.handleKeyDown=f}),98);
__d("KaiOSLogger",["Banzai","BanzaiLogger"],(function(a,b,c,d,e,f,g){"use strict";a=function(a){c("BanzaiLogger").log("KaiOSEventsLoggerConfig",{event:"update_app_version",event_category:"app_info",app_version:a})};b=function(a,b,d){c("BanzaiLogger").log("KaiOSEventsLoggerConfig",{event:a,event_category:b,extra_data:d})};d=function(a,b,d,e,f,g){var h=window.navigator.connection||null;c("Banzai").post("logger:KaiOSAppMigrationLoggerConfig",babelHelpers["extends"]({event:a,migration_phase:b,experiment_name:f||"unknown",experiment_group:g||"unknown",duration_ms:d?Math.floor(d):0,connection_type:h&&h.type?h.type:"",connection_effective_type:h&&h.effectiveType?h.effectiveType:""},e),{delay:c("Banzai").VITAL_WAIT})};g.logAppVersion=a;g.logWithBanzai=b;g.logAppMigrationEvent=d}),98);
__d("XExternalShareComposerController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/kaiosapp/composer/",{privacy_mutation_token:{type:"String"},csid:{type:"String"},length:{type:"Int"}})}),null);
__d("KaiOSShareHandler",["XAsyncRequest","XExternalShareComposerController"],(function(a,b,c,d,e,f,g){"use strict";function a(a){if(a===void 0)return;var b=Math.min(a.length,3),d=new FormData();for(var e=0;e<b;e++)d.append("file_"+e,a[e]);e=c("XExternalShareComposerController").getURIBuilder().setInt("length",b).getURI();new(c("XAsyncRequest"))(e).setRawData(d).setMethod("POST").send()}g.handle=a}),98);
__d("XKaiOSAppJioTagController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/kaiosapp/jio/tag/",{})}),null);
__d("XKaiOSUpdatePushController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/kaiosapp/push/update/",{})}),null);
__d("KaiOSController",["KaiOSConnectionHelper","KaiOSControllerConfig","KaiOSControllerUtils","KaiOSFullscreenVideoHandler","KaiOSKeyEventHandlers","KaiOSLogger","KaiOSSendMessageUtil","KaiOSShareHandler","MRequest","Promise","Stratcom","XKaiOSAppJioTagController","XKaiOSUpdatePushController","getActiveElement","promiseDone","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){"use strict";var g=b("KaiOSControllerUtils").createCallbackHandler(),h="app://m.facebook.com",i=Object.freeze({APP_INFO:"app_info",UPDATE_PUSH:"update_push",CONFIG_REQUEST:"config_request",SHARE_PHOTO:"share_photo",LOG_MIGRATION_EVENT:"log_migration_event",TIME_TO_BROWSER_IFRAME_INIT:"time_to_browser_iframe_init"});function j(a){if(!(a instanceof Map))return;var c=a.get(b("KaiOSSendMessageUtil").Action),d=a.get(b("KaiOSSendMessageUtil").ActionPayload);a=a.get(b("KaiOSSendMessageUtil").CallbackID);if(g.handleCallback(a,d))return;switch(c){case i.APP_INFO:d&&d.get&&(b("KaiOSControllerConfig").appVersion=d.get("app_version"),b("KaiOSControllerConfig").shouldLogAppVersion&&(b("KaiOSLogger").logAppVersion(b("KaiOSControllerConfig").appVersion),b("KaiOSControllerConfig").shouldLogAppVersion=!1),q.setup());break;case i.UPDATE_PUSH:if(d&&d.get){a=d.get("subscription");q.updatePush(a.endpoint,JSON.stringify(a.keys))}break;case i.CONFIG_REQUEST:c=new Map();c.set("show_news_feed_on_notification_back",b("KaiOSControllerConfig").showNewsFeedOnNotificationBack);b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.CONFIG_RESPONSE,c);break;case i.SHARE_PHOTO:b("KaiOSShareHandler").handle(d);break;case i.LOG_MIGRATION_EVENT:if(d&&d.get){a=d.get("migration_phase");c=d.get("roundtrip_durations");if(c&&c instanceof Array)for(var e=0;e<c.length;e++)b("KaiOSLogger").logAppMigrationEvent("completed_roundtrip",a,c[e],{roundtrip_count:e+1})}break;case i.TIME_TO_BROWSER_IFRAME_INIT:if(d&&d.get){e=d.get("timeToBrowserIframeInit");a=d.get("timestampAtBrowserIframeInit");c=d.get("migrationPhase");var f=d.get("experimentGroup");d=d.get("experimentName");e&&b("KaiOSLogger").logAppMigrationEvent("completed_browser_iframe_init",c,e,{timestamp_at_browser_iframe_init:a,lid:b("KaiOSControllerConfig").lid},d,f)}break}}function k(a){b("KaiOSControllerConfig").fullScreenVideoHandler&&b("KaiOSControllerConfig").fullScreenVideoHandler.handleMouseMoveEvent(a)&&(a.preventDefault(),a.stopPropagation())}function l(a){if(document.fullscreenElement)document.fullscreenElement.nodeName=="VIDEO"&&(screen.orientation&&screen.orientation.lock("landscape"),document.fullscreenElement.mozRequestPointerLock());else{a=new Map();a.set("orientation","natural");b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.SCREEN_ORIENTATION_LOCK,a)}}var m=null,n=!1,o=null,p=new(b("Promise"))(function(a){o=a}),q={waitForKaiOS:function(){return p},init:function(a){a.get("kaios__dev__")&&(o?o():function(){},q.setup()),b("KaiOSControllerConfig").appID=Number(a.get("app_id")),b("KaiOSControllerConfig").shouldLogAppVersion=!!a.get("should_log_app_version"),m=a.get("fbt_strings"),b("KaiOSControllerConfig").showNewsFeedOnNotificationBack=!!a.get("show_news_feed_on_notification_back"),b("KaiOSControllerConfig").userLoggedIn=!!a.get("user_logged_in"),b("KaiOSControllerConfig").inLatestMigrationPhase=!!a.get("in_latest_migration_phase"),b("KaiOSControllerConfig").migrationGroup=String(a.get("migration_group")),b("KaiOSControllerConfig").lid=String(a.get("lid")),window.addEventListener("message",q.receiveMessage,!1)},enableBackButtonOnRegPage:function(){b("KaiOSControllerConfig").backButtonOnRegPage=!0},setup:function(){var a;window.addEventListener("click",(a=b("KaiOSKeyEventHandlers")).interceptClick,!0);window.addEventListener("keydown",a.handleKeyDown,!1);window.addEventListener("mousemove",k,!0);window.addEventListener("focus",a.handleTextfieldFocus,!0);window.addEventListener("blur",a.handleTextfieldBlur,!0);b("KaiOSControllerConfig").appVersion!=null&&window.addEventListener("fullscreenchange",l,!1);b("Stratcom").listen("click",["m-composer","composer-submit"],function(a){b("setTimeoutAcrossTransitions")(function(){var c=b("getActiveElement")();c&&c==a.getNode("composer-submit")&&c.blur()},100)});b("KaiOSControllerConfig").userLoggedIn&&b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.CHECK_FOR_PUSH_UPDATE);if(m!=null&&m!==""){a=new Map();a.set("fbt_strings",m);b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.FBT_STRINGS,a)}a=new Map();a.set("inLatestMigrationPhase",b("KaiOSControllerConfig").inLatestMigrationPhase);a.set("migrationGroup",b("KaiOSControllerConfig").migrationGroup);b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.LITE_MIGRATION_STATUS,a);o?o():(function(){})},sendMessageToAppWithCallback:function(a,c){c=g.setCallback(c);b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,a,null,c)},maybeTagMeAsKaiOSApp:function(){b("KaiOSConnectionHelper").hostWindow!=null?q.tagMeAsKaiOSApp():n=!0},tagMeAsKaiOSApp:function(){var a=b("XKaiOSAppJioTagController").getURIBuilder().getURI();a=new(b("MRequest"))(a).setMethod("POST").setData({is_kaios_app:!0});n=!1;a.send()},registerPush:function(a){a=g.setCallback(a);b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.REGISTER_PUSH,null,a)},unregisterPush:function(){b("promiseDone")(q.waitForKaiOS(),function(){b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.UNREGISTER_PUSH)})},updatePush:function(a,c){var d=b("XKaiOSUpdatePushController").getURIBuilder().getURI();d=new(b("MRequest"))(d).setMethod("POST").setData({push_endpoint:a,app_id:b("KaiOSControllerConfig").appID,subscription_keys:c});d.listen("done",function(a){a.payload&&a.payload.success&&b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.PUSH_UPDATE_COMPLETED)});d.send()},receiveMessage:function(a){if(!a||h!=a.origin||!a.source)return;b("KaiOSConnectionHelper").hostWindow||(b("KaiOSConnectionHelper").hostWindow=a.source,b("KaiOSControllerConfig").fullScreenVideoHandler=new(b("KaiOSFullscreenVideoHandler"))(b("KaiOSConnectionHelper").hostWindow),b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.MESSAGE_RECEIVED));a.data&&j(a.data);n&&q.tagMeAsKaiOSApp()},_setHostWindowUnitTestsOnly:function(a){b("KaiOSConnectionHelper").hostWindow=a},isTagIfInsideApp:function(){return n},fetchMsisdn:function(a){a=g.setCallback(a);b("KaiOSSendMessageUtil").postMessage(b("KaiOSConnectionHelper").hostWindow,b("KaiOSSendMessageUtil").Type.FETCH_MSISDN,null,a)}};e.exports=q}),null);
__d("BrowserPushMessageRedirectUtil",[],(function(a,b,c,d,e,f){function a(a){return!0}f["default"]=a}),66);
__d("BrowserPushCommands",[],(function(a,b,c,d,e,f){a="browser_push_ack";b="browser_push_redirect";c="browser_push_window_visible";d={ACK:a,REDIRECT:b,WINDOW_VISIBLE:c};e.exports=d}),null);
__d("BrowserPushMessageHandler",["BrowserPushCommands","BrowserPushMessageRedirectUtil","EventListener","URI","URISchemes","isFacebookURI"],(function(a,b,c,d,e,f,g){function h(a){if(a.data.command&&a.data.command===d("BrowserPushCommands").REDIRECT){if(typeof window.onbeforeunload==="function"&&window.onbeforeunload()===void 0)a.ports[0].postMessage({command:d("BrowserPushCommands").ACK,success:!0});else{a.ports[0].postMessage({command:d("BrowserPushCommands").ACK,success:!1});return}a=a.data.uri;if(/^([^.:/?#]+):/.test(a)&&!d("URISchemes").isAllowed(/^([^.:/?#]+):/.exec(a)[1])||!c("isFacebookURI")(new(c("URI"))(a)))throw new Error("goURI: URI scheme rejected, URI: "+a);c("BrowserPushMessageRedirectUtil")(a)&&(window.location.href=a)}}a={registerRedirectHandler:function(){c("EventListener").listen(window,"message",function(a){a.origin===""&&h(a)}),navigator.serviceWorker&&navigator.serviceWorker.addEventListener&&navigator.serviceWorker.addEventListener("message",function(a){(navigator.serviceWorker&&navigator.serviceWorker.controller&&a.target&&a.target.controller&&a.target.controller===navigator.serviceWorker.controller||new RegExp("^"+window.location.protocol+"//"+window.location.host+"$").test(a.origin))&&h(a)})}};b=a;g["default"]=b}),98);
__d("BrowserPushVisibilityChanger",["BrowserPushCommands","ClientServiceWorkerMessage","Visibility"],(function(a,b,c,d,e,f,g){function h(){new(c("ClientServiceWorkerMessage"))(d("BrowserPushCommands").WINDOW_VISIBLE,null).sendViaController()}a={listenForVisibility:function(){c("Visibility").isHidden()||h(),c("Visibility").addListener(c("Visibility").VISIBLE,h)}};b=a;g["default"]=b}),98);
__d("NUXWizardTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";a=function(){function a(){this.$1={}}var c=a.prototype;c.log=function(a){b("GeneratedLoggerUtils").log("logger:NUXWizardLoggerConfig",this.$1,b("Banzai").BASIC,a)};c.logVital=function(a){b("GeneratedLoggerUtils").log("logger:NUXWizardLoggerConfig",this.$1,b("Banzai").VITAL,a)};c.logImmediately=function(a){b("GeneratedLoggerUtils").log("logger:NUXWizardLoggerConfig",this.$1,{signal:!0},a)};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setEligibleSteps=function(a){this.$1.eligible_steps=b("GeneratedLoggerUtils").serializeVector(a);return this};c.setEvent=function(a){this.$1.event=a;return this};c.setEventType=function(a){this.$1.event_type=a;return this};c.setInitializedPlatforms=function(a){this.$1.initialized_platforms=b("GeneratedLoggerUtils").serializeVector(a);return this};c.setIsInNuxCometFlow=function(a){this.$1.is_in_nux_comet_flow=a;return this};c.setPlatform=function(a){this.$1.platform=a;return this};c.setStage=function(a){this.$1.stage=a;return this};c.setStep=function(a){this.$1.step=a;return this};c.setTimeSinceStepsCalculated=function(a){this.$1.time_since_steps_calculated=a;return this};c.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};return a}();var g={eligible_steps:!0,event:!0,event_type:!0,initialized_platforms:!0,is_in_nux_comet_flow:!0,platform:!0,stage:!0,step:!0,time_since_steps_calculated:!0};f["default"]=a}),66);
__d("MPushPermissionUtil",["BanzaiLogger","NUXWizardTypedLogger","gkx"],(function(a,b,c,d,e,f,g){function a(a,b){b===void 0&&(b=!1);var d=c("gkx")("910664");d&&c("BanzaiLogger").log("ChromePushPermissionEventsLoggerConfig",{event:a});if(b){d=null;b="step";a==="allow"?(d="allow",b="conversion"):a==="deny"?d="deny":a==="install_ignore"?d="ignore":a==="turn_on_attempt"&&(d="show_browser_dialog");if(d!==null){a=new(c("NUXWizardTypedLogger"))().setEvent(d).setEventType(b).setPlatform("mobile").setStep("turn_on_notification");a.logVital()}}}g.logEvent=a}),98);
__d("PushRegistrationUtils",[],(function(a,b,c,d,e,f){"use strict";function g(a){var b=a.endpoint;"subscriptionId"in a&&!new RegExp("/"+a.subscriptionId+"$").test(b)&&(b+="/"+a.subscriptionId);return b}function a(a,b){var c=g(a),d=null;a.toJSON?d=a.toJSON().keys:a.keys&&(d=a.keys);return{app_id:b,push_endpoint:c,subscription_keys:JSON.stringify(d)}}f.normalizeSubscriptionEndpoint=g;f.setupPushRegistrationData=a}),66);
__d("XAsyncPushMuteController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/notifications/settings/push/mute/",{appid:{type:"Int",required:!0},push_endpoint:{type:"String",required:!0},mute_for:{type:"Enum",enumType:0}})}),null);
__d("XAsyncPushMuteStateController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/notifications/settings/push/mute/state/",{appid:{type:"Int",required:!0},push_endpoint:{type:"String",required:!0}})}),null);
__d("PushRegistration",["BrowserPushMessageHandler","BrowserPushPubKey","BrowserPushVisibilityChanger","MPushPermissionUtil","Promise","PushRegistrationUtils","ServiceWorkerRegistration","XAsyncPushMuteController","XAsyncPushMuteStateController","emptyFunction","gkx","promiseDone"],(function(a,b,c,d,e,f){var g=window.Notification,h=new Map();a=function(){"use strict";a.get=function(b,c){if(h.has(c))return h.get(c);b=new a(b,c);h.set(c,b);return b};function a(b,c){this.$3=b,this.appID=c,!a.$1&&!a.$2&&(a.$1=!1,a.$2=!1)}var c=a.prototype;c.getPushSubscription=function(){var c=this;return new(b("Promise"))(function(d,e){a.pushPermissionIsDenied()&&(b("MPushPermissionUtil").logEvent("permission_denied_or_blocked"),e(new Error("No permission or not supported"))),b("ServiceWorkerRegistration").getWorkerRegistration(c.$3).then(function(a){if(!a){d(null);return}a.pushManager.getSubscription().then(function(a){d(a)})["catch"](e)})["catch"](e)})};c.$4=function(a,c,d){a=a.getURIBuilder().getURI();c=new c(a);c.setData(b("PushRegistrationUtils").setupPushRegistrationData(d,this.appID));c.setMethod("post");c.send()};c.getMutedUntilInServer=function(a){var c=this;return new(b("Promise"))(function(d,e){c.getPushSubscription().then(function(f){if(f){f=b("PushRegistrationUtils").normalizeSubscriptionEndpoint(f);f=b("XAsyncPushMuteStateController").getURIBuilder().setString("push_endpoint",f).setInt("appid",c.appID).getURI();f=new a(f);f.listen("done",function(a){d(a.payload.muteUntilTimestampSec)});f.send()}else e("cannot check mute status for unsubscribed endpoint")})["catch"](e)})};c.muteNotifications=function(a,c){var d=this;return new(b("Promise"))(function(e,f){d.getPushSubscription().then(function(g){if(g){g=b("PushRegistrationUtils").normalizeSubscriptionEndpoint(g);g=b("XAsyncPushMuteController").getURIBuilder().setEnum("mute_for",a).setString("push_endpoint",g).setInt("appid",d.appID).getURI();g=new c(g);g.setMethod("POST");g.listen("done",function(b){a!==0&&b.payload.muteUntilTimestampSec===0?f("operation failed in server"):e(b.payload.muteUntilTimestampSec)});g.send()}else f("no subscription found")})["catch"](f)})};c.getSubscription=function(){var a=this;return new(b("Promise"))(function(c,d){a.getPushSubscription().then(function(a){a?c(b("PushRegistrationUtils").normalizeSubscriptionEndpoint(a)):c(null)})["catch"](d)})};c.maybeRegisterPushAgain=function(a,c){var d=this;return new(b("Promise"))(function(e,f){d.getPushSubscription().then(function(f){f?(d.$4(a,c,f),e(b("PushRegistrationUtils").normalizeSubscriptionEndpoint(f))):e(null)})["catch"](function(){e(null)})})};c.$5=function(c,d,e){var f=this;return new(b("Promise"))(function(b,g){if(a.$2&&!e){g(new Error("sending disable info already"));return}a.$2=!0;var h=c.getURIBuilder().getURI();h=new d(h.toString());h.setData({appid:f.appID,from_browser_settings:e});h.setMethod("post");h.listen?(h.listen("finally",b),h.listen("fail",function(){a.$2=!1,g()})):h.setErrorHandler&&h.setHandler?(h.setErrorHandler(function(){a.$2=!1,g()}),h.setHandler(b)):b();h.send()})};c.isPushRegistered=function(c,d,e,f,g,h){var i=this;g===void 0&&(g=!1);h===void 0&&(h=!1);b("BrowserPushMessageHandler").registerRedirectHandler();return new(b("Promise"))(function(j,k){i.getPushSubscription().then(function(k){j(!!k||c&&!a.pushPermissionIsPending()),k?g?i.$4(d,f,k):b("BrowserPushVisibilityChanger").listenForVisibility():!k&&c&&(a.pushPermissionIsOn()?i.registerPush(d,f,h)["catch"](function(){}):i.$5(e,f,!1))})["catch"](function(){c&&i.$5(e,f,!1),h&&b("ServiceWorkerRegistration").unregisterControllingWorker(),k()})})};c.$6=function(){return new(b("Promise"))(function(a,b){g.requestPermission(a)})};c.registerPushAndWaitForEndpoint=function(a,c,d){var e=this;d===void 0&&(d=!1);return new(b("Promise"))(function(b,f){e.$7(a,c,!0,null,d).then(function(a){if(typeof a!=="string"){f(new Error("registerPushImpl did not return an endpoint"));return}b(a)})["catch"](f)})};c.registerPushOnKaiOS=function(a,c,d){var e=this;return new(b("Promise"))(function(f,g){d.waitForKaiOS().done(function(){d.registerPush(function(d){d=JSON.parse(d.get("push_endpoint"));e.$4(a,c,d);f(b("PushRegistrationUtils").normalizeSubscriptionEndpoint(d))})})})};c.registerPush=function(a,c,d,e){d===void 0&&(d=!1);e===void 0&&(e=b("emptyFunction"));return this.registerPushWithFinishedCallBack(a,c,e,d)};c.registerPushWithFinishedCallBack=function(a,c,d,e){var f=this;e===void 0&&(e=!1);return new(b("Promise"))(function(b,g){f.$7(a,c,!1,d,e).then(function(a){if(typeof a!=="boolean"){g(new Error("registerPushImpl did not return a boolean"));return}b(a)})["catch"](g)})};c.$7=function(c,d,e,f,g){var h=this;if(a.$1)return new(b("Promise"))(function(a,b){b(new Error("registering already"))});if(!self.PushManager)return b("Promise").reject(new Error("PushManager not found."));a.$1=!0;return new(b("Promise"))(function(i,j){var k=b("ServiceWorkerRegistration").registerWorkerIfUnregistered(h.$3),l=h.$6();b("Promise").all([k,l]).then(function(k){var l=k[0];if(!a.pushPermissionIsOn()){g&&l.unregister();throw new Error("Push permission was denied")}e||i(!0);k=b("BrowserPushPubKey").appServerKey;var m=b("gkx")("1511920")&&k!=null&&k!="";m=m?{userVisibleOnly:!0,applicationServerKey:k}:{userVisibleOnly:!0};l.pushManager.subscribe(m).then(function(a){e&&i(b("PushRegistrationUtils").normalizeSubscriptionEndpoint(a)),h.$4(c,d,a),f&&f(),b("BrowserPushVisibilityChanger").listenForVisibility()})["catch"](function(b){a.$1=!1,g&&l.unregister(),j(b)})})["catch"](function(b){a.$1=!1,j(b)})})};c.unregisterPushAndSWOnKaiOS=function(a,c,d,e){var f=this;return new(b("Promise"))(function(b,g){f.$5(a,c,e).then(function(){d.unregisterPush(),b()})["catch"](g)})};c.unregisterPushAndSW=function(a,c){var d=this;return new(b("Promise"))(function(e,f){d.$5(a,c,!0).then(function(){b("promiseDone")(b("ServiceWorkerRegistration").unregisterControllingWorker(),e)})["catch"](f)})};c.unregisterPushOnly=function(a,c){var d=this;return new(b("Promise"))(function(b,e){d.getPushSubscription().then(function(f){f?f.unsubscribe().then(d.$5(a,c,!0)).then(function(){b(!0)})["catch"](e):e()})["catch"](e)})};a.pushPermissionIsPending=function(){return window.Notification&&window.Notification.permission==="default"};a.pushPermissionIsOn=function(){return window.Notification&&window.Notification.permission==="granted"};a.pushPermissionIsDenied=function(){return window.Notification&&window.Notification.permission==="denied"};return a}();e.exports=a}),null);
__d("ServiceWorkerLoginAndLogout",["ClientServiceWorkerMessage"],(function(a,b,c,d,e,f){function g(a){new(b("ClientServiceWorkerMessage"))(a,null).sendViaController()}a={login:function(){g("login")},logout:function(){g("logout")}};c=a;f["default"]=c}),66);
__d("XBrowserPushDisabledController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/notifications/client/push/disabled/",{})}),null);
__d("ServiceWorkerLoginAndLogoutListener",["KaiOSController","MRequest","MobileAppDetect","PushRegistration","ServiceWorkerLoginAndLogout","Stratcom","XBrowserPushDisabledController","killswitch"],(function(a,b,c,d,e,f){a={listen:function(a,c,d,e){b("Stratcom").listen("click",a,function(){if(b("MobileAppDetect").is_kaios){if(!e)return;if(b("killswitch")("NOTIFICATIONS_LOGGED_OUT_PUSH_KAIOS_TOKEN_HANDLING")){var a=b("PushRegistration").get(d,e);a.unregisterPushAndSWOnKaiOS(b("XBrowserPushDisabledController"),b("MRequest"),b("KaiOSController"),!1)}}else if(c==="login")b("ServiceWorkerLoginAndLogout").login();else if(c==="logout")b("ServiceWorkerLoginAndLogout").logout();else throw new Error("bad login type given")})}};e.exports=a}),null);