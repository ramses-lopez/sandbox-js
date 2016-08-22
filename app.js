var fs = require('fs')
var _ = require('lodash')
var inspect = require('util').inspect
var _log = (t) => console.log(inspect(t, {colors: true, depth: Infinity}))

var tbc =
	fs.readFileSync('data/teams_by_category.json', 'utf8')

tbc = JSON.parse(tbc)

r = _.chain(tbc.data)
    .groupBy("team.name")
    .toPairs()
    // .map(function(currentItem) {
    //     delete currentItem.team
    //     return currentItem
    //     // return _.object(_.zip(["color", "users"], currentItem));
    // })
    .value();


// var r = _.groupBy(tbc.data, function(t){
// 	//el group by pone como key del objeto lo retornado de esta funcion

// 	// return 'a'
// 	return t.team_id
// })

_log(r)

process.exit(0)