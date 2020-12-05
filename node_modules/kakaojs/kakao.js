/**
 * Kakao Javascript SDK for Kakao Open Platform Service - v1.2.0
 *
 * Copyright 2016 Kakao Corp.
 *
 * Redistribution and modification in source are not permitted without specific prior written permission. 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.Kakao = f();
  }
})(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (require, module, exports) {
      var process = module.exports = {};


      var cachedSetTimeout;
      var cachedClearTimeout;

      (function () {
        try {
          cachedSetTimeout = setTimeout;
        } catch (e) {
          cachedSetTimeout = function cachedSetTimeout() {
            throw new Error('setTimeout is not defined');
          };
        }
        try {
          cachedClearTimeout = clearTimeout;
        } catch (e) {
          cachedClearTimeout = function cachedClearTimeout() {
            throw new Error('clearTimeout is not defined');
          };
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; 
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };
    }, {}], 2: [function (require, module, exports) {
      module.exports = function () {
        var _auth = require("./auth.js");

        function authByAccessToken() {
          return 'Bearer ' + _auth.getAccessToken();
        }

        function authByAppKey() {
          return 'KakaoAK ' + _auth.getAppKey();
        }

        return {
          accessToken: authByAccessToken,
          appKey: authByAppKey,
          tokenOrKey: _auth.getAccessToken() ? authByAccessToken : authByAppKey
        };
      }();
    }, { "./auth.js": 4 }], 3: [function (require, module, exports) {
      /*******************
       * API
       *******************/
      module.exports = function () {
        var API = {};

        require('../vendor/es6-promise.js');

        var _easyXDM = require('../vendor/easyXDM.js');
        var _ = require('./util.js');
        var _k = require('./common.js');
        var authTypes = require('./api.authType');

        var _rpc;

        API.request = function (settings) {
          settings = _k.processRules(settings, rules.request, 'API.request');

          var url = settings.url;
          var dataRules = rules.api[url].data;

          if (dataRules) {
            settings.data = _k.processRules(settings.data, rules.api[url].data, 'API.request - ' + url);
          }

          return new Promise(function (resolve, reject) {
            getConfig().then(function (config) {
              getRPC().request(config, function (res) {
                settings.success(res);
                settings.always(res);

                resolve(res);
              }, function (xdmErr) {
                var err = parseErrorObj(xdmErr);
                settings.fail(err);
                settings.always(err);

                reject(err);
              });
            }, function (err) {
              reject(err);
            });
          });

          function getConfig() {
            var serializedData = {};
            _.each(settings.data, function (value, key) {
              serializedData[key] = _.isString(value) ? value : JSON.stringify(value);
            });

            var config = {
              url: url,
              method: rules.api[url].method,
              headers: {
                'KA': _k.KAKAO_AGENT
              },
              data: serializedData
            };

            var getAuthHeader = rules.api[url].authType || authTypes.accessToken;
            config.headers['Authorization'] = getAuthHeader();

            return new Promise(function (resolve, reject) {
              if (isFileRequired(url)) {
                if (!settings.files) {
                  throw new _k.KakaoError("'files' parameter should be set for " + url);
                }

                getFileConfig(settings.files).then(function (fileConfig) {
                  config.file = fileConfig;
                  resolve(config);
                }, function (err) {
                  reject(err);
                });
              } else {
                resolve(config);
              }
            });
          }

          function getFileConfig(files) {
            return new Promise(function (resolve, reject) {
              var fileDataPromises = _.map(files, function (file) {
                return _k.serializeFile(file).then(function (stringified) {
                  return {
                    name: file.name,
                    type: file.type,
                    str: stringified
                  };
                });
              });

              Promise.all(fileDataPromises).then(function (fileDatas) {
                resolve({
                  paramName: 'file',
                  data: fileDatas
                });
              }, function (err) {
                reject(err);
              });
            });
          }

          function parseErrorObj(easyXDMError) {
            try {
              _k.logDebug(easyXDMError);

              var xhrError = easyXDMError.message;
              return JSON.parse(xhrError.responseText);
            } catch (ex) {
              return {
                code: -777,
                msg: 'Unknown error'
              };
            }
          }
        };

        API.createAPIAlias = function (defaultSettings) {
          return function (settings) {
            settings = settings || {};
            _.defaults(settings, defaultSettings);

            return API.request(settings);
          };
        };

        function getRPC() {
          if (!_rpc) {
            _rpc = _k.guardCreateEasyXDM(function () {
              return new _easyXDM.Rpc({
                remote: _k.URL.apiRemote
              }, {
                remote: {
                  request: {}
                }
              });
            });
          }

          return _rpc;
        }

        function isFileRequired(url) {
          return url === '/v1/api/story/upload/multi';
        }

        var postApiCommonParams = {
          permission: _.isOneOf(['A', 'F', 'M']),
          enable_share: _.isBoolean,
          android_exec_param: _.isString, ios_exec_param: _.isString,
          android_market_param: _.isString, ios_market_param: _.isString
        };

        var secureResource = {
          secure_resource: _.isBoolean
        };

        var rules = {
          request: {
            required: { url: function url(_url) {
                return _.isOneOf(_.keys(rules.api))(_url);
              } },
            optional: { data: _.isObject,
              files: function files(obj) {
                return _.passesOneOf([_.isArray, _.isFileList])(obj) && _.every(obj, _.passesOneOf([_.isFile, _.isBlob]));
              },
              success: _.isFunction, fail: _.isFunction, always: _.isFunction },
            defaults: {
              data: {},
              success: _.emptyFunc,
              fail: _.emptyFunc,
              always: _.emptyFunc
            }
          },
          api: {
            '/v1/user/signup': {
              method: 'post',
              data: {
                optional: { properties: _.isObject }
              }
            },
            '/v1/user/unlink': {
              method: 'post'
            },
            '/v1/user/me': {
              method: 'post',
              data: {
                optional: _.extend({
                  propertyKeys: _.isArray
                }, secureResource)
              }
            },
            '/v1/user/logout': {
              method: 'post',
              data: {}
            },
            '/v1/user/update_profile': {
              method: 'post',
              data: {
                required: { properties: _.isObject }
              }
            },
            '/v1/api/talk/profile': {
              method: 'get',
              data: {
                optional: secureResource
              }
            },
            '/v1/api/talk/memo/send': {
              method: 'post',
              data: {
                required: {
                  template_id: _.passesOneOf([_.isNumber, _.isString])
                },
                optional: {
                  args: _.isString
                }
              }
            },
            '/v1/api/story/profile': {
              method: 'get',
              data: {
                optional: secureResource
              }
            },
            '/v1/api/story/isstoryuser': {
              method: 'get'
            },
            '/v1/api/story/mystory': {
              method: 'get',
              data: {
                required: { id: _.isString }
              }
            },
            '/v1/api/story/mystories': {
              method: 'get',
              data: {
                optional: { last_id: _.isString }
              }
            },
            '/v1/api/story/linkinfo': {
              method: 'get',
              data: {
                required: { url: _.isString }
              }
            },
            '/v1/api/story/post/note': {
              method: 'post',
              data: {
                required: { content: storyActivityContentValidator },
                optional: postApiCommonParams
              }
            },
            '/v1/api/story/post/photo': {
              method: 'post',
              data: {
                required: { image_url_list: kageImageUrlListValidator },
                optional: _.extend({
                  content: storyActivityContentValidator
                }, postApiCommonParams)
              }
            },
            '/v1/api/story/post/link': {
              method: 'post',
              data: {
                required: { link_info: _.isObject },
                optional: _.extend({
                  content: storyActivityContentValidator
                }, postApiCommonParams)
              }
            },
            '/v1/api/story/upload/multi': {
              method: 'post',
              data: {}
            },
            '/v1/emoticon/my_items': {
              method: 'get',
              data: {},
              authType: authTypes.appKey
            },
            '/v1/emoticon/item_resources': {
              method: 'get',
              data: {
                required: { 'id': _.isString }
              },
              authType: authTypes.appKey
            },
            '/v1/api/story/delete/mystory': {
              method: 'delete',
              data: {
                required: { 'id': _.isString }
              }
            },
            '/v2/emoticon/items': {
              method: 'get',
              authType: authTypes.tokenOrKey
            },
            '/v2/emoticon/item': {
              method: 'get',
              data: {
                required: { 'id': _.passesOneOf([_.isNumber, _.isString]) }
              },
              authType: authTypes.tokenOrKey
            },
            '/v2/emoticon/item_resources': {
              method: 'get',
              authType: authTypes.tokenOrKey
            },
            '/v2/emoticon/item_resource': {
              method: 'get',
              data: {
                required: { 'id': _.passesOneOf([_.isNumber, _.isString]) }
              },
              authType: authTypes.tokenOrKey
            },
            '/v1/s2/publish': {
              method: 'post',
              data: {
                required: {
                  timestamp: _.isNumber,
                  from: _.isString,
                  to: _.isString,
                  action: _.isString
                },
                defaults: function defaults() {
                  return {
                    timestamp: new Date().getTime() 
                  };
                },
                optional: {
                  props: _.isObject
                }
              },
              authType: authTypes.appKey
            }
          }
        };

        function storyActivityContentValidator(obj) {
          if (!_.isString(obj)) {
            return false;
          }

          if (obj.length === 0 || obj.length > 2048) {
            throw new _k.KakaoError('content length should be between 0 and 2048');
          }

          return true;
        }

        function kageImageUrlListValidator(obj) {
          if (!_.isArray(obj)) {
            return false;
          }

          return _.every(obj, function (path) {
            if (!_.isString(path)) {
              return false;
            }

            if (_.isURL(path)) {
              throw new _k.KakaoError("url in image_url_list should be a kage url, obtained from '/v1/api/story/upload/multi'.");
            }

            return true;
          });
        }

        API.cleanup = function () {
          if (_rpc) {
            _rpc.destroy();
            _rpc = null;
          }
        };

        return API;
      }();
    }, { "../vendor/easyXDM.js": 15, "../vendor/es6-promise.js": 16, "./api.authType": 2, "./common.js": 7, "./util.js": 12 }], 4: [function (require, module, exports) {
      /*******************
       * Auth
       *******************/
      module.exports = function () {
        var Auth = {};

        var _easyXDM = require('../vendor/easyXDM.js');
        var _crypto = require('../vendor/CryptoJS.js');
        var _ = require('./util.js');
        var _k = require('./common.js');
        var _loginWithTalk = require('./auth.withTalk.js');
        var _poller = require('./auth.withTalk.poller.js');

        var cleanups = [];

        var LOGIN_POPUP_NAME = '_blank'; 
        var CHANNEL_POPUP_NAME = 'kakaostory_channel_select';
        var POPUP_FEATURES = 'width=380, height=520, scrollbars=yes';

        /**
         * 카카오 로그인 버튼을 생성.
         * @param {CreateLoginButtonSettings} settings
         */
        Auth.createLoginButton = function (settings) {
          settings = _k.processRules(settings, rules.createLoginButton, 'Auth.createLoginButton');

          var containerElement = _.getElement(settings.container);
          if (!containerElement) {
            throw new _k.KakaoError('container is required for Kakao login button: pass in element or id');
          }
          var stateToken = '';

          var proxy = getProxy({
            container: containerElement
          }, function (response) {
            checkStateToken(response);
            handleAuthResponse(response, settings);

            refreshStateToken();
          });

          refreshStateToken();
          configureRemoteClient();

          cleanups.push(function () {
            proxy.destroy();
            proxy = null;
          });

          function checkStateToken(response) {
            if (response.stateToken !== stateToken) {
              throw new _k.KakaoError('security error: #CST');
            }

            delete response.stateToken;
            return response;
          }

          function refreshStateToken() {
            stateToken = _.getRandomString();
            proxy.setStateToken(stateToken);
          }

          function configureRemoteClient() {
            var authParams = getCommonAuthParams(settings);

            proxy.setClient(settings.lang, settings.size, authParams, function (size) {
              var iframe = containerElement.getElementsByTagName('iframe')[0];
              iframe.style.width = size.width + 'px';
              iframe.style.height = size.height + 'px';
            });
          }
        };

        var _loginSettings = {};
        Auth.login = function (settings) {
          settings = _k.processRules(settings, rules.login, 'Auth.login');
          var stateToken = _.getRandomString() + _.getRandomString();

          if (_loginWithTalk.isSupport()) {
            _loginThroughTalk(settings, stateToken);
          } else {
            var url = _loginThroughWeb(settings, stateToken);
            _k.windowOpen(url, LOGIN_POPUP_NAME, POPUP_FEATURES);
          }
        };

        /**
         * Talk App을 통해 로그인 하기
         * @private
         */
        var _loginProxyWithTalk;

        var _loginWindow;
        function _closePopup() {
          if (_loginWindow && _loginWindow.close) {
            _loginWindow.close();
          }
        }

        function _loginThroughTalk(settings, stateToken) {
          if (!_loginProxyWithTalk) {
            _loginProxyWithTalk = getProxy({}, function (response) {
              if (response.status) {
                if (response.status == 'ok') {
                  _closePopup();
                  _poller.stop();
                  _loginProxyWithTalk.getAccessToken(response.code, _k.RUNTIME.appKey, _k.URL.talkLoginRedirectUri);
                }
              } else {
                handleAuthResponse(response, settings);
              }
            });

            if (_k.UA.os.android) {
              var channel;

              (function () {
                var messageHandler = function messageHandler(ev) {
                  if (/\.kakao\.com$/.test(ev.origin) && ev.data && ev.data.substring(0, channel.length) === channel) {
                    var arr = ev.data.split(" ");
                    if (arr[1] === 'postResponse') {
                      var response = JSON.parse(decodeURIComponent(arr[2]));
                      handleAuthResponse(response, settings);
                      _.removeEvent(window, 'message', messageHandler);
                    } else if (arr[1] === 'browser_fallback_url_data') {
                      _loginWindow.postMessage([channel, 'browser_fallback_url_data', encodeURIComponent(_k.KAKAO_AGENT), location.host].join(" "), _k.URL.authDomain);
                    }
                  }
                };

                _.addEvent(window, 'message', messageHandler);
                channel = "postProxy" + stateToken;


                cleanups.push(function () {
                  _.removeEvent(window, 'message', messageHandler);
                });
              })();
            }

            cleanups.push(function () {
              _loginProxyWithTalk.destroy();
              _loginProxyWithTalk = null;
            });
          }

          var fallbackURL = _loginThroughWeb(settings, stateToken);
          _loginWindow = _loginWithTalk.login(stateToken, fallbackURL);

          _poller.start(function () {
            if (stateToken) {
              _loginProxyWithTalk.getCode(stateToken, _k.RUNTIME.appKey);
            }
          }, function () {
            handleAuthResponse({ error: "timeout", description: "login timeout. retry." });
          });

          _poller.setStopCondition(function () {
            return _loginWithTalk.hasWebLoginWindow();
          });
        }

        /**
         * web 팝업창을 통해 로그인하기
         * @private
         */
        var _loginProxy;
        function _loginThroughWeb(settings, stateToken) {
          if (!_loginProxy) {
            _loginProxy = getProxy({}, function (response) {
              _poller.stop();
              var savedSettings = getSavedSettingsWithResponseState(response, _loginSettings);
              handleAuthResponse(response, savedSettings);
            });

            cleanups.push(function () {
              _loginProxy.destroy();
              _loginProxy = null;
            });
          }
          _loginSettings[stateToken] = settings;

          function getAuthUrl() {
            var params = _.extend({
              redirect_uri: 'kakaojs',
              response_type: 'code',
              state: stateToken,
              proxy: 'easyXDM_Kakao_' + _loginProxy.channel + '_provider'
            }, getCommonAuthParams(settings));

            return _k.URL.authorize + '?' + _.buildQueryString(params);
          }
          return getAuthUrl();
        }

        var _storyChannelProxy;
        var _selectStoryChannelSettings = {};
        Auth.selectStoryChannel = function (settings) {
          settings = _k.processRules(settings, rules.selectStoryChannel, 'Auth.selectStoryChannel');

          if (!_storyChannelProxy) {
            _storyChannelProxy = getProxy({}, function (response) {
              var savedSettings = getSavedSettingsWithResponseState(response, _selectStoryChannelSettings);
              handleResponse(response, savedSettings);
            });

            cleanups.push(function () {
              _storyChannelProxy.destroy();
              _storyChannelProxy = null;
            });
          }

          var stateToken = _.getRandomString();
          _selectStoryChannelSettings[stateToken] = settings;
          window.open(getSelectStoryChannelUri(), CHANNEL_POPUP_NAME, POPUP_FEATURES);

          function getSelectStoryChannelUri() {
            var params = _.extend({
              state: stateToken,
              proxy: 'easyXDM_Kakao_' + _storyChannelProxy.channel + '_provider',
              token: settings.extendedToken || ''
            }, getCommonAuthParams(settings));

            return _k.URL.storyChannel + '?' + _.buildQueryString(params);
          }
        };

        var defaultCallbacks = {
          success: _.emptyFunc,
          fail: _.emptyFunc,
          always: _.emptyFunc
        };

        var loginDefaultSettings = _.extend({
          persistAccessToken: true,
          persistRefreshToken: false 
        }, defaultCallbacks);

        var loginCommonSettings = {
          success: _.isFunction,
          fail: _.isFunction,
          always: _.isFunction,
          persistAccessToken: _.isBoolean,
          persistRefreshToken: _.isBoolean,
          approvalType: _.isOneOf(['project']),
          scope: _.isString
        };

        var rules = {
          createLoginButton: {
            required: { container: _.passesOneOf([_.isElement, _.isString]) },
            optional: _.extend({
              lang: _.isOneOf(['en', 'kr']),
              size: _.isOneOf(['small', 'medium', 'large'])
            }, loginCommonSettings),
            defaults: _.extend({
              lang: 'kr',
              size: 'medium'
            }, loginDefaultSettings)
          },
          login: {
            optional: loginCommonSettings,
            defaults: loginDefaultSettings
          },
          selectStoryChannel: {
            optional: {
              extendedToken: _.isString,
              success: _.isFunction, fail: _.isFunction, always: _.isFunction
            },
            defaults: defaultCallbacks
          }
        };

        function getProxy(config, responseHandler) {
          _.extend(config, {
            remote: _k.URL.loginWidget,
            channel: _.getRandomString()
          });

          return _k.guardCreateEasyXDM(function () {
            var proxy = new _easyXDM.Rpc(config, {
              local: {
                postResponse: responseHandler,
                getKakaoAgent: function getKakaoAgent() {
                  return _k.KAKAO_AGENT;
                }
              },
              remote: {
                getCode: {},
                getAccessToken: {},
                setClient: {},
                setStateToken: {},
                deleteAuthCookie: {}
              }
            });

            proxy.channel = config.channel;
            return proxy;
          });
        }

        function getSavedSettingsWithResponseState(response, settings) {
          if (!_.has(settings, response.stateToken)) {
            throw new _k.KakaoError('security error: #CST2');
          }

          var savedSettings = settings[response.stateToken];
          delete settings[response.stateToken];
          delete response.stateToken;

          return savedSettings;
        }

        function handleAuthResponse(response, authSettings) {
          if (response.error) {
            Auth.setAccessToken(null);
            Auth.setRefreshToken(null);
          } else {
            Auth.setAccessToken(response.access_token, authSettings.persistAccessToken);
            Auth.setRefreshToken(response.refresh_token);
          }

          handleResponse(response, authSettings);
        }

        function handleResponse(response, settings) {
          _k.logDebug(response);

          if (response.error) {
            settings.fail(response);
            settings.always(response);
          } else {
            settings.success(response);
            settings.always(response);
          }
        }

        function getCommonAuthParams(settings) {
          var params = {
            client_id: _k.RUNTIME.appKey
          };

          if (settings.approvalType) {
            params.approval_type = settings.approvalType;
          }

          if (settings.scope) {
            params.scope = settings.scope;
          }

          return params;
        }

        Auth.logout = function (callback) {
          callback = callback || _.emptyFunc;
          _k.validate(callback, _.isFunction, 'Auth.logout');

          if (!Auth.getAccessToken()) {
            onLogout();
          } else {
            Kakao.API.request({
              url: '/v1/user/logout',
              always: function always(res) {
                Auth.setAccessToken(null);
                Auth.setRefreshToken(null);
                onLogout();
              }
            });
          }

          function onLogout() {
            var proxy = getProxy({}, _.emptyFunc);
            proxy.deleteAuthCookie(function (response) {
              proxy.destroy();
              callback(true);
            }, function (error) {
              proxy.destroy();
              callback(false);
            });
          }
        };

        Auth.setAccessToken = function (token, persist) {
          _k.RUNTIME.accessToken = token;
          if (token === null || persist === false) {
            removeItem(getAccessTokenKey());
          } else {
            storeItem(getAccessTokenKey(), token);
          }
        };

        Auth.setRefreshToken = function (token) {
          _k.RUNTIME.refreshToken = token;
        };

        Auth.getAccessToken = function () {
          if (!_k.RUNTIME.accessToken) {
            _k.RUNTIME.accessToken = retrieveItem(getAccessTokenKey());
          }

          return _k.RUNTIME.accessToken;
        };

        Auth.getRefreshToken = function () {
          return _k.RUNTIME.refreshToken || "";
        };

        function storeItem(key, value) {
          var item = encrypt(value, _k.RUNTIME.appKey);
          _.localStorage.setItem(key, item);
        }

        function retrieveItem(key) {
          var item = _.localStorage.getItem(key);

          if (item) {
            return decrypt(item, _k.RUNTIME.appKey);
          } else {
            return null;
          }
        }

        function removeItem(key) {
          _.localStorage.removeItem(key);
        }

        var tokenStorageKeys = {};

        function getAccessTokenKey() {
          if (!tokenStorageKeys.accessTokenKey) {
            tokenStorageKeys.accessTokenKey = 'kakao_' + hash('kat' + _k.RUNTIME.appKey);
          }

          return tokenStorageKeys.accessTokenKey;
        }

        function hash(msg) {
          var hashed = _crypto.MD5(msg);
          return hashed.toString();
        }

        function encrypt(msg, passphrase) {
          var encrypted = _crypto.AES.encrypt(msg, passphrase);
          return encrypted.toString();
        }

        function decrypt(encrypted, passphrase) {
          var decrypted = _crypto.AES.decrypt(encrypted, passphrase);
          return decrypted.toString(_crypto.enc.Utf8);
        }

        Auth.getAppKey = function () {
          return _k.RUNTIME.appKey;
        };

        Auth.getStatus = function (callback) {
          _k.validate(callback, _.isFunction, 'Auth.getStatus');

          if (!Auth.getAccessToken()) {
            callback({
              status: "not_connected"
            });
          } else {
            Kakao.API.request({
              url: '/v1/user/me',
              success: function success(res) {
                callback({
                  status: "connected",
                  user: res
                });
              },
              fail: function fail() {
                callback({
                  status: "not_connected"
                });
              }
            });
          }
        };

        Auth.cleanup = function () {
          _.each(cleanups, function (func, i) {
            func();
          });
          cleanups.length = 0;
        };

        return Auth;
      }();
    }, { "../vendor/CryptoJS.js": 14, "../vendor/easyXDM.js": 15, "./auth.withTalk.js": 5, "./auth.withTalk.poller.js": 6, "./common.js": 7, "./util.js": 12 }], 5: [function (require, module, exports) {
      module.exports = function () {
        var _k = require('./common.js');

        /** popup window name should be '_blank' for iOS Chrome. @see https://code.google.com/p/chromium/issues/detail?id=136610#c68 */
        var LOGIN_POPUP_NAME = '_blank';
        var POPUP_FEATURES = 'width=380, height=520, scrollbars=yes';
        var isIntentSupportAndroidWebView = /Version\/4.0|/i.test(_k.UA.ua) && (/Chrome\/30\.0\.0\.0 Mobile/i.test(_k.UA.ua) || /; wv\)/i.test(_k.UA.ua));
        var isSupportWebView = /naver\(inapp|fb_iab|daumapps/g.test(_k.UA.ua);
        var _loginPopupWindow;

        return {
          isSupport: function isSupport() {
            var MIN_SUPPORT_VER_FOR_IOS_SAFARI = 9;
            var MIN_SUPPORT_VER_TO_APP_INTENT_FOR_ANDROID_CHROME = 30;
            if (_k.UA.os.ios) {
              return (/safari/.test(_k.UA.ua) && !/CriOS/i.test(_k.UA.ua) && _k.UA.browser.version.major >= MIN_SUPPORT_VER_FOR_IOS_SAFARI
              );
            } else if (_k.UA.os.android) {
              return _k.UA.browser.chrome && _k.UA.browser.version.major >= MIN_SUPPORT_VER_TO_APP_INTENT_FOR_ANDROID_CHROME && (!isIntentSupportAndroidWebView || isIntentSupportAndroidWebView && isSupportWebView);
            } else {
              return false;
            }
          },
          login: function login(stateToken, fallbackWebURL) {
            if (!this.isSupport()) {
              return;
            }
            if (_k.UA.os.ios) {
              var iOSTalkLoginScheme = createIOSTalkLoginScheme(stateToken);
              _loginPopupWindow = _k.windowOpen(_k.URL.universalKakaoLink + encodeURIComponent(iOSTalkLoginScheme) + '&web=' + encodeURIComponent(fallbackWebURL), LOGIN_POPUP_NAME, POPUP_FEATURES);
            } else if (_k.UA.os.android) {
              var androidTalkLoginIntent = createAndroidLoginIntent(stateToken, fallbackWebURL);

              if (isSupportNativeFallbackURL() && !isIntentSupportAndroidWebView) {
                _loginPopupWindow = _k.windowOpen(androidTalkLoginIntent, LOGIN_POPUP_NAME, POPUP_FEATURES);
              } else {
                _loginPopupWindow = _k.windowOpen('', LOGIN_POPUP_NAME, POPUP_FEATURES);
                if (_loginPopupWindow) {
                  _loginPopupWindow.addEventListener('unload', moveFallback);
                  _loginPopupWindow.location.href = androidTalkLoginIntent;
                }
              }
            }
            return _loginPopupWindow;

            function isSupportNativeFallbackURL() {
              var MIN_SUPPORT_CHROME_VER = 40;
              return _k.UA.browser.version.major > MIN_SUPPORT_CHROME_VER;
            }

            function moveFallback() {
              setTimeout(function () {
                _loginPopupWindow.location.href = fallbackWebURL;
              }, 10);
            }
          },
          hasWebLoginWindow: function hasWebLoginWindow() {
            try {
              if (_loginPopupWindow && _loginPopupWindow.location && _loginPopupWindow.location.href != "about:blank") {
                if (_k.UA.os.android) {
                  return !!_loginPopupWindow.location.href;
                } else {
                  return true;
                }
              }
              return false;
            } catch (CrossDomainAccessDomException) {
              return true;
            }
          }
        };

        function createIOSTalkLoginScheme(stateToken) {
          return [_k.URL.talkLoginScheme, '?', 'client_id=' + _k.RUNTIME.appKey, '&', 'redirect_uri=' + encodeURIComponent(_k.URL.talkLoginRedirectUri), '&', 'params=' + encodeURIComponent('{"state":"' + stateToken + '"}')].join('');
        }

        function createAndroidLoginIntent(stateToken, fallbackWebUrl) {
          return ['intent:#Intent', 'action=com.kakao.talk.intent.action.CAPRI_LOGGED_IN_ACTIVITY', 'launchFlags=0x14008000', 'S.com.kakao.sdk.talk.appKey=' + _k.RUNTIME.appKey, 'S.com.kakao.sdk.talk.redirectUri=' + _k.URL.talkLoginRedirectUri, 'S.com.kakao.sdk.talk.state=' + stateToken, 'S.browser_fallback_url=' + encodeURIComponent(fallbackWebUrl), 'end;'].join(';');
        }
      }();
    }, { "./common.js": 7 }], 6: [function (require, module, exports) {
      module.exports = function () {
        var timer;
        var pollingCounter = 0;
        var INTERVAL = 1000;
        var MAX_COUNT = 30;
        var failCallback = function failCallback() {};
        var pollingAction = function pollingAction() {};
        var stopConditionFunc = function stopConditionFunc() {
          return false;
        };

        function doPolling() {
          if (stopConditionFunc()) {
            _stop();
            return;
          }
          if (++pollingCounter > MAX_COUNT) {
            _stop();
            failCallback();
          } else {
            pollingAction();
          }
        };

        function _stop() {
          clearInterval(timer);
        }

        return {
          start: function start(action, failAction) {
            pollingCounter = 0;
            if (typeof action === 'function') {
              pollingAction = action;
            }
            if (typeof failAction === 'function') {
              failCallback = failAction;
            }

            if (timer) {
              _stop();
            }

            timer = setInterval(doPolling, INTERVAL);
          },
          stop: function stop() {
            _stop();
          },
          setStopCondition: function setStopCondition(funcCondition) {
            if (typeof funcCondition === 'function') {
              stopConditionFunc = funcCondition;
            }
          }
        };
      }();
    }, {}], 7: [function (require, module, exports) {

      module.exports = function () {
        var _k = {};

        var _ = require('./util.js');
        var userAgent = require('../vendor/userAgent.js');

        var origin = location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '');

        _k.VERSION = '1.2.0';

        _k.KAKAO_AGENT = 'sdk/' + _k.VERSION + ' os/javascript' + ' lang/' + (navigator.userLanguage || navigator.language) + ' device/' + navigator.platform.replace(/ /g, '_') + ' origin/' + encodeURIComponent(origin);

        _k.URL = {
          authorize: 'https://kauth.kakao.com' + '/oauth/authorize',
          loginWidget: 'https://kauth.kakao.com' + '/public/widget/login/kakaoLoginWidget.html',
          apiRemote: 'https://kapi.kakao.com' + '/cors/',
          storyChannel: 'https://kauth.kakao.com' + '/story/select_channel',
          storyShare: 'https://story.kakao.com' + '/s/share',
          channelFollow: 'https://story.kakao.com' + '/s/follow',
          storyIcon: '//dev.kakao.com/sdk/js/resources/story/icon_small.png',
          universalKakaoLink: 'https://talk-apps.kakao.com' + '/scheme/',
          talkLoginScheme: 'kakaokompassauth://authorize',
          talkLoginRedirectUri: 'https://kapi.kakao.com/cors/afterlogin.html',
          authDomain: 'https://kauth.kakao.com'
        };

        _k.RUNTIME = {
          appKey: '',
          accessToken: '',
          refreshToken: ''
        };

        _k.DUMMY_KEY = 'YOUR APP KEY';

        _k.UA = userAgent();

        var KakaoError = function KakaoError(message) {
          Error.prototype.constructor.apply(this, arguments);
          this.name = 'KakaoError';
          this.message = message;
        };

        KakaoError.prototype = new Error();

        _k.KakaoError = KakaoError;

        _k.isDebug = function () {
          return false;
        };

        _k.logDebug = function (obj) {
          if (_k.isDebug() && window.console) {
            console.log(JSON.stringify(obj));
          }
        };

        _k.validate = function (target, validator, callerMsg) {
          if (validator(target) !== true) {
            throw new KakaoError('Illegal argument for ' + callerMsg);
          }
        };

        _k.processRules = function (params, rules, callerMsg) {
          params = params || {};

          if (rules.before) {
            rules.before(params);
          }

          if (_.isFunction(rules.defaults)) {
            _.defaults(params, rules.defaults(params));
          } else {
            _.defaults(params, rules.defaults);
          }

          var required = rules.required || {};

          var missingRequiredKeys = _.difference(_.keys(required), _.keys(params));
          if (missingRequiredKeys.length) {
            throw new KakaoError('Missing required keys: ' + missingRequiredKeys.join(',') + ' at ' + callerMsg);
          }

          var optional = rules.optional || {};
          var allowed = _.extend({}, required, optional);

          var invalidKeys = _.difference(_.keys(params), _.keys(allowed));
          if (invalidKeys.length) {
            throw new KakaoError('Invalid parameter keys: ' + invalidKeys.join(',') + ' at ' + callerMsg);
          }

          _.each(params, function (value, key) {
            var validator = allowed[key];
            _k.validate(value, validator, '"' + key + '" in ' + callerMsg);
          });

          if (rules.after) {
            rules.after(params);
          }

          return params;
        };

        _k.getInstallUrl = function (androidAppId, iOSAppId) {
          if (_k.UA.os.android) {
            var referrer = {
              appkey: _k.RUNTIME.appKey,
              KA: _k.KAKAO_AGENT
            };

            return 'market://details?id=' + androidAppId + '&referrer=' + JSON.stringify(referrer);
          } else if (_k.UA.os.ios) {
            return 'https://itunes.apple.com/app/id' + iOSAppId;
          } else {
            return location.href;
          }
        };

        _k.isRetinaDisplay = function () {
          var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

          if (window.devicePixelRatio > 1) {
            return true;
          }

          if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
            return true;
          }

          return false;
        };

        _k.createHiddenIframe = function (id, src) {
          var iframe = document.getElementById(id);

          if (iframe !== null) {
            iframe.parentNode.removeChild(iframe);
          }

          iframe = document.createElement("iframe");
          iframe.id = id;
          iframe.style.border = "none";
          iframe.style.display = "none";
          iframe.style.width = "0px";
          iframe.style.height = "0px";

          iframe.src = src;

          return iframe;
        };

        _k.guardCreateEasyXDM = function (createEasyXDM) {
          try {
            return createEasyXDM();
          } catch (ex) {
            if (ex instanceof TypeError) {
              throw new KakaoError("kakao.js should be loaded from a web server");
            } else {
              throw new KakaoError('EasyXDM -' + ex.message);
            }
          }
        };

        _k.serializeFile = function (file) {
          return new Promise(function (resolve, reject) {
            if (typeof FileReader === "undefined") {
              reject(new KakaoError('File API is not supported for this browser.'));
            }

            var fileReader = new FileReader();

            fileReader.onload = function (e) {
              try {
                resolve(_.arrayBufferToString(e.target.result));
              } catch (e) {
                reject(e);
              }
            };

            fileReader.onerror = function (e) {
              reject(new KakaoError('Cannot read file: ' + file.name));
            };

            fileReader.readAsArrayBuffer(file);
          });
        };

        _k.popupWindows = {};
        /**
         * 기존에 열려있는 팝업창이 있으면 닫고 새창을 연다. 없으면 바로 새창을 연다.
         * @param {string} url 팝업창 url
         * @param {string} name 팝업창 이름
         * @param {object} feature 팝업창 feature
         *
         * @return {String} popup window ID
         */
        _k.windowOpen = function (url, name, feature) {
          var popupWindow = _k.popupWindows[name];
          if (popupWindow && popupWindow.close && !popupWindow.closed) {
            popupWindow.close();
          }
          _k.popupWindows[name] = window.open(url, name, feature);

          return _k.popupWindows[name];
        };

        return _k;
      }();
    }, { "../vendor/userAgent.js": 17, "./util.js": 12 }], 8: [function (require, module, exports) {
      /*******************
       * Emoticon
       *******************/
      module.exports = function () {
        var Emoticon = {};

        var _ = require('./util.js');
        var _api = require('./api.js');

        var cleanups = [];

        Emoticon.getMyItems = _api.createAPIAlias({
          url: '/v1/emoticon/my_items'
        });

        Emoticon.getItemResources = _api.createAPIAlias({
          url: '/v1/emoticon/item_resources',
          data: {}
        });

        Emoticon.cleanup = function () {
          _.each(cleanups, function (func, i) {
            func();
          });
          cleanups.length = 0;
        };

        return Emoticon;
      }();
    }, { "./api.js": 3, "./util.js": 12 }], 9: [function (require, module, exports) {
      module.exports = function (root) {
        root.Kakao = root.Kakao || {};
        var Kakao = root.Kakao;

        var _ = require('./util.js');
        var _k = require('./common.js');

        Kakao.VERSION = _k.VERSION;

        Kakao.Story = require('./story.js');
        /**
         * Kakao JavaScript SDK를 초기화합니다. SDK를 사용하기 전에 호출해 주어야 합니다.
         * @param {string} appKey JavaScript 앱키
         */
        Kakao.init = function (appKey) {
          if (_k.RUNTIME.appKey) {
            throw new _k.KakaoError('Kakao.init: Already initialized.');
          }

          if (!_.isString(appKey) || appKey === _k.DUMMY_KEY) {
            throw new _k.KakaoError('Kakao.init: App key must be provided');
          }

          _k.RUNTIME.appKey = appKey;

          Kakao.Auth = require('./auth.js');
          Kakao.API = require('./api.js');
          Kakao.Link = require('./link.js');
          Kakao.Emoticon = require('./emoticon.js');
        };

        /**
         * Kakao JavaScript SDK에서 사용한 리소스를 해제합니다.
         */
        Kakao.cleanup = function () {
          Kakao.Auth && Kakao.Auth.cleanup();
          Kakao.API && Kakao.API.cleanup();
          Kakao.Link && Kakao.Link.cleanup();
          Kakao.Story && Kakao.Story.cleanup();
          Kakao.Emoticon && Kakao.Emoticon.cleanup();

          _.nullify(_k.RUNTIME);
        };

        if (window.kakaoAsyncInit) {
          window.kakaoAsyncInit();
        }

        return Kakao;
      }(window);
    }, { "./api.js": 3, "./auth.js": 4, "./common.js": 7, "./emoticon.js": 8, "./link.js": 10, "./story.js": 11, "./util.js": 12 }], 10: [function (require, module, exports) {
      /*******************
       * Link
       *******************/
      module.exports = function () {
        var KAKAOTALK_ANDROID_PACAKGE_NAME = "com.kakao.talk";
        var KAKAOTALK_IOS_APP_ID = "362057947";

        var Link = {};

        var _ = require('./util.js');
        var _k = require('./common.js');
        var web2app = require('../vendor/web2app.js');
        var webViewChecker = require('./webviewchecker.js')();

        var KakaoTalkLink = function KakaoTalkLink() {
          this.appkey = _k.RUNTIME.appKey;
          this.appver = '1.0';
          this.apiver = '3.0';
          this.linkver = '3.5';
          this.extras = {
            "KA": _k.KAKAO_AGENT
          };
          this.objs = [];
        };

        var cleanups = [];
        /**
         * 지정한 Element를 클릭할 때 카카오톡 링크가 전송되도록 합니다.
         * @param {TalkLinkSettings} settings
         */
        Link.createTalkLink = Link.createTalkLinkButton = function (settings) {
          settings = _k.processRules(settings, rules.createTalkLink, 'Link.createTalkLink');

          var container = _.getElement(settings.container);
          if (!container) {
            throw new _k.KakaoError('container is required for KakaoTalk Link: pass in element or id');
          }

          var handler = function handler() {
            var linkUrl = buildLinkUrl(settings, 'Link.createTalkLink');
            sendLink(linkUrl, settings.fail, settings.installTalk);
          };

          _.addEvent(container, 'click', handler);

          cleanups.push(function () {
            _.removeEvent(container, 'click', handler);
          });
        };

        Link.sendTalkLink = function (settings) {
          settings = _k.processRules(settings, rules.talkLink, 'Link.sendTalkLink');

          var linkUrl = buildLinkUrl(settings, 'Link.sendTalkLink');
          sendLink(linkUrl, settings.fail, settings.installTalk);
        };

        var imageObjectCommonSettings = {
          required: { src: _.isString, width: imageSizeValidator, height: imageSizeValidator },
          before: function before(image) {
            image.width = parseInt(image.width, 10);
            image.height = parseInt(image.height, 10);
          }
        };

        var webObjOptional = {
          url: _.isString,
          auth: _.isBoolean,
          type: _.isOneOf(['web', 'inweb'])
        };

        var webObjDefaults = {
          type: 'web'
        };

        var appObjOptional = {
          webUrl: _.isString,
          execParams: _.isObject,
          marketParams: _.isObject
        };

        var rules = {
          talkLink: {
            optional: {
              label: _.passesOneOf([_.isString, _.isObject]),
              image: _.isObject,
              webImage: _.isObject,
              webButton: _.isObject,
              webLink: _.isObject,
              appButton: _.isObject,
              appLink: _.isObject,
              fail: _.isFunction,
              installTalk: _.isBoolean,
              forwardable: _.isBoolean,
              extras: _.isObject
            },
            before: function before(settings) {
              if (_.isString(settings.label)) {
                settings.label = { text: settings.label };
              }
            },
            defaults: {
              installTalk: true,
              forwardable: false,
              fail: _.emptyFunc
            }
          },
          talkLinkObjects: {
            label: {
              required: { text: _.isString },
              builder: getLabelObj
            },
            image: _.extend({
              builder: _.partial(getImageObj, null)
            }, imageObjectCommonSettings),
            webImage: _.extend({
              optional: webObjOptional,
              defaults: webObjDefaults,
              builder: _.partial(getImageObj, "web")
            }, imageObjectCommonSettings),
            webButton: {
              optional: _.extend({
                text: _.isString
              }, webObjOptional),
              defaults: webObjDefaults,
              builder: _.partial(getButtonObj, "web")
            },
            appButton: {
              optional: _.extend({
                text: _.isString
              }, appObjOptional),
              builder: _.partial(getButtonObj, "app")
            },
            webLink: {
              required: { text: _.isString },
              optional: webObjOptional,
              defaults: webObjDefaults,
              builder: _.partial(getLinkObj, "web")
            },
            appLink: {
              required: { text: _.isString },
              optional: appObjOptional,
              builder: _.partial(getLinkObj, "app")
            }
          },
          appParams: {
            optional: { iphone: _.isObject, ipad: _.isObject, android: _.isObject }
          }
        };

        rules.createTalkLink = _.extend({
          required: { container: _.passesOneOf([_.isElement, _.isString]) }
        }, rules.talkLink);

        function imageSizeValidator(sizeValue) {
          var parsed = parseInt(sizeValue, 10);

          if (isNaN(parsed) || parsed < 80) {
            throw new _k.KakaoError('Illegal argument for image: width/height should be a number larger than 80');
          }

          return true;
        }

        var linkScheme = function () {
          var phase = 'release';

          if (_k.UA.os.ios && (phase === "alpha" || phase === "sandbox")) {
            return "alphalink";
          } else {
            return "kakaolink";
          }
        }();

        function buildLinkUrl(settings, callerMsg) {
          var link = new KakaoTalkLink();
          link.forwardable = settings.forwardable;
          link.extras = _.extend(link.extras, settings.extras);

          _.each(settings, function (setting, key) {
            var linkObjectRule = rules.talkLinkObjects[key];

            if (linkObjectRule) {
              setting = _k.processRules(setting, linkObjectRule, "parameter '" + key + "' in " + (callerMsg || "Link"));
              var linkObject = linkObjectRule.builder(setting);
              link.objs.push(linkObject);
            }
          });

          return linkScheme + '://send?' + _.buildQueryString(link);
        }

        function getLabelObj(setting) {
          return {
            "objtype": "label",
            "text": setting.text
          };
        }

        function getImageObj(actionType, setting) {
          return {
            "objtype": "image",
            "src": setting.src,
            "width": setting.width,
            "height": setting.height,
            "action": getAction(actionType, setting)
          };
        }

        function getButtonObj(actionType, setting) {
          return {
            "objtype": "button",
            "text": setting.text,
            "action": getAction(actionType, setting)
          };
        }

        function getLinkObj(actionType, setting) {
          return {
            "objtype": "link",
            "text": setting.text,
            "action": getAction(actionType, setting)
          };
        }

        function getAction(actionType, setting) {
          switch (actionType) {
            case "web":
              return getWebAction();
            case "app":
              return getAppAction();
            default:
              return undefined; 
          }

          function getWebAction() {
            return {
              "type": setting.type, 
              "url": setting.url ? formatUrl(setting.url) : undefined,
              "auth": setting.auth
            };

            function formatUrl(maybeUrl) {
              if (maybeUrl.indexOf("://") > -1) {
                return maybeUrl;
              } else {
                return "http://" + maybeUrl;
              }
            }
          }

          function getAppAction() {
            return {
              "type": "app",
              "url": setting.webUrl,
              "actioninfo": getAppActionInfos(setting.execParams, setting.marketParams)
            };

            /**
             * execParams/marketParams: {
             *   iphone: { name: 'vincent', age: 5},
             *   android: { location: 'Seoul' }
             * }
             */
            function getAppActionInfos(execParams, marketParams) {
              var baseInfos = {
                android: {
                  "os": "android"
                },
                iphone: {
                  "os": "ios",
                  "devicetype": "phone"
                },
                ipad: {
                  "os": "ios",
                  "devicetype": "pad"
                }
              };

              if (execParams) {
                execParams = _k.processRules(execParams, rules.appParams, 'execParams in Kakao.Link');
              }

              if (marketParams) {
                marketParams = _k.processRules(marketParams, rules.appParams, 'marketParams in Kakao.Link');
              }

              var actionInfos = [];
              _.each(baseInfos, function (baseInfo, platform) {
                var info = _.extend({}, baseInfo);

                if (execParams && execParams[platform]) {
                  info.execparam = _.buildQueryString(execParams[platform], false);
                }

                if (marketParams && marketParams[platform]) {
                  info.marketparam = _.buildQueryString(marketParams[platform], false);
                }

                if (info.execparam || info.marketparam) {
                  actionInfos.push(info);
                }
              });

              return actionInfos;
            }
          }
        }

        function sendLink(url, unsupportedCallback, shouldInstallTalk) {
          var web2appOptions = {
            urlScheme: url,
            intentURI: 'intent:' + url + '#Intent;package=com.kakao.talk;end;',
            appName: 'KakaoTalk',
            storeURL: _k.getInstallUrl(KAKAOTALK_ANDROID_PACAKGE_NAME, KAKAOTALK_IOS_APP_ID),
            onUnsupportedEnvironment: function onUnsupportedEnvironment() {
              unsupportedCallback(url);
            }
          };

          if (!shouldInstallTalk || webViewChecker.isIOSKakaoTalkWebView() || webViewChecker.isAndroidWebView()) {
            web2appOptions.onAppMissing = _.emptyFunc;
          }

          if (webViewChecker.isIOSKakaoTalkWebView()) {
            web2appOptions.universalLink = undefined;
          }
          web2app(web2appOptions);
        }

        Link.cleanup = function () {
          _.each(cleanups, function (func, i) {
            func();
          });
          cleanups.length = 0;
        };

        return Link;
      }();
    }, { "../vendor/web2app.js": 18, "./common.js": 7, "./util.js": 12, "./webviewchecker.js": 13 }], 11: [function (require, module, exports) {
      module.exports = function () {
        var Story = {};

        var _ = require('./util.js');
        var _k = require('./common.js');
        var web2app = require('../vendor/web2app.js');

        var POPUP_NAME = 'kakaostory_social_plugin';
        var POPUP_FEATURES = 'width=670, height=471';

        var cleanups = [];

        /**
         * @param {StoryShareSettings} settings
         */
        Story.createShareButton = function (settings) {
          settings = _k.processRules(settings, rules.createShareButton, 'Story.createShareButton');

          var container = _.getElement(settings.container);
          if (!container) {
            throw new _k.KakaoError('container is required for KakaoStory share button: pass in element or id');
          }

          var anchor = document.createElement('a');
          var img = document.createElement('img');

          anchor.appendChild(img);

          var shareUrl = getShareURL(settings.url, settings.text);

          anchor.setAttribute('href', shareUrl);
          anchor.setAttribute('target', '_blank');

          var handler = function handler(e) {
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }

            _k.windowOpen(shareUrl, POPUP_NAME, POPUP_FEATURES);
          };

          _.addEvent(anchor, 'click', handler);

          var cleanup = function cleanup() {
            _.removeEvent(anchor, 'click', handler);
            container.removeChild(anchor);
          };

          cleanups.push(cleanup);

          img.onload = function (e) {
            var width;
            var height;
            container.appendChild(anchor);

            if (_k.UA.browser.msie && parseInt(_k.UA.browser.version.major) <= 10) {
              width = img.width;
              height = img.height;
            } else {
              width = e.target.width;
              height = e.target.height;
            }

            img.width = width;
            img.height = height;
          };

          img.src = _k.URL.storyIcon;
        };

        /**
         * 웹으로 스토리 공유하기
         * @param {StoryShareSettings} settings
         */
        Story.share = function (settings) {
          settings = _k.processRules(settings, rules.share, 'Story.share');

          var shareUrl = getShareURL(settings.url, settings.text);
          _k.windowOpen(shareUrl, POPUP_NAME, POPUP_FEATURES);
        };

        /**
         * 앱으로 스토리 공유하기
         * @param {StoryOpenSettings} settings
         */
        Story.open = function (settings) {
          settings = _k.processRules(settings, rules.open, 'Story.open');

          var postContent = (settings.text ? settings.text + "\n" : "") + (settings.url || "");
          var domain = location.hostname || "";

          var urlInfo;
          var appName;
          if (settings.urlInfo) {
            urlInfo = _k.processRules(settings.urlInfo, rules.openUrlInfo, 'Story.open');
            appName = urlInfo.name || "";
          }
          var shareUrl = getStoryOpenURL(postContent, domain, appName || domain, JSON.stringify(urlInfo));

          var web2appOptions = {
            urlScheme: shareUrl,
            intentURI: 'intent:' + shareUrl + '#Intent;package=com.kakao.story;end;',
            appname: 'KakaoStory',
            storeURL: _k.getInstallUrl('com.kakao.story', '486244601'),
            onUnsupportedEnvironment: function onUnsupportedEnvironment() {
              settings.fail && settings.fail();
            }
          };

          web2app(web2appOptions);
        };

        var _followButtonFrameId = 0;

        Story.createFollowButton = function (settings) {
          settings = _k.processRules(settings, rules.createFollowButton, 'Story.createFollowButton');

          var container = _.getElement(settings.container);
          if (!container) {
            throw new _k.KakaoError('container is required for KakaoStory follow button: pass in element or id');
          }

          var frame = document.createElement('iframe');
          var frameId = _followButtonFrameId++;

          frame.src = getFollowURL(settings, frameId);
          frame.setAttribute('frameborder', '0');
          frame.setAttribute('marginwidth', '0');
          frame.setAttribute('marginheight', '0');
          frame.setAttribute('scrolling', 'no');

          var width = settings.showFollowerCount && settings.type === 'horizontal' ? 85 : 59;
          var height = settings.showFollowerCount && settings.type === 'vertical' ? 46 : 20;
          frame.style.width = width + 'px';
          frame.style.height = height + 'px';

          var onMessage = function onMessage(e) {
            if (e.data && /\.kakao\.com$/.test(e.origin)) {
              var data = e.data.split(',');
              var originFrameId = parseInt(data[0], 10);
              var afterWidth = parseInt(data[1], 10);
              var afterHeight = parseInt(data[2], 10);

              if (originFrameId !== frameId) {
                return;
              }

              if (width !== afterWidth) {
                width = afterWidth;
                frame.style.width = afterWidth + 'px';
              }

              if (height !== afterHeight) {
                height = afterHeight;
                frame.style.height = afterHeight + 'px';
              }
            }
          };

          container.appendChild(frame);
          _.addEvent(window, 'message', onMessage);

          var cleanup = function cleanup() {
            _.removeEvent(window, 'message', onMessage);
            container.removeChild(frame);
          };

          cleanups.push(cleanup);
        };

        var rules = {
          createShareButton: {
            required: {
              container: _.passesOneOf([_.isElement, _.isString])
            },
            optional: {
              url: _.isString,
              text: _.isString
            },
            defaults: function defaults(settings) {
              var container = _.getElement(settings.container);

              return container ? {
                url: container.getAttribute('data-url') || location.href
              } : null;
            }
          },
          share: {
            optional: {
              url: _.isString,
              text: _.isString
            },
            defaults: {
              url: location.href
            }
          },
          open: {
            optional: {
              url: _.isString,
              text: _.isString,
              urlInfo: _.isObject
            },
            defaults: {
              url: location.href
            }
          },
          openUrlInfo: {
            required: {
              title: _.isString
            },
            optional: {
              desc: _.isString,
              name: _.isString,
              images: _.isArray, 
              imageurl: _.isArray, 
              type: _.isString
            },
            defaults: {
              type: 'website'
            },
            before: function before(params) {
              if (params.images) {
                params.imageurl = params.images;
                delete params.images;
              }
            }
          },
          createFollowButton: {
            required: {
              container: _.passesOneOf([_.isElement, _.isString]),
              id: _.isString
            },
            optional: {
              type: _.isOneOf(['horizontal', 'vertical']),
              showFollowerCount: _.isBoolean
            },
            defaults: function defaults(settings) {
              var container = _.getElement(settings.container);

              if (container) {
                var defaultValues = {
                  type: container.getAttribute('data-type') || 'horizontal',
                  showFollowerCount: container.getAttribute('data-show-follower-count') !== 'false' 
                };

                var dataId = container.getAttribute('data-id');
                if (dataId) {
                  defaultValues.id = dataId;
                }

                return defaultValues;
              } else {
                return null;
              }
            },
            after: function after(settings) {
              if (settings.id.substr(0, 1) !== '@') {
                settings.id = '@' + settings.id;
              }
            }
          }
        };

        function getShareURL(url, text) {
          var params = {
            url: url
          };

          if (text) {
            params.text = text;
          }

          _.extend(params, getStatProperties());

          return _k.URL.storyShare + '?' + _.buildQueryString(params);
        }

        function getStoryOpenURL(postContent, serviceDomain, appName, urlInfo) {
          var params = {
            post: postContent,
            appver: _k.VERSION,
            appid: serviceDomain,
            apiver: "1.0",
            appname: appName
          };

          if (urlInfo) {
            params.urlinfo = urlInfo;
          }

          _.extend(params, getStatProperties());

          return "storylink://posting?" + _.buildQueryString(params);
        }

        function getFollowURL(settings, frameId) {
          var params = {
            id: settings.id,
            type: settings.type,
            hideFollower: !settings.showFollowerCount,
            frameId: frameId
          };

          _.extend(params, getStatProperties());

          return _k.URL.channelFollow + '?' + _.buildQueryString(params);
        }

        function getStatProperties() {
          var props = {
            kakao_agent: _k.KAKAO_AGENT
          };

          if (_k.RUNTIME.appKey) {
            props.app_key = _k.RUNTIME.appKey;
          }

          return props;
        }

        Story.cleanup = function () {
          _.each(cleanups, function (func, i) {
            func();
          });
          cleanups.length = 0;
        };

        return Story;
      }();
    }, { "../vendor/web2app.js": 18, "./common.js": 7, "./util.js": 12 }], 12: [function (require, module, exports) {

      module.exports = function () {
        var _ = {};

        var breaker = {};
        var ArrayProto = Array.prototype;
        var ObjProto = Object.prototype;
        var slice = ArrayProto.slice;
        var concat = ArrayProto.concat;
        var toString = ObjProto.toString;
        var hasOwnProperty = ObjProto.hasOwnProperty;
        var nativeForEach = ArrayProto.forEach;
        var nativeMap = ArrayProto.map;
        var nativeFilter = ArrayProto.filter;
        var nativeEvery = ArrayProto.every;
        var nativeSome = ArrayProto.some;
        var nativeIndexOf = ArrayProto.indexOf;
        var nativeIsArray = Array.isArray;
        var nativeKeys = Object.keys;

        var each = _.each = function (obj, iterator, context) {
          if (obj == null) return obj;
          if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
          } else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
              if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
          } else {
            var keys = _.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
              if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
            }
          }
          return obj;
        };

        _.map = function (obj, iterator, context) {
          var results = [];
          if (obj == null) return results;
          if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
          each(obj, function (value, index, list) {
            results.push(iterator.call(context, value, index, list));
          });
          return results;
        };

        _.filter = function (obj, predicate, context) {
          var results = [];
          if (obj == null) return results;
          if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
          each(obj, function (value, index, list) {
            if (predicate.call(context, value, index, list)) results.push(value);
          });
          return results;
        };

        _.every = function (obj, predicate, context) {
          predicate || (predicate = _.identity);
          var result = true;
          if (obj == null) return result;
          if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
          each(obj, function (value, index, list) {
            if (!(result = result && predicate.call(context, value, index, list))) return breaker;
          });
          return !!result;
        };

        var any = _.any = function (obj, predicate, context) {
          predicate || (predicate = _.identity);
          var result = false;
          if (obj == null) return result;
          if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
          each(obj, function (value, index, list) {
            if (result || (result = predicate.call(context, value, index, list))) return breaker;
          });
          return !!result;
        };

        _.contains = function (obj, target) {
          if (obj == null) return false;
          if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
          return any(obj, function (value) {
            return value === target;
          });
        };

        _.difference = function (array) {
          var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
          return _.filter(array, function (value) {
            return !_.contains(rest, value);
          });
        };

        _.partial = function (func) {
          var boundArgs = slice.call(arguments, 1);
          return function () {
            var position = 0;
            var args = boundArgs.slice();
            for (var i = 0, length = args.length; i < length; i++) {
              if (args[i] === _) args[i] = arguments[position++];
            }
            while (position < arguments.length) {
              args.push(arguments[position++]);
            }return func.apply(this, args);
          };
        };

        _.after = function (times, func) {
          return function () {
            if (--times < 1) {
              return func.apply(this, arguments);
            }
          };
        };

        _.keys = function (obj) {
          if (!_.isObject(obj)) return [];
          if (nativeKeys) return nativeKeys(obj);
          var keys = [];
          for (var key in obj) {
            if (_.has(obj, key)) keys.push(key);
          }return keys;
        };

        _.extend = function (obj) {
          each(slice.call(arguments, 1), function (source) {
            if (source) {
              for (var prop in source) {
                obj[prop] = source[prop];
              }
            }
          });
          return obj;
        };

        _.defaults = function (obj) {
          each(slice.call(arguments, 1), function (source) {
            if (source) {
              for (var prop in source) {
                if (obj[prop] === void 0) obj[prop] = source[prop];
              }
            }
          });
          return obj;
        };

        _.isElement = function (obj) {
          return !!(obj && obj.nodeType === 1);
        };

        _.isArray = nativeIsArray || function (obj) {
          return toString.call(obj) == '[object Array]';
        };

        _.isObject = function (obj) {
          return obj === Object(obj);
        };

        each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Blob', 'File', 'FileList'], function (name) {
          _['is' + name] = function (obj) {
            return toString.call(obj) == '[object ' + name + ']';
          };
        });

        _.isBoolean = function (obj) {
          return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
        };

        _.has = function (obj, key) {
          return hasOwnProperty.call(obj, key);
        };

        _.identity = function (value) {
          return value;
        };


        _.emptyFunc = function () {};

        _.getElement = function (selector) {
          if (_.isElement(selector)) {
            return selector;
          } else if (_.isString(selector)) {
            return document.querySelector(selector);
          } else {
            return null;
          }
        };

        _.addEvent = function (element, event, func) {
          if (element.addEventListener) {
            element.addEventListener(event, func, false);
          } else if (element.attachEvent) {
            element.attachEvent("on" + event, func);
          }
        };

        _.removeEvent = function (element, event, func) {
          if (element.removeEventListener) {
            element.removeEventListener(event, func, false);
          } else if (element.detachEvent) {
            element.detachEvent('on' + event, func);
          }
        };

        _.buildQueryString = function (params, encode) {
          var ret = [];
          for (var key in params) {
            if (!params.hasOwnProperty(key)) continue;

            var value = params[key];
            if (_.isObject(value)) {
              value = JSON.stringify(value);
            }

            var queryKey = encode === false ? key : encodeURIComponent(key);
            var queryValue = encode === false ? value : encodeURIComponent(value);

            ret.push(queryKey + '=' + queryValue);
          }

          return ret.join('&');
        };

        _.getRandomString = function () {
          return Math.random().toString(36).slice(2);
        };

        _.nullify = function (obj) {
          _.each(obj, function (value, key) {
            obj[key] = null;
          });
        };

        _.isOneOf = function (elements) {
          return _.partial(_.contains, elements);
        };

        _.passesOneOf = function (validators) {
          if (!_.isArray(validators)) throw new Error('validators should be an Array');

          return function (obj) {
            return _.any(validators, function (validator) {
              return validator(obj);
            });
          };
        };

        _.isURL = function (obj) {
          var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

          return urlPattern.test(obj);
        };

        _.arrayBufferToString = function (buffer) {
          var stringResult = "";
          var arrayBufferView = new Uint8Array(buffer);
          var length = arrayBufferView.length;
          var CHUNK_SIZE = Math.pow(2, 16);

          var offset, readLength, sub;
          for (offset = 0; offset < length; offset += CHUNK_SIZE) {
            readLength = Math.min(CHUNK_SIZE, length - offset);
            sub = arrayBufferView.subarray(offset, offset + readLength);
            stringResult += String.fromCharCode.apply(null, sub);
          }
          return stringResult;
        };
        _.localStorage = function () {
          var shim = {
            _data: {},
            setItem: function setItem(id, val) {
              return this._data[id] = String(val);
            },
            getItem: function getItem(id) {
              return this._data.hasOwnProperty(id) ? this._data[id] : null;
            },
            removeItem: function removeItem(id) {
              return delete this._data[id];
            },
            clear: function clear() {
              return this._data = {};
            }
          };

          try {
            if ("localStorage" in window) {
              window.localStorage.setItem("store", "");
              window.localStorage.removeItem("store");
              return window.localStorage;
            } else {
              return shim;
            }
          } catch (e) {
            return shim;
          }
        }();

        return _;
      }();
    }, {}], 13: [function (require, module, exports) {
      module.exports = function () {
        var UA = require('../vendor/userAgent.js')();

        return {
          /** @see https://developer.chrome.com/multidevice/user-agent */
          isAndroidWebView: function isAndroidWebView() {
            return UA.os.android && (oldAndroidWebView() || newerAndroidWebView());
          },
          isIOSKakaoTalkWebView: function isIOSKakaoTalkWebView() {
            return UA.os.ios && /KAKAOTALK/i.test(UA.ua);
          }
        };

        function newerAndroidWebView() {
          return (/Version\/\d+\.\d+/i.test(UA.ua) && (/Chrome\/\d+\.\d+\.\d+\.\d+ Mobile/i.test(UA.ua) || /; wv\)/i.test(UA.ua))
          );
        }

        function oldAndroidWebView() {
          return UA.os.version.major == 4 && UA.os.version.minor < 4 && /Version\/\d+.\d+|/i.test(UA.ua);
        }
      };
    }, { "../vendor/userAgent.js": 17 }], 14: [function (require, module, exports) {
      module.exports = function () {

        var CryptoJS = CryptoJS || function (u, p) {
          var d = {},
              l = d.lib = {},
              s = function s() {},
              t = l.Base = { extend: function extend(a) {
              s.prototype = this;var c = new s();a && c.mixIn(a);c.hasOwnProperty("init") || (c.init = function () {
                c.$super.init.apply(this, arguments);
              });c.init.prototype = c;c.$super = this;return c;
            }, create: function create() {
              var a = this.extend();a.init.apply(a, arguments);return a;
            }, init: function init() {}, mixIn: function mixIn(a) {
              for (var c in a) {
                a.hasOwnProperty(c) && (this[c] = a[c]);
              }a.hasOwnProperty("toString") && (this.toString = a.toString);
            }, clone: function clone() {
              return this.init.prototype.extend(this);
            } },
              r = l.WordArray = t.extend({ init: function init(a, c) {
              a = this.words = a || [];this.sigBytes = c != p ? c : 4 * a.length;
            }, toString: function toString(a) {
              return (a || v).stringify(this);
            }, concat: function concat(a) {
              var c = this.words,
                  e = a.words,
                  j = this.sigBytes;a = a.sigBytes;this.clamp();if (j % 4) for (var k = 0; k < a; k++) {
                c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4);
              } else if (65535 < e.length) for (k = 0; k < a; k += 4) {
                c[j + k >>> 2] = e[k >>> 2];
              } else c.push.apply(c, e);this.sigBytes += a;return this;
            }, clamp: function clamp() {
              var a = this.words,
                  c = this.sigBytes;a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);a.length = u.ceil(c / 4);
            }, clone: function clone() {
              var a = t.clone.call(this);a.words = this.words.slice(0);return a;
            }, random: function random(a) {
              for (var c = [], e = 0; e < a; e += 4) {
                c.push(4294967296 * u.random() | 0);
              }return new r.init(c, a);
            } }),
              w = d.enc = {},
              v = w.Hex = { stringify: function stringify(a) {
              var c = a.words;a = a.sigBytes;for (var e = [], j = 0; j < a; j++) {
                var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255;e.push((k >>> 4).toString(16));e.push((k & 15).toString(16));
              }return e.join("");
            }, parse: function parse(a) {
              for (var c = a.length, e = [], j = 0; j < c; j += 2) {
                e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - 4 * (j % 8);
              }return new r.init(e, c / 2);
            } },
              b = w.Latin1 = { stringify: function stringify(a) {
              var c = a.words;a = a.sigBytes;for (var e = [], j = 0; j < a; j++) {
                e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
              }return e.join("");
            }, parse: function parse(a) {
              for (var c = a.length, e = [], j = 0; j < c; j++) {
                e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
              }return new r.init(e, c);
            } },
              x = w.Utf8 = { stringify: function stringify(a) {
              try {
                return decodeURIComponent(escape(b.stringify(a)));
              } catch (c) {
                throw Error("Malformed UTF-8 data");
              }
            }, parse: function parse(a) {
              return b.parse(unescape(encodeURIComponent(a)));
            } },
              q = l.BufferedBlockAlgorithm = t.extend({ reset: function reset() {
              this._data = new r.init();this._nDataBytes = 0;
            }, _append: function _append(a) {
              "string" == typeof a && (a = x.parse(a));this._data.concat(a);this._nDataBytes += a.sigBytes;
            }, _process: function _process(a) {
              var c = this._data,
                  e = c.words,
                  j = c.sigBytes,
                  k = this.blockSize,
                  b = j / (4 * k),
                  b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0);a = b * k;j = u.min(4 * a, j);if (a) {
                for (var q = 0; q < a; q += k) {
                  this._doProcessBlock(e, q);
                }q = e.splice(0, a);c.sigBytes -= j;
              }return new r.init(q, j);
            }, clone: function clone() {
              var a = t.clone.call(this);
              a._data = this._data.clone();return a;
            }, _minBufferSize: 0 });l.Hasher = q.extend({ cfg: t.extend(), init: function init(a) {
              this.cfg = this.cfg.extend(a);this.reset();
            }, reset: function reset() {
              q.reset.call(this);this._doReset();
            }, update: function update(a) {
              this._append(a);this._process();return this;
            }, finalize: function finalize(a) {
              a && this._append(a);return this._doFinalize();
            }, blockSize: 16, _createHelper: function _createHelper(a) {
              return function (b, e) {
                return new a.init(e).finalize(b);
              };
            }, _createHmacHelper: function _createHmacHelper(a) {
              return function (b, e) {
                return new n.HMAC.init(a, e).finalize(b);
              };
            } });var n = d.algo = {};return d;
        }(Math);
        (function () {
          var u = CryptoJS,
              p = u.lib.WordArray;u.enc.Base64 = { stringify: function stringify(d) {
              var l = d.words,
                  p = d.sigBytes,
                  t = this._map;d.clamp();d = [];for (var r = 0; r < p; r += 3) {
                for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++) {
                  d.push(t.charAt(w >>> 6 * (3 - v) & 63));
                }
              }if (l = t.charAt(64)) for (; d.length % 4;) {
                d.push(l);
              }return d.join("");
            }, parse: function parse(d) {
              var l = d.length,
                  s = this._map,
                  t = s.charAt(64);t && (t = d.indexOf(t), -1 != t && (l = t));for (var t = [], r = 0, w = 0; w < l; w++) {
                if (w % 4) {
                  var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4),
                      b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4);t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4);r++;
                }
              }return p.create(t, r);
            }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
        })();
        (function (u) {
          function p(b, n, a, c, e, j, k) {
            b = b + (n & a | ~n & c) + e + k;return (b << j | b >>> 32 - j) + n;
          }function d(b, n, a, c, e, j, k) {
            b = b + (n & c | a & ~c) + e + k;return (b << j | b >>> 32 - j) + n;
          }function l(b, n, a, c, e, j, k) {
            b = b + (n ^ a ^ c) + e + k;return (b << j | b >>> 32 - j) + n;
          }function s(b, n, a, c, e, j, k) {
            b = b + (a ^ (n | ~c)) + e + k;return (b << j | b >>> 32 - j) + n;
          }for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) {
            b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
          }r = r.MD5 = v.extend({ _doReset: function _doReset() {
              this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878]);
            },
            _doProcessBlock: function _doProcessBlock(q, n) {
              for (var a = 0; 16 > a; a++) {
                var c = n + a,
                    e = q[c];q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
              }var a = this._hash.words,
                  c = q[n + 0],
                  e = q[n + 1],
                  j = q[n + 2],
                  k = q[n + 3],
                  z = q[n + 4],
                  r = q[n + 5],
                  t = q[n + 6],
                  w = q[n + 7],
                  v = q[n + 8],
                  A = q[n + 9],
                  B = q[n + 10],
                  C = q[n + 11],
                  u = q[n + 12],
                  D = q[n + 13],
                  E = q[n + 14],
                  x = q[n + 15],
                  f = a[0],
                  m = a[1],
                  g = a[2],
                  h = a[3],
                  f = p(f, m, g, h, c, 7, b[0]),
                  h = p(h, f, m, g, e, 12, b[1]),
                  g = p(g, h, f, m, j, 17, b[2]),
                  m = p(m, g, h, f, k, 22, b[3]),
                  f = p(f, m, g, h, z, 7, b[4]),
                  h = p(h, f, m, g, r, 12, b[5]),
                  g = p(g, h, f, m, t, 17, b[6]),
                  m = p(m, g, h, f, w, 22, b[7]),
                  f = p(f, m, g, h, v, 7, b[8]),
                  h = p(h, f, m, g, A, 12, b[9]),
                  g = p(g, h, f, m, B, 17, b[10]),
                  m = p(m, g, h, f, C, 22, b[11]),
                  f = p(f, m, g, h, u, 7, b[12]),
                  h = p(h, f, m, g, D, 12, b[13]),
                  g = p(g, h, f, m, E, 17, b[14]),
                  m = p(m, g, h, f, x, 22, b[15]),
                  f = d(f, m, g, h, e, 5, b[16]),
                  h = d(h, f, m, g, t, 9, b[17]),
                  g = d(g, h, f, m, C, 14, b[18]),
                  m = d(m, g, h, f, c, 20, b[19]),
                  f = d(f, m, g, h, r, 5, b[20]),
                  h = d(h, f, m, g, B, 9, b[21]),
                  g = d(g, h, f, m, x, 14, b[22]),
                  m = d(m, g, h, f, z, 20, b[23]),
                  f = d(f, m, g, h, A, 5, b[24]),
                  h = d(h, f, m, g, E, 9, b[25]),
                  g = d(g, h, f, m, k, 14, b[26]),
                  m = d(m, g, h, f, v, 20, b[27]),
                  f = d(f, m, g, h, D, 5, b[28]),
                  h = d(h, f, m, g, j, 9, b[29]),
                  g = d(g, h, f, m, w, 14, b[30]),
                  m = d(m, g, h, f, u, 20, b[31]),
                  f = l(f, m, g, h, r, 4, b[32]),
                  h = l(h, f, m, g, v, 11, b[33]),
                  g = l(g, h, f, m, C, 16, b[34]),
                  m = l(m, g, h, f, E, 23, b[35]),
                  f = l(f, m, g, h, e, 4, b[36]),
                  h = l(h, f, m, g, z, 11, b[37]),
                  g = l(g, h, f, m, w, 16, b[38]),
                  m = l(m, g, h, f, B, 23, b[39]),
                  f = l(f, m, g, h, D, 4, b[40]),
                  h = l(h, f, m, g, c, 11, b[41]),
                  g = l(g, h, f, m, k, 16, b[42]),
                  m = l(m, g, h, f, t, 23, b[43]),
                  f = l(f, m, g, h, A, 4, b[44]),
                  h = l(h, f, m, g, u, 11, b[45]),
                  g = l(g, h, f, m, x, 16, b[46]),
                  m = l(m, g, h, f, j, 23, b[47]),
                  f = s(f, m, g, h, c, 6, b[48]),
                  h = s(h, f, m, g, w, 10, b[49]),
                  g = s(g, h, f, m, E, 15, b[50]),
                  m = s(m, g, h, f, r, 21, b[51]),
                  f = s(f, m, g, h, u, 6, b[52]),
                  h = s(h, f, m, g, k, 10, b[53]),
                  g = s(g, h, f, m, B, 15, b[54]),
                  m = s(m, g, h, f, e, 21, b[55]),
                  f = s(f, m, g, h, v, 6, b[56]),
                  h = s(h, f, m, g, x, 10, b[57]),
                  g = s(g, h, f, m, t, 15, b[58]),
                  m = s(m, g, h, f, D, 21, b[59]),
                  f = s(f, m, g, h, z, 6, b[60]),
                  h = s(h, f, m, g, C, 10, b[61]),
                  g = s(g, h, f, m, j, 15, b[62]),
                  m = s(m, g, h, f, A, 21, b[63]);a[0] = a[0] + f | 0;a[1] = a[1] + m | 0;a[2] = a[2] + g | 0;a[3] = a[3] + h | 0;
            }, _doFinalize: function _doFinalize() {
              var b = this._data,
                  n = b.words,
                  a = 8 * this._nDataBytes,
                  c = 8 * b.sigBytes;n[c >>> 5] |= 128 << 24 - c % 32;var e = u.floor(a / 4294967296);n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;b.sigBytes = 4 * (n.length + 1);this._process();b = this._hash;n = b.words;for (a = 0; 4 > a; a++) {
                c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
              }return b;
            }, clone: function clone() {
              var b = v.clone.call(this);b._hash = this._hash.clone();return b;
            } });t.MD5 = v._createHelper(r);t.HmacMD5 = v._createHmacHelper(r);
        })(Math);
        (function () {
          var u = CryptoJS,
              p = u.lib,
              d = p.Base,
              l = p.WordArray,
              p = u.algo,
              s = p.EvpKDF = d.extend({ cfg: d.extend({ keySize: 4, hasher: p.MD5, iterations: 1 }), init: function init(d) {
              this.cfg = this.cfg.extend(d);
            }, compute: function compute(d, r) {
              for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) {
                n && s.update(n);var n = s.update(d).finalize(r);s.reset();for (var a = 1; a < p; a++) {
                  n = s.finalize(n), s.reset();
                }b.concat(n);
              }b.sigBytes = 4 * q;return b;
            } });u.EvpKDF = function (d, l, p) {
            return s.create(p).compute(d, l);
          };
        })();
        CryptoJS.lib.Cipher || function (u) {
          var p = CryptoJS,
              d = p.lib,
              l = d.Base,
              s = d.WordArray,
              t = d.BufferedBlockAlgorithm,
              r = p.enc.Base64,
              w = p.algo.EvpKDF,
              v = d.Cipher = t.extend({ cfg: l.extend(), createEncryptor: function createEncryptor(e, a) {
              return this.create(this._ENC_XFORM_MODE, e, a);
            }, createDecryptor: function createDecryptor(e, a) {
              return this.create(this._DEC_XFORM_MODE, e, a);
            }, init: function init(e, a, b) {
              this.cfg = this.cfg.extend(b);this._xformMode = e;this._key = a;this.reset();
            }, reset: function reset() {
              t.reset.call(this);this._doReset();
            }, process: function process(e) {
              this._append(e);return this._process();
            },
            finalize: function finalize(e) {
              e && this._append(e);return this._doFinalize();
            }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function _createHelper(e) {
              return { encrypt: function encrypt(b, k, d) {
                  return ("string" == typeof k ? c : a).encrypt(e, b, k, d);
                }, decrypt: function decrypt(b, k, d) {
                  return ("string" == typeof k ? c : a).decrypt(e, b, k, d);
                } };
            } });d.StreamCipher = v.extend({ _doFinalize: function _doFinalize() {
              return this._process(!0);
            }, blockSize: 1 });var b = p.mode = {},
              x = function x(e, a, b) {
            var c = this._iv;c ? this._iv = u : c = this._prevBlock;for (var d = 0; d < b; d++) {
              e[a + d] ^= c[d];
            }
          },
              q = (d.BlockCipherMode = l.extend({ createEncryptor: function createEncryptor(e, a) {
              return this.Encryptor.create(e, a);
            }, createDecryptor: function createDecryptor(e, a) {
              return this.Decryptor.create(e, a);
            }, init: function init(e, a) {
              this._cipher = e;this._iv = a;
            } })).extend();q.Encryptor = q.extend({ processBlock: function processBlock(e, a) {
              var b = this._cipher,
                  c = b.blockSize;x.call(this, e, a, c);b.encryptBlock(e, a);this._prevBlock = e.slice(a, a + c);
            } });q.Decryptor = q.extend({ processBlock: function processBlock(e, a) {
              var b = this._cipher,
                  c = b.blockSize,
                  d = e.slice(a, a + c);b.decryptBlock(e, a);x.call(this, e, a, c);this._prevBlock = d;
            } });b = b.CBC = q;q = (p.pad = {}).Pkcs7 = { pad: function pad(a, b) {
              for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) {
                l.push(d);
              }c = s.create(l, c);a.concat(c);
            }, unpad: function unpad(a) {
              a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255;
            } };d.BlockCipher = v.extend({ cfg: v.cfg.extend({ mode: b, padding: q }), reset: function reset() {
              v.reset.call(this);var a = this.cfg,
                  b = a.iv,
                  a = a.mode;if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;else c = a.createDecryptor, this._minBufferSize = 1;this._mode = c.call(a, this, b && b.words);
            }, _doProcessBlock: function _doProcessBlock(a, b) {
              this._mode.processBlock(a, b);
            }, _doFinalize: function _doFinalize() {
              var a = this.cfg.padding;if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);var b = this._process(!0);
              } else b = this._process(!0), a.unpad(b);return b;
            }, blockSize: 4 });var n = d.CipherParams = l.extend({ init: function init(a) {
              this.mixIn(a);
            }, toString: function toString(a) {
              return (a || this.formatter).stringify(this);
            } }),
              b = (p.format = {}).OpenSSL = { stringify: function stringify(a) {
              var b = a.ciphertext;a = a.salt;return (a ? s.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(r);
            }, parse: function parse(a) {
              a = r.parse(a);var b = a.words;if (1398893684 == b[0] && 1701076831 == b[1]) {
                var c = s.create(b.slice(2, 4));b.splice(0, 4);a.sigBytes -= 16;
              }return n.create({ ciphertext: a, salt: c });
            } },
              a = d.SerializableCipher = l.extend({ cfg: l.extend({ format: b }), encrypt: function encrypt(a, b, c, d) {
              d = this.cfg.extend(d);var l = a.createEncryptor(c, d);b = l.finalize(b);l = l.cfg;return n.create({ ciphertext: b, key: c, iv: l.iv, algorithm: a, mode: l.mode, padding: l.padding, blockSize: a.blockSize, formatter: d.format });
            },
            decrypt: function decrypt(a, b, c, d) {
              d = this.cfg.extend(d);b = this._parse(b, d.format);return a.createDecryptor(c, d).finalize(b.ciphertext);
            }, _parse: function _parse(a, b) {
              return "string" == typeof a ? b.parse(a, this) : a;
            } }),
              p = (p.kdf = {}).OpenSSL = { execute: function execute(a, b, c, d) {
              d || (d = s.random(8));a = w.create({ keySize: b + c }).compute(a, d);c = s.create(a.words.slice(b), 4 * c);a.sigBytes = 4 * b;return n.create({ key: a, iv: c, salt: d });
            } },
              c = d.PasswordBasedCipher = a.extend({ cfg: a.cfg.extend({ kdf: p }), encrypt: function encrypt(b, c, d, l) {
              l = this.cfg.extend(l);d = l.kdf.execute(d, b.keySize, b.ivSize);l.iv = d.iv;b = a.encrypt.call(this, b, c, d.key, l);b.mixIn(d);return b;
            }, decrypt: function decrypt(b, c, d, l) {
              l = this.cfg.extend(l);c = this._parse(c, l.format);d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);l.iv = d.iv;return a.decrypt.call(this, b, c, d.key, l);
            } });
        }();
        (function () {
          for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) {
            a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
          }for (var e = 0, j = 0, c = 0; 256 > c; c++) {
            var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4,
                k = k >>> 8 ^ k & 255 ^ 99;l[e] = k;s[k] = e;var z = a[e],
                F = a[z],
                G = a[F],
                y = 257 * a[k] ^ 16843008 * k;t[e] = y << 24 | y >>> 8;r[e] = y << 16 | y >>> 16;w[e] = y << 8 | y >>> 24;v[e] = y;y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;b[k] = y << 24 | y >>> 8;x[k] = y << 16 | y >>> 16;q[k] = y << 8 | y >>> 24;n[k] = y;e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1;
          }var H = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
              d = d.AES = p.extend({ _doReset: function _doReset() {
              for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++) {
                if (j < d) e[j] = c[j];else {
                  var k = e[j - 1];j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24);e[j] = e[j - d] ^ k;
                }
              }c = this._invKeySchedule = [];for (d = 0; d < a; d++) {
                j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>> 8 & 255]] ^ n[l[k & 255]];
              }
            }, encryptBlock: function encryptBlock(a, b) {
              this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l);
            }, decryptBlock: function decryptBlock(a, c) {
              var d = a[c + 1];a[c + 1] = a[c + 3];a[c + 3] = d;this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s);d = a[c + 1];a[c + 1] = a[c + 3];a[c + 3] = d;
            }, _doCryptBlock: function _doCryptBlock(a, b, c, d, e, j, l, f) {
              for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) {
                var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++],
                    s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++],
                    t = d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++],
                    n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++],
                    g = q,
                    h = s,
                    k = t;
              }q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++];s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++];t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++];n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++];a[b] = q;a[b + 1] = s;a[b + 2] = t;a[b + 3] = n;
            }, keySize: 8 });u.AES = p._createHelper(d);
        })();

        return CryptoJS;
      }();
    }, {}], 15: [function (require, module, exports) {
      module.exports = function () {
        /**
         * easyXDM 2.4.19
         * License: MIT
         */
        (function (N, d, p, K, k, H) {
          var b = this;var n = Math.floor(Math.random() * 10000);var q = Function.prototype;var Q = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;var R = /[\-\w]+\/\.\.\//;var F = /([^:])\/\//g;var I = "";var o = {};var M = N.easyXDM;var U = "easyXDM_";var E;var y = false;var i;var h;function C(X, Z) {
            var Y = _typeof(X[Z]);return Y == "function" || !!(Y == "object" && X[Z]) || Y == "unknown";
          }function u(X, Y) {
            return !!(_typeof(X[Y]) == "object" && X[Y]);
          }function r(X) {
            return Object.prototype.toString.call(X) === "[object Array]";
          }function c() {
            var Z = "Shockwave Flash",
                ad = "application/x-shockwave-flash";if (!t(navigator.plugins) && _typeof(navigator.plugins[Z]) == "object") {
              var ab = navigator.plugins[Z].description;if (ab && !t(navigator.mimeTypes) && navigator.mimeTypes[ad] && navigator.mimeTypes[ad].enabledPlugin) {
                i = ab.match(/\d+/g);
              }
            }if (!i) {
              var Y;try {
                Y = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");i = Array.prototype.slice.call(Y.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1);Y = null;
              } catch (ac) {}
            }if (!i) {
              return false;
            }var X = parseInt(i[0], 10),
                aa = parseInt(i[1], 10);h = X > 9 && aa > 0;return true;
          }var v, x;if (C(N, "addEventListener")) {
            v = function v(Z, X, Y) {
              Z.addEventListener(X, Y, false);
            };x = function x(Z, X, Y) {
              Z.removeEventListener(X, Y, false);
            };
          } else {
            if (C(N, "attachEvent")) {
              v = function v(X, Z, Y) {
                X.attachEvent("on" + Z, Y);
              };x = function x(X, Z, Y) {
                X.detachEvent("on" + Z, Y);
              };
            } else {
              throw new Error("Browser not supported");
            }
          }var W = false,
              J = [],
              L;if ("readyState" in d) {
            L = d.readyState;W = L == "complete" || ~navigator.userAgent.indexOf("AppleWebKit/") && (L == "loaded" || L == "interactive");
          } else {
            W = !!d.body;
          }function s() {
            if (W) {
              return;
            }W = true;for (var X = 0; X < J.length; X++) {
              J[X]();
            }J.length = 0;
          }if (!W) {
            if (C(N, "addEventListener")) {
              v(d, "DOMContentLoaded", s);
            } else {
              v(d, "readystatechange", function () {
                if (d.readyState == "complete") {
                  s();
                }
              });if (d.documentElement.doScroll && N === top) {
                var g = function g() {
                  if (W) {
                    return;
                  }try {
                    d.documentElement.doScroll("left");
                  } catch (X) {
                    K(g, 1);return;
                  }s();
                };g();
              }
            }v(N, "load", s);
          }function G(Y, X) {
            if (W) {
              Y.call(X);return;
            }J.push(function () {
              Y.call(X);
            });
          }function m() {
            var Z = parent;if (I !== "") {
              for (var X = 0, Y = I.split("."); X < Y.length; X++) {
                Z = Z[Y[X]];
              }
            }return Z.easyXDM;
          }function e(X) {
            N.easyXDM = M;I = X;if (I) {
              U = "easyXDM_" + I.replace(".", "_") + "_";
            }return o;
          }function z(X) {
            return X.match(Q)[3];
          }function f(X) {
            return X.match(Q)[4] || "";
          }function j(Z) {
            var X = Z.toLowerCase().match(Q);var aa = X[2],
                ab = X[3],
                Y = X[4] || "";if (aa == "http:" && Y == ":80" || aa == "https:" && Y == ":443") {
              Y = "";
            }return aa + "//" + ab + Y;
          }function B(X) {
            X = X.replace(F, "$1/");if (!X.match(/^(http||https):\/\//)) {
              var Y = X.substring(0, 1) === "/" ? "" : p.pathname;if (Y.substring(Y.length - 1) !== "/") {
                Y = Y.substring(0, Y.lastIndexOf("/") + 1);
              }X = p.protocol + "//" + p.host + Y + X;
            }while (R.test(X)) {
              X = X.replace(R, "");
            }return X;
          }function P(X, aa) {
            var ac = "",
                Z = X.indexOf("#");if (Z !== -1) {
              ac = X.substring(Z);X = X.substring(0, Z);
            }var ab = [];for (var Y in aa) {
              if (aa.hasOwnProperty(Y)) {
                ab.push(Y + "=" + H(aa[Y]));
              }
            }return X + (y ? "#" : X.indexOf("?") == -1 ? "?" : "&") + ab.join("&") + ac;
          }var S = function (X) {
            X = X.substring(1).split("&");var Z = {},
                aa,
                Y = X.length;while (Y--) {
              aa = X[Y].split("=");Z[aa[0]] = k(aa[1]);
            }return Z;
          }(/xdm_e=/.test(p.search) ? p.search : p.hash);function t(X) {
            return typeof X === "undefined";
          }var _O = function O() {
            var Y = {};var Z = { a: [1, 2, 3] },
                X = '{"a":[1,2,3]}';if (typeof JSON != "undefined" && typeof JSON.stringify === "function" && JSON.stringify(Z).replace(/\s/g, "") === X) {
              return JSON;
            }if (Object.toJSON) {
              if (Object.toJSON(Z).replace(/\s/g, "") === X) {
                Y.stringify = Object.toJSON;
              }
            }if (typeof String.prototype.evalJSON === "function") {
              Z = X.evalJSON();if (Z.a && Z.a.length === 3 && Z.a[2] === 3) {
                Y.parse = function (aa) {
                  return aa.evalJSON();
                };
              }
            }if (Y.stringify && Y.parse) {
              _O = function O() {
                return Y;
              };return Y;
            }return null;
          };function T(X, Y, Z) {
            var ab;for (var aa in Y) {
              if (Y.hasOwnProperty(aa)) {
                if (aa in X) {
                  ab = Y[aa];if ((typeof ab === "undefined" ? "undefined" : _typeof(ab)) === "object") {
                    T(X[aa], ab, Z);
                  } else {
                    if (!Z) {
                      X[aa] = Y[aa];
                    }
                  }
                } else {
                  X[aa] = Y[aa];
                }
              }
            }return X;
          }function a() {
            var Y = d.body.appendChild(d.createElement("form")),
                X = Y.appendChild(d.createElement("input"));X.name = U + "TEST" + n;E = X !== Y.elements[X.name];d.body.removeChild(Y);
          }function A(Y) {
            if (t(E)) {
              a();
            }var ac;if (E) {
              ac = d.createElement('<iframe name="' + Y.props.name + '"/>');
            } else {
              ac = d.createElement("IFRAME");ac.name = Y.props.name;
            }ac.id = ac.name = Y.props.name;delete Y.props.name;if (typeof Y.container == "string") {
              Y.container = d.getElementById(Y.container);
            }if (!Y.container) {
              T(ac.style, { position: "absolute", top: "-2000px", left: "0px" });Y.container = d.body;
            }var ab = Y.props.src;Y.props.src = "javascript:false";T(ac, Y.props);ac.border = ac.frameBorder = 0;ac.allowTransparency = true;Y.container.appendChild(ac);if (Y.onLoad) {
              v(ac, "load", Y.onLoad);
            }if (Y.usePost) {
              var aa = Y.container.appendChild(d.createElement("form")),
                  X;aa.target = ac.name;aa.action = ab;aa.method = "POST";if (_typeof(Y.usePost) === "object") {
                for (var Z in Y.usePost) {
                  if (Y.usePost.hasOwnProperty(Z)) {
                    if (E) {
                      X = d.createElement('<input name="' + Z + '"/>');
                    } else {
                      X = d.createElement("INPUT");X.name = Z;
                    }X.value = Y.usePost[Z];aa.appendChild(X);
                  }
                }
              }aa.submit();aa.parentNode.removeChild(aa);
            } else {
              ac.src = ab;
            }Y.props.src = ab;return ac;
          }function V(aa, Z) {
            if (typeof aa == "string") {
              aa = [aa];
            }var Y,
                X = aa.length;while (X--) {
              Y = aa[X];Y = new RegExp(Y.substr(0, 1) == "^" ? Y : "^" + Y.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$");if (Y.test(Z)) {
                return true;
              }
            }return false;
          }function l(Z) {
            var ae = Z.protocol,
                Y;Z.isHost = Z.isHost || t(S.xdm_p);y = Z.hash || false;if (!Z.props) {
              Z.props = {};
            }if (!Z.isHost) {
              Z.channel = S.xdm_c.replace(/["'<>\\]/g, "");Z.secret = S.xdm_s;Z.remote = S.xdm_e.replace(/["'<>\\]/g, "");ae = S.xdm_p;if (Z.acl && !V(Z.acl, Z.remote)) {
                throw new Error("Access denied for " + Z.remote);
              }
            } else {
              Z.remote = B(Z.remote);Z.channel = Z.channel || "default" + n++;Z.secret = Math.random().toString(16).substring(2);if (t(ae)) {
                if (j(p.href) == j(Z.remote)) {
                  ae = "4";
                } else {
                  if (C(N, "postMessage") || C(d, "postMessage")) {
                    ae = "1";
                  } else {
                    if (Z.swf && C(N, "ActiveXObject") && c()) {
                      ae = "6";
                    } else {
                      if (navigator.product === "Gecko" && "frameElement" in N && navigator.userAgent.indexOf("WebKit") == -1) {
                        ae = "5";
                      } else {
                        if (Z.remoteHelper) {
                          ae = "2";
                        } else {
                          ae = "0";
                        }
                      }
                    }
                  }
                }
              }
            }Z.protocol = ae;switch (ae) {case "0":
                T(Z, { interval: 100, delay: 2000, useResize: true, useParent: false, usePolling: false }, true);if (Z.isHost) {
                  if (!Z.local) {
                    var ac = p.protocol + "//" + p.host,
                        X = d.body.getElementsByTagName("img"),
                        ad;var aa = X.length;while (aa--) {
                      ad = X[aa];if (ad.src.substring(0, ac.length) === ac) {
                        Z.local = ad.src;break;
                      }
                    }if (!Z.local) {
                      Z.local = N;
                    }
                  }var ab = { xdm_c: Z.channel, xdm_p: 0 };if (Z.local === N) {
                    Z.usePolling = true;Z.useParent = true;Z.local = p.protocol + "//" + p.host + p.pathname + p.search;ab.xdm_e = Z.local;ab.xdm_pa = 1;
                  } else {
                    ab.xdm_e = B(Z.local);
                  }if (Z.container) {
                    Z.useResize = false;ab.xdm_po = 1;
                  }Z.remote = P(Z.remote, ab);
                } else {
                  T(Z, { channel: S.xdm_c, remote: S.xdm_e, useParent: !t(S.xdm_pa), usePolling: !t(S.xdm_po), useResize: Z.useParent ? false : Z.useResize });
                }Y = [new o.stack.HashTransport(Z), new o.stack.ReliableBehavior({}), new o.stack.QueueBehavior({ encode: true, maxLength: 4000 - Z.remote.length }), new o.stack.VerifyBehavior({ initiate: Z.isHost })];break;case "1":
                Y = [new o.stack.PostMessageTransport(Z)];break;case "2":
                if (Z.isHost) {
                  Z.remoteHelper = B(Z.remoteHelper);
                }Y = [new o.stack.NameTransport(Z), new o.stack.QueueBehavior(), new o.stack.VerifyBehavior({ initiate: Z.isHost })];break;case "3":
                Y = [new o.stack.NixTransport(Z)];break;case "4":
                Y = [new o.stack.SameOriginTransport(Z)];break;case "5":
                Y = [new o.stack.FrameElementTransport(Z)];break;case "6":
                if (!i) {
                  c();
                }Y = [new o.stack.FlashTransport(Z)];break;}Y.push(new o.stack.QueueBehavior({ lazy: Z.lazy, remove: true }));return Y;
          }function D(aa) {
            var ab,
                Z = { incoming: function incoming(ad, ac) {
                this.up.incoming(ad, ac);
              }, outgoing: function outgoing(ac, ad) {
                this.down.outgoing(ac, ad);
              }, callback: function callback(ac) {
                this.up.callback(ac);
              }, init: function init() {
                this.down.init();
              }, destroy: function destroy() {
                this.down.destroy();
              } };for (var Y = 0, X = aa.length; Y < X; Y++) {
              ab = aa[Y];T(ab, Z, true);if (Y !== 0) {
                ab.down = aa[Y - 1];
              }if (Y !== X - 1) {
                ab.up = aa[Y + 1];
              }
            }return ab;
          }function w(X) {
            X.up.down = X.down;X.down.up = X.up;X.up = X.down = null;
          }T(o, { version: "2.4.19.3", query: S, stack: {}, apply: T, getJSONObject: _O, whenReady: G, noConflict: e });o.DomHelper = { on: v, un: x, requiresJSON: function requiresJSON(X) {
              if (!u(N, "JSON")) {
                d.write('<script type="text/javascript" src="' + X + '"><\/script>');
              }
            } };(function () {
            var X = {};o.Fn = { set: function set(Y, Z) {
                X[Y] = Z;
              }, get: function get(Z, Y) {
                if (!X.hasOwnProperty(Z)) {
                  return;
                }var aa = X[Z];if (Y) {
                  delete X[Z];
                }return aa;
              } };
          })();o.Socket = function (Y) {
            var X = D(l(Y).concat([{ incoming: function incoming(ab, aa) {
                Y.onMessage(ab, aa);
              }, callback: function callback(aa) {
                if (Y.onReady) {
                  Y.onReady(aa);
                }
              } }])),
                Z = j(Y.remote);this.origin = j(Y.remote);this.destroy = function () {
              X.destroy();
            };this.postMessage = function (aa) {
              X.outgoing(aa, Z);
            };X.init();
          };o.Rpc = function (Z, Y) {
            if (Y.local) {
              for (var ab in Y.local) {
                if (Y.local.hasOwnProperty(ab)) {
                  var aa = Y.local[ab];if (typeof aa === "function") {
                    Y.local[ab] = { method: aa };
                  }
                }
              }
            }var X = D(l(Z).concat([new o.stack.RpcBehavior(this, Y), { callback: function callback(ac) {
                if (Z.onReady) {
                  Z.onReady(ac);
                }
              } }]));this.origin = j(Z.remote);this.destroy = function () {
              X.destroy();
            };X.init();
          };o.stack.SameOriginTransport = function (Y) {
            var Z, ab, aa, X;return Z = { outgoing: function outgoing(ad, ae, ac) {
                aa(ad);if (ac) {
                  ac();
                }
              }, destroy: function destroy() {
                if (ab) {
                  ab.parentNode.removeChild(ab);ab = null;
                }
              }, onDOMReady: function onDOMReady() {
                X = j(Y.remote);if (Y.isHost) {
                  T(Y.props, { src: P(Y.remote, { xdm_e: p.protocol + "//" + p.host + p.pathname, xdm_c: Y.channel, xdm_p: 4 }), name: U + Y.channel + "_provider" });ab = A(Y);o.Fn.set(Y.channel, function (ac) {
                    aa = ac;K(function () {
                      Z.up.callback(true);
                    }, 0);return function (ad) {
                      Z.up.incoming(ad, X);
                    };
                  });
                } else {
                  aa = m().Fn.get(Y.channel, true)(function (ac) {
                    Z.up.incoming(ac, X);
                  });K(function () {
                    Z.up.callback(true);
                  }, 0);
                }
              }, init: function init() {
                G(Z.onDOMReady, Z);
              } };
          };o.stack.FlashTransport = function (aa) {
            var ac, X, ab, ad, Y, ae;function af(ah, ag) {
              K(function () {
                ac.up.incoming(ah, ad);
              }, 0);
            }function Z(ah) {
              var ag = aa.swf + "?host=" + aa.isHost;var aj = "easyXDM_swf_" + Math.floor(Math.random() * 10000);o.Fn.set("flash_loaded" + ah.replace(/[\-.]/g, "_"), function () {
                o.stack.FlashTransport[ah].swf = Y = ae.firstChild;var ak = o.stack.FlashTransport[ah].queue;for (var al = 0; al < ak.length; al++) {
                  ak[al]();
                }ak.length = 0;
              });if (aa.swfContainer) {
                ae = typeof aa.swfContainer == "string" ? d.getElementById(aa.swfContainer) : aa.swfContainer;
              } else {
                ae = d.createElement("div");T(ae.style, h && aa.swfNoThrottle ? { height: "20px", width: "20px", position: "fixed", right: 0, top: 0 } : { height: "1px", width: "1px", position: "absolute", overflow: "hidden", right: 0, top: 0 });d.body.appendChild(ae);
              }var ai = "callback=flash_loaded" + H(ah.replace(/[\-.]/g, "_")) + "&proto=" + b.location.protocol + "&domain=" + H(z(b.location.href)) + "&port=" + H(f(b.location.href)) + "&ns=" + H(I);ae.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + aj + "' data='" + ag + "'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='" + ag + "'></param><param name='flashvars' value='" + ai + "'></param><embed type='application/x-shockwave-flash' FlashVars='" + ai + "' allowScriptAccess='always' wmode='transparent' src='" + ag + "' height='1' width='1'></embed></object>";
            }return ac = { outgoing: function outgoing(ah, ai, ag) {
                Y.postMessage(aa.channel, ah.toString());if (ag) {
                  ag();
                }
              }, destroy: function destroy() {
                try {
                  Y.destroyChannel(aa.channel);
                } catch (ag) {}Y = null;if (X) {
                  X.parentNode.removeChild(X);X = null;
                }
              }, onDOMReady: function onDOMReady() {
                ad = aa.remote;o.Fn.set("flash_" + aa.channel + "_init", function () {
                  K(function () {
                    ac.up.callback(true);
                  });
                });o.Fn.set("flash_" + aa.channel + "_onMessage", af);aa.swf = B(aa.swf);var ah = z(aa.swf);var ag = function ag() {
                  o.stack.FlashTransport[ah].init = true;Y = o.stack.FlashTransport[ah].swf;Y.createChannel(aa.channel, aa.secret, j(aa.remote), aa.isHost);if (aa.isHost) {
                    if (h && aa.swfNoThrottle) {
                      T(aa.props, { position: "fixed", right: 0, top: 0, height: "20px", width: "20px" });
                    }T(aa.props, { src: P(aa.remote, { xdm_e: j(p.href), xdm_c: aa.channel, xdm_p: 6, xdm_s: aa.secret }), name: U + aa.channel + "_provider" });X = A(aa);
                  }
                };if (o.stack.FlashTransport[ah] && o.stack.FlashTransport[ah].init) {
                  ag();
                } else {
                  if (!o.stack.FlashTransport[ah]) {
                    o.stack.FlashTransport[ah] = { queue: [ag] };Z(ah);
                  } else {
                    o.stack.FlashTransport[ah].queue.push(ag);
                  }
                }
              }, init: function init() {
                G(ac.onDOMReady, ac);
              } };
          };o.stack.PostMessageTransport = function (aa) {
            var ac, ad, Y, Z;function X(ae) {
              if (ae.origin) {
                return j(ae.origin);
              }if (ae.uri) {
                return j(ae.uri);
              }if (ae.domain) {
                return p.protocol + "//" + ae.domain;
              }throw "Unable to retrieve the origin of the event";
            }function ab(af) {
              var ae = X(af);if (ae == Z && af.data.substring(0, aa.channel.length + 1) == aa.channel + " ") {
                ac.up.incoming(af.data.substring(aa.channel.length + 1), ae);
              }
            }return ac = { outgoing: function outgoing(af, ag, ae) {
                Y.postMessage(aa.channel + " " + af, ag || Z);if (ae) {
                  ae();
                }
              }, destroy: function destroy() {
                x(N, "message", ab);if (ad) {
                  Y = null;ad.parentNode.removeChild(ad);ad = null;
                }
              }, onDOMReady: function onDOMReady() {
                Z = j(aa.remote);if (aa.isHost) {
                  var ae = function ae(af) {
                    if (af.data == aa.channel + "-ready") {
                      Y = "postMessage" in ad.contentWindow ? ad.contentWindow : ad.contentWindow.document;x(N, "message", ae);v(N, "message", ab);K(function () {
                        ac.up.callback(true);
                      }, 0);
                    }
                  };v(N, "message", ae);T(aa.props, { src: P(aa.remote, { xdm_e: j(p.href), xdm_c: aa.channel, xdm_p: 1 }), name: U + aa.channel + "_provider" });ad = A(aa);
                } else {
                  v(N, "message", ab);Y = "postMessage" in N.parent ? N.parent : N.parent.document;Y.postMessage(aa.channel + "-ready", Z);K(function () {
                    ac.up.callback(true);
                  }, 0);
                }
              }, init: function init() {
                G(ac.onDOMReady, ac);
              } };
          };o.stack.FrameElementTransport = function (Y) {
            var Z, ab, aa, X;return Z = { outgoing: function outgoing(ad, ae, ac) {
                aa.call(this, ad);if (ac) {
                  ac();
                }
              }, destroy: function destroy() {
                if (ab) {
                  ab.parentNode.removeChild(ab);ab = null;
                }
              }, onDOMReady: function onDOMReady() {
                X = j(Y.remote);if (Y.isHost) {
                  T(Y.props, { src: P(Y.remote, { xdm_e: j(p.href), xdm_c: Y.channel, xdm_p: 5 }), name: U + Y.channel + "_provider" });ab = A(Y);ab.fn = function (ac) {
                    delete ab.fn;aa = ac;K(function () {
                      Z.up.callback(true);
                    }, 0);return function (ad) {
                      Z.up.incoming(ad, X);
                    };
                  };
                } else {
                  if (d.referrer && j(d.referrer) != S.xdm_e) {
                    N.top.location = S.xdm_e;
                  }aa = N.frameElement.fn(function (ac) {
                    Z.up.incoming(ac, X);
                  });Z.up.callback(true);
                }
              }, init: function init() {
                G(Z.onDOMReady, Z);
              } };
          };o.stack.NameTransport = function (ab) {
            var ac;var ae, ai, aa, ag, ah, Y, X;function af(al) {
              var ak = ab.remoteHelper + (ae ? "#_3" : "#_2") + ab.channel;ai.contentWindow.sendMessage(al, ak);
            }function ad() {
              if (ae) {
                if (++ag === 2 || !ae) {
                  ac.up.callback(true);
                }
              } else {
                af("ready");ac.up.callback(true);
              }
            }function aj(ak) {
              ac.up.incoming(ak, Y);
            }function Z() {
              if (ah) {
                K(function () {
                  ah(true);
                }, 0);
              }
            }return ac = { outgoing: function outgoing(al, am, ak) {
                ah = ak;af(al);
              }, destroy: function destroy() {
                ai.parentNode.removeChild(ai);ai = null;if (ae) {
                  aa.parentNode.removeChild(aa);aa = null;
                }
              }, onDOMReady: function onDOMReady() {
                ae = ab.isHost;ag = 0;Y = j(ab.remote);ab.local = B(ab.local);if (ae) {
                  o.Fn.set(ab.channel, function (al) {
                    if (ae && al === "ready") {
                      o.Fn.set(ab.channel, aj);ad();
                    }
                  });X = P(ab.remote, { xdm_e: ab.local, xdm_c: ab.channel, xdm_p: 2 });T(ab.props, { src: X + "#" + ab.channel, name: U + ab.channel + "_provider" });aa = A(ab);
                } else {
                  ab.remoteHelper = ab.remote;o.Fn.set(ab.channel, aj);
                }var ak = function ak() {
                  var al = ai || this;x(al, "load", ak);o.Fn.set(ab.channel + "_load", Z);(function am() {
                    if (typeof al.contentWindow.sendMessage == "function") {
                      ad();
                    } else {
                      K(am, 50);
                    }
                  })();
                };ai = A({ props: { src: ab.local + "#_4" + ab.channel }, onLoad: ak });
              }, init: function init() {
                G(ac.onDOMReady, ac);
              } };
          };o.stack.HashTransport = function (Z) {
            var ac;var ah = this,
                af,
                aa,
                X,
                ad,
                am,
                ab,
                al;var ag, Y;function ak(ao) {
              if (!al) {
                return;
              }var an = Z.remote + "#" + am++ + "_" + ao;(af || !ag ? al.contentWindow : al).location = an;
            }function ae(an) {
              ad = an;ac.up.incoming(ad.substring(ad.indexOf("_") + 1), Y);
            }function aj() {
              if (!ab) {
                return;
              }var an = ab.location.href,
                  ap = "",
                  ao = an.indexOf("#");if (ao != -1) {
                ap = an.substring(ao);
              }if (ap && ap != ad) {
                ae(ap);
              }
            }function ai() {
              aa = setInterval(aj, X);
            }return ac = { outgoing: function outgoing(an, ao) {
                ak(an);
              }, destroy: function destroy() {
                N.clearInterval(aa);if (af || !ag) {
                  al.parentNode.removeChild(al);
                }al = null;
              }, onDOMReady: function onDOMReady() {
                af = Z.isHost;X = Z.interval;ad = "#" + Z.channel;am = 0;ag = Z.useParent;Y = j(Z.remote);if (af) {
                  T(Z.props, { src: Z.remote, name: U + Z.channel + "_provider" });if (ag) {
                    Z.onLoad = function () {
                      ab = N;ai();ac.up.callback(true);
                    };
                  } else {
                    var ap = 0,
                        an = Z.delay / 50;(function ao() {
                      if (++ap > an) {
                        throw new Error("Unable to reference listenerwindow");
                      }try {
                        ab = al.contentWindow.frames[U + Z.channel + "_consumer"];
                      } catch (aq) {}if (ab) {
                        ai();ac.up.callback(true);
                      } else {
                        K(ao, 50);
                      }
                    })();
                  }al = A(Z);
                } else {
                  ab = N;ai();if (ag) {
                    al = parent;ac.up.callback(true);
                  } else {
                    T(Z, { props: { src: Z.remote + "#" + Z.channel + new Date(), name: U + Z.channel + "_consumer" }, onLoad: function onLoad() {
                        ac.up.callback(true);
                      } });al = A(Z);
                  }
                }
              }, init: function init() {
                G(ac.onDOMReady, ac);
              } };
          };o.stack.ReliableBehavior = function (Y) {
            var aa, ac;var ab = 0,
                X = 0,
                Z = "";return aa = { incoming: function incoming(af, ad) {
                var ae = af.indexOf("_"),
                    ag = af.substring(0, ae).split(",");af = af.substring(ae + 1);if (ag[0] == ab) {
                  Z = "";if (ac) {
                    ac(true);
                  }
                }if (af.length > 0) {
                  aa.down.outgoing(ag[1] + "," + ab + "_" + Z, ad);if (X != ag[1]) {
                    X = ag[1];aa.up.incoming(af, ad);
                  }
                }
              }, outgoing: function outgoing(af, ad, ae) {
                Z = af;ac = ae;aa.down.outgoing(X + "," + ++ab + "_" + af, ad);
              } };
          };o.stack.QueueBehavior = function (Z) {
            var ac,
                ad = [],
                ag = true,
                aa = "",
                af,
                X = 0,
                Y = false,
                ab = false;function ae() {
              if (Z.remove && ad.length === 0) {
                w(ac);return;
              }if (ag || ad.length === 0 || af) {
                return;
              }ag = true;var ah = ad.shift();ac.down.outgoing(ah.data, ah.origin, function (ai) {
                ag = false;if (ah.callback) {
                  K(function () {
                    ah.callback(ai);
                  }, 0);
                }ae();
              });
            }return ac = { init: function init() {
                if (t(Z)) {
                  Z = {};
                }if (Z.maxLength) {
                  X = Z.maxLength;ab = true;
                }if (Z.lazy) {
                  Y = true;
                } else {
                  ac.down.init();
                }
              }, callback: function callback(ai) {
                ag = false;var ah = ac.up;ae();ah.callback(ai);
              }, incoming: function incoming(ak, ai) {
                if (ab) {
                  var aj = ak.indexOf("_"),
                      ah = parseInt(ak.substring(0, aj), 10);aa += ak.substring(aj + 1);if (ah === 0) {
                    if (Z.encode) {
                      aa = k(aa);
                    }ac.up.incoming(aa, ai);aa = "";
                  }
                } else {
                  ac.up.incoming(ak, ai);
                }
              }, outgoing: function outgoing(al, ai, ak) {
                if (Z.encode) {
                  al = H(al);
                }var ah = [],
                    aj;if (ab) {
                  while (al.length !== 0) {
                    aj = al.substring(0, X);al = al.substring(aj.length);ah.push(aj);
                  }while (aj = ah.shift()) {
                    ad.push({ data: ah.length + "_" + aj, origin: ai, callback: ah.length === 0 ? ak : null });
                  }
                } else {
                  ad.push({ data: al, origin: ai, callback: ak });
                }if (Y) {
                  ac.down.init();
                } else {
                  ae();
                }
              }, destroy: function destroy() {
                af = true;ac.down.destroy();
              } };
          };o.stack.VerifyBehavior = function (ab) {
            var ac,
                aa,
                Y,
                Z = false;function X() {
              aa = Math.random().toString(16).substring(2);ac.down.outgoing(aa);
            }return ac = { incoming: function incoming(af, ad) {
                var ae = af.indexOf("_");if (ae === -1) {
                  if (af === aa) {
                    ac.up.callback(true);
                  } else {
                    if (!Y) {
                      Y = af;if (!ab.initiate) {
                        X();
                      }ac.down.outgoing(af);
                    }
                  }
                } else {
                  if (af.substring(0, ae) === Y) {
                    ac.up.incoming(af.substring(ae + 1), ad);
                  }
                }
              }, outgoing: function outgoing(af, ad, ae) {
                ac.down.outgoing(aa + "_" + af, ad, ae);
              }, callback: function callback(ad) {
                if (ab.initiate) {
                  X();
                }
              } };
          };o.stack.RpcBehavior = function (ad, Y) {
            var aa,
                af = Y.serializer || _O();var ae = 0,
                ac = {};function X(ag) {
              ag.jsonrpc = "2.0";aa.down.outgoing(af.stringify(ag));
            }function ab(ag, ai) {
              var ah = Array.prototype.slice;return function () {
                var aj = arguments.length,
                    al,
                    ak = { method: ai };if (aj > 0 && typeof arguments[aj - 1] === "function") {
                  if (aj > 1 && typeof arguments[aj - 2] === "function") {
                    al = { success: arguments[aj - 2], error: arguments[aj - 1] };ak.params = ah.call(arguments, 0, aj - 2);
                  } else {
                    al = { success: arguments[aj - 1] };ak.params = ah.call(arguments, 0, aj - 1);
                  }ac["" + ++ae] = al;ak.id = ae;
                } else {
                  ak.params = ah.call(arguments, 0);
                }if (ag.namedParams && ak.params.length === 1) {
                  ak.params = ak.params[0];
                }X(ak);
              };
            }function Z(an, am, ai, al) {
              if (!ai) {
                if (am) {
                  X({ id: am, error: { code: -32601, message: "Procedure not found." } });
                }return;
              }var _ak, _ah;if (am) {
                _ak = function ak(ao) {
                  _ak = q;X({ id: am, result: ao });
                };_ah = function ah(ao, ap) {
                  _ah = q;var aq = { id: am, error: { code: -32099, message: ao } };if (ap) {
                    aq.error.data = ap;
                  }X(aq);
                };
              } else {
                _ak = _ah = q;
              }if (!r(al)) {
                al = [al];
              }try {
                var ag = ai.method.apply(ai.scope, al.concat([_ak, _ah]));if (!t(ag)) {
                  _ak(ag);
                }
              } catch (aj) {
                _ah(aj.message);
              }
            }return aa = { incoming: function incoming(ah, ag) {
                var ai = af.parse(ah);if (ai.method) {
                  if (Y.handle) {
                    Y.handle(ai, X);
                  } else {
                    Z(ai.method, ai.id, Y.local[ai.method], ai.params);
                  }
                } else {
                  var aj = ac[ai.id];if (ai.error) {
                    if (aj.error) {
                      aj.error(ai.error);
                    }
                  } else {
                    if (aj.success) {
                      aj.success(ai.result);
                    }
                  }delete ac[ai.id];
                }
              }, init: function init() {
                if (Y.remote) {
                  for (var ag in Y.remote) {
                    if (Y.remote.hasOwnProperty(ag)) {
                      ad[ag] = ab(Y.remote[ag], ag);
                    }
                  }
                }aa.down.init();
              }, destroy: function destroy() {
                for (var ag in Y.remote) {
                  if (Y.remote.hasOwnProperty(ag) && ad.hasOwnProperty(ag)) {
                    delete ad[ag];
                  }
                }aa.down.destroy();
              } };
          };b.easyXDM = o;
        })(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent);

        return easyXDM.noConflict('Kakao');
      }();
    }, {}], 16: [function (require, module, exports) {
      (function (process, global) {
/*!
         * @overview es6-promise - a tiny implementation of Promises/A+.
         * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
         * @license   Licensed under MIT license
         *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
         * @version   2.1.1
         */

        (function () {
          "use strict";
          function lib$es6$promise$utils$$objectOrFunction(x) {
            return typeof x === "function" || (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && x !== null;
          }function lib$es6$promise$utils$$isFunction(x) {
            return typeof x === "function";
          }function lib$es6$promise$utils$$isMaybeThenable(x) {
            return (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && x !== null;
          }var lib$es6$promise$utils$$_isArray;if (!Array.isArray) {
            lib$es6$promise$utils$$_isArray = function lib$es6$promise$utils$$_isArray(x) {
              return Object.prototype.toString.call(x) === "[object Array]";
            };
          } else {
            lib$es6$promise$utils$$_isArray = Array.isArray;
          }var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;var lib$es6$promise$asap$$len = 0;var lib$es6$promise$asap$$toString = {}.toString;var lib$es6$promise$asap$$vertxNext;function lib$es6$promise$asap$$asap(callback, arg) {
            lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;lib$es6$promise$asap$$len += 2;if (lib$es6$promise$asap$$len === 2) {
              lib$es6$promise$asap$$scheduleFlush();
            }
          }var lib$es6$promise$asap$$default = lib$es6$promise$asap$$asap;var lib$es6$promise$asap$$browserWindow = typeof window !== "undefined" ? window : undefined;var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;var lib$es6$promise$asap$$isNode = typeof process !== "undefined" && {}.toString.call(process) === "[object process]";var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";function lib$es6$promise$asap$$useNextTick() {
            var nextTick = process.nextTick;var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);if (Array.isArray(version) && version[1] === "0" && version[2] === "10") {
              nextTick = setImmediate;
            }return function () {
              nextTick(lib$es6$promise$asap$$flush);
            };
          }function lib$es6$promise$asap$$useVertxTimer() {
            return function () {
              lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
            };
          }function lib$es6$promise$asap$$useMutationObserver() {
            var iterations = 0;var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);var node = document.createTextNode("");observer.observe(node, { characterData: true });return function () {
              node.data = iterations = ++iterations % 2;
            };
          }function lib$es6$promise$asap$$useMessageChannel() {
            var channel = new MessageChannel();channel.port1.onmessage = lib$es6$promise$asap$$flush;return function () {
              channel.port2.postMessage(0);
            };
          }function lib$es6$promise$asap$$useSetTimeout() {
            return function () {
              setTimeout(lib$es6$promise$asap$$flush, 1);
            };
          }var lib$es6$promise$asap$$queue = new Array(1e3);function lib$es6$promise$asap$$flush() {
            for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
              var callback = lib$es6$promise$asap$$queue[i];var arg = lib$es6$promise$asap$$queue[i + 1];callback(arg);lib$es6$promise$asap$$queue[i] = undefined;lib$es6$promise$asap$$queue[i + 1] = undefined;
            }lib$es6$promise$asap$$len = 0;
          }function lib$es6$promise$asap$$attemptVertex() {
            try {
              var r = require;var vertx = r("vertx");lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;return lib$es6$promise$asap$$useVertxTimer();
            } catch (e) {
              return lib$es6$promise$asap$$useSetTimeout();
            }
          }var lib$es6$promise$asap$$scheduleFlush;if (lib$es6$promise$asap$$isNode) {
            lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
          } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
            lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
          } else if (lib$es6$promise$asap$$isWorker) {
            lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
          } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === "function") {
            lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertex();
          } else {
            lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
          }function lib$es6$promise$$internal$$noop() {}var lib$es6$promise$$internal$$PENDING = void 0;var lib$es6$promise$$internal$$FULFILLED = 1;var lib$es6$promise$$internal$$REJECTED = 2;var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();function lib$es6$promise$$internal$$selfFullfillment() {
            return new TypeError("You cannot resolve a promise with itself");
          }function lib$es6$promise$$internal$$cannotReturnOwn() {
            return new TypeError("A promises callback cannot return that same promise.");
          }function lib$es6$promise$$internal$$getThen(promise) {
            try {
              return promise.then;
            } catch (error) {
              lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;return lib$es6$promise$$internal$$GET_THEN_ERROR;
            }
          }function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
            try {
              then.call(value, fulfillmentHandler, rejectionHandler);
            } catch (e) {
              return e;
            }
          }function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
            lib$es6$promise$asap$$default(function (promise) {
              var sealed = false;var error = lib$es6$promise$$internal$$tryThen(then, thenable, function (value) {
                if (sealed) {
                  return;
                }sealed = true;if (thenable !== value) {
                  lib$es6$promise$$internal$$resolve(promise, value);
                } else {
                  lib$es6$promise$$internal$$fulfill(promise, value);
                }
              }, function (reason) {
                if (sealed) {
                  return;
                }sealed = true;lib$es6$promise$$internal$$reject(promise, reason);
              }, "Settle: " + (promise._label || " unknown promise"));if (!sealed && error) {
                sealed = true;lib$es6$promise$$internal$$reject(promise, error);
              }
            }, promise);
          }function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
            if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
              lib$es6$promise$$internal$$fulfill(promise, thenable._result);
            } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
              lib$es6$promise$$internal$$reject(promise, thenable._result);
            } else {
              lib$es6$promise$$internal$$subscribe(thenable, undefined, function (value) {
                lib$es6$promise$$internal$$resolve(promise, value);
              }, function (reason) {
                lib$es6$promise$$internal$$reject(promise, reason);
              });
            }
          }function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
            if (maybeThenable.constructor === promise.constructor) {
              lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
            } else {
              var then = lib$es6$promise$$internal$$getThen(maybeThenable);if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
                lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
              } else if (then === undefined) {
                lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
              } else if (lib$es6$promise$utils$$isFunction(then)) {
                lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
              } else {
                lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
              }
            }
          }function lib$es6$promise$$internal$$resolve(promise, value) {
            if (promise === value) {
              lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFullfillment());
            } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
              lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
            } else {
              lib$es6$promise$$internal$$fulfill(promise, value);
            }
          }function lib$es6$promise$$internal$$publishRejection(promise) {
            if (promise._onerror) {
              promise._onerror(promise._result);
            }lib$es6$promise$$internal$$publish(promise);
          }function lib$es6$promise$$internal$$fulfill(promise, value) {
            if (promise._state !== lib$es6$promise$$internal$$PENDING) {
              return;
            }promise._result = value;promise._state = lib$es6$promise$$internal$$FULFILLED;if (promise._subscribers.length !== 0) {
              lib$es6$promise$asap$$default(lib$es6$promise$$internal$$publish, promise);
            }
          }function lib$es6$promise$$internal$$reject(promise, reason) {
            if (promise._state !== lib$es6$promise$$internal$$PENDING) {
              return;
            }promise._state = lib$es6$promise$$internal$$REJECTED;promise._result = reason;lib$es6$promise$asap$$default(lib$es6$promise$$internal$$publishRejection, promise);
          }function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
            var subscribers = parent._subscribers;var length = subscribers.length;parent._onerror = null;subscribers[length] = child;subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;if (length === 0 && parent._state) {
              lib$es6$promise$asap$$default(lib$es6$promise$$internal$$publish, parent);
            }
          }function lib$es6$promise$$internal$$publish(promise) {
            var subscribers = promise._subscribers;var settled = promise._state;if (subscribers.length === 0) {
              return;
            }var child,
                callback,
                detail = promise._result;for (var i = 0; i < subscribers.length; i += 3) {
              child = subscribers[i];callback = subscribers[i + settled];if (child) {
                lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
              } else {
                callback(detail);
              }
            }promise._subscribers.length = 0;
          }function lib$es6$promise$$internal$$ErrorObject() {
            this.error = null;
          }var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();function lib$es6$promise$$internal$$tryCatch(callback, detail) {
            try {
              return callback(detail);
            } catch (e) {
              lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
            }
          }function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
            var hasCallback = lib$es6$promise$utils$$isFunction(callback),
                value,
                error,
                succeeded,
                failed;if (hasCallback) {
              value = lib$es6$promise$$internal$$tryCatch(callback, detail);if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
                failed = true;error = value.error;value = null;
              } else {
                succeeded = true;
              }if (promise === value) {
                lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());return;
              }
            } else {
              value = detail;succeeded = true;
            }if (promise._state !== lib$es6$promise$$internal$$PENDING) {} else if (hasCallback && succeeded) {
              lib$es6$promise$$internal$$resolve(promise, value);
            } else if (failed) {
              lib$es6$promise$$internal$$reject(promise, error);
            } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
              lib$es6$promise$$internal$$fulfill(promise, value);
            } else if (settled === lib$es6$promise$$internal$$REJECTED) {
              lib$es6$promise$$internal$$reject(promise, value);
            }
          }function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
            try {
              resolver(function resolvePromise(value) {
                lib$es6$promise$$internal$$resolve(promise, value);
              }, function rejectPromise(reason) {
                lib$es6$promise$$internal$$reject(promise, reason);
              });
            } catch (e) {
              lib$es6$promise$$internal$$reject(promise, e);
            }
          }function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
            var enumerator = this;enumerator._instanceConstructor = Constructor;enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);if (enumerator._validateInput(input)) {
              enumerator._input = input;enumerator.length = input.length;enumerator._remaining = input.length;enumerator._init();if (enumerator.length === 0) {
                lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
              } else {
                enumerator.length = enumerator.length || 0;enumerator._enumerate();if (enumerator._remaining === 0) {
                  lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
                }
              }
            } else {
              lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
            }
          }lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function (input) {
            return lib$es6$promise$utils$$isArray(input);
          };lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function () {
            return new Error("Array Methods must be provided an Array");
          };lib$es6$promise$enumerator$$Enumerator.prototype._init = function () {
            this._result = new Array(this.length);
          };var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function () {
            var enumerator = this;var length = enumerator.length;var promise = enumerator.promise;var input = enumerator._input;for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
              enumerator._eachEntry(input[i], i);
            }
          };lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function (entry, i) {
            var enumerator = this;var c = enumerator._instanceConstructor;if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
              if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
                entry._onerror = null;enumerator._settledAt(entry._state, i, entry._result);
              } else {
                enumerator._willSettleAt(c.resolve(entry), i);
              }
            } else {
              enumerator._remaining--;enumerator._result[i] = entry;
            }
          };lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function (state, i, value) {
            var enumerator = this;var promise = enumerator.promise;if (promise._state === lib$es6$promise$$internal$$PENDING) {
              enumerator._remaining--;if (state === lib$es6$promise$$internal$$REJECTED) {
                lib$es6$promise$$internal$$reject(promise, value);
              } else {
                enumerator._result[i] = value;
              }
            }if (enumerator._remaining === 0) {
              lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
            }
          };lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function (promise, i) {
            var enumerator = this;lib$es6$promise$$internal$$subscribe(promise, undefined, function (value) {
              enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
            }, function (reason) {
              enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
            });
          };function lib$es6$promise$promise$all$$all(entries) {
            return new lib$es6$promise$enumerator$$default(this, entries).promise;
          }var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;function lib$es6$promise$promise$race$$race(entries) {
            var Constructor = this;var promise = new Constructor(lib$es6$promise$$internal$$noop);if (!lib$es6$promise$utils$$isArray(entries)) {
              lib$es6$promise$$internal$$reject(promise, new TypeError("You must pass an array to race."));return promise;
            }var length = entries.length;function onFulfillment(value) {
              lib$es6$promise$$internal$$resolve(promise, value);
            }function onRejection(reason) {
              lib$es6$promise$$internal$$reject(promise, reason);
            }for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
              lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
            }return promise;
          }var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;function lib$es6$promise$promise$resolve$$resolve(object) {
            var Constructor = this;if (object && (typeof object === "undefined" ? "undefined" : _typeof(object)) === "object" && object.constructor === Constructor) {
              return object;
            }var promise = new Constructor(lib$es6$promise$$internal$$noop);lib$es6$promise$$internal$$resolve(promise, object);return promise;
          }var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;function lib$es6$promise$promise$reject$$reject(reason) {
            var Constructor = this;var promise = new Constructor(lib$es6$promise$$internal$$noop);lib$es6$promise$$internal$$reject(promise, reason);return promise;
          }var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;var lib$es6$promise$promise$$counter = 0;function lib$es6$promise$promise$$needsResolver() {
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
          }function lib$es6$promise$promise$$needsNew() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
          }var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;function lib$es6$promise$promise$$Promise(resolver) {
            this._id = lib$es6$promise$promise$$counter++;this._state = undefined;this._result = undefined;this._subscribers = [];if (lib$es6$promise$$internal$$noop !== resolver) {
              if (!lib$es6$promise$utils$$isFunction(resolver)) {
                lib$es6$promise$promise$$needsResolver();
              }if (!(this instanceof lib$es6$promise$promise$$Promise)) {
                lib$es6$promise$promise$$needsNew();
              }lib$es6$promise$$internal$$initializePromise(this, resolver);
            }
          }lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;lib$es6$promise$promise$$Promise.prototype = { constructor: lib$es6$promise$promise$$Promise, then: function then(onFulfillment, onRejection) {
              var parent = this;var state = parent._state;if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
                return this;
              }var child = new this.constructor(lib$es6$promise$$internal$$noop);var result = parent._result;if (state) {
                var callback = arguments[state - 1];lib$es6$promise$asap$$default(function () {
                  lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
                });
              } else {
                lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
              }return child;
            }, "catch": function _catch(onRejection) {
              return this.then(null, onRejection);
            } };function lib$es6$promise$polyfill$$polyfill() {
            var local;if (typeof global !== "undefined") {
              local = global;
            } else if (typeof self !== "undefined") {
              local = self;
            } else {
              try {
                local = Function("return this")();
              } catch (e) {
                throw new Error("polyfill failed because global object is unavailable in this environment");
              }
            }var P = local.Promise;if (P && Object.prototype.toString.call(P.resolve()) === "[object Promise]" && !P.cast) {
              return;
            }local.Promise = lib$es6$promise$promise$$default;
          }var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;var lib$es6$promise$umd$$ES6Promise = { Promise: lib$es6$promise$promise$$default, polyfill: lib$es6$promise$polyfill$$default };if (typeof define === "function" && define["amd"]) {
            define(function () {
              return lib$es6$promise$umd$$ES6Promise;
            });
          } else if (typeof module !== "undefined" && module["exports"]) {
            module["exports"] = lib$es6$promise$umd$$ES6Promise;
          } else if (typeof this !== "undefined") {
            this["ES6Promise"] = lib$es6$promise$umd$$ES6Promise;
          }lib$es6$promise$polyfill$$default();
        }).call(this);
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "_process": 1 }], 17: [function (require, module, exports) {
      module.exports = function () {
        var userAgent = function userAgent(ua) {
          ua = (ua || window.navigator.userAgent).toString().toLowerCase();
          function checkUserAgent(ua) {
            var browser = {};
            var match = /(dolfin)[ \/]([\w.]+)/.exec(ua) || /(edge)[ \/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(webkit)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || ["", "unknown"];
            if (match[1] === "webkit") {
              match = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(ua) || /(android)[ \/]([\w._\-]+);/.exec(ua) || [match[0], "safari", match[2]];
            } else if (match[1] === "mozilla") {
              if (/trident/.test(ua)) {
                match[1] = "msie";
              } else {
                match[1] = "firefox";
              }
            } else if (match[1] === "edge") {
              match[1] = "spartan";
            } else if (/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(ua)) {
              match[1] = "polaris";
            }

            browser[match[1]] = true;
            browser.name = match[1];
            browser.version = setVersion(match[2]);

            return browser;
          }

          function setVersion(versionString) {
            var version = {};

            var versions = versionString ? versionString.split(/\.|-|_/) : ["0", "0", "0"];
            version.info = versions.join(".");
            version.major = versions[0] || "0";
            version.minor = versions[1] || "0";
            version.patch = versions[2] || "0";

            return version;
          }

          function checkPlatform(ua) {
            if (isPc(ua)) {
              return "pc";
            } else if (isTablet(ua)) {
              return "tablet";
            } else if (isMobile(ua)) {
              return "mobile";
            } else {
              return "";
            }
          }

          function isPc(ua) {
            if (ua.match(/linux|windows (nt|98)|macintosh/) && !ua.match(/android|mobile|polaris|lgtelecom|uzard|natebrowser|ktf;|skt;/)) {
              return true;
            }
            return false;
          }

          function isTablet(ua) {
            if (ua.match(/ipad/) || ua.match(/android/) && !ua.match(/mobi|mini|fennec/)) {
              return true;
            }
            return false;
          }

          function isMobile(ua) {
            if (!!ua.match(/ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/)) {
              return true;
            } else {
              return false;
            }
          }

          function checkOs(ua) {
            var os = {},
                match = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(ua) || /(android)[ \/]([\w._\-]+);/.exec(ua) || (/android/.test(ua) ? ["", "android", "0.0.0"] : false) || (/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(ua) ? ["", "polaris", "0.0.0"] : false) || /(windows)(?: nt | phone(?: os){0,1} | )([\w._\-]+)/.exec(ua) || (/(windows)/.test(ua) ? ["", "windows", "0.0.0"] : false) || /(mac) os x ([\w._\-]+)/.exec(ua) || (/(linux)/.test(ua) ? ["", "linux", "0.0.0"] : false) || (/webos/.test(ua) ? ["", "webos", "0.0.0"] : false) || /(bada)[ \/]([\w._\-]+)/.exec(ua) || (/bada/.test(ua) ? ["", "bada", "0.0.0"] : false) || (/(rim|blackberry|bb10)/.test(ua) ? ["", "blackberry", "0.0.0"] : false) || ["", "unknown", "0.0.0"];

            if (match[1] === "iphone" || match[1] === "ipad" || match[1] === "ipod") {
              match[1] = "ios";
            } else if (match[1] === "windows" && match[2] === "98") {
              match[2] = "0.98.0";
            }
            os[match[1]] = true;
            os.name = match[1];
            os.version = setVersion(match[2]);
            return os;
          }

          function checkApp(ua) {
            var app = {},
                match = /(crios)[ \/]([\w.]+)/.exec(ua) || /(daumapps)[ \/]([\w.]+)/.exec(ua) || ["", ""];

            if (match[1]) {
              app.isApp = true;
              app.name = match[1];
              app.version = setVersion(match[2]);
            } else {
              app.isApp = false;
            }

            return app;
          }

          return {
            ua: ua,
            browser: checkUserAgent(ua),
            platform: checkPlatform(ua),
            os: checkOs(ua),
            app: checkApp(ua)
          };
        };

        return userAgent;
      }();
    }, {}], 18: [function (require, module, exports) {
      module.exports = function () {

        var parseUA = require('./userAgent.js');

        var TIMEOUT_IOS = 2 * 1000,
            TIMEOUT_ANDROID = 3 * 100,
            INTERVAL = 100,
            ua = parseUA(),
            os = ua.os,
            intentNotSupportedBrowserList = ['firefox', 'opr'],
            intentSupportCustomBrowserList = ['KAKAOTALK' 
        ];

        function moveToStore(storeURL) {
          window.location.href = storeURL;
        }

        function web2app(context) {
          var willInvokeApp = typeof context.willInvokeApp === 'function' ? context.willInvokeApp : function () {},
              onAppMissing = typeof context.onAppMissing === 'function' ? context.onAppMissing : moveToStore,
              onUnsupportedEnvironment = typeof context.onUnsupportedEnvironment === 'function' ? context.onUnsupportedEnvironment : function () {};

          willInvokeApp();

          if (os.android) {
            if (isIntentSupportedBrowser() && context.intentURI && !context.useUrlScheme) {
              web2appViaIntentURI(context.intentURI);
            } else if (context.storeURL) {
              web2appViaCustomUrlSchemeForAndroid(context.urlScheme, context.storeURL, onAppMissing);
            }
          } else if (os.ios && context.storeURL) {
            web2appViaCustomUrlSchemeForIOS(context.urlScheme, context.storeURL, onAppMissing, context.universalLink);
          } else {
            setTimeout(function () {
              onUnsupportedEnvironment();
            }, 100);
          }
        }

        function isIntentSupportedBrowser() {
          var supportsIntent = ua.browser.chrome && +ua.browser.version.major >= 25;
          var blackListRegexp = new RegExp(intentNotSupportedBrowserList.join('|'), "i");
          var whiteListRegexp = new RegExp(intentSupportCustomBrowserList.join('|'), "i");
          return supportsIntent && !blackListRegexp.test(ua.ua) || whiteListRegexp.test(ua.ua);
        }

        function web2appViaCustomUrlSchemeForAndroid(urlScheme, storeURL, fallback) {
          deferFallback(TIMEOUT_ANDROID, storeURL, fallback);
          launchAppViaHiddenIframe(urlScheme);
        }

        function deferFallback(timeout, storeURL, fallback) {
          var clickedAt = new Date().getTime();
          return setTimeout(function () {
            var now = new Date().getTime();
            if (isPageVisible() && now - clickedAt < timeout + INTERVAL) {
              fallback(storeURL);
            }
          }, timeout);
        }

        function web2appViaIntentURI(launchURI) {
          if (ua.browser.chrome) {
            move();
          } else {
            setTimeout(move, 100);
          }

          function move() {
            top.location.href = launchURI;
          }
        }

        function web2appViaCustomUrlSchemeForIOS(urlScheme, storeURL, fallback, universalLink) {
          var tid = deferFallback(TIMEOUT_IOS, storeURL, fallback);
          if (parseInt(ua.os.version.major, 10) < 8) {
            bindPagehideEvent(tid);
          } else {
            bindVisibilityChangeEvent(tid);
          }

          if (isSupportUniversalLinks()) {
            if (universalLink === undefined) {
              universalLink = urlScheme;
            } else {
              clearTimeout(tid);
            }
            launchAppViaChangingLocation(universalLink);
          } else {
            launchAppViaHiddenIframe(urlScheme);
          }
        }

        function bindPagehideEvent(tid) {
          window.addEventListener('pagehide', function clear() {
            if (isPageVisible()) {
              clearTimeout(tid);
              window.removeEventListener('pagehide', clear);
            }
          });
        }

        function bindVisibilityChangeEvent(tid) {
          document.addEventListener('visibilitychange', function clear() {
            if (isPageVisible()) {
              clearTimeout(tid);
              document.removeEventListener('visibilitychange', clear);
            }
          });
        }

        function isPageVisible() {
          var attrNames = ['hidden', 'webkitHidden'];
          for (var i = 0, len = attrNames.length; i < len; i++) {
            if (typeof document[attrNames[i]] !== 'undefined') {
              return !document[attrNames[i]];
            }
          }
          return true;
        }

        function launchAppViaChangingLocation(urlScheme) {
          window.top.location.href = urlScheme;
        }

        function launchAppViaHiddenIframe(urlScheme) {
          setTimeout(function () {
            var iframe = createHiddenIframe('appLauncher');
            iframe.src = urlScheme;
          }, 100);
        }

        function createHiddenIframe(id) {
          var iframe = document.createElement('iframe');
          iframe.id = id;
          iframe.style.border = 'none';
          iframe.style.width = '0';
          iframe.style.height = '0';
          iframe.style.display = 'none';
          iframe.style.overflow = 'hidden';
          document.body.appendChild(iframe);
          return iframe;
        }

        function isSupportUniversalLinks() {
          return parseInt(ua.os.version.major, 10) > 8 && ua.os.ios;
        }

        /**
         * app.을 실행하거나 / store 페이지에 연결하여 준다.
         * @function
         * @param context {object} urlScheme, intentURI, storeURL, appName, onAppMissing, onUnsupportedEnvironment, willInvokeApp
         * @example daumtools.web2app({ urlScheme : 'daumapps://open', intentURI : '', storeURL: 'itms-app://...', appName: '다음앱' });
         */
        return web2app;
      }();
    }, { "./userAgent.js": 17 }] }, {}, [9])(9);
});