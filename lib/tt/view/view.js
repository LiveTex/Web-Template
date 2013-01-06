/**
 * TUNA FRAMEWORK
 *
 * Copyright (c) 2012, Sergey Kononenko
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * * Names of contributors may be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL SERGEY KONONENKO BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @param {string} type Тип объекта управления отображением.
 * @param {tt.view.ITemplateViewHelper} helper Объект свойств управления.
 * @return {tt.view.ITemplateView} Объект управления отображением.
 */
tt.view.createView = function(type, helper) {
  if (type === tt.view.TextView.NAME) {
    return new tt.view.TextView();
  }

  if (type === tt.view.AttributeView.NAME &&
      helper instanceof tt.view.AttributeViewHelper) {
    return new tt.view.AttributeView(helper);
  }

  if (type === tt.view.ListView.NAME &&
      helper instanceof tt.view.ListViewHelper) {
    return new tt.view.ListView(helper);
  }

  if (type === tt.view.CaseView.NAME &&
      helper instanceof tt.view.CaseViewHelper) {
    return new tt.view.CaseView(helper);
  }

  return null;
};


/**
 *
 * @param {string} type Тип объекта управления отображением.
 * @param {!Object.<string, string>} data Данные настроек.
 * @param {!tt.rule.TemplateRule} rule Объект правила трансформации.
 * @return {tt.view.ITemplateViewHelper} Объект настроек.
 */
tt.view.createViewHelper = function(type, data, rule) {
  if (type === tt.view.ListView.NAME) {
    var itemRules = [].concat(data['item-rules']);
    var itemRenderer =
        document.getElementById(String(data['item-renderer-id']));

    if (itemRenderer !== null) {
      itemRenderer.removeAttribute('id');

      return new tt.view.ListViewHelper(itemRenderer, itemRules);
    }
  }

  if (type === tt.view.AttributeView.NAME) {
    return new tt.view.AttributeViewHelper(String(data['name']));
  }

  if (type === tt.view.CaseView.NAME) {
    var cases = [];
    var caseClasses = [];
    var regExps = [];
    var regExpClasses = [];

    for (var key in data) {
      if (key.charAt(0) === '"') {
        cases.push(key.substr(1, key.length - 2));
        caseClasses.push(data[key]);
      } else if (key.charAt(0) === '/') {
        regExps.push(new RegExp(key.substr(1, key.length - 2)));
        regExpClasses.push(data[key]);
      }
    }

    return new tt.view.CaseViewHelper(
        cases, caseClasses, regExps, regExpClasses);
  }

  return null;
};