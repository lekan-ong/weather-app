$(() => {
    $("#searchForm").submit((e) => {
        // Prevent submit action
        e.preventDefault();

        const location = $('.search-bar').val();

        $.ajax({
            url: "/api/weather",
            type: 'GET',
            data: {location: location},
            dataType: 'json', // added data type
            success: function(res) {
                $('#temp').text(res.temperature + '°');
                $('.place').text(res.location);
                $('.weatherCondition').text(res.condition);
                $('#weatherImage').attr('src', './images/icons/' + res.icon + '.png');

                // Clear search query
                $('.search-bar').val('');

                // Show weather widget
                $('.widget').show();
            }
        });
    });
});