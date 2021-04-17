import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit,OnDestroy {
  Uid
  fullName
  successMessage
  dataArray
  dataProd={
    title:'',
    image:'',
    description:'',
    uid:''

  }
  successUpdate
  getProducts:Subscription

  constructor(private fs:AngularFirestore,private as:AuthService,private route:Router) { 
    this.as.user.subscribe(user=>{
      this.Uid=user.uid
      
    })


  }

  ngOnInit(): void {
    
  this.getProducts= this.fs.collection("products").snapshotChanges().subscribe((data)=>{
     this.dataArray= data.map(element=>{
       return{ 
         id:element.payload.doc.id ,
         title:element.payload.doc.data()['title'],
         description:element.payload.doc.data()['description'],
         image:element.payload.doc.data()['image'],
         uid:element.payload.doc.data()['uid'],
      }
      })
    })

  }
  addproduct(f){
    let data=f.value
    this.fs.collection("products").add({
      title:data.title,
      description:data.description,
      image:data.image,
      uid:this.Uid
    }).then(()=>{
      this.successMessage='added !'
      this.route.navigate(['/myproducts'])
    })
}
delete(id){
  this.fs.collection("products").doc(id).delete()

}

updateProd(){
 
  this.fs.collection("products").doc(this.dataProd.uid).update({
   
    title:this.dataProd.title,
    description:this.dataProd.description
  }).then(()=>{
    this.successUpdate="updated!"
    window.location.reload()
 
  }).catch(()=>{
    console.log("error")
  })
}




ngOnDestroy(){
  this.getProducts.unsubscribe()
  console.log("done on destroy")

}
}