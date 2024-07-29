import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent {



  id:number=0;
  account:Account=new Account();
  constructor(private accountService:AccountService,private route:ActivatedRoute, private router:Router){}


  ngOnInit(){
    this.id=this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data=>{
      this.account=data;
    })
  }


  successMessage="";
  errorMessage="";


onSubmit(){

  if(this.isValidAmount(this.account.balance)){
this.accountService.withdraw(this.id,this.account.balance).subscribe(data=>{
  this.account=data;

  this.successMessage="withdraw successfully ........"
  
  setTimeout(() =>{
    this.router.navigate(['/accounts'])
  },1000)


})
}else if(this.account.balance>1000000){
this.errorMessage="Amount must be less than 10 lakh"

setTimeout(() =>{

  this.errorMessage=""
},1000);
}else{
  this.errorMessage="Invalid amount ...Please enter a valid amount "

setTimeout(() =>{

  this.errorMessage=""
},1000);

}
}
isValidAmount(amount:number){
return amount>0 && amount<1000000

}
}
