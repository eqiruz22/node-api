export const ResponseJSON = (res, code, status, message, data) => {
  return res.status(code).json({
    status: status,
    message: message,
    data: data || null,
  });
};

export const ResponseJSONWithPagination = (
  res,
  code,
  status,
  message,
  data,
  limit,
  offset
) => {
  return res.status(code).json({
    status: status,
    message: message,
    data: {
      offset: offset,
      limit: limit,
      records: data || null,
    },
  });
};
