import { ChangeDetectorRef, Component } from '@angular/core';
import { ResourceService } from 'src/app/@core/services/data/resources.service';
import { General, ResourceImageInfo, ResourceInfo } from 'src/app/models/ServerData';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService, ESuccessType } from 'src/app/@core/services/dialog.service';
import { take } from 'rxjs/operators';
import { CompressImageService } from 'src/app/@core/services/data/compress-image.service';

var COLUMNS_SCHEDULE = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'type',
    type: 'select',
    options: {
      companions: "Compañeros",
      commercials: "Comerciales",
      theories: "Teóricos",
      ownCreations: "Creación Propia"
    },
    label: 'Tipo',
    required: true
  },
  {
    key: 'name',
    type: 'text',
    label: 'Nombre',
    required: true
  },
  {
    key: 'instagram',
    type: 'text',
    label: 'Instagram'
  },
  {
    key: 'web',
    type: 'text',
    label: 'Web'
  },
  {
    key: 'showDate',
    type: 'date',
    label: 'Fecha Publicación',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
]

@Component({
  selector: 'app-manage-resources',
  templateUrl: './manage-resources.component.html',
  styleUrls: ['./manage-resources.component.scss']
})
export class ManageResourcesComponent {
  loading: boolean
  rowImageEditing: ResourceInfo;
  newImage: ResourceImageInfo
  compressingImage: boolean = false;

  displayedColumns: string[] = COLUMNS_SCHEDULE.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEDULE
  dataSource = new MatTableDataSource<ResourceInfo>();
  valid: any = {};
  constructor(
    private dialogService: DialogService,
    private resourceService: ResourceService,
    private compressImage: CompressImageService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = true;
    this.resourceService.getResources().subscribe((data: ResourceInfo[]) => {
      this.dataSource.data = data;
      this.loading = false;
    })
  }

  editRow(row: ResourceInfo) {
    this.loading = true;
    if (row.id === -1)
    {
      this.resourceService.createResources(row).subscribe(
        (resource: ResourceInfo) => {
          row.id = resource.id;
          row.isEdit = false;
          this.loading = false;
          this.dialogService.showSuccessMessage(ESuccessType.INSERT)
        }, error => { this.dialogService.showErrorMessage(error); this.loading = false; });
    } else
    {
      this.resourceService.updateResources(row).subscribe(
        (general: General) => {
          this.loading = false;
          if (general.status == 200)
          {
            row.isEdit = false
            this.dialogService.showSuccessMessage(ESuccessType.MODIFY)
          } else
          {
            this.dialogService.showErrorMessage(`Status ${general.status}`);
          }
        }, error => { this.loading = true; this.dialogService.showErrorMessage(error); console.log(error); });
    }
  }

  addRow() {
    const newRow: ResourceInfo = {
      id: -1,
      type: '',
      name: '',
      instagram: '',
      web: '',
      showDate: null,
      images: [],
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: number) {
    this.dialogService.showConfirmDialog()
      .subscribe((confirm) => {
        if (confirm)
        {
          this.loading = true;
          this.resourceService.deleteResources(id).subscribe((general: General) => {
            this.loading = false;
            if (general.status == 200)
            {
              this.dataSource.data = this.dataSource.data.filter(
                (r: ResourceInfo) => r.id !== id
              );
              this.dialogService.showSuccessMessage(ESuccessType.REMOVE)
            }
            else
            {
              this.dialogService.showErrorMessage(`Status ${general.status}`);
            }
          }, error => {
            this.dialogService.showErrorMessage(error);
            this.loading = false;
          });
        }
      });
  }

  removeSelectedRows() {
    const resources = this.dataSource.data.filter((r: ResourceInfo) => r.isSelected);
    this.dialogService.showConfirmDialog()
      .subscribe((confirm) => {
        if (confirm)
        {
          this.loading = true;
          let errorMessage = null;
          resources.forEach(
            (res) => {
              this.resourceService.deleteResources(res.id).subscribe(
                (general: General) => {
                  if (general.status == 200)
                  {
                    this.dataSource.data = this.dataSource.data.filter(
                      (r: ResourceInfo) => r.id !== res.id
                    );
                  }
                  else
                  {
                    errorMessage += `Status ${general.status} for ${res.id} ||`;
                  }
                }, error => {
                  errorMessage += `${error} ||`;
                });
            }
          )
          this.loading = false;
          if (!errorMessage) this.dialogService.showSuccessMessage(ESuccessType.REMOVE)
          else this.dialogService.showErrorMessage(errorMessage);
        }
      });
  }

  disableSubmit(index: number) {
    return !this.dataSource.data[index].name || !this.dataSource.data[index].type;
  }

  editImage(row: ResourceInfo) {
    this.newImage = {
      resource_id: row.id,
      image_id: null,
      image_path: null
    };
    this.rowImageEditing = row;
  }

  stopEditImage() {
    this.newImage = null;
    this.rowImageEditing = null;
  }

  onChange(event) {
    this.newImage.image_path = null;

    this.compressingImage = true;

    const reader = new FileReader();

    if (event.target.files && event.target.files.length)
    {
      const imageFile = event.target.files[0];
      this.compressImage.compress(imageFile).pipe(take(1))
        .subscribe((compressedImage: File) => {
          reader.readAsDataURL(compressedImage);
          reader.onload = () => {
            this.compressingImage = false;
            this.newImage.image_path = reader.result as string;
            this.ref.detectChanges();
          };
        });
    }
  }

  addImage() {
    this.loading = true;
    this.resourceService.updateResourceImage(this.newImage).subscribe(
      (resourceImageInfo: ResourceImageInfo) => {
        this.newImage = {
          resource_id: this.rowImageEditing.id,
          image_id: null,
          image_path: null
        };
        this.rowImageEditing.images.push(resourceImageInfo)
        this.loading = false;
        this.dialogService.showSuccessMessage(ESuccessType.INSERT);
      }, error => {
        this.loading = false;
        this.dialogService.showErrorMessage(error);
    });
  }

  removeImage(resourceImageInfo: ResourceImageInfo) {
    resourceImageInfo.resource_id = this.rowImageEditing.id;
    this.dialogService.showConfirmDialog()
      .subscribe((confirm) => {
        if (confirm)
        {
          this.loading = true;
          this.resourceService.deleteResourceImage(resourceImageInfo).subscribe(
            (general: General) => {
              if (general.status == 200)
              {
                this.rowImageEditing.images = this.rowImageEditing.images.filter(
                  (r: ResourceImageInfo) => r.image_id !== resourceImageInfo.image_id
                );
                this.loading = false;
                this.dialogService.showSuccessMessage(ESuccessType.REMOVE);
              }
              else
              {
                this.loading = false;
                this.dialogService.showErrorMessage(`Status ${general.status} for ${resourceImageInfo.image_id}`)
              }
            }, error => {
              this.loading = false;
              this.dialogService.showErrorMessage(error)
            });
        }
      });
  }
}
