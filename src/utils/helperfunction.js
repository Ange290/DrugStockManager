// export const  setDate= (expiredDate)=>{
//     const date = new Date(expiredDate).toLocaleDateString();
//     return date;
// }
import moment from "moment";
 const setDate = (expiredDate) => {
    try {
      const parsedDate = moment(expiredDate, 'YYYY/MM/DD'); 
      if (!parsedDate.isValid()) {
        console.error('Invalid date format:', expiredDate);
      return null; 
      }
      const formattedDate = parsedDate.format('YYYY-MM-DD');
  
      return formattedDate;
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };
  export default setDate;