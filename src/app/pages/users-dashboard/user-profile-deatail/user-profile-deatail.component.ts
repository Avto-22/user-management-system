import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/users-dashboard.model';
import { UsersHttp } from 'src/app/services/http-services/users.service';
import { CustomValidators } from 'src/app/utility';
import { UsersActions } from '../../../store/actions';

@Component({
  selector: 'app-user-profile-deatail',
  templateUrl: './user-profile-deatail.component.html',
  styleUrls: ['./user-profile-deatail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileDeatailComponent implements OnInit {
  get dynamicFields(): FormArray {
    return this.documentForm.get('dynamicFields') as FormArray;
  }

  action!: 'add' | 'edit';
  editUser: User | undefined = this.route.snapshot.data['user'];
  isAvatarChoosed: boolean = false;
  documentForm!: FormGroup;
  addingField: boolean = false;

  newFieldName: string = '';
  isNewFieldNameAdded: boolean = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private usersHttp: UsersHttp,
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.initAction();
    this.initEditForm();
  }

  initEditForm() {
    this.documentForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(
        null,
        [Validators.required],
        [CustomValidators.nameChecker(this.usersHttp, this.editUser?.id)],
      ),
      age: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
      email: new FormControl(
        null,
        [Validators.required],
        [CustomValidators.emailChecker(this.usersHttp, this.editUser?.id)],
      ),
      phone: new FormControl(null, [Validators.required]),
      workplace: new FormControl(null, [Validators.required]),
      avatar: new FormControl(null, [Validators.required]),
      dynamicFields: new FormArray([]),
    });
    if (this.action === 'edit') {
      this.fillEditForm();
    }
    this.cdr.detectChanges();
  }

  initAction() {
    this.action = this.editUser ? 'edit' : 'add';
  }

  addNewField() {
    if (!this.addingField) {
      this.addingField = true;
    } else if (this.newFieldName) {
      this.addField(this.newFieldName);
      this.addingField = false;
      this.newFieldName = '';
      this.isNewFieldNameAdded = true;
    }
  }

  addField(fieldName: string) {
    if (fieldName) {
      const newField = new FormGroup({
        name: new FormControl(fieldName, [Validators.required]),
        value: new FormControl('', [Validators.required]),
      });

      (this.documentForm.get('dynamicFields') as FormArray).push(newField);
      this.addingField = false;
    }
    this.cdr.markForCheck();
  }

  setFieldName(event: any) {
    this.newFieldName = event.target.value;
  }

  closeField() {
    this.addingField = false;
    this.newFieldName = '';
  }

  removeField(index: number) {
    this.dynamicFields.removeAt(index);
  }

  fillEditForm() {
    this.documentForm.patchValue({ ...this.editUser });
    this.fillDynamicFields();
  }

  fillDynamicFields() {
    if (this.editUser?.dynamicFields) {
      this.editUser?.dynamicFields.forEach(
        (field: { name: string; value: string }) => {
          this.dynamicFields.push(
            new FormGroup({
              name: new FormControl(field.name, Validators.required),
              value: new FormControl(field.value, Validators.required),
            }),
          );
        },
      );
    }
  }

  onAvatarUpload(event: any) {
    const file = event.target.files[0];
    this.isAvatarChoosed = !!file;
    if (file && file.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.documentForm.controls['avatar'].setValue(reader.result);
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    } else {
      this.documentForm.controls['avatar'].reset();
    }
  }

  onUpdateUser() {
    if (this.documentForm.invalid || this.addingField) return;
    this.store.dispatch(
      UsersActions.updateUser({ user: this.documentForm.value }),
    );
    this.closePopup();
  }

  onAddUser() {
    if (this.documentForm.invalid || this.addingField) return;
    this.store.dispatch(
      UsersActions.createUser({ user: this.documentForm.value }),
    );
    this.closePopup();
  }

  closePopup() {
    this.router.navigate(['users']);
  }
}
