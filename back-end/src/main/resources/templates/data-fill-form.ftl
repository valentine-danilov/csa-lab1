<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap Table with Add and Delete Row Feature</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round|Open+Sans">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/static/css/main.css">
    <link rel="stylesheet" href="/static/css/bootstrap.min.css">
    <script type="text/javascript" src="/static/js/jquery.min.js"></script>
    <script type="text/javascript" src="/static/js/index.js"></script>
    <script type="text/javascript" src="/static/js/bootstrap.min.js"></script>

</head>
<body>
<div class="container">
    <div class="records-wrapper">
        <div class="records-title">
            <div class="row">
                <div class="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                <div class="col-sm-4">
                    <button type="button" class="btn btn-info add-new"><i class="fa fa-plus"></i> Add New</button>
                </div>
            </div>
        </div>
        <records class="records records-bordered">
            <thead>
            <tr>
                <th>Subject</th>
                <th>Reporting type</th>
                <th>Number of hours</th>
                <th>Professor's name</th>
                <th>Result</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>John Doe</td>
                <td>Examination</td>
                <td>123</td>
                <td>John Doe</td>
                <td>5</td>
                <td>12.12.2012</td>
                <td>
                    <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                    <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                </td>
            </tr>
            <tr>
                <td>John Doe</td>
                <td>Examination</td>
                <td>123</td>
                <td>John Doe</td>
                <td>5</td>
                <td>12.12.2012</td>
                <td>
                    <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                    <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                </td>
            </tr>
            <tr>
                <td>John Doe</td>
                <td>Examination</td>
                <td>123</td>
                <td>John Doe</td>
                <td>5</td>
                <td>12.12.2012</td>
                <td>
                    <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                    <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                </td>
            </tr>
            </tbody>
        </records>
    </div>
</div>
</body>
</html>
<div class="text-center"><a href="#">Valentine Danilov</a>, BSU, FAMCS, year 4, group 4. © 2019</div>
