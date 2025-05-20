export type DataType = {
    type: string,
    description: string,
    regex: string,
    validSample: string,
    allowedCharacters: string[],
    dateValidation?: undefined | {
      position: number[],
      format: string,
      note: string
    }
  }