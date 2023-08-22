import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/users-dashboard.model';
import { UsersHttp } from 'src/app/services/http-services/users.service';
import { CustomValidators } from 'src/app/utility';
import { UsersActions } from '../store/actions';

@Component({
  selector: 'app-user-profile-deatail',
  templateUrl: './user-profile-deatail.component.html',
  styleUrls: ['./user-profile-deatail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileDeatailComponent implements OnInit {
  editUser: User | undefined = this.route.snapshot.data['user'];

  isAvatarChoosed: boolean = false;

  action!: 'add' | 'edit';
  documentForm!: FormGroup;

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
      name: new FormControl(null, [Validators.required]),
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
    });
    if (this.action === 'edit') {
      this.fillEditForm();
    }
    // this.cdr.markForCheck();
  }

  onAvatarUpload(event: any) {
    const file = event.target.files[0];
    this.isAvatarChoosed = !!file;
    if (file && file.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.documentForm.controls['avatar'].patchValue(reader.result);
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    } else {
      this.documentForm.controls['avatar'].reset();
    }
  }

  onUpdateUser() {
    if (this.documentForm.invalid) return;
    this.store.dispatch(
      UsersActions.updateUser({ user: this.documentForm.value }),
    );
    this.closePopup();
  }

  onAddUser() {
    if (this.documentForm.invalid) return;
    this.store.dispatch(
      UsersActions.createUser({ user: this.documentForm.value }),
    );
    this.closePopup();
  }

  initAction() {
    this.action = this.editUser ? 'edit' : 'add';
  }

  closePopup() {
    this.router.navigate(['users']);
  }

  fillEditForm() {
    this.documentForm.setValue({ ...this.editUser });
  }
}
