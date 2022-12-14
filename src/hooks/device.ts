import UAParser from 'ua-parser-js'

export default function useDevice() {
  const parser = new UAParser()
  const currentDevice = parser.getResult()
  const isMobile = currentDevice.device.type === 'mobile'
  return {
    currentDevice,
    isMobile,
  }
}
