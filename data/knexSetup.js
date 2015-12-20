'use strict';

module.exports = function(){
  var knex = require('knex')({
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'lnitzel',
      password : 'password',
      database : 'gpl'
    },
    searchPath: 'knex,public',
    debug: true
  });

  return function(tableName){
    return function(){
      return knex(tableName);
    };
  };
}();
