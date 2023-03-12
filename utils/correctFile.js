import { allowedExtensions } from './allowedExtension';

export const correctFile = async (type, size) => {
  return allowedExtensions.exec(type) && size < 3000000;
};
