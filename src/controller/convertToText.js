const { default: axios } = require("axios");

const xlsx=require("xlsx")


const xlsxToText= async function testAxiosXlsx(url) {
  const options = {
    url,
    responseType: "arraybuffer",
  };
  let axiosResponse = await axios(options);
  const workbook = xlsx.read(axiosResponse.data);

  let worksheets = workbook.SheetNames.map((sheetName) => {
    return {
      sheetName,
      data: xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]),
    };
  });
  let res = JSON.stringify(worksheets);

  return res;
}





module.exports={xlsxToText}