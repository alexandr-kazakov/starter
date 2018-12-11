if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/* -------------------------------------------------------------------------
  begin Tagify polyfill
* ------------------------------------------------------------------------- */

(function () {
  if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
      if (typeof start !== 'number') start = 0;

      if (start + search.length > this.length) return false;
      return this.indexOf(search, start) !== -1;
    };
  }

  // ////////////////////////////////////////////////////////////////
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
  if (typeof window.CustomEvent === 'function') return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;

  // ////////////////////////////////////////////////////////////////
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
  //
  if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, 'assign', {
      value: function assign(target, varArgs) {
        // .length of function is 2

        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        const to = Object(target);

        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index];

          if (nextSource != null) {
            // Skip over if undefined or null
            for (const nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true,
    });
  }

  // if (window.NodeList && !NodeList.prototype.forEach) {
  //   NodeList.prototype.forEach = Array.prototype.forEach;
  // }

  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      value(predicate) {
        if (this == null) throw new TypeError('"this" is null or not defined');

        const o = Object(this);

        const len = o.length >>> 0;

        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        const thisArg = arguments[1];

        let k = 0;

        while (k < len) {
          const kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          k++;
        }

        return -1;
      },
      configurable: true,
      writable: true,
    });
  }

  // Avoid transformation text to link ie contentEditable mode
  // https://stackoverflow.com/q/7556007/104380
  document.execCommand('AutoUrlDetect', false, false);
}());

/* -------------------------------------------------------------------------
    end Tagify polyfill
  * ------------------------------------------------------------------------- */
