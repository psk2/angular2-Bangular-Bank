import {Routes} from '@angular/router';
import {CircularComponent} from './circular/circular.component';
import {SearchComponent} from './search/search.component';
import {UserComponent} from './user/user.component';
import {BloodBankDetailsComponent} from './blood-bank-details/blood-bank-details.component';
import { TableBasicExampleComponent } from './table-basic-example/table-basic-example.component';
import { CreateBloodBankComponent } from "./create-blood-bank/create-blood-bank.component";

export const appRoutes: Routes = [
    {
        path:'circular',
        component: CircularComponent
    },
    {
        path:'search',
        component: SearchComponent
    },
    {
        path:'user/:userId',
        component: UserComponent
    },
    {
        path:'bloodBanks',
        component: BloodBankDetailsComponent
    },
    {
        path:'tables',
        component: TableBasicExampleComponent
    },
    {
        path:'createBloodBank',
        component: CreateBloodBankComponent
    }
]