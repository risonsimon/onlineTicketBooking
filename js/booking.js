$( document ).ready(function() {
    var count;
    var seatNo;
    var reservedUsers =[];
    var reservedUser;
    $('#ddlSeats').change(function(){
        if($('#ddlSeats').val()!='Select') {

            $('#btnSelectSeats').removeAttr('disabled');

        }
    });
    $('#btnSelectSeats').on('click',function(){
        $('div#seatsReserve').css('display', 'block');
        $('#btnReserve').prop('disabled', 'disabled');
        if($('table.tblSeats tbody tr td div').hasClass('selectingSeat')) {
            $('table.tblSeats tbody tr td div').removeClass('selectingSeat');
        }
        $('.selectedSeatsList').text('');
        count= $('#ddlSeats').val();
    });
    $('div.seat').on('click',function(){
        if(!$(this).hasClass('selectingSeat'))
        {
            if (count > 0) {
                var row = $('td:first', $(this).parents('tr')).text();
                var colIndex = $(this).parent().parent().children().index($(this).parent());
                seatNo = row + $('.tblSeats tr:last td:eq(' + colIndex + ')').text();
                //console.log(seatNo);
                $('.selectedSeatsList').append(seatNo+'  ');
                $(this).addClass('selectingSeat');
                count--;
            }
        }
        else {
            $(this).removeClass('selectingSeat');
            var row = $('td:first', $(this).parents('tr')).text();
            var colIndex = $(this).parent().parent().children().index($(this).parent());
            seatNo = row + $('.tblSeats tr:last td:eq(' + colIndex + ')').text();
            //remove the deselected seat from selected seats.
            $('.selectedSeatsList').text($('.selectedSeatsList').text().replace(seatNo+' ' ,''));
            count++;
        }
        //console.log(count);
        if(count == 0){
            $('#btnReserve').removeAttr('disabled');
        }
        else{
            $('#btnReserve').attr('disabled','disabled');
        }

    });
    $('#btnReserve').on('click',function(){

        if(($('#txtName').val()=='')){
            alert('Please enter your name.');
            return 0;
        }
        if(($('.selectedSeatsList').text()=='')){
            alert('Please select a seat.');
            return 0;
        }
        $('.tblReserve').css('display','block');
        reservedUser = {
            seats : $('.selectedSeatsList').text(),
            name : $('#txtName').val(),
            count : $('#ddlSeats').val()
        };
        reservedUsers.push(reservedUser);
        $('.tblReserve >tbody:last').append('<tr><td>' + reservedUser.name + '</td>' +
            '<td>' + reservedUser.count + '</td>' + '<td>' + reservedUser.seats + '</td>' );
        if($('table.tblSeats tbody tr td div').hasClass('selectingSeat')) {
            $('table.tblSeats tbody tr td div').removeClass('selectingSeat');
        }
        $('.selectedSeatsList').text('');
        $('#txtName').val('');
        $('#ddlSeats').val('select');
    });
});