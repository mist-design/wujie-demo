<script setup lang="ts">
const  plugins = [
    {
      appendOrInsertElementHook: function (element, iframeWindow) {
        if (element.offsetParent && element.offsetParent.tagName !== "BODY") {
          return;
        }
        const offsetParentDesc = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetParent");
        debugger;
        Object.defineProperties(element, {
          offsetParent: {
            configurable: true,
            get: function () {
              const offsetParent = offsetParentDesc.get.call(this);
              if ((offsetParent && offsetParent.tagName !== "BODY") || element.style.position !== "fixed") {
                return offsetParent;
              }
              return new Proxy(window.document.documentElement, {
                get: (target, propKey) => {
                  if (propKey === "parentNode") {
                    return iframeWindow.document.documentElement.parentNode;
                  }
                  const value = target[propKey];
                  const naughtySafari = typeof document.all === "function" && typeof document.all === "undefined";
                  // 只有这些场景下才需要 bind
                  if (
                    (naughtySafari
                      ? typeof value === "function" && typeof value !== "undefined"
                      : typeof value === "function") &&
                    !(value.name.indexOf("bound ") === 0 && !value.hasOwnProperty("prototype"))
                  ) {
                    const boundValue = Function.prototype.bind.call(value, target);
                    for (const key in value) {
                      boundValue[key] = value[key];
                    }
                    if (value.hasOwnProperty("prototype") && !boundValue.hasOwnProperty("prototype")) {
                      Object.defineProperty(boundValue, "prototype", {
                        value: value.prototype,
                        enumerable: false,
                        writable: true,
                      });
                    }
                    return boundValue;
                  }
                  return value;
                },
              });
            },
          },
        });
      },
    },
  ]
</script>

<template>
  <div>
   <wujie-vue name="app" url="//localhost:8899/" :plugins="plugins"></wujie-vue>
  </div>
</template>

<style scoped>

</style>
