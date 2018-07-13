import React, { PureComponent } from 'react';
import { modules } from 'react-data-export';

const { ExcelFile, ExcelSheet, ExcelColumn } = modules;

export default class ExportExcel extends PureComponent {
  render() {
    const { dataSet, columns, filename, element, style } = this.props;
    const excelFileProps = {
      filename: filename ? `${filename}.xlsx` : 'export.xlsx',
      element: element || <a>导出数据</a>,
    };
    return (
      <div style={style}>
        <ExcelFile {...excelFileProps}>
          <ExcelSheet data={dataSet} name={filename || 'export'}>
            {
              columns && columns.length > 0 ?
                (
                  columns.map((item, index) => <ExcelColumn key={index} {...item} />)
                ) :
                (
                  dataSet && dataSet.length > 0 ?
                    (
                      Object.keys(dataSet[0]).map((item, index) => {
                        return <ExcelColumn key={index} label={item} value={item} />;
                      })
                    ) : null
                )
            }
          </ExcelSheet>
        </ExcelFile>
      </div>
    );
  }
}
