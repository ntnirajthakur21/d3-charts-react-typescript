export const csvToText = (csv: File) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const csv = e.target?.result;
    console.log(csv);
  };
  reader.readAsText(csv);
};
