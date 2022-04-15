import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ConfigModel } from '../models/config.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configDoc: AngularFirestoreDocument<ConfigModel>;
  config: Observable<ConfigModel>

  id: string = 'mNwsxLpuOuqCAVKcxXiP';

  constructor(private db: AngularFirestore) { }

  getConfig(): Observable<ConfigModel> {
    this.configDoc = this.db.doc<ConfigModel>(`config/${this.id}`);
    this.config = this.configDoc.valueChanges() as Observable<ConfigModel>;
    return this.config;
  }

  modificarConfig(config: ConfigModel) {
    this.configDoc = this.db.doc<ConfigModel>(`config/${this.id}`);
    this.configDoc.update(config);
  }
}
