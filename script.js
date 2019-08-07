// console.log('test');
(function fn() {
    var currentPlayer = 'player1';
    var firstPlayersScore = 0;
    var secondPlayersScore = 0;
    var table;
    start();

    function start(){
    //secting column
        $('.column').on('click', function clk(e){
            var slotsInColumn = $(e.currentTarget).find('.slot');

            for( var i = 5; i>=0; i--){
                var slotInColumn = slotsInColumn.eq(i);
                if (
                    !slotInColumn.hasClass('player1')
				&&
				!slotInColumn.hasClass('player2')
                ){
                    slotInColumn.addClass(currentPlayer);
                    break;
                }
            }
            if (i == -1){
            //column was full
                return;
            }

            var slots = $('.column').find('.slot');
            columnToRowTranslation(slots);

            checkForVictory();
            //do victory dance;

            switchPlayers();
        });

    }

    function switchPlayers(){
        if (currentPlayer == 'player1'){
            currentPlayer = 'player2';
        } else {
            currentPlayer ='player1';
        }
    }

    function createNewTable() {
        var table;
        //defining rows as arrays
        var r00 = '&', r01 = '&', r02 = '&', r03 = '&', r04 = '&', r05 = '&', r06 = '&';
        var r0 = [r00, r01, r02, r03, r04, r05, r06];
        var r10 = '&', r11 = '&', r12 = '&', r13 = '&', r14 = '&', r15 = '&', r16 = '&';
        var r1 = [r10, r11, r12, r13, r14, r15, r16];
        var r20 = '&', r21 = '&', r22 = '&', r23 = '&', r24 = '&', r25 = '&', r26 = '&';
        var r2 = [r20, r21, r22, r23, r24, r25, r26];
        var r30 = '&', r31 = '&', r32 = '&', r33 = '&', r34 = '&', r35 = '&', r36 = '&';
        var r3 = [r30, r31, r32, r33, r34, r35, r36];
        var r40 = '&', r41 = '&', r42 = '&', r43 = '&', r44 = '&', r45 = '&', r46 = '&';
        var r4 = [r40, r41, r42, r43, r44, r45, r46];
        var r50 = '&', r51 = '&', r52 = '&', r53 = '&', r54 = '&', r55 = '&', r56 = '&';
        var r5 = [r50, r51, r52, r53, r54, r55, r56];
        console.log(table);
        //defining table matrixes
        return table = [
            r0, r1, r2, r3, r4, r5
        ];

    }

    function columnToRowTranslation(slots){
        table = createNewTable();
        var o = 'o';
        var x = 'x';
        for(var l = 5; l >= 0; l--){
            for(var k = 0; k <= 6; k++){
                if (slots.eq(l+6*k).hasClass('player1')){
                    table[5-l][k] = o;
                }
                if (slots.eq(l+6*k).hasClass('player2')){
                    table[5-l][k] = x;
                }
            }
        }
        console.log(table);
    }

    function congratulations(winner, slots) {

        var id = '#dialog';

        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        $('#maske').css({'width':maskWidth,'height':maskHeight});

        $('#maske').fadeIn(500);
        $('#maske').fadeTo("slow",0.9);

        var winH = $(window).height();
        var winW = $(window).width();

        $(id).css('top',  winH/2-$(id).height()/2);
        $(id).css('left', winW/2-$(id).width()/2);


        $(id).fadeIn(2000);
        $('#show-winner').html(winner+' won!!!');
        if (winner == 'First Player'){
            $('#maske').css('background-color', '#008000');
            firstPlayersScore++;
            $('#firstPlayersScore').html(firstPlayersScore);
            switchPlayers();
        }
        if (winner == 'Second Player'){
            $('#maske').css('background-color', '#A233FF');
            secondPlayersScore++;
            $('#secondPlayersScore').html(secondPlayersScore);
        }


        $('#dialog').click(function (e) {
            e.preventDefault();

            $('#maske').hide();
            $('.window').hide();
            clearClass(slots, fn);
        });

        // $('#maske').click(function () {
        //     $(this).hide();
        //     $('.window').hide();
        // });

    }

    function clearClass(clx, fn){
        for( var i = 0; i < 42; i++){
            if (clx.hasClass('player1') || clx.hasClass('player2')){
                clx.removeClass('player1');
                clx.removeClass('player2');
                // var slots = $('.column').find('.slot');
                start();
            }
        }
    }

    function checkForVictory(){
        var check='';
        var victory;
        var slots = $('.column').find('.slot');
        // columnToRowTranslation(slots);

        //checking for horizontally
        for (var m = 0; m < 3; m++){
            for (var n = 0; n < 4; n++){
                for (var r = 0; r < 4; r++){
                    for (var c = 0; c < 4; c++){
                        check += table[r+m][c+n];
                        // console.log('horizontally before clear: '+check);
                        if (check == 'oooo' ){
                            //make here some good animation
                            //add decision of indexes to be able to show
                            console.log("Congratulation!!! First Player Won.");
                            // alert("Congratulation!!! First Player Won.");
                            $('.column').off('click');
                            victory = 'First Player';
                            congratulations(victory, slots);
                            return;
                        }
                        if (check == 'xxxx' ){
                            //make here some good animation
                            //add decision of indexes to be able to show
                            console.log("Congratulation!!! Second Player Won.");
                            // alert("Congratulation!!! Second Player Won.");
                            $('.column').off('click');
                            victory = 'Second Player';
                            congratulations(victory, slots);
                            return;
                        }
                        if (check.length >= 4) {
                            // console.log('check is cleared.');
                            check = "";
                        }
                        // console.log('horizontally after clear: '+check);
                    }
                }
            }
        }

        //checking for vertically
        for (m = 0; m < 3; m++){
            for (n = 0; n < 4; n++){
                for (c = 0; c < 4; c++){
                    for (r = 0; r < 4; r++){
                        check += table[r+m][c+n];
                        // console.log('vertically before clear: '+check);
                        if (check == 'oooo' ){
                            //make here some good animation
                            //add decision of indexes to be able to show
                            console.log("Congratulation!!! First Player Won.");
                            // alert("Congratulation!!! First Player Won.");
                            $('.column').off('click');
                            victory = 'First Player';
                            congratulations(victory, slots);
                            return;
                        }
                        if (check == 'xxxx' ){
                            //make here some good animation
                            //add decision of indexes to be able to show
                            console.log("Congratulation!!! Second Player Won.");
                            // alert("Congratulation!!! Second Player Won.");
                            $('.column').off('click');
                            victory = 'Second Player';
                            congratulations(victory, slots);
                            return;
                        }
                        if (check.length >= 4) {
                            // console.log('check is cleared.');
                            check = "";
                        }
                        // console.log('vertically after clear: '+check);
                    }
                }
            }
        }

        //checking for diagonally (\ type control)
        for (m = 0; m < 3; m++){
            for (n = 0; n < 4; n++){
                for (var i = 0; i < 4; i++){
                    check += table[m+i][n+i];
                    // console.log('diagonally before clear: '+check);
                    if (check == 'oooo' ){
                        //make here some good animation
                        //add decision of indexes to be able to show
                        console.log("Congratulation!!! First Player Won.");
                        // alert("Congratulation!!! First Player Won.");
                        $('.column').off('click');
                        victory = 'First Player';
                        congratulations(victory, slots);
                        return;
                    }
                    if (check == 'xxxx' ){
                        //make here some good animation
                        //add decision of indexes to be able to show
                        console.log("Congratulation!!! Second Player Won.");
                        // alert("Congratulation!!! Second Player Won.");
                        $('.column').off('click');
                        victory = 'Second Player';
                        congratulations(victory, slots);
                        return;
                    }
                    if (check.length >= 4) {
                        // console.log('check is cleared.');
                        check = "";
                    }
                    // console.log('diagonally after clear: '+check);
                }
            }
        }

        //checking for diagonally (/ type control)
        for (m = 0; m < 3; m++){
            for (n = 0; n < 4; n++){
                for (var k = 3; k >= 0; k--){
                    check += table[k+m][n+3-k];
                    // console.log('diagonally before clear: '+check);
                    if (check == 'oooo' ){
                        //make here some good animation
                        //add decision of indexes to be able to show
                        console.log("Congratulation!!! First Player Won.");
                        // alert("Congratulation!!! First Player Won.");
                        $('.column').off('click');
                        victory = 'First Player';
                        congratulations(victory, slots);
                        return;
                    }
                    if (check == 'xxxx' ){
                        //make here some good animation
                        //add decision of indexes to be able to show
                        console.log("Congratulation!!! Second Player Won.");
                        // alert("Congratulation!!! Second Player Won.");
                        $('.column').off('click');
                        victory = 'Second Player';
                        congratulations(victory, slots);
                        return;
                    }
                    if (check.length >= 4) {
                        // console.log('check is cleared.');
                        check = "";
                    }
                    // console.log('diagonally after clear: '+check);
                }
            }
        }
        return;
        // var str = '';
        // for (var i = 0; i < slots.length; i++){
        //     if (slots.eq(i).hasClass(currentPlayer)){
        //         str += 'o';
        //     } else {
        //         str += 'x';
        //     }
        //
        // }
        // return str.indexOf('oooo') > -1;
    }
})();
