import { Component, OnInit } from '@angular/core';
import { Preference } from 'src/app/classes/classes';
import { SnackBarHelper } from 'src/app/helpers/snackBar';
import { PreferencesService } from 'src/app/services/preferencesService';

@Component({
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['../../../../theme/theme.css', './preferences.component.css'],
})

export class PreferencesComponent implements OnInit {
    public years: number[];
    private startYear: number = 2023;
    public preference: Preference;

    constructor(public sbh: SnackBarHelper, private ps: PreferencesService) {
        this.years = [];
        this.preference = new Preference();

        for(let i = this.startYear; i < this.startYear + 20; i++) {
            this.years.push(i);
        }
    }

    ngOnInit(): void {
        this.ps.Get().subscribe(result => {
            this.preference = result.body;
        }, error => {
            console.error(error);
        });
    }

    safePreferences() {
        this.ps.Save(this.preference).subscribe(result => {
            this.sbh.openSnackBar(result.body, "Dismiss", 3000);
        }, error => {
            console.error(error);
        });
    }
}