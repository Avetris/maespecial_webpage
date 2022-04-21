import { Component } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import 'quill-emoji/dist/quill-emoji.js';
import { DomSanitizer } from '@angular/platform-browser';

import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import { CustomImageBlot } from './custom-image.blot';
import { DefaultSettingsBlock } from './default-settings.block';
import { PostService } from 'src/app/@core/services/data/post.service';
import { Router } from '@angular/router';
import { General, PostInfo } from 'src/app/models/ServerData';
import { CompressImageService } from 'src/app/@core/services/data/compress-image.service';
import { take } from 'rxjs/operators';
import { DialogService, ESuccessType } from 'src/app/@core/services/dialog.service';

Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register(CustomImageBlot);
Quill.register(DefaultSettingsBlock, true);


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  modules = {}

  newPostInfo: PostInfo = { id: -1, title!: null, description: null, image: null, content: "", publishDate: null };
  currentPostInfo: PostInfo;

  fonts = ['escolar', 'vogue'];
  fontSizes = Array.from({ length: 20 }, (_, index) => `${(index - 1) * 2 + 12}px`);

  constructor(private dialogService: DialogService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private postService: PostService,
    private compressImage: CompressImageService) {
    this.addFonts();

    this.createQuillModules();

    let post = this.router.url.split("/").pop();

    if (Number(post))
    {
      let postId = Number(post)
      this.postService.getPostData(postId).subscribe((post: PostInfo) => {
        this.setData(post);
      })
    }
  }

  setData(post: PostInfo) {
    this.currentPostInfo = Object.assign({}, post);
    this.newPostInfo = Object.assign({}, post);
  }

  disablePublish() {
    return !this.newPostInfo.content ||
      !this.newPostInfo.title ||
      !this.newPostInfo.description ||
      !this.newPostInfo.image ||
      !this.newPostInfo.publishDate;
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
    const self = this;
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
          'image': function () {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = function () {
              if (input.files != null)
              {
                let file = input.files[0];
                if (file != null)
                {
                  self.compressImage.compress(file).pipe(take(1)).subscribe((compressedImage: File) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(compressedImage);
                    // reader.readAsDataURL(file);
                    reader.onerror = function (error) { console.log('Error: ', error) };
                    reader.onloadend = function () {
                      if (reader.readyState == 2)
                      {
                        var base64result = reader.result;
                        const range = this.quill.getSelection();
                        this.quill.insertEmbed(range.index, 'customImage', { url: base64result, alt: file.name });
                      }
                    }.bind(this)
                  });
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
    this.newPostInfo.content = event.editor.root.innerHTML
  }

  onChange(event) {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length)
    {
      const imageFile = event.target.files[0];
      this.compressImage.compress(imageFile).pipe(take(1))
        .subscribe((compressedImage: File) => {
          reader.readAsDataURL(compressedImage);
          reader.onload = () => {
            this.newPostInfo.image = reader.result as string;
          };
        });
    }
  }

  disable(field)
  {
    if(field == "title") return this.newPostInfo.title == this.currentPostInfo.title;
    else if(field == "description") return this.newPostInfo.description == this.currentPostInfo.description;
    else if(field == "publishDate") return this.newPostInfo.publishDate == this.currentPostInfo.publishDate;
    else if(field == "content") return this.newPostInfo.content == this.currentPostInfo.content;
    else if(field == "image") return this.newPostInfo.image == this.currentPostInfo.image;
    else return false;
  }

  revert(field)
  {
    if(field == "title") this.newPostInfo.title = this.currentPostInfo.title;
    else if(field == "description") this.newPostInfo.description = this.currentPostInfo.description;
    else if(field == "publishDate") this.newPostInfo.publishDate = this.currentPostInfo.publishDate;
    else if(field == "content") this.newPostInfo.content = this.currentPostInfo.content;
  }
  revertImage(input) { this.newPostInfo.image = this.currentPostInfo.image; input.value = ''; }

  createPost() {
    this.postService.createPost(this.newPostInfo).subscribe(
      (general: General) => {
        this.dialogService.showSuccessMessage(ESuccessType.INSERT).subscribe(() => {
          this.router.navigate(["/admin/posts"])
        });
      }, error => {
        this.dialogService.showErrorMessage(error);
      });
  }

  modifyPost() {
    this.postService.updatePost(this.newPostInfo).subscribe(
      (generalt: General) => {
        this.dialogService.showSuccessMessage(ESuccessType.MODIFY).subscribe(() => {
          this.router.navigate(["/admin/posts"])
        });
      }, error => {
        this.dialogService.showErrorMessage(error);
      });
  }
}
