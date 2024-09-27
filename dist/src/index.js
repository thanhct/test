"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
_export_star(require("./interfaces/test-options.interface"), exports);
_export_star(require("./test.constant"), exports);
_export_star(require("./test.module"), exports);
_export_star(require("./test.service"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
