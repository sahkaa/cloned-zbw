/**
 * General contract which has to be implemented by all the page
 * objects to maintain consistency for basic functionalities
 */
export interface Page {
    /**
     * Url for identification for derived page
     */
    url: string;

    /**
     * this can be called to go to url
     */
    goTo(): void;

    /**
     * Defines a logic to verify that we are navigated to derived page
     * @returns {promise.Promise<boolean>}
     */
    verifyExistence(): any;
}
