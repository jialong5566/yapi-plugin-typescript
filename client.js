import React from 'react';
import TypeScriptShow from './TypeScriptShow';
// import mockCol from './MockCol/mockColReducer.js'

module.exports = function(){
  this.bindHook('interface_tab', function(tabs){
    tabs.TypeScript = {
      name: 'TypeScript',
      component: TypeScriptShow
    }
  })
  // this.bindHook('add_reducer', function(reducerModules){
  //   reducerModules.mockCol = mockCol;
  // })
}