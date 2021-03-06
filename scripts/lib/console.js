/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mephisto.
 *
 * The Initial Developer of the Original Code is
 * Temesis SARL.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Olivier Meunier <olivier.meunier@temesis.com> (Original Author)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

// This module allows you to filter console logs by level. If you don't want
// to see all debug output, you can set a preference with desired log level:
//
// extensions.mephisto.logLevel
//

var ERROR = 0x1;
var WARN = 0x2;
var INFO = 0x4;
var DEBUG = 0x8;

var LEVELS = {
    'NONE': 0,
    'ERROR': ERROR,
    'WARN' : ERROR | WARN,
    'INFO' : ERROR | WARN | INFO,
    'DEBUG': ERROR | WARN | INFO | DEBUG
};

function log_wrapp(func, current_level, log_level, level_name) {
    if (current_level & log_level) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(new Date().toString(), level_name);
            return func.apply(null, args);
        }
    }
    return function() {};
}

exports.ConsoleLogger = function(current_level) {
    current_level = LEVELS[(new String(current_level)).toUpperCase()] || LEVELS.INFO;

    console.debug = log_wrapp(console.debug, current_level, DEBUG, "debug");
    console.log = log_wrapp(console.log, current_level, INFO, "info");
    console.info = log_wrapp(console.info, current_level, INFO, "info");
    console.warn = log_wrapp(console.warn, current_level, WARN, "warn");
    console.error = log_wrapp(console.error, current_level, ERROR, "error");
};
