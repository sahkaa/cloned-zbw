export class PasswordUtilities {

  public static readonly SPECIAL_CHARACTERS_PATTERN: RegExp =
  /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\"|\;|\:|\s/;

  public static readonly NUMBERS_PATTERN: RegExp = /[0-9]/;

  public static readonly UPPER_CASE_PATTERN: RegExp = /[A-Z]/;

}
