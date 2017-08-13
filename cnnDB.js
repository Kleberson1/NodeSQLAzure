var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Estabeleço a conexão com o banco de dados
var config = 
{
    userName: 'ass',
    password: '1qaz2wsx!@',
    server: 'vtzserver.brazilsouth.cloudapp.azure.com',
    options:
        {
            database: 'dbvtzdev',
            encrypt: true
        }
}

var connection = new Connection(config);

connection.on ('connect', function(err)
{
    if(err)
        {
            console.log(err)
        }
    else
        {
            queryDatabase()
        }
}
);

function queryDatabase(){
    console.log('Efetuando leitura das tabelas...')
    request = new Request("SELECT TOP 10 * FROM tbl_dados",
    function(err, rowCount, rows)
    {
        console.log(rowCount + 'linha(s) retornadas');
    }
);

request.on('row', function(columns) {
    columns.forEach(function(column) {
        console.log("%s\t%s", column.metadata.colName, column.value);
    });
});
connection.execSql(request);
}