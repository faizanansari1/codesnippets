import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  SnapshotOptions,
  doc,
  getDoc,
} from 'firebase/firestore';
import { AuthService } from './auth.service';
import { AllSnippetsResult, Snippet } from '../../models/snippet';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db: any;
  constructor(private authService: AuthService, private routes: Router) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: Snippet) {
    try {
      const docRef = await addDoc(collection(this.db, 'snippets'), {
        ...snippet,
        by: this.authService.getUserID(),
      });
      console.log('Document written with ID: ', docRef.id);
      this.routes.navigate(['/']);
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Error while store snippets in firbase database');
    }
  }

  async getAllSnippets() {
    let result: AllSnippetsResult[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'snippets'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      result.push({ ...doc.data(), id: doc.id });
    });

    return result;
  }

  async getSnippetById(docId: string) {
    const docRef = doc(this.db, 'snippets', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
      return {
        id: '0',
        title: 'not found',
        code: 'not found',
      };
    }
  }
}
