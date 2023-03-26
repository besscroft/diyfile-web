import UAParser from 'ua-parser-js'

export const useDevice = () => {
  const parser = new UAParser()
  const currentDevice = parser.getResult()
  const isMobile = currentDevice.device.type === 'mobile'
  return {
    currentDevice,
    isMobile,
  }
}
