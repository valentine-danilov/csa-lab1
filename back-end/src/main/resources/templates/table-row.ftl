<#macro row subject, reportingType, hours, result, profName, date>
    <td>${subject}</td>
    <td>${reportingType}</td>
    <td>${hours}</td>
    <td>${result}</td>
    <td>${profName}</td>
    <td>${date}</td>
    <td>
        <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
        <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
        <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
    </td>
</#macro>