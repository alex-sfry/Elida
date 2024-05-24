export function TableNew(cnt, columns) {
    this.cnt = cnt;
    this.columns = columns;
}

TableNew.prototype.getRows = function () {
    return $(`#${this.cnt} tbody tr`);
};

TableNew.prototype.fillTable = function (data) {
    const actualColumns = [];

    this.columns.forEach(item => {
        if (item in data[0]) actualColumns.push(item);
    });

    this.getRows().each(function (rowIndex) {
        if (!data[rowIndex]) {
            $(this).hide();
            return;
        }

        if ($(this).is(":hidden")) $(this).show();

        $(this).find('td').each(function (cellIndex) {
            const newRowData = data[rowIndex][actualColumns[cellIndex]];

            if (typeof(newRowData) === 'object') {
                if ('url' in newRowData) {
                    $(this).html(
                        `<a href="${newRowData['url']}">
                            ${newRowData['text']}</a>`
                    );
                }
            } else $(this).text(newRowData);
        });
    });
};