import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Articulo } from '../models/articulo';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';

@Injectable()
export class ArticuloService {
  private dbpath = '/articulos';

  firestoreRef: AngularFirestoreCollection<Articulo>;

  constructor(private afs: AngularFirestore) {
    this.firestoreRef = afs.collection<Articulo>(this.dbpath);
  }

  getAllArticles(): Observable<Articulo[]> {
    return this.firestoreRef.valueChanges({ idField: 'id' }).pipe(
      map((items: Articulo[]) => {
        return items.map((item: Articulo) => {
          for (let i = 0; i < item.Imagenes.length; i++) {
            item.Imagenes[i] = item.Imagenes[i]
              .trim()
              .replace(
                'https://drive.google.com/file/d/',
                'https://drive.google.com/uc?id='
              )
              .replace('/view?usp=sharing', '&SameSite=None');
          }
          return item;
        });
      })
    );
  }

  async create(articulo: Articulo): Promise<Articulo | undefined> {
    return new Promise<any>((resolve, reject) => {
      this.firestoreRef
        .add(articulo);
    });
  }

  update(id: string, data: any): Promise<void> {
    return this.firestoreRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.firestoreRef.doc(id).delete();
  }

  get(id: string): Observable<Articulo | undefined> {
    return this.firestoreRef.doc<Articulo>(id).valueChanges();
  }
}
