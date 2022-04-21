import Quill from 'quill'

const ImageBlot = Quill.import('formats/image');
export class CustomImageBlot extends ImageBlot {
    static blotName = 'customImage';
    static tagName = 'img';
    /**
     * Converts the HTML tag to image blot
     * @param value 
     */
    static create(value) {
        let node = super.create();
        node.setAttribute('src', value.url);
        if (value.alt)
        {
            node.setAttribute('alt', value.alt);
        }
        return node;
    }

    /**
     * Converts the image blot to HTML tag
     * @param node 
     */
    static value(node) {
        var blot = {};
        if (node.hasAttribute('url'))
        {
            blot['url'] = node.getAttribute('url');
            blot['alt'] = node.getAttribute('alt');
        }
        else
        {
            blot['url'] = node.getAttribute('src');
            blot['alt'] = null;
        }
        return blot;
    }
}