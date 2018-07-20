export class Expense {

  status?: string;
  user?: string;
  constructor(
    public date: string,
    public amount: number,
    public category: string,
    public merchant: string,
    public notes?: string,
    public favIcon?: string 
  ) {
    if (!this.favIcon)

      this.favIcon = '';

    if (!this.notes)

      this.notes = '';

    this.status = "pending";
  }

}
