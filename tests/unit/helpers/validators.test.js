import { imageValidator } from '../../../helpers/validators';


describe('imageValidator', () => {

  const mockFile = (fileType, fileSize) => {
    const file = new File(['mockFile'], 'mockFile', {
      type: fileType,
    });
    Object.defineProperty(file, 'size', { value: fileSize })
    return file;
  }

  const allowedImageSizeMock = 9 * 1024 * 1024;
  const exceedingImageSizeMock = 12 * 1024 * 1024;

  test('returns an error message text when not allowed file type is being validated', () => {
    expect(imageValidator(mockFile('application/pdf', allowedImageSizeMock))).toBe('The selected file must be a JPG or PNG')
  })

  test('returns an error message text when too large file is being validated', () => {
    expect(imageValidator(mockFile('image/jpeg', exceedingImageSizeMock))).toBe('The selected file must be smaller than 10MB. Your file size is 12.00MB')
  })

  test('does not return an error message text when JPEG of correct size is being validated', () => {
    expect(imageValidator(mockFile('image/jpeg', allowedImageSizeMock))).toBe(undefined)
  })

  test('does not return an error message text when PNG of correct size is being validated', () => {
    expect(imageValidator(mockFile('image/png', allowedImageSizeMock))).toBe(undefined)
  })

})
