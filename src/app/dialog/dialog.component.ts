import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validator, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn :string ="Save";

  constructor(private formBuilder: FormBuilder, 
    private api:ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<DialogComponent>
    ){

  }

  ngOnInit(): void{
   this.productForm=this.formBuilder.group({
    Name: ['',Validators.required],
    Category: ['',Validators.required],
    Price: ['',Validators.required],
   Id: ['',Validators.required],
   Description:['',Validators.required]
   })

   if(this.editData){
    this.actionBtn="Update";
    this.productForm.controls['Name'].setValue(this.editData.Name);
    this.productForm.controls['Category'].setValue(this.editData.Category);
    this.productForm.controls['Price'].setValue(this.editData.Price);
    this.productForm.controls['Id'].setValue(this.editData.Id);
    this.productForm.controls['Description'].setValue(this.editData.Description);

   }
  }

  addProduct() {
if(!this.editData){
  if(this.productForm.valid)
{
  this.api.postProduct(this.productForm.value).subscribe({
    next:(res)=>{
      alert("Product added successfully");
      this.productForm.reset();
      this.dialogRef.close('save');
    },
    error:()=>{
      alert("Errore while adding the product")
    }
  })
}
}

else{
  this.updateProduct();
}
  }
  
  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next:(res)=>{
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the records!");
      }
    })
  }
}



