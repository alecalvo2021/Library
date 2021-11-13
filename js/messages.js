$(document).ready(function() {
    $.ajax({
        url: 'https://g40a375a88f472a-db202111090751.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/message/message',
        method: 'GET',
        datatype: 'JSON',
        success: function(data) {
            console.log(data);
            $('#cubicles-table').dataTable({
                data: data.items,
                columns: [
                    { data: 'id' },
                    { data: 'messageText' },
                    {
                        defaultContent: "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnUpdate'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnDelete'><i class='material-icons'>delete</i></button><button class='btn btn-warning btn-sm btnShow'><span class='material-icons'>visibility</span></button></div></div>",
                    },
                ],
            });
        },
    });
});

function saveInfo() {
    let myData = {
        id: $('#id').val(),
        messageText: $('#messageText').val(),

    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: 'https://g40a375a88f472a-db202111090751.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'POST',
        data: myData,
        datatype: 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#id').val();
            $('#messageText').val();

        },
    });
    $('#modalCrudMessage').modal('hide');
    window.location.reload();
}

function updateInfo() {
    let myData = {
        id: $('#id').val(),
        messagetext: $('#name').val(),


    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: 'https://g40a375a88f472a-db202111090751.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'PUT',
        contentType: 'application/JSON',
        data: dataToSend,
        datatype: 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#id').val();
            $('name').val();
            $('email').val();
            $('age').val();
        },
    });
    $('#modalCrudClient').modal('hide');
    window.location.reload();
};

function deleteInfo(id) {
    let myData = {
        id: id,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: 'https://g40a375a88f472a-db202111090751.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'DELETE',
        contentType: 'application/JSON',
        data: dataToSend,
        datatype: 'JSON',
        success: function(response) {
            $('#result').empty();
        },
    });
    $('#deleteModalClient').modal('hide');
    window.location.reload();
};

$(document).on("click", ".btnUpdate", function() {
    let row = $(this).closest("tr");
    let id = parseInt(row.find('td:eq(0)').text()); //capturo el ID		            
    let target = row.find('td:eq(1)').text();
    let capacity = row.find('td:eq(2)').text();
    let category = row.find('td:eq(3)').text();
    let nom = row.find('td:eq(4)').text();

    $("#id").val(id);
    $("#target").val(target);
    $("#capacity").val(capacity);
    $("#category_id").val(category);
    $("#name").val(nom);
    $('.modal-title').text('Update cubicle');
    $('#modalCrud').modal('show');
    const update = document.querySelector("#save");
    update.addEventListener("click", function(event) {
        updateInfo();

    })
});

$(document).on("click", "#btnSave", function() {
    $("#id").val('');
    $("#target").val('');
    $("#capacity").val('');
    $("#category_id").val('');
    $("#name").val('');
    $('.modal-title').text('New cubicle');
    $('#modalCrud').modal('show');
    const save = document.querySelector("#save");
    save.addEventListener("click", function(event) {
        saveInfo();
    })
});

$(document).on("click", ".btnDelete", function() {
    id = parseInt($(this).closest('tr').find('td:eq(0)').text());
    $('#modalTitleDelete').text('Are you sure ?');
    $('#deleteModal').modal('show');
    const confirm = document.querySelector("#btnConfirm");
    confirm.addEventListener("click", function(event) {
        deleteInfo(id);
    })
});

$(document).on("click", ".btnShow", function() {
    let row = $(this).closest("tr");
    let id = parseInt(row.find('td:eq(0)').text()); //capturo el ID		            
    let target = row.find('td:eq(1)').text();
    let capacity = row.find('td:eq(2)').text();
    let category = row.find('td:eq(3)').text();
    let nom = row.find('td:eq(4)').text();


    $("#targetModalDetail").text(target);
    $("#capacityModalDetail").text(capacity);
    $("#categoryModalDetail").text(category);
    $("#nameModalDetail").text(nom);
    $("#titleModalDetail").text('Detail');
    $("#detailModal").modal('show');

});


window.onload = function() {
    const show = document.querySelector("#btnView");
    show.addEventListener("click", function(event) {
        let icon = document.getElementById("showIcon");
        //icon.textContent == "visibility"? icon.innerHTML="visibility_off": icon.innerHTML="visibility";
        if (icon.textContent == "visibility") {
            icon.innerHTML = "visibility_off";
            $('#btnSave').show();
            $('#cubiclesTable').show();

        } else {
            icon.innerHTML = "visibility";
            $('#btnSave').hide();
            $('#cubiclesTable').hide();

        }
    });
}