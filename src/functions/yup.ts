/* eslint-disable func-names */

import * as yup from 'yup';

const websiteRegEx =
  /((http|https)+\\:\/\/)?([\w\d-]+\.)*[\w-]+[\\.\\:]\w+([\\/\\?\\=\\&\\#\\.]?[\w-]+)*\/?/;
const phoneRegEx =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

yup.addMethod(yup.string, 'websiteURL', function (errorMessage) {
  return this.matches(websiteRegEx, errorMessage);
});

yup.addMethod(yup.string, 'phone', function (errorMessage) {
  return this.matches(phoneRegEx, errorMessage);
});

yup.addMethod(yup.mixed, 'maxFileSize', function (sizeMB, errorMessage) {
  return this.test('fileSize', `${errorMessage} ${sizeMB} MB`, (value) => {
    if (!value) {
      return true;
    }

    const size = parseFloat(sizeMB) * 1024 * 1024;

    return value.size <= size;
  });
});

yup.addMethod(yup.mixed, 'fileType', function (allowedTypes, errorMessage) {
  return this.test(
    'fileType',
    `${errorMessage} ${allowedTypes.map((el: string) => el.toUpperCase()).join(', ')}`,
    (value) => {
      if (!value) {
        return true;
      }

      const getExtension = (name: string) => name.split('.').pop();
      const isValid = allowedTypes.includes(getExtension(value?.name));

      return isValid;
    },
  );
});

export default yup;
