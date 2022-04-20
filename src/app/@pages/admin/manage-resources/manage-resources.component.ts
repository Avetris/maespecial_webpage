import { Component } from '@angular/core';
import { ResourceService } from 'src/app/@core/services/data/resources.service';
import { General, ResourceInfo } from 'src/app/models/ServerData';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

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
      ownCreation: "Creación Propia"},
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
  selector: 'blog-manage-resources',
  templateUrl: './manage-resources.component.html',
  styleUrls: ['./manage-resources.component.scss']
})
export class ManageResourcesComponent {
  displayedColumns: string[] = COLUMNS_SCHEDULE.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEDULE
  dataSource = new MatTableDataSource<ResourceInfo>();
  valid: any = {};

  constructor(public dialog: MatDialog, private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe((data: ResourceInfo[]) => {
      this.dataSource.data = data;
    })
  }

  editRow(row: ResourceInfo) {
    if (row.id === -1) {
      this.resourceService.createResources(row).subscribe((resource: ResourceInfo) => {
        row.id = resource.id;
        row.isEdit = false;
      });
    } else {
      this.resourceService.updateResources(row).subscribe((general: General) => {if(general.status == 200) row.isEdit = false});
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
    this.resourceService.deleteResources(id).subscribe((general: General) => {
      if(general.status == 200)
      {
        this.dataSource.data = this.dataSource.data.filter(
          (r: ResourceInfo) => r.id !== id
        );
      }
    });
  }

  removeSelectedRows() {
    const users = this.dataSource.data.filter((r: ResourceInfo) => r.isSelected);
    /*this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteUsers(users).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: User) => !u.isSelected
            );
          });
        }
      });*/
  }

  disableSubmit(index: number) {
    return !this.dataSource.data[index].name || !this.dataSource.data[index].type;
  }
}
