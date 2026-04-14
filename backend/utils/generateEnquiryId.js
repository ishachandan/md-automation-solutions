// Generate unique enquiry ID in format: ENQ-YYYYMMDD-XXXX
const generateEnquiryId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  
  return `ENQ-${year}${month}${day}-${random}`;
};

module.exports = generateEnquiryId;
