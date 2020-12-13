export const snapShotToArray = (snapshot) => {
  let returnArr = [];
  snapshot.forEach((element) => {
    let item = element.val()
    item.key = element.key;
    returnArr.push(item);
  });
  return returnArr;
};
