(function fn() {
    var countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antigua", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire (Netherlands Antilles)", "Bosnia Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic of", "Cook Islands", "Costa Rica", "Croatia", "Curacao (Netherlands Antilles)", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland (Republic of)", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kosrae Island", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macau", "Macedonia (FYROM)", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Ponape", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Rota", "Russia", "Rwanda", "Saba (Netherlands Antilles)", "Saipan", "Samoa", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa", "South Korea", "Spain", "Sri Lanka", "St. Barthelemy", "St. Croix", "St. Eustatius (Netherlands Antilles)", "St. John", "St. Kitts and Nevis", "St. Lucia", "St. Maarten (Netherlands Antilles)", "St. Thomas", "St. Vincent and the Grenadines", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tinian", "Togo", "Tonga", "Tortola", "Trinidad and Tobago", "Truk", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Tuvalu", "US Virgin Islands", "Uganda", "Ukraine", "Union Island", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Gorda", "Wallis and Futuna", "Yap", "Yemen", "Zambia", "Zimbabwe"];
    var textField = $('input');
    var results = $('#results');
    textField.on('input', function() {
        var val = textField.val();
        if (!val) {
            results.html('<div class="empty">No result founded!</div>');
        }
        var matches = [];
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].toLowerCase().indexOf(val.toLowerCase()) == 0) {
                matches.push(countries[i]);
                if (matches.length == 5) {
                    break;
                }
            }
            if (countries[i].toLowerCase().indexOf(val.toLowerCase()) == -1) {
                results.html('<div class="empty">No result founded!</div>');
            }
            var html = '';
            for (var k = 0; k < matches.length; k++) {
                html += '<div class="result">' + matches[k] + '</div>';
                results.html(html);
            }
        }
    }).on('focus', function() {
        results.css("display", "block");
    });

    $(document).on('mousedown', function() {
        if (!$("#search-tool").onfocus) {
            results.css("display", "none");
        }
    });

    $(document).on('mousedown', '.result', function() {
        textField.val($(this).text());
    });

    textField.on("keydown", function(e) {
        var resultClass = $(".result");
        var highlighted = $(".highlight");
        if (e.keyCode == 40) {
            if (!highlighted.length) {
                resultClass.eq(0).addClass("highlight");
            } else if (
                resultClass.index(highlighted) ==
                resultClass.length - 1
            ) {
                return;
            } else {
                highlighted
                    .removeClass("highlight")
                    .next()
                    .addClass("highlight");
            }
        }
    });

    textField.on("keydown", function(e) {
        var resultClass = $(".result");
        var highlighted = $(".highlight");
        if (e.keyCode == 38) {
            if (!highlighted.length) {
                resultClass.eq(highlighted.length - 1).addClass("highlight");
            } else if (resultClass.index(highlighted) == 0) {
                return;
            } else {
                highlighted
                    .removeClass("highlight")
                    .prev()
                    .addClass("highlight");
            }
        }
    });

    textField.on("keydown", function(e) {
        if (e.keyCode == 13) {
            textField.val($(".highlight").text());
            return $(".result").empty();
            // return $(".results").hide();
        }
    });

    // textField.on('keydown', function fn(e){
    //     var highlighted = $('.highlight');
    //     var result = $('.result');
    //     if (e.keyCode == 13) {
    //         textField.val(highlighted.text());
    //         results.empty();
    //     } else if(e.keyCode == 40){
    //         if(!result.eq(0).hasClass('highlight')){
    //             result.eq(0).addClass('highlight');
    //         }
    //         console.log(result.eq(0).html()+" is highlighted.");
    //         return fn;
    //     } else if(e.keyCode==38){
    //         if(!result.eq(result.lenght-1).hasClass('highlight')){
    //             result.eq(result.lenght-1).onfocus=function(){
    //                 result.eq(result.lenght-1).addClass('highlight').focus();
    //                 console.log(result.eq(result.lenght-1)+" is highlighted.");
    //             };
    //         }
    //
    //         if(highlighted){
    //             result.eq(0).removeClass('highlight');
    //             highlighted.next().addClass('highlight');
    //             console.log(highlighted.next().html()+" is highlighted.");
    //         }
    //
    //
    //
    //         if(result.eq(result.lenght-1).hasClass('highlight')){
    //             result.eq(result.lenght-1).removeClass('highlight');
    //             highlighted.onfocus=function(){
    //                 highlighted.prev().addClass('highlight').focus();
    //             };
    //         }
    //
    //     }
    // });
})();


// var html='';
// for (var i=0; i <matches.length; i++){
//     html += '<div class="result">'+matches[i]+'</div>';
// }
// results.html(html);


// var results = $('.result');
//
// var highlighted = $('.highlight');
//
// // highlighted.index();
//
// highlighted.next();

// var myResultElement;
// myResultElement.html(
//     '<div class="empty">No Results</div>'
// );


// var counties = [
//     "Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antigua", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire (Netherlands Antilles)", "Bosnia Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic of", "Cook Islands", "Costa Rica", "Croatia", "Curacao (Netherlands Antilles)", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland (Republic of)", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kosrae Island", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macau", "Macedonia (FYROM)", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Ponape", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Rota", "Russia", "Rwanda", "Saba (Netherlands Antilles)", "Saipan", "Samoa", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa", "South Korea", "Spain", "Sri Lanka", "St. Barthelemy", "St. Croix", "St. Eustatius (Netherlands Antilles)", "St. John", "St. Kitts and Nevis", "St. Lucia", "St. Maarten (Netherlands Antilles)", "St. Thomas", "St. Vincent and the Grenadines", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tinian", "Togo", "Tonga", "Tortola", "Trinidad and Tobago", "Truk", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Tuvalu", "US Virgin Islands", "Uganda", "Ukraine", "Union Island", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Gorda", "Wallis and Futuna", "Yap", "Yemen", "Zambia", "Zimbabwe"
// ];
