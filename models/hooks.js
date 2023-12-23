export const handleSaveError = (error, _, next) => {
  error.status = 400;
  next();
};

export function addUpdateSettings(next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
}
