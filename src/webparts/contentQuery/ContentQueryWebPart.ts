import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,

} from '@microsoft/sp-property-pane';
import { IColumnReturnProperty,  PropertyFieldColumnPicker, PropertyFieldColumnPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldColumnPicker';
import { IPropertyFieldList, PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IPropertyFieldSite } from '@pnp/spfx-property-controls/lib/PropertyFieldSitePicker';
import * as strings from 'ContentQueryWebPartStrings';
import { IContentQueryProps } from './components/IContentQueryProps';
import ContentQuery from './components/ContentQuery';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../pnpConfig';

import '@pnp/sp/presets/all'
import '@pnp/common'

export interface IContentQueryWebPartProps {
  textInfoHeaderValue: string;
  selectedView: any;
  list: string;
  column: string | string[];
  singleListFiltered: string;
  multiColumn: string | string[];
  view: string | string[];
  sites: IPropertyFieldSite[];
  lists: string | string[] | IPropertyFieldList | IPropertyFieldList[];
  description: string;
  selectedList:string;
  siteId:string;
  title:Promise<string>;
}

export interface IDynamicItem {

  // The URL of the web site where the selected item comes from
  webUrl: string;
  // The ID of the list that contains the selected item
  listId: string;
  siteId:string;
  // The ID of the selected item
  itemId: number;
}
export interface IPropertyControlsTestWebPartProps {
  list: string; // Stores the list ID
}
export interface IPropertyControlsTestWebPartProps {
  list: string; // Stores the list ID

  // BEGIN: Added
  column: string; // Stores the single column property (property can be configured)
  // END: Added

  // BEGIN: Added
  multiColumn: string; // Stores the multi column property (property can be configured)
  // END: Added
  sites: IPropertyFieldSite[];
  lists: string | string[];
  
}







export default class ContentQueryWebPart extends BaseClientSideWebPart<IContentQueryWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  options: IPropertyPaneDropdownOption[];
  selectedItem: IDynamicItem;

  
   public constructor(){
    super();
   }
  public siteUrls:any = [];


  //private _isDarkTheme: boolean;

  public render(): void {
    const element: React.ReactElement<IContentQueryProps> = React.createElement(
      ContentQuery,
      {
     context:this.context,
     selectedList: this.properties.list,
     description: this.properties.description,
     isDarkTheme: this._isDarkTheme,
     environmentMessage: this._environmentMessage,
     hasTeamsContext: !!this.context.sdks.microsoftTeams,
     userDisplayName: this.context.pageContext.user.displayName,
     title: this.getListTitle(this.properties.list),
     onSelectedItem: this.onSelectedItem.bind(this),
     listNames:this.properties.multiColumn,
      }
    );
    ReactDom.render(element, this.domElement);
  }


  


protected async onInit(): Promise<void> {

  return super.onInit();
  
}



  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {
      pages: [
        {
         
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [

                // PropertyFieldSitePicker('sites', {
                //   label: 'Select sites',
                //   initialSites: this.properties.sites,
                //   context: this.context,
                //   deferredValidationTime: 500,
                //   multiSelect: false,
                //   onPropertyChange: this.onPropertyChange.bind(this),
                //   properties: this.properties,
                //   key: 'sitesFieldId'
                // }),
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                 
                  selectedList: this.properties.singleListFiltered,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange:this.onPropertyListChange.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  multiSelect: false

                }),
                


// Multi column selection returning the 'Title' of the selected columns
PropertyFieldColumnPicker('multiColumn', {
  label: 'Select columns',
  context: this.context,
  selectedColumn: this.properties.multiColumn,
  listId: this.properties.singleListFiltered,
  disabled: false,
  orderBy: PropertyFieldColumnPickerOrderBy.Title,
  onPropertyChange: this.onSelectedItem.bind(this),
  properties: this.properties,
  onGetErrorMessage: null,
  deferredValidationTime: 0,
  key: 'multiColumnPickerFieldId',
  displayHiddenColumns: true,
  columnReturnProperty: IColumnReturnProperty.Title,
  multiSelect: true
}),       
              ]
            }
          ]
        }
      ]
    };

  }
  public async getListTitle(listId:any):Promise<string>{
    const sp:SPFI= await getSP(this.context);
    const listDetails = await sp.web.lists.getById(listId)
    const listInfo = await listDetails.getParentInfos();
    console.log(listInfo.List.RootFolderServerRelativeUrl);
    
    const string = listInfo.List.RootFolderServerRelativeUrl
const regex = /\/Lists\/(.*)/; // Matches "/Lists/" followed by any characters

const match = string.match(regex);
if (match) {
  const extractedWord = match[1]; // Capturing group 1 contains the extracted word
  console.log(extractedWord); // Output: "Birthdays"
  return extractedWord
} else {
  console.log("No match found.");
  return"Error"
}
   
  }
  public onPropertyListChange(propertyPath: string, oldValue: any, newValue: any): void{
        this.properties.list = newValue;
        console.log(newValue);
        this.getListTitle(newValue)
        console.log(this.properties.list);
        this.properties.singleListFiltered = newValue;
        // this.properties.title=newValue[0].title
    console.log(this.properties.singleListFiltered);
  
  }
//   private  onPropertyChange(propertyPath: string, oldValue: any, newValue: string): void{ debugger
//     this.properties.siteId=newValue;
//     console.log(this.properties.siteId);

   
// }
private onSelectedItem = (propertyPath: string, oldValue: any, newValue: IPropertyFieldSite[]): void => {
    console.log(this.properties.multiColumn );
}




}