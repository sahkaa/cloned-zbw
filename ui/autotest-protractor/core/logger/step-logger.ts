import * as log4js from 'log4js';
import {Logger} from 'log4js';

export class StepLogger {
    readonly logger: Logger;

    constructor(id: number) {
        this.logger = log4js.getLogger(`C${id}`);
    }

    stepId(id: number) {
        this.logger.debug(`*Step Id* #${id}`);
    }

    step(stepName: string) {
        this.logger.debug(`*Step* - #${stepName}`);
    }

    verification(verificationDescription: string) {
        this.logger.debug(`*Verification* - #${verificationDescription}`);
    }
}
