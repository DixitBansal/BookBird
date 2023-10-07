export const generateResponse = (
  { msg,
    success = true,
    result = null,
    statusCode = 200 }
) => {
  const data = {
    msg,
    success,
    result,
    statusCode,
  };

  return data;
};
