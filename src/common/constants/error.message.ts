export class ErrorMessage {
    static errorMessage(
        message: string,
        status: number,
        customErrorNumber: number,
      ) {
        return {
          timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          message: message,
          status: status,
          customErrorNumber: customErrorNumber,
        };
      }

    public static collectionSchema : any = {
        mongoObjId: this.errorMessage('Invalid id was provided',403,1000001)
    };

    public static blogSchema : any = {
        duplicateeTitle: this.errorMessage('Alreadys blog title exists',403,1000101)
    };
   
}