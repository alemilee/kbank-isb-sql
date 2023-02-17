/* eslint-disable @typescript-eslint/naming-convention */

// interface SQLConfigData {
//   SQL_CONFIG: string;
//   SQL_NAMESPACE: string;
//   QUERY_NAME: string;
//   SQL_0: string;
// }

// const data: SQLConfigData[] = [
const data = [
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

    const uniqueSQLConfigs = new Set();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      uniqueSQLConfigs.add(item.SQL_CONFIG);
    }

    const sqlConfigList = document.getElementById('sqlconfig-list') as HTMLElement;

    for (let sqlConfig of uniqueSQLConfigs) {
        console.log(`Processing data for SQL_CONFIG ${sqlConfig}`);
        
        const liTag = document.createElement('div');
        const sqlConfigTohtml = document.createTextNode(sqlConfig as string);
        liTag.appendChild(sqlConfigTohtml);
        sqlConfigList.appendChild(liTag);
      
      }

}());
