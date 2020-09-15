import React from 'react';
import MaterialTable from 'material-table';

export default function TableClientes({ data, afterDelete }) {
    const handleDelete = (id) => {
        window.fetch('http://localhost:3001/api/clientes/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            afterDelete(response);
        }).catch((err) => {
            console.error(err);
        });
    };
    return (
        <MaterialTable
            options={{ paging: false, draggable: false }}
            style={{ minWidth: '100%' }}
            title={'Tabela de clientes'}
            columns={[
                { title: 'Nome', field: 'nome' },
                { title: 'E-mail', field: 'email' },
                { title: 'CPF/CNPJ', field: 'cpf_cnpj' },
                { title: 'Telefone', field: 'telefone' },
                { title: 'CEP', field: 'cep' },
                { title: 'Logradouro', field: 'logradouro' },
                { title: 'Número', field: 'numero' },
                { title: 'Bairro', field: 'bairro' },
                { title: 'Cidade', field: 'cidade' },
                { title: 'Estado', field: 'estado' },
            ]}
            data={data}
            actions={[
                {
                    icon: 'delete',
                    tooltip: 'Deletar cliente',
                    onClick: (event, rowData) => handleDelete(rowData.id)
                }
            ]}
            localization={{
                body: {
                    emptyDataSourceMessage: 'Nenhum registro para exibir'
                },
                toolbar: {
                    searchTooltip: 'Pesquisar',
                    searchPlaceholder: 'Pesquise aqui...',
                },
                pagination: {
                    labelRowsSelect: 'linhas',
                    labelDisplayedRows: '{count} de {from}-{to}',
                    firstTooltip: 'Primeira página',
                    previousTooltip: 'Página anterior',
                    nextTooltip: 'Próxima página',
                    lastTooltip: 'Última página'
                },
                header: {
                    actions: 'Ações',
                }
            }} />
    )
};