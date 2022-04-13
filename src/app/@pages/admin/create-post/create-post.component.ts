import { Component, ViewEncapsulation } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import 'quill-emoji/dist/quill-emoji.js';
import { DomSanitizer } from '@angular/platform-browser';

import Quill from 'quill'

import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
Quill.register('modules/blotFormatter', BlotFormatter);


@Component({
  selector: 'blog-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  
  modules = {}
  form = this.byPassHTML("")

  blured = false
  focused = false

  fonts = ['escolar', 'vogue'];
  fontSizes = Array.from({length: 20}, (_, index) => `${(index - 1) * 2 + 12}px`);

  constructor(private sanitizer: DomSanitizer) {
    this.addFonts();
    // this.addFontSizes();

    this.createQuillModules();
  }

  addFonts() {   
    var font = Quill.import('attributors/style/font');
    const size = Quill.import('attributors/style/size');
    
    font.whitelist = this.fonts   
    size.whitelist = this.fontSizes; 

    Quill.register(font, true)
    Quill.register(size, true);
  }
  
  addFontSizes() {
    var fontSizeStyles = ".ql-snow .ql-picker.ql-size .ql-picker-label::before,.ql-snow .ql-picker.ql-size .ql-picker-item::before {content: attr(data-value);}";

    fontSizeStyles += `.ql-editor {font-size: ${this.fontSizes[0]};}`;
                      
    var node = document.createElement('style');
    node.innerHTML = fontSizeStyles;
    document.body.appendChild(node);    

    const Size = Quill.import('attributors/style/size');
    Size.whitelist = this.fontSizes;
    Quill.register(Size, true);

    
  }

  createQuillModules() {
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,
      blotFormatter: {
        // empty object for default behaviour.
      },
      'toolbar': {
        container: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': this.fontSizes }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': this.fonts }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video'],                         // link and image, video
          ['emoji'],
        ],
        handlers: { 'emoji': function () { } }
      }
    }
  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  created(event: any) {
    // event.editor.format
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
    this.form = this.byPassHTML(event.editor.root.innerHTML)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }
}
