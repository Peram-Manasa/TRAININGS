/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable no-useless-escape */


import * as React from 'react';

import { IContentQueryProps } from './IContentQueryProps';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../pnpConfig';
import { ICamlQuery } from '@pnp/sp/lists';
import { DetailsList } from 'office-ui-fabric-react';
// import DetailsList from './DetailsList/Components/DetailsList';
// import { DetailsList } from 'office-ui-fabric-react';



export default class ContentQuery extends React.Component<IContentQueryProps,{ListData:Array<string>,columnArr:Array<string>,titleOfList:string}> {
  
  public realListData:any
  public createQuery():any{
    let query:any = `<View><ViewFields>`
    this.props.listNames.map((x:any)=>{
      query+=`<FieldRef Name='${x}' />`
    })
    query+=`</ViewFields></View>`
    return query
  }
  


  public async componentDidMount(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  // this.realListData=this.getdata();
  // console.log(this.realListData);
  
  //   // const columnString = this.props.listNames.map((item:any)=>`${item}`)
  //   // const actualColumnString = columnString.join(',')
  //   // console.log(actualColumnString);
   
    const caml: ICamlQuery = {
      ViewXml: this.createQuery(),
  };
      console.log(caml);
    const sp:SPFI = getSP(this.props.context)


       const Reallist = await sp.web.lists.getById(this.props.selectedList)      
      const d = await Reallist.getItemsByCAMLQuery(caml);
      this.realListData=d
       console.log(this.realListData)
       console.log(Reallist);
       this.props.title.then((data:string)=>{
        this.setState({
          titleOfList:data
        })
       }) 
      // let arr:any[]=[];
      //  d.map((y: any) => { Object.keys(y).filter(x => x !== "odata.type" && x !== "odata.id" && x !== "odata.etag" && x !== "odata.editLink" && x !== "FileSystemObjectType" && x !== "ServerRedirectedEmbedUri" && x !== "ServerRedirectedEmbedUrl" && x !== "ContentTypeId" && x !== "ComplianceAssetId" && x !== "OData__ColorTag" && x !== "AuthorId" && x !== "EditorId" && x !== "OData__UIVersionString" && x !== "Attachments" && x !== "GUID" && x !== "Id").map((x: any) => { console.log(x); arr.push(x) }) })




        this.setState(()=>{
          return{
            ...this.state,
            ListData:d,
          }
        })
  console.log(this.state.columnArr);
  
   

    
  }


  public generateColumns():any{
    let columns:any[]= []
    console.log(this.props.listNames);
    this.props.listNames&&this.props.listNames.map((x:any,i:any)=>{
        columns.push({key:`column ${i}`, name:x,fieldName:x})
    })
    return columns
  } 

  // public async getdata():Promise<any>{
  //   const sp:SPFI = getSP(this.props.context)
       
  //   const caml: ICamlQuery = {
  //     ViewXml: this.createQuery(),
  // };
  //     console.log(caml);
  //   const Reallist = await sp.web.lists.getById(this.props.selectedList)      
  //   const d = await Reallist.getItemsByCAMLQuery(caml);
  //   this.realListData=d
  //    console.log(this.realListData)
  //     return d
  // }

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   public constructor(props:any){
    super(props);
    this.state = {  
     ListData:[],
     columnArr:[],
     titleOfList:""
    };  
   }

  public render(): React.ReactElement<IContentQueryProps> {
    console.log(this.props.selectedList);
    console.log(this.props.title);
    console.log(this.state.ListData);
    console.log(this.generateColumns());
    console.log(this.state.titleOfList);
    
    let columnsofthedetailslist = this.generateColumns()
    // let actualRealdata = this.getdata();
    // console.log(actualRealdata);
    if(this.state.ListData&&columnsofthedetailslist){
      return (
      
        <>  
       
<div>
  <div><h2>{this.state.titleOfList}</h2></div>
      <DetailsList
        columns={this.generateColumns()}
        items={this.state.ListData}
        
      />
  </div> 
 </>
       
    
     );
     
    }else{
      return(
        <div>Please select list and Columns</div>
      )
    }

  }
}
