import Quill from 'quill'

const BlockPrototype = Quill.import("blots/block");
export class DefaultSettingsBlock extends BlockPrototype {
    domNode: any;
    constructor(domNode, value) {
      super(domNode, value);
      this.format("size", "18px");
      this.format("font", "escolar");
    }
  
    static tagName = "P";
  
    format(name, value) {
      if (name === "size")
      {
        this.domNode.style.fontSize = value;
      } else if (name === "font")
      {
        this.domNode.style.fontFamily = value;
      } else
      {
        super.format(name, value);
      }
    }
  }