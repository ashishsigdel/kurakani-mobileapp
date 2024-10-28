const asyncHandler = (requestHanldler) => {
  return async (req, res, next) => {
    try {
      await requestHanldler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
