const FormatDateForKendo = async (recievedDate: any, ifNullMessage:string): Promise<any> => {
  let date = recievedDate;

  if (date != undefined) {
    date = new Date(date);
    date.setHours(0, 0, 0, 0);
  }

  if (date == null) {
    date = ifNullMessage;
  }

  return date;
};

export default FormatDateForKendo;