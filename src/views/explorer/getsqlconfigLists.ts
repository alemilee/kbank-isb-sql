/* eslint-disable @typescript-eslint/naming-convention */
//import * as vscode from 'vscode';
/*
//tsconfig.json module에 commonjs 사용하므로, 빌드과정에서 import, export가 에러남... 그래서 그냥 jsonData 하드코딩했다.
//sqlconfigExplorer.ts에서 jsonData가져와도, 여기로 전달할 방법이 없음.
import * as fs from 'fs';
import * as path from 'path';

const jsonFilePath = path.join(__dirname, 'sampleData.json');//mock Data(추후 DB연결)
// /Users/ALEMI/workspace/kbank-isb-sql/out/views/explorer/sampleData.json
//const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
*/

const jsonData = [
  {
    "SQL_CONFIG": "APP_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_AMT_001",
    "QUERY_NAME": "z29m8k7",
    "SQL_0": "d6t2e8x"
  },
  {
    "SQL_CONFIG": "APP_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_AMT_001",
    "QUERY_NAME": "z29m8k777777",
    "SQL_0": "d6t2e8x"
  },
  {
    "SQL_CONFIG": "APP_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_AMT_001",
    "QUERY_NAME": "z29m8k888888",
    "SQL_0": "d6t2e8x"
  },
  {
    "SQL_CONFIG": "APP_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_AMT_001",
    "QUERY_NAME": "z29m8k12345",
    "SQL_0": "d6t2e8x"
  },

  {
    "SQL_CONFIG": "CMN_SQL_CONFIG",
    "SQL_NAMESPACE": "ISB_CMN_001",
    "QUERY_NAME": "g7u1h5fffff",
    "SQL_0": "select"
  },
  {
    "SQL_CONFIG": "CMN_SQL_CONFIG",
    "SQL_NAMESPACE": "ISB_CMN_001",
    "QUERY_NAME": "g7u1h5aaaaaaa",
    "SQL_0": "update"
  },
  {
    "SQL_CONFIG": "CMN_SQL_CONFIG",
    "SQL_NAMESPACE": "ISB_CMN_001",
    "QUERY_NAME": "g7u1h5bbbbbb",
    "SQL_0": "delete"
  },
  {
    "SQL_CONFIG": "CMN_SQL_CONFIG",
    "SQL_NAMESPACE": "ISB_CMN_001",
    "QUERY_NAME": "g7u1h5Cccccccc",
    "SQL_0": "insert"
  },


  {
    "SQL_CONFIG": "MGT_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_PRD_001",
    "QUERY_NAME": "x4q3a6p",
    "SQL_0": "s5e9z1u"
  },

  {
    "SQL_CONFIG": "MGT_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_PRD_002",
    "QUERY_NAME": "product_one",
    "SQL_0": "select * from table"
  },
  {
    "SQL_CONFIG": "MGT_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_PRD_002",
    "QUERY_NAME": "product_two",
    "SQL_0": "select * from table2"
  },
  {
    "SQL_CONFIG": "MGT_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_PRD_002",
    "QUERY_NAME": "product_three",
    "SQL_0": "select * from table3"
  },
  {
    "SQL_CONFIG": "MGT_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_PRD_003",
    "QUERY_NAME": "product_four",
    "SQL_0": "select * from table4"
  },
  {
    "SQL_CONFIG": "MGT_SQL_CONFIG",
    "SQL_NAMESPACE": "MGT_PRD_003",
    "QUERY_NAME": "product_five",
    "SQL_0": "select * from table5"
  }

];

(function () {

  let sqlcfgIds: Set<string> = new Set();
  for (let i = 0; i < jsonData.length; i++) {
    const item = jsonData[i];
    sqlcfgIds.add(item.SQL_CONFIG);
    console.log("sqlcfgIds:" + item.SQL_CONFIG);
  }
  getConfigtoHTML(sqlcfgIds);

  //TO DO : selected된 항목 감지하여, Namspasce&sql리스트 조회...

  //select evt
  const selectElement = document.getElementById('sqlconfig-list-dropdown') as HTMLSelectElement;
  selectElement.addEventListener('change', (event: Event) => {
    const selectedOption = (event.target as HTMLSelectElement).value;
    console.log(`Selected option: ${selectedOption}`);

    const sendSelOpt = document.getElementById('selected-option') as HTMLElement;
    sendSelOpt.setAttribute("value", selectedOption);

    console.log(`POST MESSAGE !!`);
    window.postMessage(selectedOption);

  });


}());

let aa:any;
// Listen for messages from the extension
window.addEventListener('message', (event: MessageEvent) => {
  aa = event.data;
  console.log('Received RESULT:', aa);
});

function getConfigtoHTML(sqlcfgIds: Set<string>) {

  const dropDown = document.getElementById('sqlconfig-list-dropdown') as HTMLElement;

  for (let i of sqlcfgIds) {
    const dropItem = document.createElement('option');
    const textItem = document.createTextNode(i as string);
    dropItem.appendChild(textItem);
    dropItem.setAttribute("id", i as string);
    dropItem.setAttribute("value", i as string);
    dropItem.setAttribute("data-id", i as string);
    dropDown.appendChild(dropItem);
  }

}
