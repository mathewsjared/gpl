'use strict';

module.exports = function(){
  var knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: 'knex,public',
    debug: true
  });

  return function(tableName){
    return function(){
      return knex(tableName);
    };
  };
}();
