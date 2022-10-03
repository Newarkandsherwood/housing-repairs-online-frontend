import { validateImage } from '../../../compoments/report-repair/repair-image-upload';

const mockFile = (fileType, fileSize) => {
  const file = new File(['mockFile'], 'mockFile', {
    type: fileType,
  });
  Object.defineProperty(file, 'size', { value: fileSize })
  return file;
}

const allowedImageSizeMock = 9 * 1024 * 1024;
const exceedingImageSizeMock = 12 * 1024 * 1024;

describe('validateImage', () => {
  test('returns a validation message when not allowed file type is being validated', () => {
    expect(validateImage(mockFile('application/pdf', allowedImageSizeMock))).toBe('The selected file must be a JPG or PNG')
  })

  test('returns a validation message when too large file is being validated', () => {
    expect(validateImage(mockFile('image/jpeg', exceedingImageSizeMock))).toBe('The selected file must be smaller than 10MB. Your file size is 12.00MB')
  })

  test('does not return a validation message when JPEG of correct size is being validated', () => {
    expect(validateImage(mockFile('image/jpeg', allowedImageSizeMock))).toBe(undefined)
  })

  test('does not return a validation message when PNG of correct size is being validated', () => {
    expect(validateImage(mockFile('image/png', allowedImageSizeMock))).toBe(undefined)
  })

})
