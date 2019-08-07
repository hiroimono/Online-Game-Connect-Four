// console.log('test');

////////////////// DO NOT TOUCH //////////////////
Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});
////////////////// DO NOT TOUCH //////////////////

(function (){
    $('#submit-button').on('click', function () {
        // console.log('test');
        var userInput = $("input[name='user-input']").val();
        // console.log('User input: ' + userInput);
        var albumOrArtist =$('select').val();
        // console.log('dropdown: ', albumOrArtist);


        $.ajax({
            url: 'https://elegant-croissant.glitch.me/spotify',
            method: 'GET',
            data: {
                query: userInput,
                type: albumOrArtist,
            },
            success: function(response){
                // console.log('response from spotify: ', response);
                response = response.artists || response.albums;
                console.log('response: ', response);
                var html = '';

                if (response.items.length == 0){
                    $('.results-container').html(html);
                    $('#nothing-found').css('display', 'flex');
                } else {
                    $('#nothing-found').css('display', 'none');

                    $(".results-container").html(Handlebars.templates.results(response));

                    for (var i = 0; i < response.items.length; i++){
                        console.log('each result: ', response.items[i].name);

                        var imageUrl = 'http://24.media.tumblr.com/79b617bc1d8a29ffbce4c0a18e2f21d5/tumblr_n28l00KViy1s0r4jho1_400.gif';
                        if (response.items[i].images[0]){
                            imageUrl = response.items[i].images[0].url;
                        }

                        if (response.next){
                            var nextUrl = response.next && response.next.replace(
                                'api.spotify.com/v1/search',
                                'https://elegant-croissant.glitch.me/spotify'
                            );
                            // setTimeout(fn(nextUrl, html), 2000);
                        }
                    }
                }
            }

        });

        // function fn(url, html){
        //     $('#more').css('display', 'flex');
        //     // console.log('nextUrl before correction:', response.next);
        //
        //     console.log('corrected nextUlr: ', url);
        //     // var next = response.next;
        //     $('.more').on('click', function () {
        //         // // console.log('test');
        //         // var userInput = $("input[name='user-input']").val();
        //         // // console.log('User input: ' + userInput);
        //         // var albumOrArtist =$('select').val();
        //         // // console.log('dropdown: ', albumOrArtist);
        //         $.ajax({
        //             url: url,
        //             method: 'GET',
        //             data: {
        //                 query: userInput,
        //                 type: albumOrArtist
        //             },
        //             success: function(r){
        //                 r = r.artists || r.albums;
        //                 console.log('response: ', r);
        //                 for (var i = 0; i < r.items.length; i++){
        //                     console.log('each result: ', r.items[i].name);
        //
        //                     var imageUrl = 'default.jpg';
        //                     if (r.items[i].images[0]){
        //                         imageUrl = r.items[i].images[0].url;
        //                     }
        //                     var nextHtml = html;
        //                     nextHtml += "<div class='gallery'><a target='_blank' href=" + imageUrl + "><img src=" + imageUrl + " alt='Cinque Terre' width='600' height='400'></a>" + "<div class='desc'>" + r.items[i].name + "</div></div>";
        //
        //                     $('.results-container').html(nextHtml);
        //                 }
        //             }
        //         });
        //     });
        // }

    });})();
