// declaration.d.ts
declare module '*.scss';

declare module "\*.svg" {
    import React = require("react");
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
  }


  declare module 'react-scroll' {
    export const Link: any;
    export const Element: any;
    export const Events: any;
    export const animateScroll: any;
    export const scrollSpy: any;
    export const scroller: any;
  }

  declare module 'react-burger-menu' {
    export const slide: any;
    export const push: any;
    export const stack: any;
    export const elastic: any;
    export const bubble: any;
    export const pushRotate: any;
    export const scaleDown: any;
    export const scaleRotate: any;
    export const fallDown: any;
    export const reveal: any;
  }