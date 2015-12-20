'use strict';

module.exports = function(){
  var knex = require('knex')({
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'Mathews',
      password : 'password',
      database : 'gpldb'
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
