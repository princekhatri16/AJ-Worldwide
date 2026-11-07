declare module "react-simple-captcha" {
  import { Component } from "react";

  export class LoadCanvasTemplate extends Component<{ reloadColor?: string; reloadText?: string }> {}
  export class LoadCanvasTemplateNoReload extends Component {}

  export function loadCaptchaEnginge(
    numberOfCharacters?: number,
    backgroundColor?: string,
    fontColor?: string,
    charType?: "numbers" | "letters" | "special_char"
  ): void;

  export function validateCaptcha(
    userValue: string,
    reload?: boolean
  ): boolean;
}

