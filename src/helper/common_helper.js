export class CommonHelper {  
  

  createFormData(formData,inputData) {
    Object.keys(inputData).forEach(fieldName => {
      formData.append(fieldName, inputData[fieldName]);
    })
    return formData
  }

}
const commonHelper = new CommonHelper();
export default commonHelper;
