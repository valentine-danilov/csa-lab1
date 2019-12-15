function resolveSelection(current, select) {
    if (current === select) {
        return 'id="' + current + '" selected'
    }
    return '';
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();
    // Append table with add row form on add new button click
    $(".add-new").click(function () {
        $(this).attr("disabled", "disabled");
        var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="subject" id="subject"></td>' +
            '<td><select class="form-control" name="reporting-type-select">' +
            '<option selected disabled>Select reporting type</option>' +
            '<option id="exam" name="reporting-type">Examination</option>' +
            '<option id="set-off" name="reporting-type">Set-Off</option>' +
            '</select>' +
            '</td>' +
            '<td><input type="number" class="form-control" name="hours" id="hours"></td>' +
            '<td><input type="text" class="form-control" name="professor-name" id="professor-name"></td>' +
            '<td><input type="number" class="form-control" name="result" id="result"></td>' +
            '<td><input type="date" class="form-control" name="date" id="date"></td>' +
            '<td>' + actions + '</td>' +
            '</tr>';
        $("table").append(row);
        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
    // Add row on add button click
    $(document).on("click", ".add", function () {
        var empty = false;
        var input = $(this).parents("tr").find('input');
        input.each(function () {
            if (!$(this).val() || !(new Date($(this).val()))) {
                $(this).addClass("error");
                empty = true;
            } else {
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();
        if (!empty) {
            input.each(function () {
                $(this).parent("td").html($(this).val());
            });
            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");
        }
    });
    // Edit row on edit button click
    $(document).on("click", ".edit", function () {
        $(this).parents("tr").find("td:not(:last-child)").each(function (index) {
            switch (index) {
                case 0:
                case 3:
                    $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
                    break;
                case 1:

                    $(this).html(
                        '<select class="form-control" name="reporting-type-select">' +
                        '<option disabled>Select reporting type</option>' +
                        '<option ' + resolveSelection($(this.id(), "")) + 'name="reporting-type">Examination</option>' +
                        '<option name="reporting-type">Set-Off</option>' +
                        '</select>'
                    );
                    break;
                case 2:
                case 4:
                    $(this).html('<input type="number" class="form-control" value="' + $(this).text() + '">');
                    break;
                case 5:
                    $(this).html('<input type="date" class="form-control" value="' + $(this).val() + '">');
                    break;
            }
        });
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").attr("disabled", "disabled");
    });
    // Delete row on delete button click
    $(document).on("click", ".delete", function () {
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
    });
});