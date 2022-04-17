import { Component } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import 'quill-emoji/dist/quill-emoji.js';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import { FileUpload } from 'src/app/models/FileUpload';

Quill.register('modules/blotFormatter', BlotFormatter);
// Quill.register('modules/imageHandler', ImageHandler);

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
    node.setAttribute('alt', value.alt);
    return node;
  }

  /**
   * Converts the image blot to HTML tag
   * @param node 
   */
  static value(node) {
    var blot = {};
    blot['url'] = node.getAttribute('url');
    blot['alt'] = node.getAttribute('alt');
    return blot;
  }
}
Quill.register(CustomImageBlot);

const BlockPrototype = Quill.import("blots/block");

class DefaultSettingsBlock extends BlockPrototype {
  domNode: any;
  constructor(domNode, value) {
    super(domNode, value);
    this.format("size", "18px");
    this.format("font", "escolar");
  }

  static tagName = "P";

  format(name, value) {
    if (name === "size") {
      this.domNode.style.fontSize = value;
    } else if (name === "font") {
      this.domNode.style.fontFamily = value;
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(DefaultSettingsBlock, true);


@Component({
  selector: 'blog-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  
  modules = {}
  form = ""

  fonts = ['escolar', 'vogue'];
  fontSizes = Array.from({length: 20}, (_, index) => `${(index - 1) * 2 + 12}px`);

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {
    this.addFonts();

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
        handlers: { 
          'emoji': function () { },
          'image': function() {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = async function() {
              if (input.files != null) {  
                let file = input.files[0];  
                console.log('User trying to uplaod this:', file);
                if (file != null) {  
                    var reader = new FileReader();  
                    reader.readAsDataURL(file);  
                    reader.onerror = function(error) {  
                        console.log('Error: ', error);  
                    };  
                    reader.onloadend = function() {  
                        //Read complete  
                        if (reader.readyState == 2) {  
                            var base64result = reader.result;  
                            const range = this.quill.getSelection();
                            this.quill.insertEmbed(range.index, 'customImage', {url: base64result, alt: file.name}); 
                        }
                    }.bind(this);  
                }  
              }  
            }.bind(this);
          }
        },
      }
    }
  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    // console.log('editor-change', event)
    this.form = event.editor.root.innerHTML
    console.log(this.form)
  }

  async uploadPost()
  {
    var parser = new DOMParser();
    var doc = parser.parseFromString(this.form, 'text/html');
    var promises = [];
    doc.querySelectorAll("img").forEach(img => {
      console.log(img.src.split("/").reverse()[0])

      var p = this.uploadImage(this.dataURLtoFile(img.src, img.alt));
      promises.push(p);
      p.then((url) => {   
        console.log(url)     
        if(url != null)
        {
          img.src = url;
          img.alt = "";
        }
      })      
    })

    Promise.all(promises).then(() => {
      this.form = doc.documentElement.innerHTML
      console.log(doc.documentElement.innerHTML);
    })   
  }

  dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }

  uploadImage(file): Promise<string>
  {
    return new Promise((resolve, reject) => {
        const uploadData = new FormData();
        uploadData.append('file', file, file.name);

        this.http.post<FileUpload>(`https://${window.location.hostname}/api/upload`, uploadData).toPromise()
        .then(result => {
          if(result.status)
          {
            console.log(result)
            resolve(result.url);
          }
          else
          {                    
            console.error('Error: status  fail');
            reject(null);
          }              
      })
      .catch(error => { 
        console.error('Error:', error);
        reject(null);
      });
    })    
  }
}
