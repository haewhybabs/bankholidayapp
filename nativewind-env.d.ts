/// <reference types="nativewind/types" />


// Add this part to handle the CSS module error
declare module "*.css" {
    const content: any;
    export default content;
}