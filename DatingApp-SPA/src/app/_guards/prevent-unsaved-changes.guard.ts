import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-list/member-card/member-edit/member-edit.component';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {

    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('The changes are not saved ! If you get out it will lost.');
        }

        return true;

    }
}
