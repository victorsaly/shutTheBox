let _ = require('lodash');
let c = require('js-combinatorics')
/* Models */
var tileModel = {
    isAvailable: false,
    isInUse: false,
    isTaken: false,
    isCollateral: false,
    isExplosion: false,
    action: '',
    cssClass: 'bg-blue-light'
}
export default {
    /* move items from an array randomly */
    shuffle: function (obj) {
        if (!_.isObject(obj)) {
            return obj;
        } else {
            return _.shuffle(obj);
        }
    },
    shuffleTiles: function (tiles) {
        return _.map(tiles, this.shuffle);
    },
    /* create initial tiles */
    createTiles: function (numberTiles, columns, isRandom) {
        
        var tile = [];
        for (var i = 0; i < numberTiles; i++) {
            tile.push(_.extend({ index: i + 1, id: this.createGuid() }, tileModel));
        }
        tile = _.map(tile, this.cssClassColour);
        var tiles = [];
        for (var i = 0; i < columns; i++) {

            tiles.push(this.shuffle(tile));
        }

        var _tiles = [];
        for (var i = 0; i < tiles.length; i++) {
            var _tile = [];
            for (var x = 0; x < tiles[i].length; x++) {
                var copy = Object.assign({}, tiles[i][x]);
                copy.id = this.createGuid();
                copy.isTaken = isRandom ? _.sample([true,false]) : false; //;
                copy.isAvailable = copy.isTaken;
                _tile.push(copy);
            }
            _tiles.push(_tile);
        }
        return _tiles;
    },
    /* create guid */
    createGuid: function () {
        return this.guidByteGenerator() + this.guidByteGenerator() + '-' + this.guidByteGenerator() + '-' + this.guidByteGenerator() + '-' +
            this.guidByteGenerator() + '-' + this.guidByteGenerator() + this.guidByteGenerator() + this.guidByteGenerator();
    },
    guidByteGenerator: function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    },
    /* assigned colours */
    cssClassColour: function (tile) {
        switch (tile.index) {
            case 1:
                tile.cssClass = 'bg-green-lighter';
                break;
            case 2:
                tile.cssClass = 'bg-purple-lighter';
                break;
            case 3:
                tile.cssClass = 'bg-blue-light';
                break;
            case 4:
                tile.cssClass = 'bg-purple-light';
                break;
            case 5:
                tile.cssClass = 'bg-yellow-lighter';
                break;
            case 6:
                tile.cssClass = 'bg-indigo-lighter';
                break;
            case 7:
                tile.cssClass = 'bg-red-light';
                break;
            case 8:
                tile.cssClass = 'bg-red-lighter';
                break;
            case 9:
                tile.cssClass = 'bg-yellow-light';
                break;
        }
        return tile;
    },
    moveTile: function (tiles, id) {
        return _.sortBy(tiles, function (item) {
            return (item.id === id || item.isTaken) ? 1 : 0;
        });
    },
    isMobile: function () {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        }
        else {
            return false;
        }
    },
    sumString: function(text) {
        var result = 0;
        if (text != undefined){
            return _.sumBy(text.split(''), function(x){
                     return parseFloat(x)
             })
        }
        return result || 0;
      },
    getTilesCombinations: function (tiles, sum) {
        /* find the playable tiles */
        let tilesPlayableNonUnique = _.sortBy(_.filter(_.map(
                _.flatMapDeep(tiles,
                function (n) {
                    return _.flatMapDeep(n, function (i) {
                        if (!i.isInUse && !i.isTaken && i.index <= sum){
                            return i.index
                        }else{
                            return false
                        }
                            
                    })
                })
            , function (value, index) {
                return value;
            }), function(n){
                    //console.log(n);
                    return n;
            }), function(n){
                //console.log(n);
                return n;
        })

        let groupByNumber = _.groupBy(tilesPlayableNonUnique, Math.floor);
       

        var reduceListTilesNumbers = [];
        
        _.each(groupByNumber, function(numbers, index){
            var reduceTileNumber = [];
            var sumNumbers = 0;
            _.each(numbers, function(n){
                sumNumbers += n;
                if (sumNumbers<=sum){
                    reduceTileNumber.push(n);
                }
            })
            if (reduceTileNumber.length > 1){
                reduceListTilesNumbers.push(reduceTileNumber);
            }
        })

        /* find the playable tiles */
        let tilesPlayable = 
        // remove undefined values
        _.without(
            // distinct values
            _.uniq(
                // flat arrays into one
                _.flatMapDeep(tiles,
                function (n) {
                    // filter by allowed indexes tiles numbers
                    return _.flatMapDeep(n, function (i) {
                        if (!i.isInUse && !i.isTaken)
                            return i.index
                    })
                })
                ), undefined)
            

         // console.log(tilesPlayable)
         var combinationDupeNumbers = 
         // get only unique arrays
         _.uniqWith(
             c.power(
            // flatten tiles to the same level [1],[1] => { 1, 1} 
            _.flatMapDeep(reduceListTilesNumbers)).lazyFilter(function (a) {
             //Lazy filter (after loading data) looping and filtering only items that match
             return _.toSafeInteger(_.sum(a)) == sum;
           }).toArray(), 
           _.isEqual);

           //console.log(combinationDupeNumbers);

           var tilesPlayableNumbers = 
         // get only unique arrays
         _.uniqWith(
             c.power(
            // flatten tiles to the same level [1],[1] => { 1, 1} 
            _.flatMapDeep(tilesPlayable)).lazyFilter(function (a) {
             //Lazy filter (after loading data) looping and filtering only items that match
             return _.toSafeInteger(_.sum(a)) == sum;
           }).toArray(), 
           _.isEqual);
         
        return _.concat(tilesPlayableNumbers, combinationDupeNumbers);

    },
    getTilesIndexCombinations: function (tiles, sum) {

         /* find the playable tiles */
         let tilesPlayable = 
         // remove undefined values
         _.without(
             // distinct values
             _.uniq(
                 // flat arrays into one
                 _.flatMapDeep(tiles,
                 function (n) {
                     // filter by allowed indexes tiles numbers
                     return _.flatMapDeep(n, function (i) {
                         if (!i.isInUse && !i.isTaken)
                             return i.index
                     })
                 })
                 ), undefined)


        /* find the playable tiles */
        let tilesPlayableNonUnique = _.sortBy(_.filter(_.map(
                _.flatMapDeep(tiles,
                function (n) {

                    return _.flatMapDeep(n, function (i) {
                        if (!i.isInUse && !i.isTaken && i.index <= sum){
                            return i.index
                        }else{
                            return false
                        }
                            
                    })
                })
            , function (value, index) {
                return value;
            }), function(n){
                    return n;
            }), function(n){
                return n;
        })


        var tilesPlayableNumbers = 
        // get only unique arrays
        _.uniqWith(
            c.power(
           // flatten tiles to the same level [1],[1] => { 1, 1} 
           _.flatMapDeep(tilesPlayable)).lazyFilter(function (a) {
            //Lazy filter (after loading data) looping and filtering only items that match
            return _.toSafeInteger(_.sum(a)) == sum;
          }).toArray(), 
          _.isEqual);
       

        let groupByNumber = _.groupBy(tilesPlayableNonUnique, Math.floor);
       

        var reduceListTilesNumbers = [];
        
        _.each(groupByNumber, function(numbers, index){
            var reduceTileNumber = [];
            var sumNumbers = 0;
            _.each(numbers, function(n){
                sumNumbers += n;
                if (sumNumbers<=sum){
                    reduceTileNumber.push(n);
                }
            })
            if (_.intersection(_.flatMap(tilesPlayableNumbers),reduceTileNumber).length == 0){
                reduceListTilesNumbers.push(reduceTileNumber);
            }
        })
       
            
         var combinationDupeNumbers = 
         // get only unique arrays
         _.uniqWith(
             c.power(
            // flatten tiles to the same level [1],[1] => { 1, 1} 
            _.flatMapDeep(reduceListTilesNumbers)).lazyFilter(function (a) {
             //Lazy filter (after loading data) looping and filtering only items that match
             return _.toSafeInteger(_.sum(a)) == sum;
           }).toArray(), 
           _.isEqual);


        return _.uniq(_.flatMapDeep(_.concat(tilesPlayableNumbers, combinationDupeNumbers)));

    }
};

