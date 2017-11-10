/*
* @Author: Lich_Amnesia
* @Date:   2017-11-10 10:31:33
* @Last Modified by:   Lich_Amnesia
* @Last Modified time: 2017-11-10 14:58:50
*/


function appendItem(rowid, name, godscore, winrate, total_games, wolves_games, wolves_winrate, 
                goodman_games, goodman_winrate, civilian_games, civilian_winrate, 
                foreteller_games, foreteller_winrate, witch_games, witch_winrate, 
                hunter_games, hunter_winrate, idiot_games, idiot_winrate) {
    var newtr = document.createElement('tr');
    var newtd;
    // add checkbox for the first row.
    newtd = document.createElement('td');
    newlabel = document.createElement('label');
    newlabel.classList.add('mdl-checkbox', 'mdl-js-checkbox', 'mdl-js-ripple-effect', 'mdl-data-table__select', 'mdl-js-ripple-effect--ignore-events', 'is-upgraded');
    newlabel.setAttribute('data-upgraded', ',MaterialCheckbox,MaterialRipple');
    var att = document.createAttribute('for');       // Create a "class" attribute
    att.value = 'row[' + rowid + ']'; 
    newlabel.setAttributeNode(att); 
    
    newinput = document.createElement('input');
    newinput.classList.add('mdl-checkbox__input');
    newinput.setAttribute('type', 'checkbox');
    newinput.setAttribute('id', att.value);
    newlabel.appendChild(newinput);

    // <span class="mdl-checkbox__focus-helper"></span>
    newspan = document.createElement('span');
    newspan.classList.add('mdl-checkbox__focus-helper');
    newlabel.appendChild(newspan);
    
     newspan = document.createElement('span');
    newspan.classList.add('mdl-checkbox__box-outline');
    newnewsspan = document.createElement('span');
    newnewsspan.classList.add('mdl-checkbox__tick-outline');
    newspan.appendChild(newnewsspan);
    newlabel.appendChild(newspan);

    newspan = document.createElement('span');
    newspan.classList.add('mdl-checkbox__ripple-container', 'mdl-js-ripple-effect', 'mdl-ripple--center');
    newinput.setAttribute('data-upgraded', ',MaterialRipple');
    newnewsspan = document.createElement('span');
    newnewsspan.classList.add('mdl-ripple');
    newspan.appendChild(newnewsspan);
    newlabel.appendChild(newspan);

    newtd.appendChild(newlabel);
    newtr.appendChild(newtd);
    

    // add name
    newtd = document.createElement('td');
    newtd.classList.add('mdl-data-table__cell--non-numeric');
    newtd.classList.add('name');
    newtd.innerHTML = name;
    newtr.appendChild(newtd);
    // add godscore
    newtd = document.createElement('td');
    newtd.classList.add('godscore');
    newtd.innerHTML = godscore;
    newtr.appendChild(newtd);
    // add winrate
    newtd = document.createElement('td');
    newtd.classList.add('winrate');
    newtd.innerHTML = winrate;
    newtr.appendChild(newtd);
    // add total games
    newtd = document.createElement('td');
    newtd.classList.add('total_games');
    newtd.innerHTML = total_games;
    newtr.appendChild(newtd);

    // add wolves_games
    newtd = document.createElement('td');
    newtd.classList.add('wolves_games');
    newtd.innerHTML = wolves_games;
    newtr.appendChild(newtd);

    // add wolves_winrate
    newtd = document.createElement('td');
    newtd.classList.add('wolves_winrate');
    newtd.innerHTML = wolves_winrate;
    newtr.appendChild(newtd);

    // add goodman_games
    newtd = document.createElement('td');
    newtd.classList.add('goodman_games');
    newtd.innerHTML = goodman_games;
    newtr.appendChild(newtd);

    // add goodman_winrate
    newtd = document.createElement('td');
    newtd.classList.add('goodman_winrate');
    newtd.innerHTML = goodman_winrate;
    newtr.appendChild(newtd);

    // add civilian_games
    newtd = document.createElement('td');
    newtd.classList.add('civilian_games');
    newtd.innerHTML = civilian_games;
    newtr.appendChild(newtd);

    // add civilian_winrate
    newtd = document.createElement('td');
    newtd.classList.add('civilian_winrate');
    newtd.innerHTML = civilian_winrate;
    newtr.appendChild(newtd);

    // add foreteller_games
    newtd = document.createElement('td');
    newtd.classList.add('foreteller_games');
    newtd.innerHTML = foreteller_games;
    newtr.appendChild(newtd);

    // add foreteller_winrate
    newtd = document.createElement('td');
    newtd.classList.add('foreteller_winrate');
    newtd.innerHTML = foreteller_winrate;
    newtr.appendChild(newtd);

    // add witch_games
    newtd = document.createElement('td');
    newtd.classList.add('witch_games');
    newtd.innerHTML = witch_games;
    newtr.appendChild(newtd);

    // add witch_winrate
    newtd = document.createElement('td');
    newtd.classList.add('witch_winrate');
    newtd.innerHTML = witch_winrate;
    newtr.appendChild(newtd);

    // add hunter_games
    newtd = document.createElement('td');
    newtd.classList.add('hunter_games');
    newtd.innerHTML = hunter_games;
    newtr.appendChild(newtd);

    // add hunter_winrate
    newtd = document.createElement('td');
    newtd.classList.add('hunter_winrate');
    newtd.innerHTML = hunter_winrate;
    newtr.appendChild(newtd);

    // add idiot_games
    newtd = document.createElement('td');
    newtd.classList.add('idiot_games');
    newtd.innerHTML = idiot_games;
    newtr.appendChild(newtd);

    // add idiot_winrate
    newtd = document.createElement('td');
    newtd.classList.add('idiot_winrate');
    newtd.innerHTML = idiot_winrate;
    newtr.appendChild(newtd);

    mainlist.appendChild(newtr);

}
        
var data;
$(document).ready(function(e) {
    $.getJSON( 'static/data.json' , function( result ){
        data = result.table.rows;
        var _id = 0;
        data.forEach(function(element) {
            _id ++;
            var arr = element.c;
            var name = arr[0].v;
            var godscore = 0;
            var score = 0;
            var total_games = 0;
            var wolves_games = 0;
            var win_wolves_games = 0;
            var goodman_games = 0, win_goodman_games = 0;
            var civilian_games = 0, win_civilian_games = 0;
            var foreteller_games = 0, win_foreteller_games = 0;
            var witch_games = 0, win_witch_games = 0;
            var hunter_games = 0, win_hunter_games = 0;
            var idiot_games = 0, win_idiot_games = 0;
            for (var _i = 2; _i < arr.length - 5; _i += 2) {
                godscore += arr[_i].v;
                if (arr[_i - 1] != null && arr[_i - 1].v != '上帝') {
                    score += arr[_i].v;
                    total_games ++;
                }
                if (arr[_i - 1] != null && (arr[_i - 1].v == '狼人' || arr[_i - 1].v == '白狼王')) {
                    win_wolves_games += arr[_i].v;
                    wolves_games ++;
                }
                // 好人场数和胜率
                if (arr[_i - 1] != null && arr[_i - 1].v != '狼人' && arr[_i - 1].v != '白狼王' && arr[_i - 1].v != '上帝') {
                    win_goodman_games += arr[_i].v;
                    goodman_games ++;
                }
                // 平民场数和胜率
                if (arr[_i - 1] != null && (arr[_i - 1].v == '平民' )) {
                    win_civilian_games += arr[_i].v;
                    civilian_games ++;
                }
                // 预言家场数胜率
                if (arr[_i - 1] != null && (arr[_i - 1].v == '预言家' )) {
                    win_foreteller_games += arr[_i].v;
                    foreteller_games ++;
                }
                // 女巫场数胜率
                if (arr[_i - 1] != null && (arr[_i - 1].v == '女巫' )) {
                    win_witch_games += arr[_i].v;
                    witch_games ++;
                }
                // 猎人场数胜率
                if (arr[_i - 1] != null && (arr[_i - 1].v == '猎人' )) {
                    win_hunter_games += arr[_i].v;
                    hunter_games ++;
                }
                // 白痴场数胜率
                if (arr[_i - 1] != null && (arr[_i - 1].v == '白痴' )) {
                    win_idiot_games += arr[_i].v;
                    idiot_games ++;
                }
            }
            // add win rate
            if (total_games >= 3) {
                var winrate = ((score / total_games) * 100).toFixed(2) + '%'; 
            } else {
                var winrate = ((0 / total_games) * 100).toFixed(2) + '%'; 
            } 
            // add wolves_games
            if (wolves_games == 0) {
                var wolves_winrate = (0 * 100).toFixed(2) + '%';
            } else {
                var wolves_winrate = ((win_wolves_games / wolves_games) * 100).toFixed(2) + '%'; 
            }
            // add 好人胜率
            if (goodman_games == 0) {
                var goodman_winrate = (0 * 100).toFixed(2) + '%';
            } else {
                var goodman_winrate = ((win_goodman_games / goodman_games) * 100).toFixed(2) + '%'; 
            }
            
            // add 平民胜率
            if (civilian_games == 0) {
                var civilian_winrate = (0 * 100).toFixed(2) + '%';
            } else {
                var civilian_winrate = ((win_civilian_games / civilian_games) * 100).toFixed(2) + '%';  
            }
            
            // add 预言家胜率
            if (foreteller_games == 0) {
                var foreteller_winrate = (0 * 100).toFixed(2) + '%';
            } else {
                var foreteller_winrate = ((win_foreteller_games / foreteller_games) * 100).toFixed(2) + '%';   
            }
            
            // add 女巫胜率
            if (witch_games == 0) {
                var witch_winrate = (0 * 100).toFixed(2) + '%';
            } else {
                var witch_winrate = ((win_witch_games / witch_games) * 100).toFixed(2) + '%';    
            }
            
            // add 猎人胜率
            if (hunter_games == 0) {
                var hunter_winrate = (0 * 100).toFixed(2) + '%';
            } else {
                var hunter_winrate = ((win_hunter_games / hunter_games) * 100).toFixed(2) + '%';   
            }
            
            // add 白痴胜率
            if (idiot_games == 0) {
                var idiot_winrate = (0 * 100).toFixed(2) + '%';
            } else {
                var idiot_winrate = ((win_idiot_games / idiot_games) * 100).toFixed(2) + '%';    
            }
            

            appendItem(_id, name, godscore, winrate, total_games, wolves_games, wolves_winrate, 
                goodman_games, goodman_winrate, civilian_games, civilian_winrate, 
                foreteller_games, foreteller_winrate, witch_games, witch_winrate, 
                hunter_games, hunter_winrate, idiot_games, idiot_winrate);
            // console.log(name, godscore, score, total_games, winrate);
        });
        // console.log(data[0].c);

        var options = {
                valueNames: ['name', 'godscore', 'winrate', 'total_games', 'wolves_games', 'wolves_winrate', 'goodman_games', 'goodman_winrate', 'civilian_games', 'civilian_winrate', 'foreteller_games', 'foreteller_winrate', 'witch_games', 'witch_winrate', 'hunter_games', 'hunter_winrate', 'idiot_games', 'idiot_winrate']
        };
        var documentTable = new List('mdl-table', options);
        
        addCheckBoxTrigger(); 

    });


});




// $($('th.sort')[0]).trigger('click', function () {
//     console.log('clicked');
// });

$('input.search').on('keyup', function (e) {
    if (e.keyCode === 27) {
        $(e.currentTarget).val('');
        documentTable.search('');
    }
});



var checkBoxes = table.querySelectorAll('tbody .mdl-data-table__select');
function addCheckBoxTrigger() {
    var table = document.querySelector('table');
    var headerCheckbox = table.querySelector('thead .mdl-data-table__select input');
    var boxes = table.querySelectorAll('tbody .mdl-data-table__select');
    var headerCheckHandler = function(event) {
      if (event.target.checked) {
        for (var i = 0, length = boxes.length; i < length; i++) {
          boxes[i].classList.add('is-checked');
          boxes[i].parentElement.parentElement.style.backgroundColor="#EBEBEB";
        }
      } else {
        for (var i = 0, length = boxes.length; i < length; i++) {
          boxes[i].classList.remove('is-checked')
          boxes[i].parentElement.parentElement.style.backgroundColor="#FFFFFF";
        }
      }
    };
    headerCheckbox.addEventListener('change', headerCheckHandler);

    // Check box for each element.
    checkBoxes = table.querySelectorAll('tbody .mdl-data-table__select');
    checkBoxes.forEach(function(element) {
        element.addEventListener('change', function(event) {
            if (event.target.checked) {
                element.classList.add('is-checked');
                element.parentElement.parentElement.style.backgroundColor="#EBEBEB";
            } else {
                element.classList.remove('is-checked');
                element.parentElement.parentElement.style.backgroundColor="#FFFFFF";
            }
        });
    });

}

