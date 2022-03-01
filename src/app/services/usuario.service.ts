import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable()
export class UsuarioService {
  private dbpath = '/datos';

  private storageVar = 'loguedUser';

  firestoreRef: AngularFirestoreCollection<Usuario>;

  constructor(private afs: AngularFirestore) {
    this.firestoreRef = afs.collection<Usuario>(this.dbpath);
  }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.firestoreRef.valueChanges({ idField: 'id' });
  }

  public loggedIn: boolean = false;
  private logger = new Subject<boolean>();

  isLoggedIn(): Observable<boolean> {
    let user = localStorage.getItem(this.storageVar);

    this.loggedIn = (user != null);
    this.logger.next(this.loggedIn);
    return of(this.loggedIn);
  }

  logIn(username: string, password: string): Observable<boolean> {

    this.getAllUsuarios().forEach((usuarios) => {
      usuarios.forEach((usuario) => {
        console.log(usuario);
        if (username === usuario.nombre && password === usuario.password) {
          localStorage.setItem(this.storageVar, JSON.stringify(usuario));
          this.loggedIn = true;
          //this.logger.next(this.loggedIn);
        }
      });
    });

    return of(this.loggedIn);
  }

  logOut(): Observable<boolean> {

    localStorage.removeItem(this.storageVar);
    this.loggedIn = false;
    this.logger.next(this.loggedIn);
    return of(this.loggedIn);
  }
}
