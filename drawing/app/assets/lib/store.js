class Store {
  constructor(){
    this.data  = {} || null;
    console.info("Store is created successfully !!!");
  }

  insertData(key,values){
    if(!this.data[key]){
      this.data[key] = values;
      return `${this.data[key]} is inserted successfully `;
    }else{
      return `Already present `;
    }
  }

  deleteData(key){
    delete this.data[key];
    return `${this.data[key]} is deleted successfully `;
  }

  updateData(key,values){
    if(this.data[key]){
      this.data[key] = values;
      return `${this.data[key]} is now modified with ${values} `;
    }
  }

  getAllData(){
    return this.data;
  }

  getOne(key){
    if(this.data[key]){
      return this.data[key];
    }else{
      return `Not Found`;
    }
  }
}

export default Store;