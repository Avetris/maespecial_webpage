import { Component } from '@angular/core';
import { ResourceService } from 'src/app/@core/services/data/resources.service';
import { General, ResourceInfo } from 'src/app/models/ServerData';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService, ESuccessType } from 'src/app/@core/services/dialog.service';

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
      ownCreation: "Creación Propia"
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
  displayedColumns: string[] = COLUMNS_SCHEDULE.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEDULE
  dataSource = new MatTableDataSource<ResourceInfo>();
  valid: any = {};
  constructor(private dialogService: DialogService, private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe((data: ResourceInfo[]) => {
      this.dataSource.data = data;
    })
  }

  editRow(row: ResourceInfo) {
    if (row.id === -1)
    {
      this.resourceService.createResources(row).subscribe(
        (resource: ResourceInfo) => {
          row.id = resource.id;
          row.isEdit = false;
          this.dialogService.showSuccessMessage(ESuccessType.INSERT)
        }, error => { this.dialogService.showErrorMessage(error); });
    } else
    {
      this.resourceService.updateResources(row).subscribe(
        (general: General) => {
          if (general.status == 200)
          {
            row.isEdit = false
            this.dialogService.showSuccessMessage(ESuccessType.MODIFY)
          } else
          {
            this.dialogService.showErrorMessage(`Status ${general.status}`);
          }
        }, error => { this.dialogService.showErrorMessage(error); console.log });
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
          this.resourceService.deleteResources(id).subscribe((general: General) => {
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
          if (!errorMessage) this.dialogService.showSuccessMessage(ESuccessType.REMOVE)
          else this.dialogService.showErrorMessage(errorMessage);
        }
      });
  }

  disableSubmit(index: number) {
    return !this.dataSource.data[index].name || !this.dataSource.data[index].type;
  }
}
